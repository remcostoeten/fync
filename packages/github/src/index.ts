import type {
	TChainableClient,
	TGitHubClientConfig,
	TRequestOptions,
} from "./services/github-client";
import { createGitHubClient } from "./services/github-client";
import type { TGitHubGist } from "./types/github-gist";
import type { TGitHubOrganization } from "./types/github-organization";
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

function GitHub(config?: TGitHubClientConfig): TGitHub {
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

	return {
		api: client,
		user: createUserClient,
		repo: createRepoClient,
		org: createOrgClient,
		gist: createGistClient,
		search: searchClient,
		me: authenticatedUserClient,
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
};
