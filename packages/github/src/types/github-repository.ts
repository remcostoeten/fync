import type { TBaseEntity } from "./base-entity";
import type { TGitHubUser } from "./github-user";

export type TGitHubRepository = {
	/** The repository name */
	name: string;
	/** The full name of the repository (owner/repo) */
	full_name: string;
	/** The repository owner */
	owner: TGitHubUser;
	/** Whether the repository is private */
	private: boolean;
	/** URL to the repository on GitHub */
	html_url: string;
	/** The repository description */
	description: string | null;
	/** Whether this repository is a fork */
	fork: boolean;
	/** The primary programming language */
	language: string | null;
	/** Number of forks */
	forks_count: number;
	/** Number of stars */
	stargazers_count: number;
	/** Number of watchers */
	watchers_count: number;
	/** Size of the repository in KB */
	size: number;
	/** The default branch name */
	default_branch: string;
	/** Number of open issues */
	open_issues_count: number;
	/** Array of repository topics */
	topics: string[];
	/** Whether the repository is archived */
	archived: boolean;
	/** Whether the repository is disabled */
	disabled: boolean;
	/** Repository visibility setting */
	visibility: "public" | "private" | "internal";
	/** Timestamp of the last push */
	pushed_at: string;
	/** HTTPS clone URL */
	clone_url: string;
	/** SSH clone URL */
	ssh_url: string;
	/** The repository homepage URL */
	homepage: string | null;
	/** License information */
	license: {
		/** License key identifier */
		key: string;
		/** License name */
		name: string;
		/** SPDX license identifier */
		spdx_id: string;
		/** URL to license information */
		url: string | null;
	} | null;
} & TBaseEntity;
