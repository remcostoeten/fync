import type { TGitHubRepository } from '../types/github-repository'
import { httpRequestWithPagination } from './http-client'
import { memoize } from './cache-service'

type TFetchRepositoriesOpts = {
  type?: 'all' | 'owner' | 'member'
  sort?: 'created' | 'updated' | 'pushed' | 'full_name'
  direction?: 'asc' | 'desc'
  per_page?: number
  page?: number
  signal?: AbortSignal
}

async function fetchRepositoriesInternal(
  username: string, 
  opts: TFetchRepositoriesOpts = {}
): Promise<TGitHubRepository[]> {
  const { signal, ...queryParams } = opts
  
  const defaultParams = {
    type: 'all',
    sort: 'updated',
    direction: 'desc',
    per_page: 30,
    ...queryParams
  }
  
  const response = await httpRequestWithPagination<TGitHubRepository>(
    `https://api.github.com/users/${username}/repos`,
    defaultParams,
    signal
  )
  
  return response.data
}

function fetchRepositories(
  username: string, 
  opts: TFetchRepositoriesOpts = {}
): Promise<TGitHubRepository[]> {
  return memoizedFetchRepositories(username, opts)
}

const memoizedFetchRepositories = memoize(
  fetchRepositoriesInternal,
  (username: string, opts: TFetchRepositoriesOpts = {}) => {
    const { signal, ...cacheableOpts } = opts
    return `repos:${username}:${JSON.stringify(cacheableOpts)}`
  }
)

export { fetchRepositories }
export type { TFetchRepositoriesOpts }
