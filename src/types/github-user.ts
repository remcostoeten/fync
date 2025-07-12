import type { TBaseEntity } from './base-entity'

type TGitHubUser = {
  login: string
  avatar_url: string
  html_url: string
  name: string | null
  company: string | null
  blog: string | null
  location: string | null
  email: string | null
  bio: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  type: 'User' | 'Organization'
  site_admin: boolean
} & TBaseEntity

export type { TGitHubUser }
