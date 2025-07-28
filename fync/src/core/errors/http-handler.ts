import { BaseError, ErrorUtil } from "./index";
import { httpErrorTransformer, httpStatusTransformer } from "./transformers";
import type { TErrorContext, TRetryConfig } from "./types";

/**
 * Default retry configuration
 */
const DEFAULT_RETRY_CONFIG: TRetryConfig = {
  maxAttempts: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
  retryableStatuses: [408, 429, 500, 502, 503, 504],
};

/**
 * Centralized HTTP error handler with automatic retry logic
 */
export class HttpErrorHandler {
  private retryConfig: TRetryConfig;

  constructor(retryConfig: Partial<TRetryConfig> = {}) {
    this.retryConfig = { ...DEFAULT_RETRY_CONFIG, ...retryConfig };
    
    // Register our transformers
    ErrorUtil.registerTransformer(httpErrorTransformer);
    ErrorUtil.registerTransformer(httpStatusTransformer);
  }

  /**
   * Execute HTTP request with error handling and retry logic
   */
  async execute<T>(
    requestFn: () => Promise<T>,
    context: Partial<TErrorContext>
  ): Promise<T> {
    let lastError: BaseError | null = null;
    
    for (let attempt = 1; attempt <= this.retryConfig.maxAttempts; attempt++) {
      try {
        return await requestFn();
      } catch (error) {
        const errorContext: Partial<TErrorContext> = {
          ...context,
          retryCount: attempt - 1,
          retryConfig: this.retryConfig,
        };

        const structuredError = ErrorUtil.createError(error, errorContext);
        lastError = structuredError;

        // Handle the error (logging, etc.)
        await ErrorUtil.handle(structuredError);

        // Don't retry if it's the last attempt or error is not retryable
        if (attempt === this.retryConfig.maxAttempts || !structuredError.info.isRetryable) {
          break;
        }

        // Don't retry if status is not in retryable list
        const statusCode = structuredError.info.context.metadata?.statusCode as number;
        if (statusCode && !this.retryConfig.retryableStatuses.includes(statusCode)) {
          break;
        }

        // Calculate delay with exponential backoff
        const delay = Math.min(
          this.retryConfig.baseDelay * Math.pow(this.retryConfig.backoffMultiplier, attempt - 1),
          this.retryConfig.maxDelay
        );

        // Add jitter to prevent thundering herd
        const jitteredDelay = delay + Math.random() * 1000;
        
        await this.sleep(jitteredDelay);
      }
    }

    // If we get here, all retries failed
    if (lastError) {
      throw lastError;
    }

    throw new BaseError({
      code: "UNKNOWN_ERROR",
      category: "unknown",
      severity: "critical",
      message: "Unknown error occurred during HTTP request",
      service: context.service || "core",
      context: { ...context, timestamp: new Date(), service: context.service || "core" },
      isRetryable: false,
    });
  }

  /**
   * Handle a single HTTP error without retry logic
   */
  async handleError(error: unknown, context: Partial<TErrorContext>): Promise<BaseError> {
    const structuredError = ErrorUtil.createError(error, context);
    await ErrorUtil.handle(structuredError);
    return structuredError;
  }

  /**
   * Sleep for specified milliseconds
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Check if an error is retryable based on current configuration
   */
  isRetryable(error: BaseError): boolean {
    if (!error.info.isRetryable) return false;

    const statusCode = error.info.context.metadata?.statusCode as number;
    if (statusCode && !this.retryConfig.retryableStatuses.includes(statusCode)) {
      return false;
    }

    return true;
  }

  /**
   * Update retry configuration
   */
  updateRetryConfig(config: Partial<TRetryConfig>) {
    this.retryConfig = { ...this.retryConfig, ...config };
  }
}
