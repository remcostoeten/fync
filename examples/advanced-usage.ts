import { GitHub } from '../src'

async function advancedExamples() {
  // Create a GitHub client with token
  const github = GitHub({ 
    token: process.env.GITHUB_TOKEN,
    cacheTTL: 600000 // 10 minutes
  })
  
  // Example 1: Direct API access for any endpoint
  console.log('=== Direct API Access ===')
  
  // Get specific commit
  const commit = await github.api.repos.facebook.react.commits['abc123'].get()
  console.log(`Commit message: ${commit.commit.message}`)
  
  // Get pull request reviews
  const reviews = await github.api.repos.microsoft.vscode.pulls['123'].reviews.get()
  console.log(`PR has ${reviews.length} reviews`)
  
  // Example 2: Streaming paginated results
  console.log('\n=== Streaming Repositories ===')
  const repoStream = github.user('microsoft').repos.stream({
    params: { per_page: 100 }
  })
  
  let count = 0
  for await (const repo of repoStream) {
    count++
    if (count <= 5) {
      console.log(`${count}. ${repo.name}`)
    }
  }
  console.log(`Total repositories: ${count}`)
  
  // Example 3: Search with pagination
  console.log('\n=== Search Repositories ===')
  const searchResults = await github.search.repositories('machine learning', {
    params: {
      sort: 'stars',
      order: 'desc',
      per_page: 5
    }
  })
  
  searchResults.items.forEach((repo: any, i: number) => {
    console.log(`${i + 1}. ${repo.full_name} - ${repo.stargazers_count} stars`)
  })
  
  // Example 4: Get all data at once
  console.log('\n=== Get All Branches ===')
  const allBranches = await github.repo('nodejs', 'node').branches.get({
    allPages: true
  })
  console.log(`Node.js has ${allBranches.length} total branches`)
  
  // Example 5: Complex nested access
  console.log('\n=== Complex API Access ===')
  
  // Get workflow runs
  const workflowRuns = await github
    .api
    .repos
    .actions
    .actions
    .workflows
    ['workflow.yml']
    .runs
    .get()
  
  console.log(`Workflow has ${workflowRuns.total_count} runs`)
  
  // Get issue comments
  const issueComments = await github
    .repo('vuejs', 'vue')
    .issues
    ['1234']
    .comments
    .get()
  
  console.log(`Issue has ${issueComments.length} comments`)
  
  // Example 6: Using path() method to see constructed URL
  const clientPath = github.repo('rust-lang', 'rust').issues.comments['5678']
  console.log(`\n=== API Path ===`)
  console.log(`Constructed path: ${clientPath.path()}`)
  
  // Example 7: Conditional caching
  console.log('\n=== Conditional Caching ===')
  
  // First call - will hit API
  const repo1 = await github.repo('golang', 'go').get()
  console.log('First call completed')
  
  // Second call - will use cache
  const repo2 = await github.repo('golang', 'go').get()
  console.log('Second call completed (from cache)')
  
  // Third call - bypass cache
  const repo3 = await github.repo('golang', 'go').get({ cache: false })
  console.log('Third call completed (bypassed cache)')
}

// Run examples
advancedExamples().catch(console.error)
