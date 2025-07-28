import type {
	TChainableClient,
	TGitHubClientConfig,
	TRequestOptions,
} from "./services/github-client";
import { createGitHubClient } from "./services/github-client";
import type {
	TGitHubActionSecret,
	TGitHubRateLimitResponse,
	TGitHubWorkflow,
	TGitHubWorkflowJob,
	TGitHubWorkflowRun,
} from "./types/github-actions";
import type { TGitHubGist } from "./types/github-gist";
import type {
	TGitHubIssue,
	TGitHubIssueComment,
	TGitHubIssueEvent,
	TGitHubLabel,
	TGitHubMilestone,
	TGitHubNotification,
} from "./types/github-issues";
import type { TGitHubOrganization } from "./types/github-organization";
import type {
	TGitHubPullRequest,
	TGitHubPullRequestComment,
	TGitHubPullRequestReview,
} from "./types/github-pull-request";
import type {
	TGitHubRelease,
	TGitHubReleaseAsset,
	TGitHubTag,
} from "./types/github-release";
import type { TGitHubRepository } from "./types/github-repository";
import type {
	TGitHubSearchCodeResponse,
	TGitHubSearchCommitsResponse,
	TGitHubSearchIssuesResponse,
	TGitHubSearchLabelsResponse,
	TGitHubSearchRepositoriesResponse,
	TGitHubSearchTopicsResponse,
	TGitHubSearchUsersResponse,
} from "./types/github-search";
import type { TGitHubUser } from "./types/github-user";
import type { TGitHubConfig } from "./types/github-common";

type TGitHub = {
	// Direct access to chainable API
	api: TChainableClient;

	// Convenience methods for common operations
	user(username: string): TUserClient;
	repo(owner: string, repo: string): TRepoClient;
	org(orgName: string): TOrgClient;
	gist(gistId: string): TGistClient;

	// Search endpoints
	search: TSearchClient;

	// Current authenticated user (if token provided)
	me: TAuthenticatedUserClient;

	// Rate limiting information
	rateLimit: {
		get(): Promise<TGitHubRateLimitResponse>;
	};

	// Notifications
	notifications: {
		get(options?: TRequestOptions): Promise<TGitHubNotification[]>;
	};
};

type TUserClient = {
	// Get user info
	get(): Promise<TGitHubUser>;

	// User's resources
	repos: TChainableClient;
	gists: TChainableClient;
	followers: TChainableClient;
	following: TChainableClient;
	starred: TChainableClient;
	subscriptions: TChainableClient;
	orgs: TChainableClient;
	events: TChainableClient;
	received_events: TChainableClient;

	// Direct chain access
	chain: TChainableClient;
};

