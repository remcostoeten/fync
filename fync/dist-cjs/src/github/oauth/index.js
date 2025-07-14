"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "GITHUB_OAUTH2_PROVIDER", {
  enumerable: true,
  get: function () {
    return _github.GITHUB_OAUTH2_PROVIDER;
  }
});
Object.defineProperty(exports, "GITHUB_OAUTH2_SCOPES", {
  enumerable: true,
  get: function () {
    return _github.GITHUB_OAUTH2_SCOPES;
  }
});
Object.defineProperty(exports, "buildUrlWithParams", {
  enumerable: true,
  get: function () {
    return _utils.buildUrlWithParams;
  }
});
Object.defineProperty(exports, "createErrorFromResponse", {
  enumerable: true,
  get: function () {
    return _utils.createErrorFromResponse;
  }
});
exports.createGitHubOAuth2Flow = createGitHubOAuth2Flow;
Object.defineProperty(exports, "createNextJSAPIHandler", {
  enumerable: true,
  get: function () {
    return _nextjs.createNextJSAPIHandler;
  }
});
Object.defineProperty(exports, "createNextJSOAuth2Handler", {
  enumerable: true,
  get: function () {
    return _nextjs.createNextJSOAuth2Handler;
  }
});
Object.defineProperty(exports, "createOAuth2Flow", {
  enumerable: true,
  get: function () {
    return _flow.createOAuth2Flow;
  }
});
Object.defineProperty(exports, "decodeState", {
  enumerable: true,
  get: function () {
    return _utils.decodeState;
  }
});
Object.defineProperty(exports, "encodeState", {
  enumerable: true,
  get: function () {
    return _utils.encodeState;
  }
});
Object.defineProperty(exports, "generateCodeChallenge", {
  enumerable: true,
  get: function () {
    return _utils.generateCodeChallenge;
  }
});
Object.defineProperty(exports, "generateCodeVerifier", {
  enumerable: true,
  get: function () {
    return _utils.generateCodeVerifier;
  }
});
Object.defineProperty(exports, "generateRandomString", {
  enumerable: true,
  get: function () {
    return _utils.generateRandomString;
  }
});
Object.defineProperty(exports, "getCommonScopeGroups", {
  enumerable: true,
  get: function () {
    return _github.getCommonScopeGroups;
  }
});
Object.defineProperty(exports, "isTokenExpired", {
  enumerable: true,
  get: function () {
    return _utils.isTokenExpired;
  }
});
Object.defineProperty(exports, "parseTokenResponse", {
  enumerable: true,
  get: function () {
    return _utils.parseTokenResponse;
  }
});
Object.defineProperty(exports, "sanitizeScopes", {
  enumerable: true,
  get: function () {
    return _utils.sanitizeScopes;
  }
});
Object.defineProperty(exports, "shouldRefreshToken", {
  enumerable: true,
  get: function () {
    return _utils.shouldRefreshToken;
  }
});
Object.defineProperty(exports, "validateGitHubScopes", {
  enumerable: true,
  get: function () {
    return _github.validateGitHubScopes;
  }
});
Object.defineProperty(exports, "validateRequiredParams", {
  enumerable: true,
  get: function () {
    return _utils.validateRequiredParams;
  }
});
var _flow = require("./core/flow");
var _nextjs = require("./frameworks/nextjs");
var _github = require("./providers/github");
var _utils = require("./utils");
// Core OAuth2 functionality

// Framework helpers

// GitHub provider

// Utility functions

function createGitHubOAuth2Flow(config) {
  const {
    createOAuth2Flow
  } = require("./core/flow");
  const {
    GITHUB_OAUTH2_PROVIDER
  } = require("./providers/github");
  return createOAuth2Flow(config, GITHUB_OAUTH2_PROVIDER);
}