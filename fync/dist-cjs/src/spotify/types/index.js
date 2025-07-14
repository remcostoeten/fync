"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _spotifyCommon = require("./spotify-common");
Object.keys(_spotifyCommon).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _spotifyCommon[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _spotifyCommon[key];
    }
  });
});
var _spotifyPlayer = require("./spotify-player");
Object.keys(_spotifyPlayer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _spotifyPlayer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _spotifyPlayer[key];
    }
  });
});
var _spotifyPlaylist = require("./spotify-playlist");
Object.keys(_spotifyPlaylist).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _spotifyPlaylist[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _spotifyPlaylist[key];
    }
  });
});
var _spotifyRecent = require("./spotify-recent");
Object.keys(_spotifyRecent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _spotifyRecent[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _spotifyRecent[key];
    }
  });
});
var _spotifySearch = require("./spotify-search");
Object.keys(_spotifySearch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _spotifySearch[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _spotifySearch[key];
    }
  });
});
var _spotifyTrack = require("./spotify-track");
Object.keys(_spotifyTrack).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _spotifyTrack[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _spotifyTrack[key];
    }
  });
});
var _spotifyUser = require("./spotify-user");
Object.keys(_spotifyUser).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _spotifyUser[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _spotifyUser[key];
    }
  });
});