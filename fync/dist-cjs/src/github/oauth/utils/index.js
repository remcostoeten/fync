"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildUrlWithParams = buildUrlWithParams;
exports.createErrorFromResponse = createErrorFromResponse;
exports.decodeState = decodeState;
exports.encodeState = encodeState;
exports.generateCodeChallenge = generateCodeChallenge;
exports.generateCodeVerifier = generateCodeVerifier;
exports.generateRandomString = generateRandomString;
exports.isTokenExpired = isTokenExpired;
exports.parseTokenResponse = parseTokenResponse;
exports.sanitizeScopes = sanitizeScopes;
exports.shouldRefreshToken = shouldRefreshToken;
exports.validateRequiredParams = validateRequiredParams;
var _crypto = require("crypto");
function generateRandomString(length = 32) {
  return (0, _crypto.randomBytes)(length).toString("hex");
}
function generateCodeVerifier() {
  return generateRandomString(32);
}
function generateCodeChallenge(codeVerifier) {
  return (0, _crypto.createHash)("sha256").update(codeVerifier).digest("base64url");
}
function encodeState(state) {
  return Buffer.from(JSON.stringify(state)).toString("base64url");
}
function decodeState(encodedState) {
  try {
    const decoded = Buffer.from(encodedState, "base64url").toString("utf-8");
    return JSON.parse(decoded);
  } catch {
    throw new Error("Invalid state parameter");
  }
}
function isTokenExpired(token) {
  if (!token.expires_in || !token.created_at) {
    return false;
  }
  const expiresAt = token.created_at + token.expires_in;
  const now = Math.floor(Date.now() / 1000);
  return now >= expiresAt;
}
function shouldRefreshToken(token, bufferSeconds = 300) {
  if (!token.expires_in || !token.created_at) {
    return false;
  }
  const expiresAt = token.created_at + token.expires_in;
  const now = Math.floor(Date.now() / 1000);
  return now >= expiresAt - bufferSeconds;
}
function buildUrlWithParams(baseUrl, params) {
  const url = new URL(baseUrl);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      url.searchParams.append(key, value);
    }
  }
  return url.toString();
}
function validateRequiredParams(params, required) {
  for (const param of required) {
    if (params[param] === undefined || params[param] === null || params[param] === "") {
      throw new Error(`Missing required parameter: ${param}`);
    }
  }
}
function sanitizeScopes(scopes, defaultScopes) {
  if (!scopes || scopes.length === 0) {
    return [...defaultScopes];
  }
  return [...new Set([...scopes])];
}
function parseTokenResponse(response) {
  if (typeof response !== "object" || response === null) {
    throw new Error("Invalid token response format");
  }
  const tokenResponse = response;
  validateRequiredParams(tokenResponse, ["access_token", "token_type"]);
  return {
    access_token: tokenResponse.access_token,
    token_type: tokenResponse.token_type,
    scope: tokenResponse.scope || "",
    refresh_token: tokenResponse.refresh_token,
    expires_in: tokenResponse.expires_in
  };
}
function createErrorFromResponse(response) {
  if (typeof response !== "object" || response === null) {
    return new Error("OAuth2 request failed");
  }
  const errorResponse = response;
  if (errorResponse.error) {
    const error = errorResponse.error;
    const description = errorResponse.error_description;
    const uri = errorResponse.error_uri;
    let message = `OAuth2 Error: ${error}`;
    if (description) {
      message += ` - ${description}`;
    }
    if (uri) {
      message += ` (${uri})`;
    }
    return new Error(message);
  }
  return new Error("OAuth2 request failed");
}