import type { TBaseEntity } from "../../core/types";
import type { TGitLabUser } from "./gitlab-user";
import type { TGitLabVisibility } from "./gitlab-common";

export type TGitLabSnippet = {
	/** Snippet ID */
	id: number;
	/** Snippet title */
	title: string;
	/** Snippet file name */
	file_name: string;
	/** Snippet description */
	description: string | null;
	/** Snippet author */
	author: TGitLabUser;
	/** Snippet visibility level */
	visibility: TGitLabVisibility;
	/** Project ID (null for personal snippets) */
	project_id: number | null;
	/** Web URL */
	web_url: string;
	/** Raw URL */
	raw_url: string;
	/** SSH URL to repo */
	ssh_url_to_repo: string;
	/** HTTP URL to repo */
	http_url_to_repo: string;
	/** Repository storage */
	repository_storage: string;
	/** Files */
	files: Array<{
		/** File path */
		path: string;
		/** Raw URL */
		raw_url: string;
	}>;
} & TBaseEntity;

export type TGitLabSnippetContent = {
	/** Content */
	content: string;
};

export type TGitLabSnippetFile = {
	/** File path */
	path: string;
	/** File content */
	content: string;
};
