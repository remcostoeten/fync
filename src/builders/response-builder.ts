type TApiResponse<T = unknown> = {
  data: T
  meta: {
    total: number
    page: number
    per_page: number
    total_pages: number
  }
  links: {
    first: string | null
    last: string | null
    prev: string | null
    next: string | null
  }
}

type TErrorResponse = {
  error: {
    message: string
    code: string
    details?: Record<string, unknown>
  }
}

type TResponseBuilderOptions = {
  baseUrl?: string
  page?: number
  per_page?: number
  total?: number
}

function buildSuccessResponse<T>(
  data: T[], 
  options: TResponseBuilderOptions = {}
): TApiResponse<T[]> {
  const { baseUrl = '', page = 1, per_page = 30, total = data.length } = options
  const total_pages = Math.ceil(total / per_page)

  return {
    data,
    meta: {
      total,
      page,
      per_page,
      total_pages,
    },
    links: {
      first: total_pages > 0 ? `${baseUrl}?page=1&per_page=${per_page}` : null,
      last: total_pages > 0 ? `${baseUrl}?page=${total_pages}&per_page=${per_page}` : null,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}&per_page=${per_page}` : null,
      next: page < total_pages ? `${baseUrl}?page=${page + 1}&per_page=${per_page}` : null,
    },
  }
}

function buildErrorResponse(
  message: string, 
  code: string, 
  details?: Record<string, unknown>
): TErrorResponse {
  return {
    error: {
      message,
      code,
      details,
    },
  }
}

function buildSingleItemResponse<T>(data: T): { data: T } {
  return { data }
}

function paginateData<T>(data: T[], page: number, per_page: number): T[] {
  const startIndex = (page - 1) * per_page
  const endIndex = startIndex + per_page
  return data.slice(startIndex, endIndex)
}

export { 
  buildSuccessResponse, 
  buildErrorResponse, 
  buildSingleItemResponse, 
  paginateData 
}
export type { TApiResponse, TErrorResponse, TResponseBuilderOptions }
