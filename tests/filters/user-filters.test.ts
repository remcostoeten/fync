import { describe, it, expect } from 'vitest'
import {
  filterUsersByType,
  filterUsersByFollowers,
  filterUsersByPublicRepos,
  filterUsersByLocation,
  filterUsersByCompany,
  filterUserFields,
  filterUsers
} from '../../packages/deify/src/filters/user-filters'

const mockUsers = [
  {
    id: 1,
    login: 'user1',
    avatar_url: 'https://github.com/user1.png',
    html_url: 'https://github.com/user1',
    name: 'User One',
    company: 'Company A',
    blog: 'https://user1.com',
    location: 'New York',
    email: 'user1@example.com',
    bio: 'Developer',
    public_repos: 10,
    public_gists: 5,
    followers: 100,
    following: 50,
    type: 'User' as const,
    site_admin: false,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 2,
    login: 'org1',
    avatar_url: 'https://github.com/org1.png',
    html_url: 'https://github.com/org1',
    name: 'Organization One',
    company: null,
    blog: null,
    location: 'San Francisco',
    email: null,
    bio: null,
    public_repos: 50,
    public_gists: 0,
    followers: 1000,
    following: 0,
    type: 'Organization' as const,
    site_admin: false,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 3,
    login: 'user2',
    avatar_url: 'https://github.com/user2.png',
    html_url: 'https://github.com/user2',
    name: 'User Two',
    company: 'Company B',
    blog: 'https://user2.com',
    location: 'Los Angeles',
    email: 'user2@example.com',
    bio: 'Designer',
    public_repos: 5,
    public_gists: 2,
    followers: 25,
    following: 75,
    type: 'User' as const,
    site_admin: false,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  }
]

