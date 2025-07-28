// Core error handling exports
export { BaseError, ErrorUtil } from "./index";
export { HttpErrorHandler } from "./http-handler";

// Error types
export type {
  TErrorCategory,
  TErrorSeverity,
  TRetryConfig,
  TErrorContext,
  TErrorInfo,
  TErrorTransformer,
  TErrorHandler,
  TRecoveryStrategy,
} from "./types";

// Transformers
export {
  httpErrorTransformer,
  httpStatusTransformer,
} from "./transformers";

export {
  spotifyErrorTransformer,
  githubErrorTransformer,
  npmErrorTransformer,
  googleCalendarErrorTransformer,
} from "./service-transformers";

// Default error handler setup
import { ErrorUtil } from "./index";
import { httpErrorTransformer, httpStatusTransformer } from "./transformers";
import {
  spotifyErrorTransformer,
  githubErrorTransformer,
  npmErrorTransformer,
  googleCalendarErrorTransformer,
} from "./service-transformers";

/**
 * Initialize error handling system with default transformers
 */
export function initializeErrorHandling() {
  // Register HTTP transformers
  ErrorUtil.registerTransformer(httpErrorTransformer);
  ErrorUtil.registerTransformer(httpStatusTransformer);
  
  // Register service-specific transformers
  ErrorUtil.registerTransformer(spotifyErrorTransformer);
  ErrorUtil.registerTransformer(githubErrorTransformer);
  ErrorUtil.registerTransformer(npmErrorTransformer);
  ErrorUtil.registerTransformer(googleCalendarErrorTransformer);

  // Register default console error handler
  ErrorUtil.registerHandler(async (errorInfo) => {
    if (errorInfo.severity === "critical" || errorInfo.severity === "high") {
      console.error(`[${errorInfo.service.toUpperCase()}] ${errorInfo.code}:`, {
        message: errorInfo.message,
        userMessage: errorInfo.userMessage,
        category: errorInfo.category,
        severity: errorInfo.severity,
        isRetryable: errorInfo.isRetryable,
        suggestedAction: errorInfo.suggestedAction,
        context: errorInfo.context,
      });
    }
  });
}
