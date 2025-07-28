/**
 * Core error categories that help developers understand the type of failure
 */
export type TErrorCategory = 
  | "authentication"    // Invalid tokens, expired auth, permission denied
  | "network"          // Connection issues, timeouts, DNS failures
  | "ratelimit"        // API rate limiting exceeded
  | "validation"       // Invalid input parameters or data
  | "api"              // API-specific errors (404, 422, etc.)
  | "configuration"    // Missing or invalid config
  | "cache"           // Cache-related errors
  | "unknown";        // Unexpected errors

/**
 * Severity levels for error handling and logging
 */
export type TErrorSeverity = "low" | "medium" | "high" | "critical";

/**
 * Retry strategy configuration
 */
export type TRetryConfig = {
  maxAttempts: number;
  baseDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
  retryableStatuses: number[];
};

/**
 * Context information about the failed request
 */
export type TErrorContext = {
  service: "spotify" | "github" | "npm" | "google-calendar" | "core";
  endpoint?: string;
  method?: string;
  requestId?: string;
  timestamp: Date;
  userAgent?: string;
  retryCount?: number;
  retryConfig?: TRetryConfig;
  originalError?: Error;
  metadata?: Record<string, unknown>;
};

/**
 * Structured error information for consistent error handling
 */
export type TErrorInfo = {
  code: string;
  category: TErrorCategory;
  severity: TErrorSeverity;
  message: string;
  userMessage?: string;
  documentation?: string;
  service: "spotify" | "github" | "npm" | "google-calendar" | "core";
  context: TErrorContext;
  isRetryable: boolean;
  suggestedAction?: string;
};

/**
 * Error transformation function type
 */
export type TErrorTransformer = (error: unknown) => TErrorInfo | null;

/**
 * Error handler function type
 */
export type TErrorHandler = (errorInfo: TErrorInfo) => void | Promise<void>;

/**
 * Recovery strategy function type
 */
export type TRecoveryStrategy<T = unknown> = (errorInfo: TErrorInfo) => Promise<T | null>;
