import { describe, it, expect } from 'vitest'
import {
  filterRepositoriesByLanguage,
  filterRepositoriesByForks,
  filterRepositoriesByStars,
  filterRepositoriesByWatchers,
  filterRepositoriesByTopics,
  filterRepositoriesByLicense,
  filterRepositories,
  filterRepositoriesByAdvancedCriteria
} from '../../packages/deify/src/filters/repository-filters'

const mockRepositories = [
  {
    name: 'repo1',
    language: 'JavaScript',
    forks_count: 10,
    stargazers_count: 50,
    watchers_count: 25,
    topics: ['topic1', 'topic2'],
    license: { key: 'MIT', name: 'MIT License', spdx_id: 'MIT', url: null },
    private: false,
    fork: false,
    archived: false,
    disabled: false,
    visibility: 'public' as const
  },
  {
    name: 'repo2',
    language: 'TypeScript',
    forks_count: 5,
    stargazers_count: 100,
    watchers_count: 50,
    topics: ['topic3'],
    license: { key: 'Apache-2.0', name: 'Apache License 2.0', spdx_id: 'Apache-2.0', url: null },
    private: true,
    fork: true,
    archived: true,
    disabled: false,
    visibility: 'private' as const
  },
  {
    name: 'repo3',
    language: null,
    forks_count: 0,
    stargazers_count: 0,
    watchers_count: 0,
    topics: [],
    license: null,
    private: false,
    fork: false,
    archived: false,
    disabled: true,
    visibility: 'public' as const
  }
]

describe('repository-filters', () => {
  describe('filterRepositoriesByLanguage', () => {
    it('should filter by language', () => {
      const result = filterRepositoriesByLanguage(mockRepositories, 'JavaScript')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('repo1')
    })

    it('should return empty array for non-existent language', () => {
      const result = filterRepositoriesByLanguage(mockRepositories, 'Python')
      expect(result).toHaveLength(0)
    })
  })

  describe('filterRepositoriesByForks', () => {
    it('should filter by minimum forks', () => {
      const result = filterRepositoriesByForks(mockRepositories, 5)
      expect(result).toHaveLength(2)
    })

    it('should filter by maximum forks', () => {
      const result = filterRepositoriesByForks(mockRepositories, undefined, 5)
      expect(result).toHaveLength(2)
    })

    it('should filter by forks range', () => {
      const result = filterRepositoriesByForks(mockRepositories, 6, 15)
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('repo1')
    })
  })

  describe('filterRepositoriesByStars', () => {
    it('should filter by minimum stars', () => {
      const result = filterRepositoriesByStars(mockRepositories, 50)
      expect(result).toHaveLength(2)
    })

    it('should filter by maximum stars', () => {
      const result = filterRepositoriesByStars(mockRepositories, undefined, 50)
      expect(result).toHaveLength(2)
    })

    it('should filter by stars range', () => {
      const result = filterRepositoriesByStars(mockRepositories, 20, 100)
      expect(result).toHaveLength(2)
    })
  })

  describe('filterRepositoriesByWatchers', () => {
    it('should filter by minimum watchers', () => {
      const result = filterRepositoriesByWatchers(mockRepositories, 30)
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('repo2')
    })

    it('should filter by maximum watchers', () => {
      const result = filterRepositoriesByWatchers(mockRepositories, undefined, 25)
      expect(result).toHaveLength(2)
    })
  })

  describe('filterRepositoriesByTopics', () => {
    it('should filter by topics', () => {
      const result = filterRepositoriesByTopics(mockRepositories, ['topic1', 'topic2'])
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('repo1')
    })

    it('should return empty array for non-existent topics', () => {
      const result = filterRepositoriesByTopics(mockRepositories, ['nonexistent'])
      expect(result).toHaveLength(0)
    })
  })

  describe('filterRepositoriesByLicense', () => {
    it('should filter by license', () => {
      const result = filterRepositoriesByLicense(mockRepositories, 'MIT')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('repo1')
    })

    it('should return empty array for non-existent license', () => {
      const result = filterRepositoriesByLicense(mockRepositories, 'GPL-3.0')
      expect(result).toHaveLength(0)
    })
  })

  describe('filterRepositories', () => {
    it('should filter by languages', () => {
      const result = filterRepositories(mockRepositories, { languages: ['JavaScript'] })
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('repo1')
    })

    it('should filter by names', () => {
      const result = filterRepositories(mockRepositories, { names: ['repo1', 'repo2'] })
      expect(result).toHaveLength(2)
    })

    it('should filter by visibility', () => {
      const result = filterRepositories(mockRepositories, { visibility: 'public' })
      expect(result).toHaveLength(2)
    })

    it('should filter by private flag', () => {
      const result = filterRepositories(mockRepositories, { isPrivate: true })
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('repo2')
    })

    it('should filter by fork flag', () => {
      const result = filterRepositories(mockRepositories, { isFork: false })
      expect(result).toHaveLength(2)
    })

    it('should filter by archived flag', () => {
      const result = filterRepositories(mockRepositories, { isArchived: false })
      expect(result).toHaveLength(2)
    })

    it('should filter by disabled flag', () => {
      const result = filterRepositories(mockRepositories, { isDisabled: true })
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('repo3')
    })

    it('should apply multiple filters', () => {
      const result = filterRepositories(mockRepositories, {
        languages: ['JavaScript'],
        isPrivate: false,
        starsMin: 10
      })
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('repo1')
    })
  })

  describe('filterRepositoriesByAdvancedCriteria', () => {
    it('should filter by single criterion', () => {
      const criteria = { language: 'TypeScript' }
      const result = filterRepositoriesByAdvancedCriteria(mockRepositories, criteria)
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('repo2')
    })

    it('should filter by multiple criteria', () => {
      const criteria = { language: 'TypeScript', minForks: 5, maxStars: 150 }
      const result = filterRepositoriesByAdvancedCriteria(mockRepositories, criteria)
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('repo2')
    })

    it('should return empty array when no repositories match criteria', () => {
      const criteria = { language: 'Python', minStars: 1000 }
      const result = filterRepositoriesByAdvancedCriteria(mockRepositories, criteria)
      expect(result).toHaveLength(0)
    })
  })
})

