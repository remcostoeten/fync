"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNextJSAPIHandler = createNextJSAPIHandler;
exports.createNextJSOAuth2Handler = createNextJSOAuth2Handler;
var _server = require("next/server");
var _flow = require("../core/flow");
var _github = require("../providers/github");
// @ts-ignore

function createNextJSOAuth2Handler(config) {
  const oauth2Flow = (0, _flow.createOAuth2Flow)(config, _github.GITHUB_OAUTH2_PROVIDER);
  const cookieName = config.cookieName || "github-oauth-state";
  const cookieOptions = {
    maxAge: 600,
    // 10 minutes
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    ...config.cookieOptions
  };
  function login(request) {
    const {
      searchParams
    } = new URL(request.url);
    const redirectTo = searchParams.get("redirectTo") || "/";
    const state = oauth2Flow.generateState({
      redirectTo
    });
    const authUrl = oauth2Flow.getAuthorizationUrl({
      state: state.value
    });
    const response = _server.NextResponse.redirect(authUrl);
    // Store state in cookie for validation
    response.cookies.set(cookieName, JSON.stringify(state), cookieOptions);
    return response;
  }
  async function callback(request) {
    const {
      searchParams
    } = new URL(request.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");
    if (error) {
      const errorObj = new Error(`OAuth2 Error: ${error}`);
      return config.onError ? config.onError(errorObj, request) : _server.NextResponse.redirect("/login?error=oauth");
    }
    if (!code || !state) {
      const errorObj = new Error("Missing code or state parameter");
      return config.onError ? config.onError(errorObj, request) : _server.NextResponse.redirect("/login?error=missing-params");
    }
    try {
      // Validate state
      const storedState = request.cookies.get(cookieName)?.value;
      if (!storedState) {
        throw new Error("Missing stored state");
      }
      const parsedStoredState = JSON.parse(storedState);
      if (!oauth2Flow.validateState(state, parsedStoredState.value)) {
        throw new Error("Invalid state parameter");
      }
      // Exchange code for token
      const tokens = await oauth2Flow.exchangeCodeForToken({
        code,
        state
      });
      // Clear state cookie
      const response = config.onSuccess ? await config.onSuccess(tokens, request) : _server.NextResponse.redirect(parsedStoredState.metadata?.redirectTo || "/");
      response.cookies.delete(cookieName);
      return response;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error("OAuth2 callback failed");
      return config.onError ? config.onError(errorObj, request) : _server.NextResponse.redirect("/login?error=callback");
    }
  }
  function logout(request) {
    const response = _server.NextResponse.redirect("/login");
    // Clear any authentication cookies
    response.cookies.delete(cookieName);
    response.cookies.delete("github-access-token");
    return response;
  }
  function middleware(request) {
    const token = request.cookies.get("github-access-token")?.value;
    if (!token) {
      const loginUrl = new URL("/api/auth/login", request.url);
      loginUrl.searchParams.set("redirectTo", request.url);
      return _server.NextResponse.redirect(loginUrl);
    }
    return _server.NextResponse.next();
  }
  return {
    login,
    callback,
    logout,
    middleware
  };
}
// Helper for API route handlers
function createNextJSAPIHandler(config) {
  const handler = createNextJSOAuth2Handler(config);
  return {
    GET: async request => {
      const {
        pathname
      } = new URL(request.url);
      if (pathname.endsWith("/login")) {
        return handler.login(request);
      }
      if (pathname.endsWith("/callback")) {
        return handler.callback(request);
      }
      if (pathname.endsWith("/logout")) {
        return handler.logout(request);
      }
      return _server.NextResponse.json({
        error: "Not found"
      }, {
        status: 404
      });
    },
    POST: async request => {
      const {
        pathname
      } = new URL(request.url);
      if (pathname.endsWith("/logout")) {
        return handler.logout(request);
      }
      return _server.NextResponse.json({
        error: "Method not allowed"
      }, {
        status: 405
      });
    }
  };
}