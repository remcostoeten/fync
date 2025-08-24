import type { TGitLabProject } from "./gitlab-project";
import type { TGitLabGroup } from "./gitlab-group";
import type { TGitLabUser } from "./gitlab-user";
import type { TGitLabSnippet } from "./gitlab-snippet";
import type { TGitLabIssue } from "./gitlab-issue";
import type { TGitLabMergeRequest } from "./gitlab-merge-request";

export type TGitLabSearchResult<T> = {
	/** Search results */
	results: T[];
	/** Total count */
	total_count?: number;
	/** Total pages */
	total_pages?: number;
	/** Current page */
	current_page?: number;
	/** Per page limit */
	per_page?: number;
};

export type TGitLabSearchProjects = TGitLabSearchResult<TGitLabProject>;

export type TGitLabSearchGroups = TGitLabSearchResult<TGitLabGroup>;

export type TGitLabSearchUsers = TGitLabSearchResult<TGitLabUser>;

export type TGitLabSearchSnippets = TGitLabSearchResult<TGitLabSnippet>;

export type TGitLabSearchIssues = TGitLabSearchResult<TGitLabIssue>;

export type TGitLabSearchMergeRequests = TGitLabSearchResult<TGitLabMergeRequest>;

export type TGitLabSearchMilestones = TGitLabSearchResult<{
	/** Milestone ID */
	id: number;
	/** Milestone title */
	title: string;
	/** Milestone description */
	description: string | null;
	/** Milestone state */
	state: "active" | "closed";
	/** Milestone web URL */
	web_url: string;
	/** Due date */
	due_date: string | null;
	/** Start date */
	start_date: string | null;
	/** Project ID */
	project_id: number;
	/** Group ID */
	group_id: number | null;
	/** Created at */
	created_at: string;
	/** Updated at */
	updated_at: string;
}>;

export type TGitLabSearchWiki = TGitLabSearchResult<{
	/** Basename */
	basename: string;
	/** Data */
	data: string;
	/** Path */
	path: string;
	/** Filename */
	filename: string;
	/** ID */
	id: number | null;
	/** Ref */
	ref: string;
	/** Startline */
	startline: number;
	/** Project ID */
	project_id: number;
}>;

export type TGitLabSearchCommits = TGitLabSearchResult<{
	/** Commit ID */
	id: string;
	/** Short ID */
	short_id: string;
	/** Title */
	title: string;
	/** Author name */
	author_name: string;
	/** Author email */
	author_email: string;
	/** Message */
	message: string;
	/** Authored date */
	authored_date: string;
	/** Committer name */
	committer_name: string;
	/** Committer email */
	committer_email: string;
	/** Committed date */
	committed_date: string;
	/** Web URL */
	web_url: string;
	/** Project ID */
	project_id: number;
}>;

export type TGitLabSearchBlobs = TGitLabSearchResult<{
	/** Basename */
	basename: string;
	/** Data */
	data: string;
	/** Path */
	path: string;
	/** Filename */
	filename: string;
	/** ID */
	id: number | null;
	/** Ref */
	ref: string;
	/** Startline */
	startline: number;
	/** Project ID */
	project_id: number;
}>;

export type TGitLabSearchOptions = {
	/** Search query */
	search?: string;
	/** Scope of search */
	scope?: "projects" | "issues" | "merge_requests" | "milestones" | "wiki_blobs" | "commits" | "blobs" | "users";
	/** Order by */
	order_by?: "id" | "name" | "path" | "created_at" | "updated_at" | "last_activity_at";
	/** Sort order */
	sort?: "asc" | "desc";
	/** Page number */
	page?: number;
	/** Items per page */
	per_page?: number;
	/** Group ID to search within */
	group_id?: number;
	/** Project ID to search within */
	project_id?: number;
	/** Ref to search within */
	ref?: string;
	/** Search in */
	in?: "title" | "description" | "title,description";
	/** State filter */
	state?: "opened" | "closed" | "merged" | "all";
	/** Author ID filter */
	author_id?: number;
	/** Author username filter */
	author_username?: string;
	/** Assignee ID filter */
	assignee_id?: number;
	/** Assignee username filter */
	assignee_username?: string;
	/** Labels filter */
	labels?: string;
	/** Milestone filter */
	milestone?: string;
	/** Created after date */
	created_after?: string;
	/** Created before date */
	created_before?: string;
	/** Updated after date */
	updated_after?: string;
	/** Updated before date */
	updated_before?: string;
	/** Confidential filter */
	confidential?: boolean;
	/** Not filter */
	not?: {
		/** Not labels */
		labels?: string;
		/** Not milestone */
		milestone?: string;
		/** Not author ID */
		author_id?: number;
		/** Not assignee ID */
		assignee_id?: number;
	};
};
