export type { TBaseEntity } from './types/base-entity'
export type { TGitHubUser } from './types/github-user'
export type { TGitHubRepository } from './types/github-repository'

export { createHttpClient } from './services/http-client'
export type { THttpClientConfig, THttpResponse } from './services/http-client'

export { setCache, getCache, memoize } from './services/cache-service'

export { 
  filterUsers, 
  filterUsersByType, 
  filterUsersByFollowers, 
  filterUsersByPublicRepos, 
  filterUsersByLocation, 
  filterUsersByCompany 
} from './filters/user-filters'
export type { TUserFilterCriteria } from './filters/user-filters'

export { 
  filterRepositories,
  filterRepositoriesByLanguage,
  filterRepositoriesByForks,
  filterRepositoriesByStars,
  filterRepositoriesByWatchers,
  filterRepositoriesByTopics,
  filterRepositoriesByLicense
} from './filters/repository-filters'
export type { TRepositoryFilterCriteria } from './filters/repository-filters'

export { 
  buildSuccessResponse, 
  buildErrorResponse, 
  buildSingleItemResponse, 
  paginateData 
} from './builders/response-builder'
export type { TApiResponse, TErrorResponse, TResponseBuilderOptions } from './builders/response-builder'
