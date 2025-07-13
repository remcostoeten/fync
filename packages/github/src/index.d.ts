import type {
	TChainableClient,
	TGitHubClientConfig,
	TRequestOptions,
} from "./services/github-client";
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
	api: TChainableClient;
	user(username: string): TUserClient;
	repo(owner: string, repo: string): TRepoClient;
	org(orgName: string): TOrgClient;
	gist(gistId: string): TGistClient;
	search: TSearchClient;
	me: TAuthenticatedUserClient;
};
type TUserClient = {
	get(): Promise<TGitHubUser>;
	repos: TChainableClient;
	gists: TChainableClient;
	followers: TChainableClient;
	following: TChainableClient;
	starred: TChainableClient;
	subscriptions: TChainableClient;
	orgs: TChainableClient;
	events: TChainableClient;
	received_events: TChainableClient;
	chain: TChainableClient;
};
type TRepoClient = {
	get(): Promise<TGitHubRepository>;
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
	chain: TChainableClient;
};
type TOrgClient = {
	get(): Promise<TGitHubOrganization>;
	repos: TChainableClient;
	members: TChainableClient;
	teams: TChainableClient;
	events: TChainableClient;
	chain: TChainableClient;
};
type TGistClient = {
	get(): Promise<TGitHubGist>;
	comments: TChainableClient;
	commits: TChainableClient;
	forks: TChainableClient;
	star: TChainableClient;
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
	get(): Promise<TGitHubUser>;
	repos: TChainableClient;
	gists: TChainableClient;
	followers: TChainableClient;
	following: TChainableClient;
	starred: TChainableClient;
	subscriptions: TChainableClient;
	orgs: TChainableClient;
	issues: TChainableClient;
	chain: TChainableClient;
};
declare function GitHub(config?: TGitHubClientConfig): TGitHub;
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
//# sourceMappingURL=index.d.ts.map
