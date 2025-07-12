type THttpClientConfig = {
  baseURL: string
  headers?: Record<string, string>
  timeout?: number
}

type THttpResponse<T = unknown> = {
  data: T
  status: number
  statusText: string
  headers: Record<string, string>
}

function createHttpClient(config: THttpClientConfig) {
  return {
    async get<T = unknown>(url: string, options?: RequestInit): Promise<THttpResponse<T>> {
      const response = await fetch(`${config.baseURL}${url}`, {
        method: 'GET',
        headers: {
          ...config.headers,
          ...options?.headers,
        },
        ...options,
      })

      const data = await response.json()

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      }
    },

    async post<T = unknown>(url: string, body?: unknown, options?: RequestInit): Promise<THttpResponse<T>> {
      const response = await fetch(`${config.baseURL}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...config.headers,
          ...options?.headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        ...options,
      })

      const data = await response.json()

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      }
    },
  }
}

export { createHttpClient }
export type { THttpClientConfig, THttpResponse }
