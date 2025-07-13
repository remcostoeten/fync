import type { TBaseEntity } from "./base-entity";
export type TGitHubOrganization = {
    /** The organization name */
    login: string;
    /** URL to the organization's avatar image */
    avatar_url: string;
    /** URL to the organization's GitHub profile */
    html_url: string;
    /** The organization's display name */
    name: string | null;
    /** The organization's company */
    company: string | null;
    /** The organization's blog URL */
    blog: string | null;
    /** The organization's location */
    location: string | null;
    /** The organization's email address */
    email: string | null;
    /** The organization's bio */
    bio: string | null;
    /** Number of public repositories */
    public_repos: number;
    /** Number of public gists */
    public_gists: number;
    /** Number of followers */
    followers: number;
    /** Number of users this organization is following */
    following: number;
    /** The type of GitHub account */
    type: "Organization";
    /** Whether the organization is a site administrator */
    site_admin: boolean;
    /** The organization's Twitter username */
    twitter_username: string | null;
    /** Number of members in the organization */
    public_members: number;
    /** Number of private repositories (if available) */
    total_private_repos?: number;
    /** Number of owned private repositories (if available) */
    owned_private_repos?: number;
    /** Number of private gists (if available) */
    private_gists?: number;
    /** Disk usage in bytes (if available) */
    disk_usage?: number;
    /** Number of collaborators (if available) */
    collaborators?: number;
    /** Billing email (if available) */
    billing_email?: string;
    /** Plan information (if available) */
    plan?: {
        name: string;
        space: number;
        private_repos: number;
        collaborators: number;
    };
} & TBaseEntity;
//# sourceMappingURL=github-organization.d.ts.map