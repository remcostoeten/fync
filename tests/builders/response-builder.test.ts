import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  buildSimple,
  buildStructured,
  buildFluent,
  buildSuccessResponse,
  buildErrorResponse,
  buildSingleItemResponse,
  paginateData
} from '../../src/builders/response-builder'

const mockUser = {
  id: 1,
  login: 'testuser',
  avatar_url: 'https://github.com/testuser.png',
  html_url: 'https://github.com/testuser',
  name: 'Test User',
  company: 'Test Company',
  blog: 'https://testuser.com',
  location: 'Test City',
  email: 'test@example.com',
  bio: 'Test bio',
  public_repos: 10,
  public_gists: 5,
  followers: 100,
  following: 50,
  type: 'User' as const,
  site_admin: false,
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z'
}

const mockRepositories = [
  {
    id: 1,
    name: 'repo1',
    full_name: 'testuser/repo1',
    private: false,
    html_url: 'https://github.com/testuser/repo1',
    description: 'Test repository 1',
    fork: false,
    language: 'JavaScript',
    forks_count: 10,
    stargazers_count: 50,
    watchers_count: 25,
    size: 1000,
    default_branch: 'main',
    open_issues_count: 5,
    topics: ['javascript', 'testing'],
    archived: false,
    disabled: false,
    visibility: 'public' as const,
    pushed_at: '2023-01-01T00:00:00Z',
    clone_url: 'https://github.com/testuser/repo1.git',
    ssh_url: 'git@github.com:testuser/repo1.git',
    homepage: null,
    license: null,
    owner: mockUser,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'repo2',
    full_name: 'testuser/repo2',
    private: false,
    html_url: 'https://github.com/testuser/repo2',
    description: 'Test repository 2',
    fork: false,
    language: 'TypeScript',
    forks_count: 5,
    stargazers_count: 25,
    watchers_count: 15,
    size: 500,
    default_branch: 'main',
    open_issues_count: 2,
    topics: ['typescript', 'testing'],
    archived: false,
    disabled: false,
    visibility: 'public' as const,
    pushed_at: '2023-01-01T00:00:00Z',
    clone_url: 'https://github.com/testuser/repo2.git',
    ssh_url: 'git@github.com:testuser/repo2.git',
    homepage: null,
    license: null,
    owner: mockUser,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  }
]

