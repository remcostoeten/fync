"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOAuth2Flow = createOAuth2Flow;
var _utils = require("../utils");
function createOAuth2Flow(config, provider) {
  (0, _utils.validateRequiredParams)(config, ["clientId", "clientSecret", "redirectUri"]);
  const _baseUrl = config.baseUrl || "https://api.github.com";
  const userAgent = config.userAgent || "Fync GitHub OAuth2 Client";
  function generateState(metadata) {
    const value = (0, _utils.generateRandomString)(16);
    return {
      value,
      metadata: metadata || {}
    };
  }
  function getAuthorizationUrl(options) {
    const scopes = (0, _utils.sanitizeScopes)(options.scopes || config.scopes, provider.defaultScopes);
    const params = {
      client_id: config.clientId,
      redirect_uri: options.redirectUri || config.redirectUri,
      scope: scopes.join(provider.scopeSeparator),
      response_type: "code",
      state: options.state,
      allow_signup: options.allowSignup ? "true" : "false",
      login: options.login
    };
    return (0, _utils.buildUrlWithParams)(provider.authorizationUrl, params);
  }
  async function exchangeCodeForToken(options) {
    (0, _utils.validateRequiredParams)(options, ["code"]);
    const params = {
      client_id: config.clientId,
      client_secret: config.clientSecret,
      code: options.code,
      redirect_uri: options.redirectUri || config.redirectUri
    };
    if (options.state) {
      params.state = options.state;
    }
    try {
      const response = await fetch(provider.tokenUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": userAgent
        },
        body: new URLSearchParams(params).toString()
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.error) {
        throw (0, _utils.createErrorFromResponse)(data);
      }
      const tokenResponse = (0, _utils.parseTokenResponse)(data);
      return {
        ...tokenResponse,
        created_at: Math.floor(Date.now() / 1000)
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to exchange code for token");
    }
  }
  async function refreshAccessToken(options) {
    (0, _utils.validateRequiredParams)(options, ["refreshToken"]);
    const scopes = (0, _utils.sanitizeScopes)(options.scopes, provider.defaultScopes);
    const params = {
      client_id: config.clientId,
      client_secret: config.clientSecret,
      refresh_token: options.refreshToken,
      grant_type: "refresh_token",
      scope: scopes.join(provider.scopeSeparator)
    };
    try {
      const response = await fetch(provider.tokenUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": userAgent
        },
        body: new URLSearchParams(params).toString()
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.error) {
        throw (0, _utils.createErrorFromResponse)(data);
      }
      return (0, _utils.parseTokenResponse)(data);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to refresh access token");
    }
  }
  async function revokeToken(options) {
    (0, _utils.validateRequiredParams)(options, ["token"]);
    if (!provider.revokeUrl) {
      throw new Error("Token revocation is not supported by this provider");
    }
    const revokeUrl = provider.revokeUrl.replace("{client_id}", config.clientId);
    const params = {
      access_token: options.token
    };
    try {
      const response = await fetch(revokeUrl, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent": userAgent,
          Authorization: `Basic ${Buffer.from(`${config.clientId}:${config.clientSecret}`).toString("base64")}`
        },
        body: JSON.stringify(params)
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to revoke token");
    }
  }
  function validateState(receivedState, expectedState) {
    if (!receivedState || !expectedState) {
      return false;
    }
    try {
      const received = (0, _utils.decodeState)(receivedState);
      const expected = (0, _utils.decodeState)(expectedState);
      return received.value === expected.value;
    } catch {
      return receivedState === expectedState;
    }
  }
  return {
    generateState,
    getAuthorizationUrl,
    exchangeCodeForToken,
    refreshAccessToken,
    revokeToken,
    validateState
  };
}