import type { TBaseEntity } from "../../core/types";
import type { TGitLabUser } from "./gitlab-user";

export type TGitLabMergeRequest = {
	/** Merge request ID */
	id: number;
	/** Merge request internal ID */
	iid: number;
	/** Project ID */
	project_id: number;
	/** Merge request title */
	title: string;
	/** Merge request description */
	description: string | null;
	/** Merge request state */
	state: "opened" | "closed" | "locked" | "merged";
	/** Merge status */
	merge_status: "unchecked" | "checking" | "can_be_merged" | "cannot_be_merged" | "cannot_be_merged_recheck";
	/** Detailed merge status */
	detailed_merge_status: "unchecked" | "checking" | "mergeable" | "broken_status" | "ci_must_pass" | "ci_still_running" | "discussions_not_resolved" | "draft_status" | "external_status_checks" | "jira_association_missing" | "need_rebase" | "not_approved" | "not_open" | "policies_denied" | "blocked_status" | "requested_changes";
	/** Merge request author */
	author: TGitLabUser;
	/** Merge request assignee */
	assignee: TGitLabUser | null;
	/** Merge request assignees */
	assignees: TGitLabUser[];
	/** Merge request reviewers */
	reviewers: TGitLabUser[];
	/** Source project ID */
	source_project_id: number;
	/** Target project ID */
	target_project_id: number;
	/** Labels */
	labels: string[];
	/** Draft */
	draft: boolean;
	/** Work in progress */
	work_in_progress: boolean;
	/** Milestone */
	milestone: {
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
	} | null;
	/** Merge when pipeline succeeds */
	merge_when_pipeline_succeeds: boolean;
	/** Merge user */
	merge_user: TGitLabUser | null;
	/** Merged at */
	merged_at: string | null;
	/** Prepared at */
	prepared_at: string | null;
	/** Closed by */
	closed_by: TGitLabUser | null;
	/** Closed at */
	closed_at: string | null;
	/** Source branch */
	source_branch: string;
	/** Target branch */
	target_branch: string;
	/** User notes count */
	user_notes_count: number;
	/** Upvotes count */
	upvotes: number;
	/** Downvotes count */
	downvotes: number;
	/** Should remove source branch */
	should_remove_source_branch: boolean;
	/** Force remove source branch */
	force_remove_source_branch: boolean;
	/** Allow collaboration */
	allow_collaboration: boolean;
	/** Allow maintainer to push */
	allow_maintainer_to_push: boolean;
	/** Web URL */
	web_url: string;
	/** References */
	references: {
		/** Short reference */
		short: string;
		/** Relative reference */
		relative: string;
		/** Full reference */
		full: string;
	};
	/** Discussion locked */
	discussion_locked: boolean;
	/** Changes count */
	changes_count: string;
	/** Latest build started at */
	latest_build_started_at: string | null;
	/** Latest build finished at */
	latest_build_finished_at: string | null;
	/** First deployed to production at */
	first_deployed_to_production_at: string | null;
	/** Pipeline */
	pipeline: {
		/** Pipeline ID */
		id: number;
		/** Pipeline SHA */
		sha: string;
		/** Pipeline ref */
		ref: string;
		/** Pipeline status */
		status: "created" | "waiting_for_resource" | "preparing" | "pending" | "running" | "success" | "failed" | "canceled" | "skipped" | "manual" | "scheduled";
		/** Pipeline source */
		source: string;
		/** Pipeline web URL */
		web_url: string;
	} | null;
	/** Diff refs */
	diff_refs: {
		/** Base SHA */
		base_sha: string;
		/** Head SHA */
		head_sha: string;
		/** Start SHA */
		start_sha: string;
	};
	/** Merge commit SHA */
	merge_commit_sha: string | null;
	/** Squash commit SHA */
	squash_commit_sha: string | null;
	/** Rebase commit SHA */
	rebase_commit_sha: string | null;
	/** Diverged commits count */
	diverged_commits_count: number;
	/** Rebase in progress */
	rebase_in_progress: boolean;
	/** Approvals before merge */
	approvals_before_merge: number | null;
	/** Head pipeline */
	head_pipeline: {
		/** Pipeline ID */
		id: number;
		/** Pipeline SHA */
		sha: string;
		/** Pipeline ref */
		ref: string;
		/** Pipeline status */
		status: string;
		/** Pipeline web URL */
		web_url: string;
		/** Pipeline before SHA */
		before_sha: string;
		/** Pipeline tag */
		tag: boolean;
		/** Pipeline YAML errors */
		yaml_errors: string | null;
		/** Pipeline user */
		user: TGitLabUser;
		/** Pipeline coverage */
		coverage: string | null;
		/** Pipeline source */
		source: string;
	} | null;
	/** Task completion status */
	task_completion_status: {
		/** Count */
		count: number;
		/** Completed count */
		completed_count: number;
	};
	/** Has conflicts */
	has_conflicts: boolean;
	/** Blocking discussions resolved */
	blocking_discussions_resolved: boolean;
	/** Overflow */
	overflow: boolean;
	/** Time stats */
	time_stats: {
		/** Time estimate */
		time_estimate: number;
		/** Total time spent */
		total_time_spent: number;
		/** Human time estimate */
		human_time_estimate: string | null;
		/** Human total time spent */
		human_total_time_spent: string | null;
	};
	/** Squash */
	squash: boolean;
	/** Subscribed */
	subscribed: boolean;
	/** Squash commit message */
	squash_commit_message: string | null;
	/** Merge commit message */
	merge_commit_message: string | null;
} & TBaseEntity;