describe('response-builder', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2023-01-01T00:00:00Z'))
  })

  describe('buildSimple', () => {
    it('should build simple response', () => {
      const result = buildSimple(mockUser, mockRepositories)
      
      expect(result).toEqual({
        user: mockUser,
        repos: mockRepositories
      })
    })
  })

  describe('buildStructured', () => {
    it('should build structured response with metadata', () => {
      const result = buildStructured(mockUser, mockRepositories)
      
      expect(result).toEqual({
        metadata: {
          fetchedAt: '2023-01-01T00:00:00.000Z',
          repoCount: 2
        },
        data: {
          user: mockUser,
          repos: mockRepositories
        }
      })
    })
  })

  describe('buildFluent', () => {
    it('should build fluent response', () => {
      const result = buildFluent(mockUser, mockRepositories)
      
      expect(result).toHaveProperty('getUser')
      expect(result).toHaveProperty('filterRepos')
      expect(result).toHaveProperty('value')
    })

    it('should return user from getUser', () => {
      const result = buildFluent(mockUser, mockRepositories)
      
      expect(result.getUser()).toEqual(mockUser)
    })

    it('should filter repositories', () => {
      const result = buildFluent(mockUser, mockRepositories)
      
      const filtered = result.filterRepos(repo => repo.language === 'JavaScript')
      expect(filtered).toBe(result)
      
      const value = result.value()
      expect(value.repos).toHaveLength(1)
      expect(value.repos[0].language).toBe('JavaScript')
    })

    it('should chain multiple filters', () => {
      const result = buildFluent(mockUser, mockRepositories)
      
      const filtered = result
        .filterRepos(repo => repo.stargazers_count > 20)
        .filterRepos(repo => repo.language === 'JavaScript')
      
      expect(filtered).toBe(result)
      
      const value = result.value()
      expect(value.repos).toHaveLength(1)
      expect(value.repos[0].name).toBe('repo1')
    })

    it('should return original user in value', () => {
      const result = buildFluent(mockUser, mockRepositories)
      
      const value = result.value()
      expect(value.user).toEqual(mockUser)
    })
  })

  describe('buildSuccessResponse', () => {
    it('should build success response with default options', () => {
      const data = ['item1', 'item2']
      const result = buildSuccessResponse(data)
      
      expect(result).toEqual({
        data,
        meta: {
          total: 2,
          page: 1,
          per_page: 30,
          total_pages: 1
        },
        links: {
          first: '?page=1&per_page=30',
          last: '?page=1&per_page=30',
          prev: null,
          next: null
        }
      })
    })

    it('should build success response with custom options', () => {
      const data = ['item1', 'item2']
      const options = {
        baseUrl: 'https://api.example.com/data',
        page: 2,
        per_page: 1,
        total: 5
      }
      const result = buildSuccessResponse(data, options)
      
      expect(result).toEqual({
        data,
        meta: {
          total: 5,
          page: 2,
          per_page: 1,
          total_pages: 5
        },
        links: {
          first: 'https://api.example.com/data?page=1&per_page=1',
          last: 'https://api.example.com/data?page=5&per_page=1',
          prev: 'https://api.example.com/data?page=1&per_page=1',
          next: 'https://api.example.com/data?page=3&per_page=1'
        }
      })
    })

    it('should handle empty data', () => {
      const result = buildSuccessResponse([])
      
      expect(result.meta.total).toBe(0)
      expect(result.meta.total_pages).toBe(0)
      expect(result.links.first).toBe(null)
      expect(result.links.last).toBe(null)
    })

    it('should handle last page', () => {
      const data = ['item1']
      const options = {
        page: 3,
        per_page: 1,
        total: 3
      }
      const result = buildSuccessResponse(data, options)
      
      expect(result.links.next).toBe(null)
      expect(result.links.prev).toBe('?page=2&per_page=1')
    })

    it('should handle first page', () => {
      const data = ['item1']
      const options = {
        page: 1,
        per_page: 1,
        total: 3
      }
      const result = buildSuccessResponse(data, options)
      
      expect(result.links.prev).toBe(null)
      expect(result.links.next).toBe('?page=2&per_page=1')
    })
  })

  describe('buildErrorResponse', () => {
    it('should build error response', () => {
      const result = buildErrorResponse('Not found', 'NOT_FOUND')
      
      expect(result).toEqual({
        error: {
          message: 'Not found',
          code: 'NOT_FOUND',
          details: undefined
        }
      })
    })

    it('should build error response with details', () => {
      const details = { field: 'username', value: 'invalid' }
      const result = buildErrorResponse('Validation error', 'VALIDATION_ERROR', details)
      
      expect(result).toEqual({
        error: {
          message: 'Validation error',
          code: 'VALIDATION_ERROR',
          details
        }
      })
    })
  })

  describe('buildSingleItemResponse', () => {
    it('should build single item response', () => {
      const data = { id: 1, name: 'test' }
      const result = buildSingleItemResponse(data)
      
      expect(result).toEqual({ data })
    })
  })

  describe('paginateData', () => {
    it('should paginate data correctly', () => {
      const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      
      const page1 = paginateData(data, 1, 3)
      expect(page1).toEqual([1, 2, 3])
      
      const page2 = paginateData(data, 2, 3)
      expect(page2).toEqual([4, 5, 6])
      
      const page3 = paginateData(data, 3, 3)
      expect(page3).toEqual([7, 8, 9])
      
      const page4 = paginateData(data, 4, 3)
      expect(page4).toEqual([10])
    })

    it('should handle empty data', () => {
      const result = paginateData([], 1, 10)
      expect(result).toEqual([])
    })

    it('should handle page beyond data length', () => {
      const data = [1, 2, 3]
      const result = paginateData(data, 2, 10)
      expect(result).toEqual([])
    })
  })
})
