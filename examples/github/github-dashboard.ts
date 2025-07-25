import { GitHub } from '@remcostoeten/fync/github';

type TGitHubDashboard = {
  user: any;
  repositories: any[];
  organizations: any[];
  totalStars: number;
  totalForks: number;
  recentActivity: any[];
};

async function createGitHubDashboard(username: string): Promise<TGitHubDashboard> {
  const github = GitHub({ 
    token: process.env.GITHUB_TOKEN,
    cache: true 
  });

  const [user, repos, orgs, events] = await Promise.all([
    github.user(username).get(),
    github.user(username).repos.get({ params: { per_page: 100, sort: 'updated' } }),
    github.user(username).orgs.get(),
    github.user(username).events.get({ params: { per_page: 10 } })
  ]);

  const totalStars = repos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum: number, repo: any) => sum + repo.forks_count, 0);

  return {
    user,
    repositories: repos,
    organizations: orgs,
    totalStars,
    totalForks,
    recentActivity: events
  };
}

async function getRepositoryInsights(owner: string, repo: string) {
  const github = GitHub({ token: process.env.GITHUB_TOKEN });

  const [repository, contributors, releases, issues, pulls] = await Promise.all([
    github.repo(owner, repo).get(),
    github.repo(owner, repo).contributors.get(),
    github.repo(owner, repo).getReleases({ params: { per_page: 5 } }),
    github.repo(owner, repo).getIssues({ params: { state: 'open', per_page: 5 } }),
    github.repo(owner, repo).getPulls({ params: { state: 'open', per_page: 5 } })
  ]);

  return {
    repository,
    topContributors: contributors.slice(0, 10),
    latestReleases: releases,
    openIssues: issues,
    openPulls: pulls,
    healthScore: calculateHealthScore(repository, issues, pulls)
  };
}

function calculateHealthScore(repo: any, issues: any[], pulls: any[]): number {
  const factors = {
    hasDescription: repo.description ? 10 : 0,
    hasReadme: repo.has_readme ? 10 : 0,
    hasLicense: repo.license ? 10 : 0,
    recentActivity: repo.updated_at > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() ? 15 : 0,
    lowIssueRatio: issues.length < 10 ? 10 : 0,
    activePRs: pulls.length > 0 && pulls.length < 20 ? 15 : 0,
    stargazers: Math.min(repo.stargazers_count / 10, 30)
  };

  return Math.min(Object.values(factors).reduce((sum, score) => sum + score, 0), 100);
}

async function findTrendingRepositories(language: string = 'typescript') {
  const github = GitHub({ token: process.env.GITHUB_TOKEN });

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const query = `language:${language} created:>${oneWeekAgo.toISOString().split('T')[0]} stars:>5`;
  
  const results = await github.search.repositories(query, {
    params: { sort: 'stars', order: 'desc', per_page: 20 }
  });

  return results.items.map((repo: any) => ({
    name: repo.full_name,
    description: repo.description,
    stars: repo.stargazers_count,
    language: repo.language,
    url: repo.html_url,
    createdAt: repo.created_at
  }));
}

async function analyzeUserContributions(username: string) {
  const github = GitHub({ token: process.env.GITHUB_TOKEN });

  const events = await github.user(username).events.get({ 
    params: { per_page: 100 } 
  });

  const contributions = {
    pushes: 0,
    pullRequests: 0,
    issues: 0,
    releases: 0,
    repositories: new Set<string>(),
    languages: new Set<string>()
  };

  for (const event of events) {
    switch (event.type) {
      case 'PushEvent':
        contributions.pushes += event.payload.commits?.length || 0;
        contributions.repositories.add(event.repo.name);
        break;
      case 'PullRequestEvent':
        contributions.pullRequests++;
        contributions.repositories.add(event.repo.name);
        break;
      case 'IssuesEvent':
        contributions.issues++;
        break;
      case 'ReleaseEvent':
        contributions.releases++;
        break;
    }
  }

  return {
    ...contributions,
    repositories: Array.from(contributions.repositories),
    languages: Array.from(contributions.languages),
    totalEvents: events.length
  };
}

export {
  createGitHubDashboard,
  getRepositoryInsights,
  findTrendingRepositories,
  analyzeUserContributions
};
