/**
 * @remcostoeten/fync - Unified API Package
 *
 * A streamlined package providing consistent access to multiple APIs
 * through a unified functional architecture.
 */

// Core exports
export * from "./core";
// Version
export { version } from "./core";
// API exports
export { GitHub } from "./github";
export { GitLab } from "./gitlab";
// Type exports
export * from "./github/types";
export * from "./gitlab/types";
export { NPM } from "./npm";
export * from "./npm/types";
export { Spotify } from "./spotify";
export * from "./spotify/types";
export { Vercel } from "./vercel";
export * from "./vercel/types";
export { GoogleCalendar } from "./google-calendar";
export * from "./google-calendar/types";
export { GoogleDrive } from "./google-drive";
export * from "./google-drive/types";
