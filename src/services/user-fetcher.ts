import type { TGitHubUser } from '../types/github-user'
import { httpRequest } from './http-client'
import { memoize } from './cache-service'

type TFetchUserOpts = {
  signal?: AbortSignal
}

async function fetchUserInternal(
  username: string,
  opts: TFetchUserOpts = {}
): Promise<TGitHubUser> {
  const response = await httpRequest<TGitHubUser>(
    `https://api.github.com/users/${username}`,
    undefined,
    opts.signal
  )

  return response.data
}

function fetchUser(
  username: string,
  opts: TFetchUserOpts = {}
): Promise<TGitHubUser> {
  return memoizedFetchUser(username, opts)
}

const memoizedFetchUser = memoize(
  fetchUserInternal,
  (username: string, opts: TFetchUserOpts = {}) => `user:${username}`
)

export { fetchUser }
export type { TFetchUserOpts }
