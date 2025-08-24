import type { TBaseEntity } from "../../core/types";
import type { TGitLabNamespace, TGitLabVisibility, TGitLabStatistics } from "./gitlab-common";

export type TGitLabGroup = {
	/** Group ID */
	id: number;
	/** Group name */
	name: string;
	/** Group path */
	path: string;
	/** Group description */
	description: string | null;
	/** Group visibility level */
	visibility: TGitLabVisibility;
	/** LFS enabled */
	lfs_enabled: boolean;
	/** Avatar URL */
	avatar_url: string | null;
	/** Web URL */
	web_url: string;
	/** Request access enabled */
	request_access_enabled: boolean;
	/** Group path with namespace */
	full_name: string;
	/** Group full path */
	full_path: string;
	/** File template project ID */
	file_template_project_id: number | null;
	/** Parent ID */
	parent_id: number | null;
	/** Whether group is public */
	public: boolean;
	/** Runners token */
	runners_token?: string;
	/** Shared runners setting */
	shared_runners_enabled: boolean;
	/** Shared runners minutes limit */
	shared_runners_minutes_limit: number | null;
	/** Extra shared runners minutes limit */
	extra_shared_runners_minutes_limit: number | null;
	/** Prevent forking outside group */
	prevent_forking_outside_group: boolean;
	/** Membership lock */
	membership_lock: boolean;
	/** Share with group lock */
	share_with_group_lock: boolean;
	/** Require two factor authentication */
	require_two_factor_authentication: boolean;
	/** Two factor grace period */
	two_factor_grace_period: number;
	/** Project creation level */
	project_creation_level: "noone" | "maintainer" | "developer";
	/** Auto devops enabled */
	auto_devops_enabled: boolean;
	/** Subgroup creation level */
	subgroup_creation_level: "owner" | "maintainer";
	/** Emails disabled */
	emails_disabled: boolean;
	/** Emails enabled */
	emails_enabled: boolean;
	/** Mentions disabled */
	mentions_disabled: boolean;
	/** Default branch protection */
	default_branch_protection: number;
	/** Default branch protection defaults */
	default_branch_protection_defaults: {
		/** Allowed to push */
		allowed_to_push: Array<{
			/** Access level */
			access_level: number;
		}>;
		/** Allow force push */
		allow_force_push: boolean;
		/** Allowed to merge */
		allowed_to_merge: Array<{
			/** Access level */
			access_level: number;
		}>;
		/** Allowed to unprotect */
		allowed_to_unprotect: Array<{
			/** Access level */
			access_level: number;
		}>;
	};
	/** LDAP CN */
	ldap_cn: string | null;
	/** LDAP access */
	ldap_access: number | null;
	/** LDAP group links */
	ldap_group_links: Array<{
		/** CN */
		cn: string;
		/** Group access */
		group_access: number;
		/** Provider */
		provider: string;
		/** Filter */
		filter: string | null;
	}>;
	/** SAML group links */
	saml_group_links: Array<{
		/** Access level */
		access_level: number;
		/** SAML group name */
		saml_group_name: string;
	}>;
	/** Shared projects */
	shared_projects: Array<{
		/** Project ID */
		id: number;
		/** Project name */
		name: string;
		/** Project path with namespace */
		path_with_namespace: string;
	}>;
	/** Projects */
	projects?: Array<{
		/** Project ID */
		id: number;
		/** Project name */
		name: string;
		/** Project path */
		path: string;
		/** Project description */
		description: string | null;
		/** Project visibility */
		visibility: TGitLabVisibility;
		/** Project path with namespace */
		path_with_namespace: string;
		/** Default branch */
		default_branch: string | null;
		/** SSH URL to repo */
		ssh_url_to_repo: string;
		/** HTTP URL to repo */
		http_url_to_repo: string;
		/** Web URL */
		web_url: string;
		/** Tag list */
		tag_list: string[];
		/** Created at */
		created_at: string;
		/** Last activity at */
		last_activity_at: string;
		/** Archived */
		archived: boolean;
	}>;
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
	/** Statistics */
	statistics?: TGitLabStatistics;
	/** Custom attributes */
	custom_attributes?: Array<{
		/** Attribute key */
		key: string;
		/** Attribute value */
		value: string;
	}>;
	/** Marked for deletion on */
	marked_for_deletion_on: string | null;
} & TBaseEntity;

export type TGitLabGroupMember = {
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
	/** Membership state */
	membership_state: "active" | "awaiting" | "active";
} & TBaseEntity;

export type TGitLabGroupVariable = {
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

export type TGitLabSubgroup = {
	/** Subgroup ID */
	id: number;
	/** Subgroup name */
	name: string;
	/** Subgroup path */
	path: string;
	/** Subgroup description */
	description: string | null;
	/** Subgroup visibility */
	visibility: TGitLabVisibility;
	/** Avatar URL */
	avatar_url: string | null;
	/** Web URL */
	web_url: string;
	/** Full name */
	full_name: string;
	/** Full path */
	full_path: string;
	/** Parent ID */
	parent_id: number;
} & TBaseEntity;
