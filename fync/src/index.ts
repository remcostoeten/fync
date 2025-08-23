/**
 * @remcostoeten/fync - Unified API Package
 * 
 * A streamlined package providing consistent access to multiple APIs
 * through a unified functional architecture.
 */

// Core exports
export * from "./core";

// API exports
export { GitHub } from "./github";
export { NPM } from "./npm";
export { Spotify } from "./spotify";
export { Vercel } from "./vercel";

// Type exports
export * from "./github/types";
export * from "./npm/types";
export * from "./spotify/types";
export * from "./vercel/types";

// Version
export { version } from "./core";
