import type { TErrorInfo, TErrorTransformer } from "./types";

/**
 * Transform HTTP fetch errors into structured error info
 */
export function httpErrorTransformer(error: unknown): TErrorInfo | null {
  if (!(error instanceof Error)) return null;

  // Handle fetch network errors
  if (error.name === "TypeError" && error.message.includes("fetch")) {
    return {
      code: "NETWORK_ERROR",
      category: "network",
      severity: "high",
      message: "Network request failed",
      userMessage: "Unable to connect to the service. Please check your internet connection.",
      service: "core",
      context: {
        service: "core",
        timestamp: new Date(),
        originalError: error,
      },
      isRetryable: true,
      suggestedAction: "Check your internet connection and try again",
    };
  }

  // Handle timeout errors
  if (error.name === "AbortError" || error.message.includes("timeout")) {
    return {
      code: "REQUEST_TIMEOUT",
      category: "network",
      severity: "medium",
      message: "Request timed out",
      userMessage: "The request took too long to complete.",
      service: "core",
      context: {
        service: "core",
        timestamp: new Date(),
        originalError: error,
      },
      isRetryable: true,
      suggestedAction: "Try again with a longer timeout or check service status",
    };
  }

  return null;
};

/**
 * Transform HTTP status errors into structured error info
 */
export function httpStatusTransformer(error: unknown): TErrorInfo | null {
  if (!(error instanceof Error)) return null;

  const statusMatch = error.message.match(/HTTP (\d+)/);
  if (!statusMatch) return null;

  const status = parseInt(statusMatch[1], 10);
  
  // Authentication errors
  if (status === 401) {
    return {
      code: "AUTHENTICATION_FAILED",
      category: "authentication", 
      severity: "high",
      message: "Authentication failed",
      userMessage: "Your authentication token is invalid or expired.",
      service: "core",
      context: {
        service: "core",
        timestamp: new Date(),
        originalError: error,
        metadata: { statusCode: status },
      },
      isRetryable: false,
      suggestedAction: "Please refresh your authentication token",
    };
  }

  // Authorization errors
  if (status === 403) {
    return {
      code: "AUTHORIZATION_FAILED",
      category: "authentication",
      severity: "high", 
      message: "Authorization failed",
      userMessage: "You don't have permission to access this resource.",
      service: "core",
      context: {
        service: "core",
        timestamp: new Date(),
        originalError: error,
        metadata: { statusCode: status },
      },
      isRetryable: false,
      suggestedAction: "Check your permissions or contact an administrator",
    };
  }

  // Rate limiting
  if (status === 429) {
    return {
      code: "RATE_LIMIT_EXCEEDED",
      category: "ratelimit",
      severity: "medium",
      message: "Rate limit exceeded",
      userMessage: "Too many requests. Please slow down.",
      service: "core",
      context: {
        service: "core",
        timestamp: new Date(),
        originalError: error,
        metadata: { statusCode: status },
      },
      isRetryable: true,
      suggestedAction: "Wait before making another request",
    };
  }

  // Not found
  if (status === 404) {
    return {
      code: "RESOURCE_NOT_FOUND",
      category: "api",
      severity: "medium",
      message: "Resource not found",
      userMessage: "The requested resource could not be found.",
      service: "core",
      context: {
        service: "core",
        timestamp: new Date(),
        originalError: error,
        metadata: { statusCode: status },
      },
      isRetryable: false,
      suggestedAction: "Check the resource ID or endpoint URL",
    };
  }

  // Validation errors
  if (status === 422) {
    return {
      code: "VALIDATION_ERROR",
      category: "validation",
      severity: "medium",
      message: "Validation failed",
      userMessage: "The request data is invalid.",
      service: "core",
      context: {
        service: "core",
        timestamp: new Date(),
        originalError: error,
        metadata: { statusCode: status },
      },
      isRetryable: false,
      suggestedAction: "Check your request parameters and data format",
    };
  }

  // Server errors
  if (status >= 500) {
    return {
      code: "SERVER_ERROR",
      category: "api",
      severity: "high",
      message: "Server error occurred",
      userMessage: "The service is temporarily unavailable.",
      service: "core",
      context: {
        service: "core",
        timestamp: new Date(),
        originalError: error,
        metadata: { statusCode: status },
      },
      isRetryable: true,
      suggestedAction: "Try again later or check service status",
    };
  }

  // Client errors
  if (status >= 400) {
    return {
      code: "CLIENT_ERROR",
      category: "api",
      severity: "medium",
      message: "Client error occurred",
      userMessage: "There was an error with your request.",
      service: "core",
      context: {
        service: "core",
        timestamp: new Date(),
        originalError: error,
        metadata: { statusCode: status },
      },
      isRetryable: false,
      suggestedAction: "Check your request and try again",
    };
  }

  return null;
};
