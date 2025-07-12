import { GitHub } from '../src'

async function basicExamples() {
  // Create a GitHub client
  const github = GitHub()
  
  // Example 1: Get user information
  console.log('=== User Information ===')
  const user = await github.user('torvalds').get()
  console.log(`Name: ${user.name}`)
  console.log(`Public Repos: ${user.public_repos}`)
  console.log(`Followers: ${user.followers}`)
  
  // Example 2: Get user's repositories
  console.log('\n=== User Repositories ===')
  const repos = await github.user('torvalds').repos.get({
    params: { per_page: 5, sort: 'updated' }
  })
  repos.forEach((repo: any) => {
    console.log(`- ${repo.name}: ${repo.stargazers_count} stars`)
  })
  
  // Example 3: Get specific repository details
  console.log('\n=== Repository Details ===')
  const linuxRepo = await github.repo('torvalds', 'linux').get()
  console.log(`Linux repo has ${linuxRepo.stargazers_count} stars`)
  
  // Example 4: Get repository branches
  console.log('\n=== Repository Branches ===')
  const branches = await github.repo('facebook', 'react').branches.get({
    params: { per_page: 10 }
  })
  console.log(`React has ${branches.length} branches (first 10):`)
  branches.forEach((branch: any) => console.log(`- ${branch.name}`))
  
  // Example 5: Get user's gists
  console.log('\n=== User Gists ===')
  const gists = await github.user('defunkt').gists.get({
    params: { per_page: 3 }
  })
  gists.forEach((gist: any) => {
    console.log(`- ${gist.description || 'No description'} (${Object.keys(gist.files).length} files)`)
  })
}

// Run examples
basicExamples().catch(console.error)
