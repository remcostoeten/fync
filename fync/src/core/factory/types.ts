import type { TCacheAdapter } from "../cache";
import type { TFilterOptions } from "../filters";
import type { THttpConfig } from "../http";
import type { TBaseEntity, TCreateEntity, TUpdateEntity } from "../types";

export type TApiConfig = THttpConfig & {
	cache?: TCacheAdapter;
	defaultCacheTTL?: number;
	retryAttempts?: number;
	retryDelay?: number;
};

export type TApiMethods<T extends TBaseEntity> = {
	create(data: TCreateEntity<T>): Promise<T>;
	read(id: number): Promise<T | null>;
	update(id: number, data: TUpdateEntity<T>): Promise<T>;
	destroy(id: number): Promise<boolean>;
	list(options?: TFilterOptions<T>): Promise<T[]>;
	findBy(field: keyof T, value: unknown): Promise<T | null>;
	findManyBy(field: keyof T, value: unknown): Promise<T[]>;
	count(options?: TFilterOptions<T>): Promise<number>;
	exists(id: number): Promise<boolean>;
};

export type TApiClient<T extends TBaseEntity> = TApiMethods<T> & {
	config: TApiConfig;
	cache?: TCacheAdapter;
};

export type TApiClientFactory<T extends TBaseEntity> = (
	config: TApiConfig,
) => TApiClient<T>;

export type TResourceConfig<T extends TBaseEntity> = {
	endpoint: string;
	idField?: keyof T;
	timestampFields?: {
		created?: keyof T;
		updated?: keyof T;
	};
	serializer?: (data: unknown) => T;
	deserializer?: (entity: T) => unknown;
};
