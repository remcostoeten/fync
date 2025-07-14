"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApiClient = createApiClient;
var _cache = require("../cache");
var _filters = require("../filters");
var _http = require("../http");
function createApiClient(resourceConfig) {
  return function (config) {
    const httpClient = (0, _http.createHttpClient)(config);
    const cache = config.cache || (0, _cache.createMemoryCache)();
    async function create(data) {
      const serialized = resourceConfig.serializer ? resourceConfig.serializer(data) : data;
      const response = await httpClient.post(resourceConfig.endpoint, serialized);
      return response.data;
    }
    async function read(id) {
      const cached = await cache.get(id.toString());
      if (cached) return cached;
      const response = await httpClient.get(`${resourceConfig.endpoint}/${id}`);
      const entity = response.data;
      await cache.set(id.toString(), entity, config.defaultCacheTTL);
      return entity;
    }
    async function update(id, data) {
      const serialized = resourceConfig.serializer ? resourceConfig.serializer(data) : data;
      const response = await httpClient.put(`${resourceConfig.endpoint}/${id}`, serialized);
      const entity = response.data;
      await cache.set(id.toString(), entity, config.defaultCacheTTL);
      return entity;
    }
    async function destroy(id) {
      await cache.delete(id.toString());
      const response = await httpClient.delete(`${resourceConfig.endpoint}/${id}`);
      return response.ok;
    }
    async function list(options) {
      const response = await httpClient.get(resourceConfig.endpoint);
      return (0, _filters.applyFilterOptions)(response.data, options || {});
    }
    async function findBy(field, value) {
      const filter = (0, _filters.createOperatorFilter)(field, "eq", value);
      const [result] = await list({
        filters: [filter]
      });
      return result || null;
    }
    async function findManyBy(field, value) {
      const filter = (0, _filters.createOperatorFilter)(field, "eq", value);
      return list({
        filters: [filter]
      });
    }
    async function count(options) {
      const entities = await list(options);
      return entities.length;
    }
    async function exists(id) {
      const entity = await read(id);
      return Boolean(entity);
    }
    return {
      config,
      cache,
      create,
      read,
      update,
      destroy,
      list,
      findBy,
      findManyBy,
      count,
      exists
    };
  };
}