export type TGitLabMergeRequestNote = {
	/** Note ID */
	id: number;
	/** Note body */
	body: string;
	/** Attachment */
	attachment: string | null;
	/** Note author */
	author: TGitLabUser;
	/** System note flag */
	system: boolean;
	/** Noteable ID */
	noteable_id: number;
	/** Noteable type */
	noteable_type: "Issue" | "MergeRequest" | "Snippet";
	/** Resolvable flag */
	resolvable: boolean;
	/** Resolved flag */
	resolved: boolean;
	/** Resolved by */
	resolved_by: TGitLabUser | null;
	/** Resolved at */
	resolved_at: string | null;
	/** Confidential */
	confidential: boolean;
	/** Internal */
	internal: boolean;
	/** Note type */
	type: "DiscussionNote" | "DiffNote" | null;
	/** Position (for diff notes) */
	position?: {
		/** Base SHA */
		base_sha: string;
		/** Start SHA */
		start_sha: string;
		/** Head SHA */
		head_sha: string;
		/** Old path */
		old_path: string;
		/** New path */
		new_path: string;
		/** Position type */
		position_type: "text" | "image";
		/** Old line */
		old_line: number | null;
		/** New line */
		new_line: number | null;
		/** Line range */
		line_range?: {
			/** Start line code */
			start: {
				/** Line code */
				line_code: string;
				/** Type */
				type: string;
				/** Old line */
				old_line: number | null;
				/** New line */
				new_line: number | null;
			};
			/** End line code */
			end: {
				/** Line code */
				line_code: string;
				/** Type */
				type: string;
				/** Old line */
				old_line: number | null;
				/** New line */
				new_line: number | null;
			};
		};
	};
} & TBaseEntity;

export type TGitLabMergeRequestCommit = {
	/** Commit ID */
	id: string;
	/** Short ID */
	short_id: string;
	/** Commit title */
	title: string;
	/** Commit message */
	message: string;
	/** Author name */
	author_name: string;
	/** Author email */
	author_email: string;
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
};

export type TGitLabMergeRequestChanges = {
	/** Old path */
	old_path: string;
	/** New path */
	new_path: string;
	/** A mode */
	a_mode: string;
	/** B mode */
	b_mode: string;
	/** Diff */
	diff: string;
	/** New file */
	new_file: boolean;
	/** Renamed file */
	renamed_file: boolean;
	/** Deleted file */
	deleted_file: boolean;
};
