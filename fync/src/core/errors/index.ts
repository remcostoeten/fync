import type { TErrorInfo, TErrorHandler, TErrorTransformer, TRecoveryStrategy, TErrorContext } from "./types";

/**
 * Base class for all errors
 */
export class BaseError extends Error {
  public info: TErrorInfo;

  constructor(info: TErrorInfo) {
    super(info.message);
    this.info = info;
    this.name = "BaseError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Centralized error utility class for building and managing errors
 */
export class ErrorUtil {
  private static transformers: TErrorTransformer[] = [];
  private static handlers: TErrorHandler[] = [];
  private static recoveries: TRecoveryStrategy[] = [];
  private static initialized = false;

  /**
   * Register error transformer
   */
  static registerTransformer(transformer: TErrorTransformer) {
    this.transformers.push(transformer);
  }

  /**
   * Register error handler
   */
  static registerHandler(handler: TErrorHandler) {
    this.handlers.push(handler);
  }

  /**
   * Register recovery strategy
   */
  static registerRecovery(recovery: TRecoveryStrategy) {
    this.recoveries.push(recovery);
  }

  /**
   * Generate a BaseError from unknown error
   */
  static createError(error: unknown, context: Partial<TErrorContext>): BaseError {
    for (const transformer of this.transformers) {
      const transformed = transformer(error);
      if (transformed) {
        return new BaseError({ ...transformed, context: { ...transformed.context, ...context } });
      }
    }

    return new BaseError({
      code: "UNKNOWN_ERROR",
      category: "unknown",
      severity: "high",
      message: `Unhandled error: ${error}`,
      service: context.service || "core",
      context: { ...context, timestamp: new Date(), service: context.service || "core" },
      isRetryable: false,
    });
  }

  /**
   * Handle the provided error
   */
  static async handle(error: BaseError) {
    for (const handler of this.handlers) {
      await handler(error.info);
    }
  }

  /**
   * Attempt to recover from an error
   */
  static async recover<T = unknown>(error: BaseError): Promise<T | null> {
    for (const recovery of this.recoveries) {
      const result = await recovery(error.info);
      if (result !== null && result !== undefined) {
        return result as T;
      }
    }
    return null;
  }
}

