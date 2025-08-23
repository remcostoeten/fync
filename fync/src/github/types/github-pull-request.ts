import type { TBaseEntity } from "../../core/types";
import type { TGitHubRepository } from "./github-repository";
import type { TGitHubUser } from "./github-user";

type TGitHubPullRequestState = "open" | "closed" | "merged";

type TGitHubPullRequestBase = {
	label: string;
	ref: string;
	sha: string;
	user: TGitHubUser;
	repo: TGitHubRepository;
};

type TGitHubPullRequestHead = {
	label: string;
	ref: string;
	sha: string;
	user: TGitHubUser;
	repo: TGitHubRepository | null;
};

type TGitHubPullRequestLinks = {
	self: { href: string };
	html: { href: string };
	issue: { href: string };
	comments: { href: string };
	review_comments: { href: string };
	review_comment: { href: string };
	commits: { href: string };
	statuses: { href: string };
};

type TGitHubPullRequest = TBaseEntity & {
	number: number;
	state: TGitHubPullRequestState;
	locked: boolean;
	title: string;
	user: TGitHubUser;
	body: string | null;
	labels: readonly {
		id: number;
		name: string;
		color: string;
		default: boolean;
		description: string | null;
	}[];
	milestone: {
		id: number;
		title: string;
		description: string | null;
		state: "open" | "closed";
		created_at: string;
		updated_at: string;
		due_on: string | null;
		closed_at: string | null;
	} | null;
	active_lock_reason: string | null;
	assignee: TGitHubUser | null;
	assignees: TGitHubUser[];
	requested_reviewers: TGitHubUser[];
	requested_teams: readonly {
		id: number;
		name: string;
		slug: string;
		description: string | null;
		privacy: "closed" | "secret";
		permission: string;
		notification_setting: string;
	}[];
	head: TGitHubPullRequestHead;
	base: TGitHubPullRequestBase;
	_links: TGitHubPullRequestLinks;
	author_association: string;
	auto_merge: unknown | null;
	draft: boolean;
	merged: boolean;
	mergeable: boolean | null;
	rebaseable: boolean | null;
	mergeable_state: string;
	merged_by: TGitHubUser | null;
	comments: number;
	review_comments: number;
	maintainer_can_modify: boolean;
	commits: number;
	additions: number;
	deletions: number;
	changed_files: number;
	merged_at: string | null;
	closed_at: string | null;
	html_url: string;
	diff_url: string;
	patch_url: string;
	issue_url: string;
	commits_url: string;
	review_comments_url: string;
	review_comment_url: string;
	comments_url: string;
	statuses_url: string;
};

type TGitHubPullRequestReview = TBaseEntity & {
	user: TGitHubUser;
	body: string | null;
	state:
		| "APPROVED"
		| "CHANGES_REQUESTED"
		| "COMMENTED"
		| "DISMISSED"
		| "PENDING";
	html_url: string;
	pull_request_url: string;
	author_association: string;
	_links: {
		html: { href: string };
		pull_request: { href: string };
	};
	submitted_at: string | null;
	commit_id: string;
};

type TGitHubPullRequestComment = TBaseEntity & {
	pull_request_review_id: number | null;
	diff_hunk: string;
	path: string;
	position: number | null;
	original_position: number | null;
	commit_id: string;
	original_commit_id: string;
	in_reply_to_id: number | null;
	user: TGitHubUser;
	body: string;
	html_url: string;
	pull_request_url: string;
	author_association: string;
	_links: {
		self: { href: string };
		html: { href: string };
		pull_request: { href: string };
	};
	start_line: number | null;
	original_start_line: number | null;
	start_side: "LEFT" | "RIGHT" | null;
	line: number | null;
	original_line: number | null;
	side: "LEFT" | "RIGHT";
	subject_type: "line" | "file";
	reactions: {
		total_count: number;
		"+1": number;
		"-1": number;
		laugh: number;
		confused: number;
		heart: number;
		hooray: number;
		eyes: number;
		rocket: number;
	};
};

export type {
	TGitHubPullRequest,
	TGitHubPullRequestReview,
	TGitHubPullRequestComment,
	TGitHubPullRequestState,
	TGitHubPullRequestBase,
	TGitHubPullRequestHead,
	TGitHubPullRequestLinks,
};
