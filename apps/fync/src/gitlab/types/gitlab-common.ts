export type TGitLabConfig = {
	token?: string;
	baseUrl?: string;
	cache?: boolean;
	cacheTTL?: number;
	userAgent?: string;
};

export type TGitLabVisibility = "private" | "internal" | "public";

export type TGitLabAccessLevel = 10 | 20 | 30 | 40 | 50;

export type TGitLabMemberAccess = {
	guest: 10;
	reporter: 20;
	developer: 30;
	maintainer: 40;
	owner: 50;
};

export type TGitLabNamespace = {
	/** Namespace ID */
	id: number;
	/** Namespace name */
	name: string;
	/** Namespace path/username */
	path: string;
	/** Namespace kind (user or group) */
	kind: "user" | "group";
	/** Full path including parent groups */
	full_path: string;
	/** Parent namespace ID */
	parent_id: number | null;
	/** Avatar URL */
	avatar_url: string | null;
	/** Web URL */
	web_url: string;
};

export type TGitLabStatistics = {
	/** Commit count */
	commit_count: number;
	/** Storage size in bytes */
	storage_size: number;
	/** Repository size in bytes */
	repository_size: number;
	/** Wiki size in bytes */
	wiki_size: number;
	/** LFS objects size in bytes */
	lfs_objects_size: number;
	/** Job artifacts size in bytes */
	job_artifacts_size: number;
	/** Pipeline artifacts size in bytes */
	pipeline_artifacts_size: number;
	/** Packages size in bytes */
	packages_size: number;
	/** Snippets size in bytes */
	snippets_size: number;
	/** Uploads size in bytes */
	uploads_size: number;
};

export type TGitLabLinks = {
	/** Self API URL */
	self: string;
	/** Issues API URL */
	issues: string;
	/** Merge requests API URL */
	merge_requests: string;
	/** Repository branches API URL */
	repo_branches: string;
	/** Labels API URL */
	labels: string;
	/** Events API URL */
	events: string;
	/** Members API URL */
	members: string;
	/** Cluster agents API URL */
	cluster_agents?: string;
};
