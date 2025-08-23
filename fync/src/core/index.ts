// Core API functions
export * from "./api-factory";
export * from "./api-factory-enhanced";
export * from "./method-factory";
export * from "./resource-factory";
export * from "./module-factory";

// Enhanced features
export * from "./result";
export * from "./cache";
export * from "./rate-limiter";

// Types
export * from "./types";

// Error handling
export * from "./errors";

// Version
export const version = "4.0.0";
export const userAgent = `@remcostoeten/fync/${version}`;
