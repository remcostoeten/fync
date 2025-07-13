import { GitHub } from './src/index';

// Create a client with excellent TypeScript support
const github = GitHub({ 
  token: process.env.GITHUB_TOKEN // Optional for public repositories
});

async function demonstrateFeatures() {
  // Basic repository operations
  const repo = github.repo('facebook', 'react');
  
  // Get repository info with full typing
  const repoInfo = await repo.get();
  console.log(`Repository: ${repoInfo.full_name} (${repoInfo.stargazers_count} stars)`);
  
  // Issues with full typing and LSP support
  const issues = await repo.getIssues({ params: { state: 'open', per_page: 5 } });
  console.log(`Found ${issues.length} open issues`);
  
  for (const issue of issues) {
    console.log(`- Issue #${issue.number}: ${issue.title}`);
    console.log(`  State: ${issue.state}, Labels: ${issue.labels.map(l => l.name).join(', ')}`);
    
    // Get issue comments with full typing
    const comments = await repo.getIssueComments(issue.number);
    console.log(`  Comments: ${comments.length}`);
  }
  
  // Pull requests with comprehensive typing
  const pulls = await repo.getPulls({ params: { state: 'open', per_page: 3 } });
  console.log(`\nFound ${pulls.length} open pull requests`);
  
  for (const pull of pulls) {
    console.log(`- PR #${pull.number}: ${pull.title}`);
    console.log(`  State: ${pull.state}, Mergeable: ${pull.mergeable}`);
    console.log(`  Additions: ${pull.additions}, Deletions: ${pull.deletions}`);
    
    // Get PR reviews with full typing
    const reviews = await repo.getPullReviews(pull.number);
    console.log(`  Reviews: ${reviews.length}`);
    
    for (const review of reviews) {
      console.log(`    - ${review.state} by ${review.user.login}`);
    }
  }
  
  // Releases with full typing
  const releases = await repo.getReleases({ params: { per_page: 3 } });
  console.log(`\nFound ${releases.length} releases`);
  
  for (const release of releases) {
    console.log(`- Release: ${release.tag_name} (${release.name})`);
    console.log(`  Published: ${release.published_at}`);
    console.log(`  Assets: ${release.assets.length}`);
    
    // Assets are fully typed
    for (const asset of release.assets) {
      console.log(`    - ${asset.name} (${asset.download_count} downloads)`);
    }
  }
  
  // Actions and workflows with full typing
  const workflows = await repo.actions.workflows.list();
  console.log(`\nFound ${workflows.length} workflows`);
  
  for (const workflow of workflows) {
    console.log(`- Workflow: ${workflow.name} (${workflow.state})`);
    
    // Get workflow runs with full typing
    const runs = await repo.actions.workflows.runs(workflow.id, { params: { per_page: 2 } });
    console.log(`  Recent runs: ${runs.length}`);
    
    for (const run of runs) {
      console.log(`    - Run #${run.run_number}: ${run.status} (${run.conclusion})`);
      console.log(`      Triggered by: ${run.triggering_actor.login}`);
    }
  }
  
  // User operations with full typing
  const user = github.user('octocat');
  const userInfo = await user.get();
  console.log(`\nUser: ${userInfo.login} (${userInfo.name})`);
  console.log(`Followers: ${userInfo.followers}, Following: ${userInfo.following}`);
  
  // Search with full typing
  const searchResults = await github.search.repositories('react typescript', {
    params: { sort: 'stars', order: 'desc', per_page: 3 }
  });
  
  console.log(`\nSearch results: ${searchResults.total_count} repositories found`);
  for (const repo of searchResults.items) {
    console.log(`- ${repo.full_name}: ${repo.description}`);
    console.log(`  Stars: ${repo.stargazers_count}, Language: ${repo.language}`);
  }
  
  // Rate limiting information
  const rateLimit = await github.rateLimit.get();
  console.log(`\nRate limit: ${rateLimit.rate.remaining}/${rateLimit.rate.limit} remaining`);
  console.log(`Resets at: ${new Date(rateLimit.rate.reset * 1000).toLocaleString()}`);
  
  // Notifications (requires authentication)
  if (process.env.GITHUB_TOKEN) {
    try {
      const notifications = await github.notifications.get({ params: { per_page: 5 } });
      console.log(`\nNotifications: ${notifications.length} unread`);
      
      for (const notification of notifications) {
        console.log(`- ${notification.subject.title} (${notification.subject.type})`);
        console.log(`  Repository: ${notification.repository.full_name}`);
        console.log(`  Reason: ${notification.reason}`);
      }
    } catch (error) {
      console.log('Notifications require authentication');
    }
  }
  
  // Authenticated user operations (requires authentication)
  if (process.env.GITHUB_TOKEN) {
    try {
      const me = await github.me.get();
      console.log(`\nAuthenticated as: ${me.login} (${me.name})`);
      console.log(`Email: ${me.email}`);
    } catch (error) {
      console.log('Authenticated user info requires authentication');
    }
  }
}

// Run the example
demonstrateFeatures().catch(console.error);

// Example of excellent LSP support:
// When you type `repo.` your IDE will show all available methods with full documentation
// When you type `issue.` your IDE will show all issue properties with proper types
// When you type `pull.` your IDE will show all pull request properties with proper types
// When you type `release.` your IDE will show all release properties with proper types
// When you type `workflow.` your IDE will show all workflow properties with proper types
