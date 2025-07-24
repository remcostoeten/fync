// Core HTTP client and utilities

export * from "./cache";
export * from "./http";
export * from "./response";

// Core types
export * from "./types";

// Utility functions
export const version = "3.1.0";
export const userAgent = `@remcostoeten/fync/${version}`;

// Core configuration type
export type TCoreConfig = {
	baseURL?: string;
	timeout?: number;
	headers?: Record<string, string>;
	cache?: boolean;
};
