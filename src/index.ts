export type { TBaseEntity } from './types/base-entity'
export type { TGitHubUser } from './types/github-user'
export type { TGitHubRepository } from './types/github-repository'

export { createHttpClient } from './services/http-client'
export type { THttpClientConfig, THttpResponse } from './services/http-client'

export { setCache, getCache, memoize } from './services/cache-service'

export { fetchUser } from './services/user-fetcher'
export type { TFetchUserOpts } from './services/user-fetcher'

export { fetchRepositories } from './services/repo-fetcher'
export type { TFetchRepositoriesOpts } from './services/repo-fetcher'

export {
  filterUsers,
  filterUserFields,
  filterUsersByType,
  filterUsersByFollowers,
  filterUsersByPublicRepos,
  filterUsersByLocation,
  filterUsersByCompany,
} from './filters/user-filters'
export type {
  TUserFilterCriteria,
  TUserFieldFilter,
} from './filters/user-filters'

export {
  filterRepositories,
  filterRepositoriesByAdvancedCriteria,
  filterRepositoriesByLanguage,
  filterRepositoriesByForks,
  filterRepositoriesByStars,
  filterRepositoriesByWatchers,
  filterRepositoriesByTopics,
  filterRepositoriesByLicense,
} from './filters/repository-filters'
export type {
  TRepositoryFilterCriteria,
  TRepositoryFilterOptions,
} from './filters/repository-filters'

export {
  buildSuccessResponse,
  buildErrorResponse,
  buildSingleItemResponse,
  paginateData,
  buildSimple,
  buildStructured,
  buildFluent,
} from './builders/response-builder'
export type {
  TApiResponse,
  TErrorResponse,
  TResponseBuilderOptions,
  TSimpleResponse,
  TStructuredResponse,
  TFluentResponse,
} from './builders/response-builder'

type TFetchGitHubDataOptions = {
  format?: 'simple' | 'structured' | 'fluent'
  filters?: ((repos: TGitHubRepository[]) => TGitHubRepository[])
}

function fetchGitHubData(username: string, options: TFetchGitHubDataOptions = {}) {
  const { format = 'simple', filters } = options
  
  return async function() {
    const user = await fetchUser(username)
    let repos = await fetchRepositories(username)
    
    if (filters) {
      repos = filters(repos)
    }
    
    switch (format) {
      case 'structured':
        return buildStructured(user, repos)
      case 'fluent':
        return buildFluent(user, repos)
      case 'simple':
      default:
        return buildSimple(user, repos)
    }
  }
}

export { fetchGitHubData }
export type { TFetchGitHubDataOptions }
