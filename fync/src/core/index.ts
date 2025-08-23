export * from "./errors/exports";
export * from "./http";
export * from "./types";
export * from "./api-factory";
export * from "./resource-factory";
export * from "./module-factory";

/**
 * Package version - should be updated via build script or CI/CD
 * TODO: Consider using a build-time replacement or dynamic import
 */
export const version = "3.4.2";
export const userAgent = `@remcostoeten/fync/${version}`;
export type TCoreConfig = {
	baseURL?: string;
	timeout?: number;
	headers?: Record<string, string>;
	cache?: boolean;
};
