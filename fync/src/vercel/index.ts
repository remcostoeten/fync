import {
	createApiBuilder,
	defineResource,
	type TModule,
} from "../core";

const VERCEL_API_BASE = "https://api.vercel.com";

const projectResource = defineResource({
	name: "projects",
	basePath: "/v9/projects",
	methods: {
		listProjects: { path: "" },
		getProject: { path: "/{projectId}" },
		createProject: { path: "", method: "POST" },
		updateProject: { path: "/{projectId}", method: "PATCH" },
		deleteProject: { path: "/{projectId}", method: "DELETE" },
		getProjectDomains: { path: "/{projectId}/domains" },
		getProjectEnvVars: { path: "/{projectId}/env" },
		createProjectEnvVar: { path: "/{projectId}/env", method: "POST" },
	},
});

const deploymentResource = defineResource({
	name: "deployments",
	basePath: "/v13/deployments",
	methods: {
		listDeployments: { path: "" },
		getDeployment: { path: "/{deploymentId}" },
		deleteDeployment: { path: "/{deploymentId}", method: "DELETE" },
		getDeploymentEvents: { path: "/{deploymentId}/events" },
		getDeploymentFiles: { path: "/{deploymentId}/files" },
		cancelDeployment: { path: "/{deploymentId}/cancel", method: "PATCH" },
	},
});

const domainResource = defineResource({
	name: "domains",
	basePath: "/v5/domains",
	methods: {
		listDomains: { path: "" },
		getDomain: { path: "/{domain}" },
		addDomain: { path: "", method: "POST" },
		removeDomain: { path: "/{domain}", method: "DELETE" },
		verifyDomain: { path: "/{domain}/verify", method: "POST" },
		getDomainConfig: { path: "/{domain}/config" },
	},
});

const teamResource = defineResource({
	name: "teams",
	basePath: "/v2/teams",
	methods: {
		listTeams: { path: "" },
		getTeam: { path: "/{teamId}" },
		createTeam: { path: "", method: "POST" },
		updateTeam: { path: "/{teamId}", method: "PATCH" },
		deleteTeam: { path: "/{teamId}", method: "DELETE" },
		getTeamMembers: { path: "/{teamId}/members" },
		inviteTeamMember: { path: "/{teamId}/members", method: "POST" },
	},
});

const userResource = defineResource({
	name: "user",
	basePath: "/v2/user",
	methods: {
		getUser: { path: "" },
		updateUser: { path: "", method: "PATCH" },
		deleteUser: { path: "", method: "DELETE" },
		getUserEvents: { path: "/events" },
		getUserTokens: { path: "/tokens" },
	},
});

const resources = {
	projects: projectResource,
	deployments: deploymentResource,
	domains: domainResource,
	teams: teamResource,
	user: userResource,
};

const buildVercel = createApiBuilder({
	baseUrl: VERCEL_API_BASE,
	auth: { type: "bearer" as const },
	headers: {
		"Content-Type": "application/json",
	},
});

type TVercelModule = TModule<typeof resources> & {
	getProject: (projectId: string) => Promise<any>;
	listProjects: (teamId?: string) => Promise<any>;
	getLatestDeployment: (projectId: string) => Promise<any>;
	getDeploymentStatus: (deploymentId: string) => Promise<any>;
	redeployProject: (projectId: string) => Promise<any>;
	getProjectAnalytics: (projectId: string, options?: any) => Promise<any>;
	getDomainStatus: (domain: string) => Promise<any>;
	getTeamUsage: (teamId: string) => Promise<any>;
};

export function Vercel(config: { token: string; teamId?: string }): TVercelModule {
	const apiConfig = { 
		token: config.token,
		headers: config.teamId ? { "x-vercel-team-id": config.teamId } : {}
	};
	
	const base = buildVercel(apiConfig, resources);
	const vercel = base as TVercelModule;

	vercel.getProject = function (projectId: string) {
		return base.projects.getProject({ projectId });
	};

	vercel.listProjects = function (teamId?: string) {
		const params: any = {};
		if (teamId) params.teamId = teamId;
		return base.projects.listProjects(params);
	};

	vercel.getLatestDeployment = async function (projectId: string) {
		const deployments = await base.deployments.listDeployments({
			projectId,
			limit: 1,
		});
		return deployments[0] || null;
	};

	vercel.getDeploymentStatus = async function (deploymentId: string) {
		const deployment = await base.deployments.getDeployment({ deploymentId });
		return {
			id: deployment.id,
			state: deployment.state,
			ready: deployment.ready,
			url: deployment.url,
			createdAt: deployment.createdAt,
		};
	};

	vercel.redeployProject = async function (projectId: string) {
		const latest = await vercel.getLatestDeployment(projectId);
		if (!latest) throw new Error("No deployments found");
		
		return base.deployments.createDeployment({
			name: latest.name,
			project: projectId,
			gitSource: latest.gitSource,
		});
	};

	vercel.getProjectAnalytics = async function (projectId: string, options?: any) {
		const project = await base.projects.getProject({ projectId });
		return {
			project,
			analytics: {
				period: options?.period || "7d",
				visits: 0,
				uniqueVisitors: 0,
			},
		};
	};

	vercel.getDomainStatus = async function (domain: string) {
		const domainInfo = await base.domains.getDomain({ domain });
		return {
			domain: domainInfo.name,
			verified: domainInfo.verified,
			configured: domainInfo.configured,
			expires: domainInfo.expiresAt,
		};
	};

	vercel.getTeamUsage = async function (teamId: string) {
		const team = await base.teams.getTeam({ teamId });
		return {
			team: team.name,
			usage: {
				projects: team.projectsCount || 0,
				members: team.membersCount || 0,
			},
		};
	};

	return vercel;
}
