"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  version: true,
  userAgent: true
};
exports.version = exports.userAgent = void 0;
var _cache = require("./cache");
Object.keys(_cache).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _cache[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _cache[key];
    }
  });
});
var _http = require("./http");
Object.keys(_http).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _http[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _http[key];
    }
  });
});
var _response = require("./response");
Object.keys(_response).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _response[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _response[key];
    }
  });
});
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
// Core HTTP client and utilities

// Core types

// Utility functions
const version = exports.version = "3.1.0";
const userAgent = exports.userAgent = `@remcostoeten/fync/${version}`;