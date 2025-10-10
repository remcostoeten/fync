import type { TBaseEntity } from "../../core/types";

export type TGitHubUser = {
	/** The GitHub username */
	login: string;
	/** URL to the user's avatar image */
	avatar_url: string;
	/** URL to the user's GitHub profile */
	html_url: string;
	/** The user's full name */
	name: string | null;
	/** The user's company */
	company: string | null;
	/** The user's blog URL */
	blog: string | null;
	/** The user's location */
	location: string | null;
	/** The user's email address */
	email: string | null;
	/** The user's bio */
	bio: string | null;
	/** Number of public repositories */
	public_repos: number;
	/** Number of public gists */
	public_gists: number;
	/** Number of followers */
	followers: number;
	/** Number of users this user is following */
	following: number;
	/** The type of GitHub account */
	type: "User" | "Organization";
	/** Whether the user is a site administrator */
	site_admin: boolean;
} & TBaseEntity;
