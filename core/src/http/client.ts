import type { THttpConfig, TRequestConfig, THttpResponse, THttpError, THttpMethod } from './types';

function createFetchAdapter() {
  if (typeof fetch !== 'undefined') {
    return fetch;
  }
  
  try {
    const { fetch: undici } = require('undici');
    return undici;
  } catch {
    try {
      const nodeFetch = require('node-fetch');
      return nodeFetch.default || nodeFetch;
    } catch {
      throw new Error('No fetch implementation available. Please install undici or node-fetch.');
    }
  }
}

export function createHttpClient(config: THttpConfig = {}) {
  const fetchImpl = createFetchAdapter();
  
  async function request<T = unknown>(
    url: string, 
    requestConfig: TRequestConfig = {}
  ): Promise<THttpResponse<T>> {
    const fullUrl = config.baseURL ? new URL(url, config.baseURL).toString() : url;
    
    const controller = new AbortController();
    let timeoutId: NodeJS.Timeout | undefined;
    
    if (config.timeout || requestConfig.timeout) {
      const timeout = requestConfig.timeout || config.timeout || 5000;
      timeoutId = setTimeout(() => controller.abort(), timeout);
    }
    
    const headers = {
      'Content-Type': 'application/json',
      ...config.headers,
      ...requestConfig.headers
    };
    
    const fetchConfig: RequestInit = {
      method: requestConfig.method || 'GET',
      headers,
      body: requestConfig.body,
      signal: requestConfig.signal || controller.signal
    };
    
    try {
      const response = await fetchImpl(fullUrl, fetchConfig);
      
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value: string, key: string) => {
        responseHeaders[key] = value;
      });
      
      let data: T;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text() as T;
      }
      
      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        ok: response.ok
      };
    } catch (error) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      const httpError: THttpError = {
        message: error instanceof Error ? error.message : 'Unknown error',
        code: error instanceof Error ? error.name : 'UNKNOWN_ERROR'
      };
      
      throw httpError;
    }
  }
  
  async function get<T = unknown>(url: string, config?: TRequestConfig): Promise<THttpResponse<T>> {
    return request<T>(url, { ...config, method: 'GET' });
  }
  
  async function post<T = unknown>(url: string, data?: unknown, config?: TRequestConfig): Promise<THttpResponse<T>> {
    return request<T>(url, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
    });
  }
  
  async function put<T = unknown>(url: string, data?: unknown, config?: TRequestConfig): Promise<THttpResponse<T>> {
    return request<T>(url, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined
    });
  }
  
  async function patch<T = unknown>(url: string, data?: unknown, config?: TRequestConfig): Promise<THttpResponse<T>> {
    return request<T>(url, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined
    });
  }
  
  async function del<T = unknown>(url: string, config?: TRequestConfig): Promise<THttpResponse<T>> {
    return request<T>(url, { ...config, method: 'DELETE' });
  }
  
  return {
    request,
    get,
    post,
    put,
    patch,
    delete: del
  };
}