type TRepoClient = {
	// Get repo info
	get(): Promise<TGitHubRepository>;

	// Repository resources
	branches: TChainableClient;
	commits: TChainableClient;
	contents: TChainableClient;
	contributors: TChainableClient;
	deployments: TChainableClient;
	forks: TChainableClient;
	issues: TChainableClient;
	pulls: TChainableClient;
	releases: TChainableClient;
	tags: TChainableClient;
	topics: TChainableClient;
	labels: TChainableClient;
	milestones: TChainableClient;

	// Enhanced typed methods for common operations
	getIssues(options?: TRequestOptions): Promise<TGitHubIssue[]>;
	getIssue(issueNumber: number): Promise<TGitHubIssue>;
	getIssueComments(
		issueNumber: number,
		options?: TRequestOptions,
	): Promise<TGitHubIssueComment[]>;
	getIssueEvents(
		issueNumber: number,
		options?: TRequestOptions,
	): Promise<TGitHubIssueEvent[]>;

	getPulls(options?: TRequestOptions): Promise<TGitHubPullRequest[]>;
	getPull(pullNumber: number): Promise<TGitHubPullRequest>;
	getPullReviews(
		pullNumber: number,
		options?: TRequestOptions,
	): Promise<TGitHubPullRequestReview[]>;
	getPullComments(
		pullNumber: number,
		options?: TRequestOptions,
	): Promise<TGitHubPullRequestComment[]>;

	getReleases(options?: TRequestOptions): Promise<TGitHubRelease[]>;
	getRelease(releaseId: number): Promise<TGitHubRelease>;
	getLatestRelease(): Promise<TGitHubRelease>;
	getReleaseAssets(releaseId: number): Promise<TGitHubReleaseAsset[]>;

	getTags(options?: TRequestOptions): Promise<TGitHubTag[]>;
	getLabels(options?: TRequestOptions): Promise<TGitHubLabel[]>;
	getMilestones(options?: TRequestOptions): Promise<TGitHubMilestone[]>;

	// Actions and workflows
	actions: {
		workflows: {
			list(options?: TRequestOptions): Promise<TGitHubWorkflow[]>;
			get(workflowId: number): Promise<TGitHubWorkflow>;
			runs(
				workflowId: number,
				options?: TRequestOptions,
			): Promise<TGitHubWorkflowRun[]>;
			jobs(
				runId: number,
				options?: TRequestOptions,
			): Promise<TGitHubWorkflowJob[]>;
		};
		runs: {
			list(options?: TRequestOptions): Promise<TGitHubWorkflowRun[]>;
			get(runId: number): Promise<TGitHubWorkflowRun>;
			jobs(
				runId: number,
				options?: TRequestOptions,
			): Promise<TGitHubWorkflowJob[]>;
		};
		secrets: {
			get(options?: TRequestOptions): Promise<TGitHubActionSecret[]>;
		};
	};

	// Direct chain access
	chain: TChainableClient;
};

type TOrgClient = {
	// Get org info
	get(): Promise<TGitHubOrganization>;

	// Organization resources
	repos: TChainableClient;
	members: TChainableClient;
	teams: TChainableClient;
	events: TChainableClient;

	// Direct chain access
	chain: TChainableClient;
};

type TGistClient = {
	// Get gist info
	get(): Promise<TGitHubGist>;

	// Gist resources
	comments: TChainableClient;
	commits: TChainableClient;
	forks: TChainableClient;
	star: TChainableClient;

	// Direct chain access
	chain: TChainableClient;
};

type TSearchClient = {
	repositories(
		query: string,
		options?: TRequestOptions,
	): Promise<TGitHubSearchRepositoriesResponse>;
	users(
		query: string,
		options?: TRequestOptions,
	): Promise<TGitHubSearchUsersResponse>;
	issues(
		query: string,
		options?: TRequestOptions,
	): Promise<TGitHubSearchIssuesResponse>;
	code(
		query: string,
		options?: TRequestOptions,
	): Promise<TGitHubSearchCodeResponse>;
	commits(
		query: string,
		options?: TRequestOptions,
	): Promise<TGitHubSearchCommitsResponse>;
	topics(
		query: string,
		options?: TRequestOptions,
	): Promise<TGitHubSearchTopicsResponse>;
	labels(
		query: string,
		options?: TRequestOptions,
	): Promise<TGitHubSearchLabelsResponse>;
};

type TAuthenticatedUserClient = {
	// Get current user info
	get(): Promise<TGitHubUser>;

	// Current user's resources
	repos: TChainableClient;
	gists: TChainableClient;
	followers: TChainableClient;
	following: TChainableClient;
	starred: TChainableClient;
	subscriptions: TChainableClient;
	orgs: TChainableClient;
	issues: TChainableClient;

	// Direct chain access
	chain: TChainableClient;
};

