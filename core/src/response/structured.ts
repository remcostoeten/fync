import type { TListResponse, TPaginatedResponse, TApiResponse } from '../types';

export function createListResponse<T>(data: T[], total?: number): TListResponse<T> {
  return {
    data,
    total: total ?? data.length
  };
}

export function createPaginatedResponse<T>(
  data: T[], 
  total: number, 
  page: number, 
  perPage: number
): TPaginatedResponse<T> {
  return {
    data,
    total,
    page,
    perPage
  };
}

export function createBatchResponse<T>(
  successful: T[], 
  failed: Array<{ error: string; item: unknown }>
): TApiResponse<{ successful: T[]; failed: Array<{ error: string; item: unknown }> }> {
  return {
    data: {
      successful,
      failed
    },
    success: failed.length === 0,
    message: failed.length > 0 ? `${failed.length} items failed` : 'All items processed successfully',
    timestamp: new Date()
  };
}

export function createMetadataResponse<T>(
  data: T, 
  metadata: Record<string, unknown>
): TApiResponse<T> & { metadata: Record<string, unknown> } {
  return {
    data,
    success: true,
    metadata,
    timestamp: new Date()
  };
}