describe('user-filters', () => {
  describe('filterUsersByType', () => {
    it('should filter by User type', () => {
      const result = filterUsersByType(mockUsers, 'User')
      expect(result).toHaveLength(2)
      expect(result.every(user => user.type === 'User')).toBe(true)
    })

    it('should filter by Organization type', () => {
      const result = filterUsersByType(mockUsers, 'Organization')
      expect(result).toHaveLength(1)
      expect(result[0].login).toBe('org1')
    })
  })

  describe('filterUsersByFollowers', () => {
    it('should filter by minimum followers', () => {
      const result = filterUsersByFollowers(mockUsers, 50)
      expect(result).toHaveLength(2)
      expect(result.every(user => user.followers >= 50)).toBe(true)
    })

    it('should filter by maximum followers', () => {
      const result = filterUsersByFollowers(mockUsers, undefined, 100)
      expect(result).toHaveLength(2)
      expect(result.every(user => user.followers <= 100)).toBe(true)
    })

    it('should filter by followers range', () => {
      const result = filterUsersByFollowers(mockUsers, 50, 500)
      expect(result).toHaveLength(1)
      expect(result[0].login).toBe('user1')
    })
  })

  describe('filterUsersByPublicRepos', () => {
    it('should filter by minimum public repos', () => {
      const result = filterUsersByPublicRepos(mockUsers, 10)
      expect(result).toHaveLength(2)
      expect(result.every(user => user.public_repos >= 10)).toBe(true)
    })

    it('should filter by maximum public repos', () => {
      const result = filterUsersByPublicRepos(mockUsers, undefined, 10)
      expect(result).toHaveLength(2)
      expect(result.every(user => user.public_repos <= 10)).toBe(true)
    })

    it('should filter by public repos range', () => {
      const result = filterUsersByPublicRepos(mockUsers, 6, 20)
      expect(result).toHaveLength(1)
      expect(result[0].login).toBe('user1')
    })
  })

  describe('filterUsersByLocation', () => {
    it('should filter by exact location match', () => {
      const result = filterUsersByLocation(mockUsers, 'New York')
      expect(result).toHaveLength(1)
      expect(result[0].login).toBe('user1')
    })

    it('should filter by partial location match', () => {
      const result = filterUsersByLocation(mockUsers, 'san')
      expect(result).toHaveLength(1)
      expect(result[0].login).toBe('org1')
    })

    it('should be case insensitive', () => {
      const result = filterUsersByLocation(mockUsers, 'NEW YORK')
      expect(result).toHaveLength(1)
      expect(result[0].login).toBe('user1')
    })
  })

  describe('filterUsersByCompany', () => {
    it('should filter by exact company match', () => {
      const result = filterUsersByCompany(mockUsers, 'Company A')
      expect(result).toHaveLength(1)
      expect(result[0].login).toBe('user1')
    })

    it('should filter by partial company match', () => {
      const result = filterUsersByCompany(mockUsers, 'company')
      expect(result).toHaveLength(2)
    })

    it('should be case insensitive', () => {
      const result = filterUsersByCompany(mockUsers, 'COMPANY A')
      expect(result).toHaveLength(1)
      expect(result[0].login).toBe('user1')
    })
  })

  describe('filterUserFields', () => {
    it('should include only specified fields', () => {
      const result = filterUserFields(mockUsers[0], { include: ['login', 'name', 'email'] })
      expect(Object.keys(result)).toEqual(['login', 'name', 'email'])
      expect(result.login).toBe('user1')
      expect(result.name).toBe('User One')
      expect(result.email).toBe('user1@example.com')
    })

    it('should exclude specified fields', () => {
      const result = filterUserFields(mockUsers[0], { exclude: ['email', 'bio'] })
      expect(result).not.toHaveProperty('email')
      expect(result).not.toHaveProperty('bio')
      expect(result.login).toBe('user1')
      expect(result.name).toBe('User One')
    })

    it('should throw error when both include and exclude are specified', () => {
      expect(() => {
        filterUserFields(mockUsers[0], { include: ['login'], exclude: ['email'] })
      }).toThrow('Cannot specify both include and exclude filters')
    })

    it('should return original user when no filters are specified', () => {
      const result = filterUserFields(mockUsers[0], {})
      expect(result).toEqual(mockUsers[0])
    })
  })

  describe('filterUsers', () => {
    it('should filter by type', () => {
      const result = filterUsers(mockUsers, { type: 'User' })
      expect(result).toHaveLength(2)
      expect(result.every(user => user.type === 'User')).toBe(true)
    })

    it('should filter by followers range', () => {
      const result = filterUsers(mockUsers, { minFollowers: 50, maxFollowers: 500 })
      expect(result).toHaveLength(1)
      expect(result[0].login).toBe('user1')
    })

    it('should filter by public repos range', () => {
      const result = filterUsers(mockUsers, { minPublicRepos: 10 })
      expect(result).toHaveLength(2)
    })

    it('should filter by location', () => {
      const result = filterUsers(mockUsers, { location: 'New York' })
      expect(result).toHaveLength(1)
      expect(result[0].login).toBe('user1')
    })

    it('should filter by company', () => {
      const result = filterUsers(mockUsers, { company: 'Company A' })
      expect(result).toHaveLength(1)
      expect(result[0].login).toBe('user1')
    })

    it('should filter by bio presence', () => {
      const result = filterUsers(mockUsers, { hasBio: true })
      expect(result).toHaveLength(2)
      expect(result.every(user => user.bio !== null)).toBe(true)
    })

    it('should filter by bio absence', () => {
      const result = filterUsers(mockUsers, { hasBio: false })
      expect(result).toHaveLength(1)
      expect(result[0].login).toBe('org1')
    })

    it('should filter by email presence', () => {
      const result = filterUsers(mockUsers, { hasEmail: true })
      expect(result).toHaveLength(2)
      expect(result.every(user => user.email !== null)).toBe(true)
    })

    it('should filter by email absence', () => {
      const result = filterUsers(mockUsers, { hasEmail: false })
      expect(result).toHaveLength(1)
      expect(result[0].login).toBe('org1')
    })

    it('should apply multiple filters', () => {
      const result = filterUsers(mockUsers, {
        type: 'User',
        minFollowers: 50,
        hasEmail: true
      })
      expect(result).toHaveLength(1)
      expect(result[0].login).toBe('user1')
    })

    it('should return empty array when no users match criteria', () => {
      const result = filterUsers(mockUsers, {
        type: 'User',
        minFollowers: 2000
      })
      expect(result).toHaveLength(0)
    })
  })
})