/**
 * Creates a new GitHub API client
 *
 * @param config - Configuration for the GitHub client
 * @param config.token - GitHub personal access token or OAuth token (required)
 * @param config.baseUrl - Custom GitHub API URL (default: https://api.github.com)
 * @param config.cache - Enable response caching (default: false)
 * @param config.cacheTTL - Cache time-to-live in milliseconds (default: 300000)
 * @param config.timeout - Request timeout in milliseconds (default: 30000)
 *
 * @returns GitHub client instance with access to users, repositories, organizations, and more
 *
 * @example
 * ```typescript
 * const github = GitHub({
 *   token: process.env.GITHUB_TOKEN,
 *   cache: true
 * });
 *
 * // Get user information
 * const user = await github.user('octocat').get();
 *
 * // Get repository details
 * const repo = await github.repo('facebook', 'react').get();
 *
 * // Search repositories
 * const results = await github.search.repositories('typescript');
 *
 * // Get current user's notifications
 * const notifications = await github.notifications.get();
 * ```
 */
function GitHub(config: TGitHubClientConfig): TGitHub {
	const client = createGitHubClient(config);

	function createUserClient(username: string): TUserClient {
		const userBase = client.users[username];

		return {
			get: () => userBase.get(),
			repos: userBase.repos,
			gists: userBase.gists,
			followers: userBase.followers,
			following: userBase.following,
			starred: userBase.starred,
			subscriptions: userBase.subscriptions,
			orgs: userBase.orgs,
			events: userBase.events,
			received_events: userBase.received_events,
			chain: userBase,
		};
	}

	function createRepoClient(owner: string, repo: string): TRepoClient {
		const repoBase = client.repos[owner][repo];

		return {
			get: () => repoBase.get(),
			branches: repoBase.branches,
			commits: repoBase.commits,
			contents: repoBase.contents,
			contributors: repoBase.contributors,
			deployments: repoBase.deployments,
			forks: repoBase.forks,
			issues: repoBase.issues,
			pulls: repoBase.pulls,
			releases: repoBase.releases,
			tags: repoBase.tags,
			topics: repoBase.topics,
			labels: repoBase.labels,
			milestones: repoBase.milestones,

			// Enhanced typed methods for common operations
			getIssues: (options?: TRequestOptions) => repoBase.issues.get(options),
			getIssue: (issueNumber: number) => repoBase.issues[issueNumber].get(),
			getIssueComments: (issueNumber: number, options?: TRequestOptions) =>
				repoBase.issues[issueNumber].comments.get(options),
			getIssueEvents: (issueNumber: number, options?: TRequestOptions) =>
				repoBase.issues[issueNumber].events.get(options),

			getPulls: (options?: TRequestOptions) => repoBase.pulls.get(options),
			getPull: (pullNumber: number) => repoBase.pulls[pullNumber].get(),
			getPullReviews: (pullNumber: number, options?: TRequestOptions) =>
				repoBase.pulls[pullNumber].reviews.get(options),
			getPullComments: (pullNumber: number, options?: TRequestOptions) =>
				repoBase.pulls[pullNumber].comments.get(options),

			getReleases: (options?: TRequestOptions) =>
				repoBase.releases.get(options),
			getRelease: (releaseId: number) => repoBase.releases[releaseId].get(),
			getLatestRelease: () => repoBase.releases.latest.get(),
			getReleaseAssets: (releaseId: number) =>
				repoBase.releases[releaseId].assets.get(),

			getTags: (options?: TRequestOptions) => repoBase.tags.get(options),
			getLabels: (options?: TRequestOptions) => repoBase.labels.get(options),
			getMilestones: (options?: TRequestOptions) =>
				repoBase.milestones.get(options),

			// Actions and workflows
			actions: {
				workflows: {
					list: (options?: TRequestOptions) =>
						repoBase.actions.workflows.get(options),
					get: (workflowId: number) =>
						repoBase.actions.workflows[workflowId].get(),
					runs: (workflowId: number, options?: TRequestOptions) =>
						repoBase.actions.workflows[workflowId].runs.get(options),
					jobs: (runId: number, options?: TRequestOptions) =>
						repoBase.actions.runs[runId].jobs.get(options),
				},
				runs: {
					list: (options?: TRequestOptions) =>
						repoBase.actions.runs.get(options),
					get: (runId: number) => repoBase.actions.runs[runId].get(),
					jobs: (runId: number, options?: TRequestOptions) =>
						repoBase.actions.runs[runId].jobs.get(options),
				},
				secrets: {
					get: (options?: TRequestOptions) =>
						repoBase.actions.secrets.get(options),
				},
			},

			chain: repoBase,
		};
	}

	function createOrgClient(orgName: string): TOrgClient {
		const orgBase = client.orgs[orgName];

		return {
			get: () => orgBase.get(),
			repos: orgBase.repos,
			members: orgBase.members,
			teams: orgBase.teams,
			events: orgBase.events,
			chain: orgBase,
		};
	}

	function createGistClient(gistId: string): TGistClient {
		const gistBase = client.gists[gistId];

		return {
			get: () => gistBase.get(),
			comments: gistBase.comments,
			commits: gistBase.commits,
			forks: gistBase.forks,
			star: gistBase.star,
			chain: gistBase,
		};
	}

	const searchClient: TSearchClient = {
		repositories: (query: string, options?: TRequestOptions) =>
			client.search.repositories.get({
				...options,
				params: { ...options?.params, q: query },
			}),
		users: (query: string, options?: TRequestOptions) =>
			client.search.users.get({
				...options,
				params: { ...options?.params, q: query },
			}),
		issues: (query: string, options?: TRequestOptions) =>
			client.search.issues.get({
				...options,
				params: { ...options?.params, q: query },
			}),
		code: (query: string, options?: TRequestOptions) =>
			client.search.code.get({
				...options,
				params: { ...options?.params, q: query },
			}),
		commits: (query: string, options?: TRequestOptions) =>
			client.search.commits.get({
				...options,
				params: { ...options?.params, q: query },
			}),
		topics: (query: string, options?: TRequestOptions) =>
			client.search.topics.get({
				...options,
				params: { ...options?.params, q: query },
			}),
		labels: (query: string, options?: TRequestOptions) =>
			client.search.labels.get({
				...options,
				params: { ...options?.params, q: query },
			}),
	};

	const authenticatedUserClient: TAuthenticatedUserClient = {
		get: () => client.user.get(),
		repos: client.user.repos,
		gists: client.user.gists,
		followers: client.user.followers,
		following: client.user.following,
		starred: client.user.starred,
		subscriptions: client.user.subscriptions,
		orgs: client.user.orgs,
		issues: client.user.issues,
		chain: client.user,
	};

	const rateLimitClient = {
		get: () => client.rate_limit.get() as Promise<TGitHubRateLimitResponse>,
	};

	const notificationsClient = {
		get: (options?: TRequestOptions) =>
			client.notifications.get(options) as Promise<TGitHubNotification[]>,
	};

	return {
		api: client,
		user: createUserClient,
		repo: createRepoClient,
		org: createOrgClient,
		gist: createGistClient,
		search: searchClient,
		me: authenticatedUserClient,
		rateLimit: rateLimitClient,
		notifications: notificationsClient,
	};
}

export { GitHub };
export type {
	TGitHub,
	TUserClient,
	TRepoClient,
	TOrgClient,
	TGistClient,
	TSearchClient,
	TAuthenticatedUserClient,
	// Pull Request types
	TGitHubPullRequest,
	TGitHubPullRequestReview,
	TGitHubPullRequestComment,
	// Release types
	TGitHubRelease,
	TGitHubReleaseAsset,
	TGitHubTag,
	// Actions types
	TGitHubWorkflow,
	TGitHubWorkflowRun,
	TGitHubWorkflowJob,
	TGitHubActionSecret,
	TGitHubRateLimitResponse,
	// Issues types
	TGitHubIssue,
	TGitHubIssueComment,
	TGitHubIssueEvent,
	TGitHubLabel,
	TGitHubMilestone,
	TGitHubNotification,
	// Existing types
	TGitHubUser,
	TGitHubRepository,
	TGitHubOrganization,
	TGitHubGist,
	// Config types
	TGitHubConfig,
};
