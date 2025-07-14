"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchUser = fetchUser;
var _cacheService = require("./cache-service");
var _httpClient = require("./http-client");
async function fetchUserInternal(username, opts = {}) {
  const response = await (0, _httpClient.httpRequest)(`https://api.github.com/users/${username}`, undefined, opts.signal);
  return response.data;
}
function fetchUser(username, opts = {}) {
  return memoizedFetchUser(username, opts);
}
const fetchUserWrapper = async (...args) => {
  const username = args[0];
  const opts = args[1] || {};
  return fetchUserInternal(username, opts);
};
const memoizedFetchUser = (0, _cacheService.memoize)(fetchUserWrapper, (...args) => {
  const username = args[0];
  return `user:${username}`;
});