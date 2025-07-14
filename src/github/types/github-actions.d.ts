import type { TBaseEntity } from "./base-entity";
import type { TGitHubUser } from "./github-user";
type TGitHubWorkflowState =
	| "active"
	| "deleted"
	| "disabled_fork"
	| "disabled_inactivity"
	| "disabled_manually";
type TGitHubWorkflow = TBaseEntity & {
	name: string;
	path: string;
	state: TGitHubWorkflowState;
	badge_url: string;
	html_url: string;
	url: string;
	node_id: string;
};
type TGitHubWorkflowRunStatus =
	| "queued"
	| "in_progress"
	| "completed"
	| "waiting"
	| "requested"
	| "pending";
type TGitHubWorkflowRunConclusion =
	| "success"
	| "failure"
	| "neutral"
	| "cancelled"
	| "skipped"
	| "timed_out"
	| "action_required"
	| "stale"
	| null;
type TGitHubWorkflowRun = TBaseEntity & {
	name: string | null;
	head_branch: string | null;
	head_sha: string;
	path: string;
	display_title: string;
	run_number: number;
	event: string;
	status: TGitHubWorkflowRunStatus;
	conclusion: TGitHubWorkflowRunConclusion;
	workflow_id: number;
	check_suite_id: number;
	check_suite_node_id: string;
	head_commit: {
		id: string;
		tree_id: string;
		message: string;
		timestamp: string;
		author: {
			name: string;
			email: string;
		};
		committer: {
			name: string;
			email: string;
		};
	};
	run_attempt: number;
	referenced_workflows: readonly {
		path: string;
		sha: string;
		ref: string;
	}[];
	run_started_at: string;
	triggering_actor: TGitHubUser;
	jobs_url: string;
	logs_url: string;
	check_suite_url: string;
	artifacts_url: string;
	cancel_url: string;
	rerun_url: string;
	previous_attempt_url: string | null;
	workflow_url: string;
	head_repository: {
		id: number;
		node_id: string;
		name: string;
		full_name: string;
		private: boolean;
		owner: TGitHubUser;
		html_url: string;
		description: string | null;
		fork: boolean;
		archive_url: string;
		assignees_url: string;
		blobs_url: string;
		branches_url: string;
		collaborators_url: string;
		comments_url: string;
		commits_url: string;
		compare_url: string;
		contents_url: string;
		contributors_url: string;
		deployments_url: string;
		downloads_url: string;
		events_url: string;
		forks_url: string;
		git_commits_url: string;
		git_refs_url: string;
		git_tags_url: string;
		issue_comment_url: string;
		issue_events_url: string;
		issues_url: string;
		keys_url: string;
		labels_url: string;
		languages_url: string;
		merges_url: string;
		milestones_url: string;
		notifications_url: string;
		pulls_url: string;
		releases_url: string;
		stargazers_url: string;
		statuses_url: string;
		subscribers_url: string;
		subscription_url: string;
		tags_url: string;
		teams_url: string;
		trees_url: string;
		clone_url: string;
		mirror_url: string | null;
		svn_url: string;
		homepage: string | null;
		language: string | null;
		forks_count: number;
		stargazers_count: number;
		watchers_count: number;
		size: number;
		default_branch: string;
		open_issues_count: number;
		is_template: boolean;
		topics: string[];
		has_issues: boolean;
		has_projects: boolean;
		has_wiki: boolean;
		has_pages: boolean;
		has_downloads: boolean;
		archived: boolean;
		disabled: boolean;
		visibility: "public" | "private" | "internal";
		pushed_at: string;
		created_at: string;
		updated_at: string;
		permissions: {
			admin: boolean;
			maintain: boolean;
			push: boolean;
			triage: boolean;
			pull: boolean;
		};
		allow_rebase_merge: boolean;
		template_repository: unknown | null;
		temp_clone_token: string | null;
		allow_squash_merge: boolean;
		allow_auto_merge: boolean;
		delete_branch_on_merge: boolean;
		allow_merge_commit: boolean;
		subscribers_count: number;
		network_count: number;
		license: {
			key: string;
			name: string;
			spdx_id: string;
			url: string;
			node_id: string;
		} | null;
		forks: number;
		open_issues: number;
		watchers: number;
	};
	repository: {
		id: number;
		node_id: string;
		name: string;
		full_name: string;
		private: boolean;
		owner: TGitHubUser;
		html_url: string;
		description: string | null;
		fork: boolean;
		archive_url: string;
		assignees_url: string;
		blobs_url: string;
		branches_url: string;
		collaborators_url: string;
		comments_url: string;
		commits_url: string;
		compare_url: string;
		contents_url: string;
		contributors_url: string;
		deployments_url: string;
		downloads_url: string;
		events_url: string;
		forks_url: string;
		git_commits_url: string;
		git_refs_url: string;
		git_tags_url: string;
		issue_comment_url: string;
		issue_events_url: string;
		issues_url: string;
		keys_url: string;
		labels_url: string;
		languages_url: string;
		merges_url: string;
		milestones_url: string;
		notifications_url: string;
		pulls_url: string;
		releases_url: string;
		stargazers_url: string;
		statuses_url: string;
		subscribers_url: string;
		subscription_url: string;
		tags_url: string;
		teams_url: string;
		trees_url: string;
		clone_url: string;
		mirror_url: string | null;
		svn_url: string;
		homepage: string | null;
		language: string | null;
		forks_count: number;
		stargazers_count: number;
		watchers_count: number;
		size: number;
		default_branch: string;
		open_issues_count: number;
		is_template: boolean;
		topics: string[];
		has_issues: boolean;
		has_projects: boolean;
		has_wiki: boolean;
		has_pages: boolean;
		has_downloads: boolean;
		archived: boolean;
		disabled: boolean;
		visibility: "public" | "private" | "internal";
		pushed_at: string;
		created_at: string;
		updated_at: string;
		permissions: {
			admin: boolean;
			maintain: boolean;
			push: boolean;
			triage: boolean;
			pull: boolean;
		};
		allow_rebase_merge: boolean;
		template_repository: unknown | null;
		temp_clone_token: string | null;
		allow_squash_merge: boolean;
		allow_auto_merge: boolean;
		delete_branch_on_merge: boolean;
		allow_merge_commit: boolean;
		subscribers_count: number;
		network_count: number;
		license: {
			key: string;
			name: string;
			spdx_id: string;
			url: string;
			node_id: string;
		} | null;
		forks: number;
		open_issues: number;
		watchers: number;
	};
	head_repository_id: number;
	actor: TGitHubUser;
	html_url: string;
	pull_requests: unknown[];
	repository_id: number;
	node_id: string;
};
type TGitHubWorkflowJob = TBaseEntity & {
	run_id: number;
	run_url: string;
	run_attempt: number;
	node_id: string;
	head_sha: string;
	html_url: string;
	status: "queued" | "in_progress" | "completed";
	conclusion:
		| "success"
		| "failure"
		| "neutral"
		| "cancelled"
		| "skipped"
		| "timed_out"
		| "action_required"
		| null;
	started_at: string;
	completed_at: string | null;
	name: string;
	steps: readonly {
		name: string;
		status: "queued" | "in_progress" | "completed";
		conclusion:
			| "success"
			| "failure"
			| "neutral"
			| "cancelled"
			| "skipped"
			| "timed_out"
			| "action_required"
			| null;
		number: number;
		started_at: string | null;
		completed_at: string | null;
	}[];
	check_run_url: string;
	labels: string[];
	runner_id: number | null;
	runner_name: string | null;
	runner_group_id: number | null;
	runner_group_name: string | null;
	workflow_name: string | null;
	head_branch: string | null;
};
type TGitHubActionSecret = {
	name: string;
	created_at: string;
	updated_at: string;
};
type TGitHubRateLimit = {
	limit: number;
	remaining: number;
	reset: number;
	used: number;
	resource: string;
};
type TGitHubRateLimitResponse = {
	rate: TGitHubRateLimit;
	resources: {
		core: TGitHubRateLimit;
		search: TGitHubRateLimit;
		graphql: TGitHubRateLimit;
		integration_manifest: TGitHubRateLimit;
		source_import: TGitHubRateLimit;
		code_scanning_upload: TGitHubRateLimit;
		actions_runner_registration: TGitHubRateLimit;
		scim: TGitHubRateLimit;
		dependency_snapshots: TGitHubRateLimit;
		audit_log: TGitHubRateLimit;
		code_search: TGitHubRateLimit;
	};
};
export type {
	TGitHubWorkflow,
	TGitHubWorkflowState,
	TGitHubWorkflowRun,
	TGitHubWorkflowRunStatus,
	TGitHubWorkflowRunConclusion,
	TGitHubWorkflowJob,
	TGitHubActionSecret,
	TGitHubRateLimit,
	TGitHubRateLimitResponse,
};
//# sourceMappingURL=github-actions.d.ts.map
