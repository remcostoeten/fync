function cacheServiceFactory() {
  const cache: Record<string, unknown> = {}

  function get(key: string): unknown {
    return cache[key]
  }

  function set(key: string, value: unknown): void {
    cache[key] = value
  }

  function remove(key: string): void {
    delete cache[key]
  }

  function clear(): void {
    for (const key in cache) {
      delete cache[key]
    }
  }

  return { get, set, remove, clear }
}

export { cacheServiceFactory }
