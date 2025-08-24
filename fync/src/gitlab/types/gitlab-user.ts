import type { TBaseEntity } from "../../core/types";

export type TGitLabUser = {
	/** User ID */
	id: number;
	/** Username */
	username: string;
	/** User's full name */
	name: string;
	/** User state (active, blocked, etc.) */
	state: "active" | "blocked" | "deactivated";
	/** Avatar URL */
	avatar_url: string | null;
	/** Web URL to user profile */
	web_url: string;
	/** User email (only visible to authenticated users) */
	email?: string;
	/** User location */
	location?: string | null;
	/** User bio */
	bio?: string | null;
	/** User's local time zone */
	local_time?: string | null;
	/** User's Skype username */
	skype?: string | null;
	/** User's LinkedIn profile */
	linkedin?: string | null;
	/** User's Twitter handle */
	twitter?: string | null;
	/** User's website URL */
	website_url?: string | null;
	/** User's organization */
	organization?: string | null;
	/** User's job title */
	job_title?: string | null;
	/** User's work information */
	work_information?: string | null;
	/** Number of followers */
	followers?: number;
	/** Number of users following */
	following?: number;
	/** Whether user is administrator */
	is_admin?: boolean;
	/** Whether user can create groups */
	can_create_group?: boolean;
	/** Whether user can create projects */
	can_create_project?: boolean;
	/** Whether user has two-factor authentication enabled */
	two_factor_enabled?: boolean;
	/** Whether user is external */
	external?: boolean;
	/** Whether user's profile is private */
	private_profile?: boolean;
	/** Number of public projects */
	public_repos?: number;
	/** Highest access level among user's projects */
	highest_role?: number;
	/** User's theme ID */
	theme_id?: number;
	/** User's color scheme ID */
	color_scheme_id?: number;
	/** Current user's status */
	status?: {
		/** Status emoji */
		emoji: string;
		/** Status message */
		message: string;
		/** Status message HTML */
		message_html: string;
		/** Status availability */
		availability: "not_set" | "busy";
		/** Status clear at date */
		clear_status_at: string | null;
	} | null;
	/** User's last sign-in timestamp */
	last_sign_in_at?: string | null;
	/** User's current sign-in timestamp */
	current_sign_in_at?: string | null;
	/** User's last activity timestamp */
	last_activity_on?: string | null;
	/** Whether user is confirmed */
	confirmed_at?: string | null;
	/** User's provider */
	provider?: string | null;
	/** User's external UID */
	extern_uid?: string | null;
	/** User's identity provider */
	identity_provider?: string | null;
} & TBaseEntity;

export type TGitLabUserEmail = {
	/** Email ID */
	id: number;
	/** Email address */
	email: string;
	/** Whether email is confirmed */
	confirmed_at: string | null;
} & TBaseEntity;

export type TGitLabUserKey = {
	/** SSH key ID */
	id: number;
	/** SSH key title */
	title: string;
	/** SSH key content */
	key: string;
	/** SSH key fingerprint */
	fingerprint: string;
	/** Whether key can push */
	can_push: boolean;
	/** Key usage type */
	usage_type: "auth" | "auth_and_signing" | "signing";
	/** Key expiration date */
	expires_at: string | null;
} & TBaseEntity;

export type TGitLabUserGPGKey = {
	/** GPG key ID */
	id: number;
	/** GPG key content */
	key: string;
	/** Key subkeys */
	subkeys: Array<{
		/** Subkey ID */
		id: number;
		/** Subkey fingerprint */
		fingerprint: string;
		/** Key ID */
		keyid: string;
		/** Whether key can encrypt */
		can_encrypt: boolean;
		/** Whether key can sign */
		can_sign: boolean;
		/** Whether key can certify */
		can_certify: boolean;
		/** Whether key can authenticate */
		can_authenticate: boolean;
		/** Key expiration date */
		expires_at: string | null;
	}>;
} & TBaseEntity;
