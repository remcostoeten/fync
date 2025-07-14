import type { TBaseEntity } from "./base-entity";
import type { TGitHubUser } from "./github-user";
type TGitHubIssueState = "open" | "closed";
type TGitHubLabel = TBaseEntity & {
	name: string;
	color: string;
	default: boolean;
	description: string | null;
	node_id: string;
	url: string;
};
type TGitHubMilestone = TBaseEntity & {
	number: number;
	title: string;
	description: string | null;
	state: "open" | "closed";
	creator: TGitHubUser;
	open_issues: number;
	closed_issues: number;
	due_on: string | null;
	closed_at: string | null;
	html_url: string;
	labels_url: string;
	node_id: string;
	url: string;
};
type TGitHubIssue = TBaseEntity & {
	number: number;
	title: string;
	user: TGitHubUser;
	labels: TGitHubLabel[];
	state: TGitHubIssueState;
	state_reason: "completed" | "not_planned" | "reopened" | null;
	locked: boolean;
	assignee: TGitHubUser | null;
	assignees: TGitHubUser[];
	milestone: TGitHubMilestone | null;
	comments: number;
	pull_request?: {
		url: string;
		html_url: string;
		diff_url: string;
		patch_url: string;
		merged_at: string | null;
	};
	closed_at: string | null;
	author_association:
		| "COLLABORATOR"
		| "CONTRIBUTOR"
		| "FIRST_TIMER"
		| "FIRST_TIME_CONTRIBUTOR"
		| "MANNEQUIN"
		| "MEMBER"
		| "NONE"
		| "OWNER";
	active_lock_reason: "resolved" | "off-topic" | "too heated" | "spam" | null;
	body: string | null;
	reactions: {
		url: string;
		total_count: number;
		"+1": number;
		"-1": number;
		laugh: number;
		hooray: number;
		confused: number;
		heart: number;
		rocket: number;
		eyes: number;
	};
	timeline_url: string;
	repository_url: string;
	labels_url: string;
	comments_url: string;
	events_url: string;
	html_url: string;
	node_id: string;
	url: string;
};
type TGitHubIssueComment = TBaseEntity & {
	user: TGitHubUser;
	body: string;
	author_association:
		| "COLLABORATOR"
		| "CONTRIBUTOR"
		| "FIRST_TIMER"
		| "FIRST_TIME_CONTRIBUTOR"
		| "MANNEQUIN"
		| "MEMBER"
		| "NONE"
		| "OWNER";
	reactions: {
		url: string;
		total_count: number;
		"+1": number;
		"-1": number;
		laugh: number;
		hooray: number;
		confused: number;
		heart: number;
		rocket: number;
		eyes: number;
	};
	html_url: string;
	issue_url: string;
	node_id: string;
	url: string;
};
type TGitHubIssueEvent = TBaseEntity & {
	actor: TGitHubUser;
	event:
		| "assigned"
		| "unassigned"
		| "labeled"
		| "unlabeled"
		| "opened"
		| "edited"
		| "milestoned"
		| "demilestoned"
		| "closed"
		| "reopened"
		| "subscribed"
		| "unsubscribed"
		| "merged"
		| "referenced"
		| "mentioned"
		| "review_requested"
		| "review_request_removed"
		| "review_dismissed"
		| "locked"
		| "unlocked"
		| "head_ref_deleted"
		| "head_ref_restored"
		| "converted_to_draft"
		| "ready_for_review"
		| "auto_merge_enabled"
		| "auto_merge_disabled";
	commit_id: string | null;
	commit_url: string | null;
	label?: TGitHubLabel;
	assignee?: TGitHubUser;
	milestone?: TGitHubMilestone;
	rename?: {
		from: string;
		to: string;
	};
	dismissed_review?: {
		state: string;
		review_id: number;
		dismissal_message: string;
		dismissal_commit_id: string;
	};
	lock_reason?: string;
	project_card?: {
		id: number;
		url: string;
		project_id: number;
		project_url: string;
		column_name: string;
		previous_column_name?: string;
	};
	url: string;
	actor_id: number;
	node_id: string;
};
type TGitHubNotification = TBaseEntity & {
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
	subject: {
		title: string;
		url: string;
		latest_comment_url: string;
		type:
			| "Issue"
			| "PullRequest"
			| "Commit"
			| "Release"
			| "Discussion"
			| "CheckSuite"
			| "RepositoryVulnerabilityAlert";
	};
	reason:
		| "assign"
		| "author"
		| "comment"
		| "ci_activity"
		| "invitation"
		| "manual"
		| "mention"
		| "push"
		| "review_requested"
		| "security_alert"
		| "state_change"
		| "subscribed"
		| "team_mention";
	unread: boolean;
	last_read_at: string | null;
	url: string;
	subscription_url: string;
};
export type {
	TGitHubIssue,
	TGitHubIssueState,
	TGitHubIssueComment,
	TGitHubIssueEvent,
	TGitHubLabel,
	TGitHubMilestone,
	TGitHubNotification,
};
//# sourceMappingURL=github-issues.d.ts.map
