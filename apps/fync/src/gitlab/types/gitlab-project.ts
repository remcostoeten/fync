import type { TBaseEntity } from "../../core/types";
import type { TGitLabUser } from "./gitlab-user";
import type { TGitLabNamespace, TGitLabVisibility, TGitLabStatistics, TGitLabLinks } from "./gitlab-common";

export type TGitLabProject = {
	/** Project ID */
	id: number;
	/** Project name */
	name: string;
	/** Project path */
	path: string;
	/** Project description */
	description: string | null;
	/** Default branch name */
	default_branch: string | null;
	/** Project visibility level */
	visibility: TGitLabVisibility;
	/** SSH URL to repository */
	ssh_url_to_repo: string;
	/** HTTP URL to repository */
	http_url_to_repo: string;
	/** Web URL */
	web_url: string;
	/** README URL */
	readme_url: string | null;
	/** Array of project tags */
	tag_list: string[];
	/** Array of project topics */
	topics: string[];
	/** Project owner */
	owner: TGitLabUser | null;
	/** Project name with namespace */
	name_with_namespace: string;
	/** Project path with namespace */
	path_with_namespace: string;
	/** Issues enabled flag */
	issues_enabled: boolean;
	/** Open issues count */
	open_issues_count: number;
	/** Merge requests enabled flag */
	merge_requests_enabled: boolean;
	/** Jobs enabled flag */
	jobs_enabled: boolean;
	/** Wiki enabled flag */
	wiki_enabled: boolean;
	/** Snippets enabled flag */
	snippets_enabled: boolean;
	/** Can create merge request in target project */
	can_create_merge_request_in: boolean;
	/** Resolve outdated diff discussions */
	resolve_outdated_diff_discussions: boolean;
	/** Container registry enabled */
	container_registry_enabled: boolean;
	/** Container registry access level */
	container_registry_access_level: "disabled" | "private" | "enabled";
	/** Security and compliance access level */
	security_and_compliance_access_level: "disabled" | "private" | "enabled";
	/** Releases access level */
	releases_access_level: "disabled" | "private" | "enabled";
	/** Environments access level */
	environments_access_level: "disabled" | "private" | "enabled";
	/** Feature flags access level */
	feature_flags_access_level: "disabled" | "private" | "enabled";
	/** Infrastructure access level */
	infrastructure_access_level: "disabled" | "private" | "enabled";
	/** Monitor access level */
	monitor_access_level: "disabled" | "private" | "enabled";
	/** Model experiments access level */
	model_experiments_access_level: "disabled" | "private" | "enabled";
	/** Model registry access level */
	model_registry_access_level: "disabled" | "private" | "enabled";
	/** Creator ID */
	creator_id: number;
	/** Namespace */
	namespace: TGitLabNamespace;
	/** Import status */
	import_status: "none" | "scheduled" | "started" | "finished" | "failed";
	/** Import error */
	import_error: string | null;
	/** Permissions */
	permissions: {
		/** Project access */
		project_access: {
			/** Access level */
			access_level: number;
			/** Notification level */
			notification_level: number;
		} | null;
		/** Group access */
		group_access: {
			/** Access level */
			access_level: number;
			/** Notification level */
			notification_level: number;
		} | null;
	};
	/** Whether project is archived */
	archived: boolean;
	/** Avatar URL */
	avatar_url: string | null;
	/** License */
	license: {
		/** License key */
		key: string;
		/** License name */
		name: string;
		/** License nickname */
		nickname: string | null;
		/** License HTML URL */
		html_url: string | null;
		/** License source URL */
		source_url: string | null;
	} | null;
	/** Shared runners enabled */
	shared_runners_enabled: boolean;
	/** Group runners enabled */
	group_runners_enabled: boolean;
	/** Forks count */
	forks_count: number;
	/** Star count */
	star_count: number;
	/** Runners token */
	runners_token?: string;
	/** CI config path */
	ci_config_path: string | null;
	/** Public jobs */
	public_jobs: boolean;
	/** Shared with groups */
	shared_with_groups: Array<{
		/** Group ID */
		group_id: number;
		/** Group name */
		group_name: string;
		/** Group full path */
		group_full_path: string;
		/** Group access level */
		group_access_level: number;
		/** Expires at */
		expires_at: string | null;
	}>;
	/** Repository storage */
	repository_storage: string;
	/** Only allow merge if pipeline succeeds */
	only_allow_merge_if_pipeline_succeeds: boolean;
	/** Allow merge on skipped pipeline */
	allow_merge_on_skipped_pipeline: boolean;
	/** Restrict user defined variables */
	restrict_user_defined_variables: boolean;
	/** Only allow merge if all discussions are resolved */
	only_allow_merge_if_all_discussions_are_resolved: boolean;
	/** Remove source branch after merge */
	remove_source_branch_after_merge: boolean;
	/** Request access enabled */
	request_access_enabled: boolean;
	/** Merge method */
	merge_method: "merge" | "rebase_merge" | "ff";
	/** Squash option */
	squash_option: "never" | "always" | "default_on" | "default_off";
	/** Auto devops enabled */
	autoclose_referenced_issues: boolean;
	/** Suggestion commit message */
	suggestion_commit_message: string | null;
	/** Merge commit template */
	merge_commit_template: string | null;
	/** Squash commit template */
	squash_commit_template: string | null;
	/** Issue branch template */
	issue_branch_template: string | null;
	/** Auto devops deploy strategy */
	auto_devops_deploy_strategy: "continuous" | "manual" | "timed_incremental";
	/** Auto devops enabled */
	auto_devops_enabled: boolean;
	/** Build coverage regex */
	build_coverage_regex: string | null;
	/** CI forward deployment enabled */
	ci_forward_deployment_enabled: boolean;
	/** CI separated caches */
	ci_separated_caches: boolean;
	/** CI allow fork pipelines to run in parent project */
	ci_allow_fork_pipelines_to_run_in_parent_project: boolean;
	/** Build timeout */
	build_timeout: number;
	/** Auto cancel pending pipelines */
	auto_cancel_pending_pipelines: "disabled" | "enabled";
	/** Build git strategy */
	build_git_strategy: "clone" | "fetch";
	/** Build git submodule strategy */
	build_git_submodule_strategy: "none" | "normal" | "recursive";
	/** CI job token scope enabled */
	ci_job_token_scope_enabled: boolean;
	/** CI opt in JWT */
	ci_opt_in_jwt: boolean;
	/** CI push repository for job token allowed */
	ci_push_repository_for_job_token_allowed: boolean;
	/** Public builds */
	public_builds: boolean;
	/** Last activity at */
	last_activity_at: string;
	/** Statistics */
	statistics?: TGitLabStatistics;
	/** Container expiration policy */
	container_expiration_policy: {
		/** Cadence */
		cadence: string;
		/** Enabled */
		enabled: boolean;
		/** Keep n */
		keep_n: number;
		/** Older than */
		older_than: string;
		/** Name regex */
		name_regex: string;
		/** Name regex keep */
		name_regex_keep: string | null;
		/** Next run at */
		next_run_at: string;
	};
	/** Can create merge request in target project */
	can_create_merge_request_in_target: boolean;
	/** Issues template */
	issues_template: string | null;
	/** Merge requests template */
	merge_requests_template: string | null;
	/** Keep latest artifact */
	keep_latest_artifact: boolean;
	/** Merge trains enabled */
	merge_trains_enabled: boolean;
	/** API links */
	_links: TGitLabLinks;
	/** Packages enabled */
	packages_enabled: boolean;
	/** Empty repo */
	empty_repo: boolean;
	/** Forked from project */
	forked_from_project?: TGitLabProject;
	/** Mirror */
	mirror: boolean;
	/** Mirror user ID */
	mirror_user_id: number | null;
	/** Mirror trigger builds */
	mirror_trigger_builds: boolean;
	/** Only mirror protected branches */
	only_mirror_protected_branches: boolean;
	/** Mirror overwrites diverged branches */
	mirror_overwrites_diverged_branches: boolean;
	/** External authorization classification label */
	external_authorization_classification_label: string;
	/** Requirements enabled */
	requirements_enabled: boolean;
	/** Requirements access level */
	requirements_access_level: "disabled" | "private" | "enabled";
	/** Security and compliance enabled */
	security_and_compliance_enabled: boolean;
	/** Compliance frameworks */
	compliance_frameworks: Array<{
		/** Framework ID */
		id: number;
		/** Framework name */
		name: string;
		/** Framework description */
		description: string;
		/** Framework color */
		color: string;
		/** Default framework */
		default: boolean;
	}>;
	/** Marked for deletion at */
	marked_for_deletion_at: string | null;
	/** Marked for deletion on */
	marked_for_deletion_on: string | null;
} & TBaseEntity;

export type TGitLabProjectMember = {
	/** Member ID */
	id: number;
	/** Username */
	username: string;
	/** User's full name */
	name: string;
	/** Member state */
	state: string;
	/** Avatar URL */
	avatar_url: string | null;
	/** Web URL */
	web_url: string;
	/** Access level */
	access_level: number;
	/** Email */
	email?: string;
	/** Expires at */
	expires_at: string | null;
} & TBaseEntity;

export type TGitLabProjectVariable = {
	/** Variable key */
	key: string;
	/** Variable value */
	value: string;
	/** Variable type */
	variable_type: "env_var" | "file";
	/** Whether variable is protected */
	protected: boolean;
	/** Whether variable is masked */
	masked: boolean;
	/** Whether variable is raw */
	raw: boolean;
	/** Environment scope */
	environment_scope: string;
	/** Variable description */
	description: string | null;
};
