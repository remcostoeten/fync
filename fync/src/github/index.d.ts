import type {
	TChainableClient,
	TGitHubClientConfig,
	TRequestOptions,
} from "./services/github-client";
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
type TGitHub = {
	api: TChainableClient;
	user(username: string): TUserClient;
	repo(owner: string, repo: string): TRepoClient;
	org(orgName: string): TOrgClient;
	gist(gistId: string): TGistClient;
	search: TSearchClient;
	me: TAuthenticatedUserClient;
	rateLimit: {
		get(): Promise<TGitHubRateLimitResponse>;
	};
	notifications: {
		get(options?: TRequestOptions): Promise<TGitHubNotification[]>;
		markAsRead(options?: TRequestOptions): Promise<void>;
		markRepoAsRead(
			owner: string,
			repo: string,
			options?: TRequestOptions,
		): Promise<void>;
	};
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
	labels: TChainableClient;
	milestones: TChainableClient;
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
	TGitHubPullRequest,
	TGitHubPullRequestReview,
	TGitHubPullRequestComment,
	TGitHubRelease,
	TGitHubReleaseAsset,
	TGitHubTag,
	TGitHubWorkflow,
	TGitHubWorkflowRun,
	TGitHubWorkflowJob,
	TGitHubActionSecret,
	TGitHubRateLimitResponse,
	TGitHubIssue,
	TGitHubIssueComment,
	TGitHubIssueEvent,
	TGitHubLabel,
	TGitHubMilestone,
	TGitHubNotification,
	TGitHubUser,
	TGitHubRepository,
	TGitHubOrganization,
	TGitHubGist,
};
//# sourceMappingURL=index.d.ts.map
