import type { TGitHubRepository } from '../types/github-repository'

type TRepositoryFilterCriteria = {
  language?: string
  minForks?: number
  maxForks?: number
  minStars?: number
  maxStars?: number
  minWatchers?: number
  maxWatchers?: number
  topics?: string[]
  license?: string
  isPrivate?: boolean
  isFork?: boolean
  isArchived?: boolean
  isDisabled?: boolean
  visibility?: 'public' | 'private' | 'internal'
}

function filterRepositoriesByLanguage(repos: TGitHubRepository[], language: string): TGitHubRepository[] {
  return repos.filter(repo => repo.language === language)
}

function filterRepositoriesByForks(repos: TGitHubRepository[], min?: number, max?: number): TGitHubRepository[] {
  return repos.filter(repo => {
    if (min !== undefined && repo.forks_count < min) return false
    if (max !== undefined && repo.forks_count > max) return false
    return true
  })
}

function filterRepositoriesByStars(repos: TGitHubRepository[], min?: number, max?: number): TGitHubRepository[] {
  return repos.filter(repo => {
    if (min !== undefined && repo.stargazers_count < min) return false
    if (max !== undefined && repo.stargazers_count > max) return false
    return true
  })
}

function filterRepositoriesByWatchers(repos: TGitHubRepository[], min?: number, max?: number): TGitHubRepository[] {
  return repos.filter(repo => {
    if (min !== undefined && repo.watchers_count < min) return false
    if (max !== undefined && repo.watchers_count > max) return false
    return true
  })
}

function filterRepositoriesByTopics(repos: TGitHubRepository[], topics: string[]): TGitHubRepository[] {
  return repos.filter(repo => 
    topics.every(topic => repo.topics.includes(topic))
  )
}

function filterRepositoriesByLicense(repos: TGitHubRepository[], license: string): TGitHubRepository[] {
  return repos.filter(repo => repo.license?.key === license)
}

function filterRepositories(repos: TGitHubRepository[], criteria: TRepositoryFilterCriteria): TGitHubRepository[] {
  let filteredRepos = repos

  if (criteria.language) {
    filteredRepos = filterRepositoriesByLanguage(filteredRepos, criteria.language)
  }

  if (criteria.minForks !== undefined || criteria.maxForks !== undefined) {
    filteredRepos = filterRepositoriesByForks(filteredRepos, criteria.minForks, criteria.maxForks)
  }

  if (criteria.minStars !== undefined || criteria.maxStars !== undefined) {
    filteredRepos = filterRepositoriesByStars(filteredRepos, criteria.minStars, criteria.maxStars)
  }

  if (criteria.minWatchers !== undefined || criteria.maxWatchers !== undefined) {
    filteredRepos = filterRepositoriesByWatchers(filteredRepos, criteria.minWatchers, criteria.maxWatchers)
  }

  if (criteria.topics) {
    filteredRepos = filterRepositoriesByTopics(filteredRepos, criteria.topics)
  }

  if (criteria.license) {
    filteredRepos = filterRepositoriesByLicense(filteredRepos, criteria.license)
  }

  if (criteria.isPrivate !== undefined) {
    filteredRepos = filteredRepos.filter(repo => 
      criteria.isPrivate ? repo.private : !repo.private
    )
  }

  if (criteria.isFork !== undefined) {
    filteredRepos = filteredRepos.filter(repo => 
      criteria.isFork ? repo.fork : !repo.fork
    )
  }

  if (criteria.isArchived !== undefined) {
    filteredRepos = filteredRepos.filter(repo => 
      criteria.isArchived ? repo.archived : !repo.archived
    )
  }

  if (criteria.isDisabled !== undefined) {
    filteredRepos = filteredRepos.filter(repo => 
      criteria.isDisabled ? repo.disabled : !repo.disabled
    )
  }

  if (criteria.visibility) {
    filteredRepos = filteredRepos.filter(repo => 
      repo.visibility === criteria.visibility
    )
  }

  return filteredRepos
}

export { 
  filterRepositories,
  filterRepositoriesByLanguage,
  filterRepositoriesByForks,
  filterRepositoriesByStars,
  filterRepositoriesByWatchers,
  filterRepositoriesByTopics,
  filterRepositoriesByLicense
}
export type { TRepositoryFilterCriteria }
