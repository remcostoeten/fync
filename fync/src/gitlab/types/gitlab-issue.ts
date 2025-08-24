import type { TBaseEntity } from "../../core/types";
import type { TGitLabUser } from "./gitlab-user";

export type TGitLabIssue = {
	/** Issue ID */
	id: number;
	/** Issue internal ID */
	iid: number;
	/** Project ID */
	project_id: number;
	/** Issue title */
	title: string;
	/** Issue description */
	description: string | null;
	/** Issue state */
	state: "opened" | "closed";
	/** Issue author */
	author: TGitLabUser;
	/** Issue assignee */
	assignee: TGitLabUser | null;
	/** Issue assignees */
	assignees: TGitLabUser[];
	/** Issue type */
	issue_type: "issue" | "incident" | "test_case" | "requirement" | "task";
	/** Labels */
	labels: string[];
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
	/** User notes count */
	user_notes_count: number;
	/** Merge requests count */
	merge_requests_count: number;
	/** Upvotes count */
	upvotes: number;
	/** Downvotes count */
	downvotes: number;
	/** Due date */
	due_date: string | null;
	/** Confidential flag */
	confidential: boolean;
	/** Discussion locked flag */
	discussion_locked: boolean;
	/** Issue link */
	issue_link_id: number | null;
	/** Web URL */
	web_url: string;
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
	/** Task completion status */
	task_completion_status: {
		/** Count */
		count: number;
		/** Completed count */
		completed_count: number;
	};
	/** Blocking issues count */
	blocking_issues_count: number;
	/** Has tasks */
	has_tasks: boolean;
	/** Task status */
	task_status: string;
	/** Links */
	_links: {
		/** Self link */
		self: string;
		/** Notes link */
		notes: string;
		/** Award emoji link */
		award_emoji: string;
		/** Project link */
		project: string;
		/** Closed as duplicate of link */
		closed_as_duplicate_of?: string;
	};
	/** References */
	references: {
		/** Short reference */
		short: string;
		/** Relative reference */
		relative: string;
		/** Full reference */
		full: string;
	};
	/** Severity */
	severity: "unknown" | "low" | "medium" | "high" | "critical";
	/** Subscribed */
	subscribed: boolean;
	/** Moved to ID */
	moved_to_id: number | null;
	/** Service desk reply to */
	service_desk_reply_to: string | null;
	/** Health status */
	health_status: "on_track" | "needs_attention" | "at_risk" | null;
	/** Weight */
	weight: number | null;
	/** Epic */
	epic: {
		/** Epic ID */
		id: number;
		/** Epic internal ID */
		iid: number;
		/** Epic title */
		title: string;
		/** Epic description */
		description: string | null;
		/** Epic state */
		state: "opened" | "closed";
		/** Epic web URL */
		web_url: string;
		/** Epic references */
		references: {
			/** Short reference */
			short: string;
			/** Relative reference */
			relative: string;
			/** Full reference */
			full: string;
		};
		/** Epic author */
		author: TGitLabUser;
		/** Start date */
		start_date: string | null;
		/** Due date */
		due_date: string | null;
		/** Epic color */
		color: string;
		/** Labels */
		labels: string[];
		/** Upvotes */
		upvotes: number;
		/** Downvotes */
		downvotes: number;
		/** Group ID */
		group_id: number;
		/** Parent ID */
		parent_id: number | null;
		/** Confidential */
		confidential: boolean;
	} | null;
	/** Closed at */
	closed_at: string | null;
	/** Closed by */
	closed_by: TGitLabUser | null;
} & TBaseEntity;

export type TGitLabIssueNote = {
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
	/** Commands changes */
	commands_changes: {
		/** Assignee IDs */
		assignee_ids?: {
			/** Old values */
			old: number[];
			/** New values */
			new: number[];
		};
		/** Epic */
		epic?: {
			/** Old epic */
			old: number | null;
			/** New epic */
			new: number | null;
		};
		/** Time estimate */
		time_estimate?: {
			/** Old estimate */
			old: number;
			/** New estimate */
			new: number;
		};
		/** Spend time */
		spend_time?: {
			/** Duration */
			duration: number;
			/** User */
			user: TGitLabUser;
			/** Spent at */
			spent_at: string;
		};
	};
} & TBaseEntity;
