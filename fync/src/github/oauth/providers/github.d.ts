import type { TOAuth2Provider } from "../types";
declare const GITHUB_OAUTH2_PROVIDER: TOAuth2Provider;
declare const GITHUB_OAUTH2_SCOPES: {
	readonly USER_EMAIL: "user:email";
	readonly USER_READ: "user";
	readonly REPO_READ: "repo";
	readonly REPO_WRITE: "repo";
	readonly REPO_STATUS: "repo:status";
	readonly REPO_DEPLOYMENT: "repo_deployment";
	readonly PUBLIC_REPO: "public_repo";
	readonly REPO_INVITE: "repo:invite";
	readonly SECURITY_EVENTS: "security_events";
	readonly ADMIN_READ_REPO_HOOK: "admin:repo_hook";
	readonly ADMIN_WRITE_REPO_HOOK: "admin:repo_hook";
	readonly ADMIN_READ_ORG: "admin:org";
	readonly ADMIN_WRITE_ORG: "admin:org";
	readonly ADMIN_READ_PUBLIC_KEY: "admin:public_key";
	readonly ADMIN_WRITE_PUBLIC_KEY: "admin:public_key";
	readonly ADMIN_READ_ORG_HOOK: "admin:org_hook";
	readonly ADMIN_WRITE_ORG_HOOK: "admin:org_hook";
	readonly GIST: "gist";
	readonly NOTIFICATIONS: "notifications";
	readonly DELETE_REPO: "delete_repo";
	readonly READ_DISCUSSION: "read:discussion";
	readonly WRITE_DISCUSSION: "write:discussion";
	readonly READ_PACKAGES: "read:packages";
	readonly WRITE_PACKAGES: "write:packages";
	readonly DELETE_PACKAGES: "delete:packages";
	readonly READ_GPG_KEY: "read:gpg_key";
	readonly WRITE_GPG_KEY: "write:gpg_key";
	readonly READ_SSH_SIGNING_KEY: "read:ssh_signing_key";
	readonly WRITE_SSH_SIGNING_KEY: "write:ssh_signing_key";
	readonly CODESPACE: "codespace";
	readonly WORKFLOW: "workflow";
	readonly READ_PROJECT: "read:project";
	readonly WRITE_PROJECT: "write:project";
	readonly READ_ENTERPRISE: "read:enterprise";
	readonly MANAGE_ENTERPRISE: "manage_enterprise";
	readonly AUDIT_LOG: "audit_log";
	readonly COPILOT: "copilot";
};
type TGitHubOAuth2Scope =
	(typeof GITHUB_OAUTH2_SCOPES)[keyof typeof GITHUB_OAUTH2_SCOPES];
declare function validateGitHubScopes(scopes: readonly string[]): void;
declare function getCommonScopeGroups(): {
	READ_ONLY: (
		| "user:email"
		| "public_repo"
		| "read:discussion"
		| "read:packages"
		| "read:project"
	)[];
	READ_WRITE: ("notifications" | "user:email" | "repo" | "gist" | "workflow")[];
	ADMIN: (
		| "user:email"
		| "repo"
		| "admin:repo_hook"
		| "admin:org"
		| "delete_repo"
		| "workflow"
	)[];
};
export {
	GITHUB_OAUTH2_PROVIDER,
	GITHUB_OAUTH2_SCOPES,
	validateGitHubScopes,
	getCommonScopeGroups,
};
export type { TGitHubOAuth2Scope };
//# sourceMappingURL=github.d.ts.map
