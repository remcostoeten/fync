import type {
  TApiClientFactory,
  TApiClient,
  TApiConfig,
  TResourceConfig
} from './types';
import type { TBaseEntity } from '../types';
import { createHttpClient } from '../http';
import { createMemoryCache } from '../cache';

export function createApiClient<T extends TBaseEntity>(
  resourceConfig: TResourceConfig<T>
): TApiClientFactory<T> {
  return function(config: TApiConfig): TApiClient<T> {
    const httpClient = createHttpClient(config);
    const cache = config.cache || createMemoryCache();

    async function create(data: T): Promise<T> {
      const serialized = resourceConfig.serializer
        ? resourceConfig.serializer(data)
        : data;
      const response = await httpClient.post(resourceConfig.endpoint, serialized);
      return response.data as T;
    }

    async function read(id: number): Promise<T | null> {
      const cached = await cache.get(id.toString());
      if (cached) return cached as T;

      const response = await httpClient.get(`${resourceConfig.endpoint}/${id}`);
      const entity = response.data as T;

      await cache.set(id.toString(), entity, config.defaultCacheTTL);
      return entity;
    }

    async function update(id: number, data: T): Promise<T> {
      const serialized = resourceConfig.serializer
        ? resourceConfig.serializer(data)
        : data;
      const response = await httpClient.put(`${resourceConfig.endpoint}/${id}`, serialized);
      const entity = response.data as T;

      await cache.set(id.toString(), entity, config.defaultCacheTTL);
      return entity;
    }

    async function destroy(id: number): Promise<boolean> {
      await cache.delete(id.toString());
      const response = await httpClient.delete(`${resourceConfig.endpoint}/${id}`);
      return response.ok;
    }  

    async function list(options?: TFilterOptions<T>): Promise<T[]> {
      const response = await httpClient.get(resourceConfig.endpoint, {
        params: options
      });
      return applyFilterOptions(response.data as T[], options || {});
    }

    async function findBy(
      field: keyof T, 
      value: unknown
    ): Promise<T | null> {
      const filter = createOperatorFilter(field, 'eq', value);
      const [result] = await list({ filters: [filter] });
      return result || null;
    }

    async function findManyBy(
      field: keyof T, 
      value: unknown
    ): Promise<T[]> {
      const filter = createOperatorFilter(field, 'eq', value);
      return list({ filters: [filter] });
    }

    async function count(options?: TFilterOptions<T>): Promise<number> {
      const entities = await list(options);
      return entities.length;
    }

    async function exists(id: number): Promise<boolean> {
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
