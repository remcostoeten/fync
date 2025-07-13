import type { TApiResponse, TSuccessResponse, TErrorResponse } from '../types';

export function createSimpleResponse<T>(
  data: T, 
  success: boolean = true, 
  message?: string
): TApiResponse<T> {
  return {
    data,
    success,
    message,
    timestamp: new Date()
  };
}

export function createSuccessResponse<T>(data: T, message?: string): TSuccessResponse<T> {
  return {
    data,
    success: true,
    message,
    timestamp: new Date()
  };
}

export function createErrorResponse(
  error: string, 
  message: string, 
  statusCode: number = 500
): TErrorResponse {
  return {
    error,
    message,
    statusCode,
    timestamp: new Date()
  };
}

export function createDataResponse<T>(data: T): TApiResponse<T> {
  return createSimpleResponse(data, true);
}

export function createEmptyResponse(): TApiResponse<null> {
  return createSimpleResponse(null, true);
}
