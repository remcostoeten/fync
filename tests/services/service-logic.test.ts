import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('service-logic', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  describe('cache functionality', () => {
    const cache = new Map()

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

    beforeEach(() => {
      cache.clear()
    })

    it('should store and retrieve data', () => {
      const testData = { test: 'data' }
      setCache('test-key', testData, 1000)
      
      const cachedData = getCache('test-key')
      expect(cachedData).toEqual(testData)
    })

    it('should return undefined for non-existent key', () => {
      const cachedData = getCache('non-existent-key')
      expect(cachedData).toBeUndefined()
    })

    it('should expire cache after ttl', () => {
      const testData = { test: 'data' }
      setCache('test-key', testData, 1000)
      
      expect(getCache('test-key')).toEqual(testData)
      
      vi.advanceTimersByTime(1001)
      
      expect(getCache('test-key')).toBeUndefined()
    })
  })

  describe('http client functionality', () => {
    function parseLinkHeader(linkHeader: string): Record<string, string> {
      const links: Record<string, string> = {}
      const parts = linkHeader.split(',')

      for (const part of parts) {
        const section = part.split(';')
        if (section.length !== 2) continue

        const url = section[0].replace(/<(.*)>/, '$1').trim()
        const name = section[1].replace(/rel="(.*)"/, '$1').trim()
        links[name] = url
      }

      return links
    }

    function createAuthHeaders(): Record<string, string> {
      const headers: Record<string, string> = {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'github-api-service',
      }

      if (process.env.GITHUB_TOKEN) {
        headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
      }

      return headers
    }

    it('should parse link header correctly', () => {
      const linkHeader = '<https://api.github.com/test?page=2>; rel="next", <https://api.github.com/test?page=5>; rel="last"'
      const result = parseLinkHeader(linkHeader)
      
      expect(result).toEqual({
        next: 'https://api.github.com/test?page=2',
        last: 'https://api.github.com/test?page=5'
      })
    })

    it('should create auth headers without token', () => {
      const originalToken = process.env.GITHUB_TOKEN
      delete process.env.GITHUB_TOKEN
      
      const headers = createAuthHeaders()
      
      expect(headers).toEqual({
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'github-api-service'
      })
      
      process.env.GITHUB_TOKEN = originalToken
    })

    it('should create auth headers with token', () => {
      const originalToken = process.env.GITHUB_TOKEN
      process.env.GITHUB_TOKEN = 'test-token'
      
      const headers = createAuthHeaders()
      
      expect(headers).toEqual({
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'github-api-service',
        Authorization: 'Bearer test-token'
      })
      
      process.env.GITHUB_TOKEN = originalToken
    })
  })

  describe('memoization functionality', () => {
    function memoize<T>(
      fetcher: (...args: unknown[]) => Promise<T>,
      keyGenerator: (...args: unknown[]) => string
    ): (...args: unknown[]) => Promise<T> {
      const cache = new Map<string, T>()
      
      return async (...args: unknown[]): Promise<T> => {
        const key = keyGenerator(...args)
        
        if (cache.has(key)) {
          return cache.get(key)!
        }
        
        const result = await fetcher(...args)
        cache.set(key, result)
        return result
      }
    }

    it('should memoize function results', async () => {
      const mockFetcher = vi.fn().mockResolvedValue('result')
      const keyGenerator = vi.fn().mockReturnValue('cache-key')
      
      const memoizedFetcher = memoize(mockFetcher, keyGenerator)
      
      const result1 = await memoizedFetcher('arg1')
      const result2 = await memoizedFetcher('arg1')
      
      expect(result1).toBe('result')
      expect(result2).toBe('result')
      expect(mockFetcher).toHaveBeenCalledTimes(1)
      expect(keyGenerator).toHaveBeenCalledTimes(2)
    })

    it('should call fetcher again for different cache keys', async () => {
      const mockFetcher = vi.fn()
        .mockResolvedValueOnce('result1')
        .mockResolvedValueOnce('result2')
      
      const keyGenerator = vi.fn()
        .mockReturnValueOnce('cache-key1')
        .mockReturnValueOnce('cache-key2')
      
      const memoizedFetcher = memoize(mockFetcher, keyGenerator)
      
      const result1 = await memoizedFetcher('arg1')
      const result2 = await memoizedFetcher('arg2')
      
      expect(result1).toBe('result1')
      expect(result2).toBe('result2')
      expect(mockFetcher).toHaveBeenCalledTimes(2)
    })
  })
})
