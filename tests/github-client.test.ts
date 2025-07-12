import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createGitHubClient } from '../src/services/github-client'

describe('GitHub Chainable Client', () => {
  let mockFetch: any

  beforeEach(() => {
    mockFetch = vi.fn()
    global.fetch = mockFetch
  })

  describe('path building', () => {
    it('should build correct paths for chained properties', () => {
      const client = createGitHubClient()
      
      expect(client.users.octocat.path()).toBe('/users/octocat')
      expect(client.repos.facebook.react.path()).toBe('/repos/facebook/react')
      expect(client.orgs.microsoft.teams.path()).toBe('/orgs/microsoft/teams')
      expect(client.gists['123'].comments.path()).toBe('/gists/123/comments')
    })

    it('should handle deeply nested paths', () => {
      const client = createGitHubClient()
      
      const deepPath = client.repos.owner.repo.issues['123'].comments['456'].reactions
      expect(deepPath.path()).toBe('/repos/owner/repo/issues/123/comments/456/reactions')
    })
  })

  describe('request methods', () => {
    it('should make GET requests', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        json: async () => ({ data: 'test' })
      })

      const client = createGitHubClient()
      const result = await client.users.octocat.get()

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.github.com/users/octocat',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'github-api-service'
          })
        })
      )
      expect(result).toEqual({ data: 'test' })
    })

    it('should include auth token if provided', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        json: async () => ({ data: 'test' })
      })

      const client = createGitHubClient({ token: 'test-token' })
      await client.users.octocat.get()

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.github.com/users/octocat',
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token'
          })
        })
      )
    })

    it('should handle query parameters', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        json: async () => ({ data: 'test' })
      })

      const client = createGitHubClient()
      await client.users.octocat.repos.get({
        params: { per_page: 50, sort: 'updated' }
      })

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.github.com/users/octocat/repos?per_page=50&sort=updated',
        expect.any(Object)
      )
    })
  })

  describe('pagination', () => {
    it('should handle paginated requests', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers({
          'link': '<https://api.github.com/next>; rel="next"'
        }),
        json: async () => [{ id: 1 }, { id: 2 }]
      })

      const client = createGitHubClient()
      const result = await client.users.octocat.repos.paginate()

      expect(result).toEqual([{ id: 1 }, { id: 2 }])
    })

    it('should fetch all pages when allPages is true', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          statusText: 'OK',
          headers: new Headers({
            'link': '<https://api.github.com/page2>; rel="next"'
          }),
          json: async () => [{ id: 1 }, { id: 2 }]
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          statusText: 'OK',
          headers: new Headers(),
          json: async () => [{ id: 3 }, { id: 4 }]
        })

      const client = createGitHubClient()
      const result = await client.users.octocat.repos.get({ allPages: true })

      expect(result).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }])
      expect(mockFetch).toHaveBeenCalledTimes(2)
    })
  })

  describe('caching', () => {
    it('should cache GET requests by default', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        json: async () => ({ data: 'test' })
      })

      const client = createGitHubClient()
      
      // First call
      await client.users.octocat.get()
      // Second call
      await client.users.octocat.get()

      // Should only fetch once due to caching
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })

    it('should bypass cache when cache is false', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        json: async () => ({ data: 'test' })
      })

      const client = createGitHubClient()
      
      // First call
      await client.users.octocat.get()
      // Second call with cache disabled
      await client.users.octocat.get({ cache: false })

      // Should fetch twice
      expect(mockFetch).toHaveBeenCalledTimes(2)
    })
  })
})
