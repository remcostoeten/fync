import type { TGitHubRepository } from "./github-repository";
import type { TGitHubUser } from "./github-user";

export type TGitHubSearchResponse<T> = {
	total_count: number;
	incomplete_results: boolean;
	items: T[];
};

export type TGitHubSearchRepositoriesResponse =
	TGitHubSearchResponse<TGitHubRepository>;

export type TGitHubSearchUsersResponse = TGitHubSearchResponse<TGitHubUser>;

export type TGitHubSearchIssue = {
	id: number;
	node_id: string;
	url: string;
	repository_url: string;
	labels_url: string;
	comments_url: string;
	events_url: string;
	html_url: string;
	number: number;
	state: "open" | "closed";
	title: string;
	body: string | null;
	user: TGitHubUser;
	labels: readonly {
		id: number;
		node_id: string;
		url: string;
		name: string;
		description: string | null;
		color: string;
		default: boolean;
	}[];
	assignee: TGitHubUser | null;
	assignees: TGitHubUser[];
	milestone: {
		id: number;
		node_id: string;
		number: number;
		state: "open" | "closed";
		title: string;
		description: string | null;
		creator: TGitHubUser;
		open_issues: number;
		closed_issues: number;
		created_at: string;
		updated_at: string;
		closed_at: string | null;
		due_on: string | null;
	} | null;
	locked: boolean;
	active_lock_reason: string | null;
	comments: number;
	pull_request?: {
		url: string;
		html_url: string;
		diff_url: string;
		patch_url: string;
		merged_at: string | null;
	};
	closed_at: string | null;
	created_at: string;
	updated_at: string;
	repository: TGitHubRepository;
	score: number;
};

export type TGitHubSearchIssuesResponse =
	TGitHubSearchResponse<TGitHubSearchIssue>;

export type TGitHubSearchCodeFile = {
	name: string;
	path: string;
	sha: string;
	url: string;
	git_url: string;
	html_url: string;
	repository: TGitHubRepository;
	score: number;
};

export type TGitHubSearchCodeResponse =
	TGitHubSearchResponse<TGitHubSearchCodeFile>;

export type TGitHubSearchCommit = {
	sha: string;
	node_id: string;
	url: string;
	html_url: string;
	comments_url: string;
	commit: {
		url: string;
		author: {
			date: string;
			name: string;
			email: string;
		};
		committer: {
			date: string;
			name: string;
			email: string;
		};
		message: string;
		tree: {
			url: string;
			sha: string;
		};
		comment_count: number;
	};
	author: TGitHubUser | null;
	committer: TGitHubUser | null;
	parents: readonly {
		url: string;
		sha: string;
	}[];
	repository: TGitHubRepository;
	score: number;
};

export type TGitHubSearchCommitsResponse =
	TGitHubSearchResponse<TGitHubSearchCommit>;

export type TGitHubSearchTopic = {
	name: string;
	display_name: string | null;
	short_description: string | null;
	description: string | null;
	created_by: string | null;
	released: string | null;
	created_at: string;
	updated_at: string;
	featured: boolean;
	curated: boolean;
	score: number;
};

export type TGitHubSearchTopicsResponse =
	TGitHubSearchResponse<TGitHubSearchTopic>;

export type TGitHubSearchLabel = {
	id: number;
	node_id: string;
	url: string;
	name: string;
	color: string;
	default: boolean;
	description: string | null;
	score: number;
};

export type TGitHubSearchLabelsResponse =
	TGitHubSearchResponse<TGitHubSearchLabel>;
