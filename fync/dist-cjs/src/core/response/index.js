"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _simple = require("./simple");
Object.keys(_simple).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _simple[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _simple[key];
    }
  });
});
var _structured = require("./structured");
Object.keys(_structured).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _structured[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _structured[key];
    }
  });
});