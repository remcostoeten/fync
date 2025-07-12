type TCacheEntry = {
  data: unknown
  timeoutId: NodeJS.Timeout
}

type TFetcher<T> = (...args: unknown[]) => Promise<T>

const cache = new Map<string, TCacheEntry>()
const memoizedFetchers = new Map<string, TFetcher<unknown>>()

function setCache(key: string, data: unknown, ttlMs: number): void {
  const existingEntry = cache.get(key)
  if (existingEntry) {
    clearTimeout(existingEntry.timeoutId)
  }

  const timeoutId = setTimeout(() => {
    cache.delete(key)
  }, ttlMs)

  cache.set(key, { data, timeoutId })
}

function getCache(key: string): unknown {
  const entry = cache.get(key)
  return entry ? entry.data : undefined
}

function memoize<T>(
  fetcher: TFetcher<T>,
  keyGenerator: (...args: unknown[]) => string
): TFetcher<T> {
  return async (...args: unknown[]): Promise<T> => {
    const key = keyGenerator(...args)
    const cachedData = getCache(key)

    if (cachedData !== undefined) {
      return cachedData as T
    }

    const result = await fetcher(...args)
    setCache(key, result, 300000) // 5 minutes default TTL
    return result
  }
}

export { setCache, getCache, memoize }
