const GITHUB_OAUTH2_PROVIDER = {
	name: "github",
	authorizationUrl: "https://github.com/login/oauth/authorize",
	tokenUrl: "https://github.com/login/oauth/access_token",
	revokeUrl: "https://api.github.com/applications/{client_id}/token",
	userInfoUrl: "https://api.github.com/user",
	defaultScopes: ["user:email"],
	scopeSeparator: " ",
};
const GITHUB_OAUTH2_SCOPES = {
	USER_EMAIL: "user:email",
	USER_READ: "user",
	REPO_READ: "repo",
	REPO_WRITE: "repo",
	REPO_STATUS: "repo:status",
	REPO_DEPLOYMENT: "repo_deployment",
	PUBLIC_REPO: "public_repo",
	REPO_INVITE: "repo:invite",
	SECURITY_EVENTS: "security_events",
	ADMIN_READ_REPO_HOOK: "admin:repo_hook",
	ADMIN_WRITE_REPO_HOOK: "admin:repo_hook",
	ADMIN_READ_ORG: "admin:org",
	ADMIN_WRITE_ORG: "admin:org",
	ADMIN_READ_PUBLIC_KEY: "admin:public_key",
	ADMIN_WRITE_PUBLIC_KEY: "admin:public_key",
	ADMIN_READ_ORG_HOOK: "admin:org_hook",
	ADMIN_WRITE_ORG_HOOK: "admin:org_hook",
	GIST: "gist",
	NOTIFICATIONS: "notifications",
	DELETE_REPO: "delete_repo",
	READ_DISCUSSION: "read:discussion",
	WRITE_DISCUSSION: "write:discussion",
	READ_PACKAGES: "read:packages",
	WRITE_PACKAGES: "write:packages",
	DELETE_PACKAGES: "delete:packages",
	READ_GPG_KEY: "read:gpg_key",
	WRITE_GPG_KEY: "write:gpg_key",
	READ_SSH_SIGNING_KEY: "read:ssh_signing_key",
	WRITE_SSH_SIGNING_KEY: "write:ssh_signing_key",
	CODESPACE: "codespace",
	WORKFLOW: "workflow",
	READ_PROJECT: "read:project",
	WRITE_PROJECT: "write:project",
	READ_ENTERPRISE: "read:enterprise",
	MANAGE_ENTERPRISE: "manage_enterprise",
	AUDIT_LOG: "audit_log",
	COPILOT: "copilot",
};
function validateGitHubScopes(scopes) {
	const validScopes = Object.values(GITHUB_OAUTH2_SCOPES);
	for (const scope of scopes) {
		if (!validScopes.includes(scope)) {
			throw new Error(`Invalid GitHub OAuth2 scope: ${scope}`);
		}
	}
}
function getCommonScopeGroups() {
	return {
		READ_ONLY: [
			GITHUB_OAUTH2_SCOPES.USER_EMAIL,
			GITHUB_OAUTH2_SCOPES.PUBLIC_REPO,
			GITHUB_OAUTH2_SCOPES.READ_DISCUSSION,
			GITHUB_OAUTH2_SCOPES.READ_PACKAGES,
			GITHUB_OAUTH2_SCOPES.READ_PROJECT,
		],
		READ_WRITE: [
			GITHUB_OAUTH2_SCOPES.USER_EMAIL,
			GITHUB_OAUTH2_SCOPES.REPO_READ,
			GITHUB_OAUTH2_SCOPES.GIST,
			GITHUB_OAUTH2_SCOPES.NOTIFICATIONS,
			GITHUB_OAUTH2_SCOPES.WORKFLOW,
		],
		ADMIN: [
			GITHUB_OAUTH2_SCOPES.USER_EMAIL,
			GITHUB_OAUTH2_SCOPES.REPO_WRITE,
			GITHUB_OAUTH2_SCOPES.ADMIN_READ_ORG,
			GITHUB_OAUTH2_SCOPES.ADMIN_WRITE_ORG,
			GITHUB_OAUTH2_SCOPES.ADMIN_READ_REPO_HOOK,
			GITHUB_OAUTH2_SCOPES.ADMIN_WRITE_REPO_HOOK,
			GITHUB_OAUTH2_SCOPES.DELETE_REPO,
			GITHUB_OAUTH2_SCOPES.WORKFLOW,
		],
	};
}
export {
	GITHUB_OAUTH2_PROVIDER,
	GITHUB_OAUTH2_SCOPES,
	validateGitHubScopes,
	getCommonScopeGroups,
};
//# sourceMappingURL=github.js.map
