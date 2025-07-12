import type { TGitHubUser } from '../types/github-user'

type TUserFilterCriteria = {
  type?: 'User' | 'Organization'
  minFollowers?: number
  maxFollowers?: number
  minPublicRepos?: number
  maxPublicRepos?: number
  location?: string
  company?: string
  hasBio?: boolean
  hasEmail?: boolean
}

function filterUsersByType(users: TGitHubUser[], type: 'User' | 'Organization'): TGitHubUser[] {
  return users.filter(user => user.type === type)
}

function filterUsersByFollowers(users: TGitHubUser[], min?: number, max?: number): TGitHubUser[] {
  return users.filter(user => {
    if (min !== undefined && user.followers < min) return false
    if (max !== undefined && user.followers > max) return false
    return true
  })
}

function filterUsersByPublicRepos(users: TGitHubUser[], min?: number, max?: number): TGitHubUser[] {
  return users.filter(user => {
    if (min !== undefined && user.public_repos < min) return false
    if (max !== undefined && user.public_repos > max) return false
    return true
  })
}

function filterUsersByLocation(users: TGitHubUser[], location: string): TGitHubUser[] {
  return users.filter(user => 
    user.location?.toLowerCase().includes(location.toLowerCase())
  )
}

function filterUsersByCompany(users: TGitHubUser[], company: string): TGitHubUser[] {
  return users.filter(user => 
    user.company?.toLowerCase().includes(company.toLowerCase())
  )
}

function filterUsers(users: TGitHubUser[], criteria: TUserFilterCriteria): TGitHubUser[] {
  let filteredUsers = users

  if (criteria.type) {
    filteredUsers = filterUsersByType(filteredUsers, criteria.type)
  }

  if (criteria.minFollowers !== undefined || criteria.maxFollowers !== undefined) {
    filteredUsers = filterUsersByFollowers(filteredUsers, criteria.minFollowers, criteria.maxFollowers)
  }

  if (criteria.minPublicRepos !== undefined || criteria.maxPublicRepos !== undefined) {
    filteredUsers = filterUsersByPublicRepos(filteredUsers, criteria.minPublicRepos, criteria.maxPublicRepos)
  }

  if (criteria.location) {
    filteredUsers = filterUsersByLocation(filteredUsers, criteria.location)
  }

  if (criteria.company) {
    filteredUsers = filterUsersByCompany(filteredUsers, criteria.company)
  }

  if (criteria.hasBio !== undefined) {
    filteredUsers = filteredUsers.filter(user => 
      criteria.hasBio ? user.bio !== null : user.bio === null
    )
  }

  if (criteria.hasEmail !== undefined) {
    filteredUsers = filteredUsers.filter(user => 
      criteria.hasEmail ? user.email !== null : user.email === null
    )
  }

  return filteredUsers
}

export { 
  filterUsers, 
  filterUsersByType, 
  filterUsersByFollowers, 
  filterUsersByPublicRepos, 
  filterUsersByLocation, 
  filterUsersByCompany 
}
export type { TUserFilterCriteria }
