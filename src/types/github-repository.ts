import type { TBaseEntity } from './base-entity'
import type { TGitHubUser } from './github-user'

type TGitHubRepository = {
  name: string
  full_name: string
  owner: TGitHubUser
  private: boolean
  html_url: string
  description: string | null
  fork: boolean
  language: string | null
  forks_count: number
  stargazers_count: number
  watchers_count: number
  size: number
  default_branch: string
  open_issues_count: number
  topics: string[]
  archived: boolean
  disabled: boolean
  visibility: 'public' | 'private' | 'internal'
  pushed_at: string
  clone_url: string
  ssh_url: string
  homepage: string | null
  license: {
    key: string
    name: string
    spdx_id: string
    url: string | null
  } | null
} & TBaseEntity

export type { TGitHubRepository }
