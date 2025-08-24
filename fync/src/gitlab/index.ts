import { createApiBuilder, defineResource, type TModule } from "../core";

const GITLAB_API_BASE = "https://gitlab.com/api/v4";

const userResource = defineResource({
	name: "users",
	basePath: "/users",
	methods: {
		getUser: { path: "/{id}" },
		getUserProjects: { path: "/{id}/projects" },
		getUserSnippets: { path: "/{id}/snippets" },
		getUserEvents: { path: "/{id}/events" },
		getUserContributedProjects: { path: "/{id}/contributed_projects" },
		getUserStarredProjects: { path: "/{id}/starred_projects" },
		getUserMemberships: { path: "/{id}/memberships" },
		getUserFollowers: { path: "/{id}/followers" },
		getUserFollowing: { path: "/{id}/following" },
		getCurrentUser: { path: "/current" },
		searchUsers: { path: "", method: "GET" },
	},
});

const projectResource = defineResource({
	name: "projects",
	basePath: "/projects",
	methods: {
		getProject: { path: "/{id}" },
		getProjectCommits: { path: "/{id}/repository/commits" },
		getProjectCommit: { path: "/{id}/repository/commits/{sha}" },
		getProjectBranches: { path: "/{id}/repository/branches" },
		getProjectTags: { path: "/{id}/repository/tags" },
		getProjectReleases: { path: "/{id}/releases" },
		getProjectMembers: { path: "/{id}/members" },
		getProjectIssues: { path: "/{id}/issues" },
		getProjectIssue: { path: "/{id}/issues/{issue_iid}" },
		getProjectMergeRequests: { path: "/{id}/merge_requests" },
		getProjectMergeRequest: { path: "/{id}/merge_requests/{merge_request_iid}" },
		getProjectContributors: { path: "/{id}/repository/contributors" },
		getProjectLanguages: { path: "/{id}/languages" },
		getProjectRepository: { path: "/{id}/repository/tree" },
		getProjectFile: { path: "/{id}/repository/files/{file_path}" },
		getProjectReadme: { path: "/{id}/repository/files/README.md" },
		getProjectVariables: { path: "/{id}/variables" },
		getProjectPipelines: { path: "/{id}/pipelines" },
		getProjectJobs: { path: "/{id}/jobs" },
		getProjectEnvironments: { path: "/{id}/environments" },
		createProject: { path: "", method: "POST" },
		updateProject: { path: "/{id}", method: "PUT" },
		deleteProject: { path: "/{id}", method: "DELETE" },
		createProjectIssue: { path: "/{id}/issues", method: "POST" },
		updateProjectIssue: { path: "/{id}/issues/{issue_iid}", method: "PUT" },
		createProjectMergeRequest: { path: "/{id}/merge_requests", method: "POST" },
		updateProjectMergeRequest: { path: "/{id}/merge_requests/{merge_request_iid}", method: "PUT" },
		starProject: { path: "/{id}/star", method: "POST" },
		unstarProject: { path: "/{id}/unstar", method: "POST" },
		forkProject: { path: "/{id}/fork", method: "POST" },
	},
});

const groupResource = defineResource({
	name: "groups",
	basePath: "/groups",
	methods: {
		getGroup: { path: "/{id}" },
		getGroupProjects: { path: "/{id}/projects" },
		getGroupMembers: { path: "/{id}/members" },
		getGroupSubgroups: { path: "/{id}/subgroups" },
		getGroupVariables: { path: "/{id}/variables" },
		getGroupEpics: { path: "/{id}/epics" },
		createGroup: { path: "", method: "POST" },
		updateGroup: { path: "/{id}", method: "PUT" },
		deleteGroup: { path: "/{id}", method: "DELETE" },
		searchGroups: { path: "", method: "GET" },
	},
});

const searchResource = defineResource({
	name: "search",
	basePath: "/search",
	methods: {
		searchProjects: { path: "", method: "GET" },
		searchGroups: { path: "", method: "GET" },
		searchUsers: { path: "", method: "GET" },
		searchSnippets: { path: "", method: "GET" },
		searchIssues: { path: "", method: "GET" },
		searchMergeRequests: { path: "", method: "GET" },
		searchMilestones: { path: "", method: "GET" },
		searchWiki: { path: "", method: "GET" },
		searchCommits: { path: "", method: "GET" },
		searchBlobs: { path: "", method: "GET" },
	},
});

const snippetResource = defineResource({
	name: "snippets",
	basePath: "/snippets",
	methods: {
		getPublicSnippets: { path: "/public" },
		getSnippet: { path: "/{id}" },
		getSnippetContent: { path: "/{id}/raw" },
		createSnippet: { path: "", method: "POST" },
		updateSnippet: { path: "/{id}", method: "PUT" },
		deleteSnippet: { path: "/{id}", method: "DELETE" },
		getUserSnippets: { path: "/all" },
	},
});

const issueResource = defineResource({
	name: "issues",
	basePath: "/issues",
	methods: {
		getIssues: { path: "" },
		getIssue: { path: "/{id}" },
		createIssue: { path: "", method: "POST" },
		updateIssue: { path: "/{id}", method: "PUT" },
		deleteIssue: { path: "/{id}", method: "DELETE" },
		getIssueNotes: { path: "/{id}/notes" },
		createIssueNote: { path: "/{id}/notes", method: "POST" },
	},
});

const mergeRequestResource = defineResource({
	name: "merge_requests",
	basePath: "/merge_requests",
	methods: {
		getMergeRequests: { path: "" },
		getMergeRequest: { path: "/{id}" },
		createMergeRequest: { path: "", method: "POST" },
		updateMergeRequest: { path: "/{id}", method: "PUT" },
		deleteMergeRequest: { path: "/{id}", method: "DELETE" },
		acceptMergeRequest: { path: "/{id}/merge", method: "PUT" },
		getMergeRequestNotes: { path: "/{id}/notes" },
		createMergeRequestNote: { path: "/{id}/notes", method: "POST" },
		getMergeRequestCommits: { path: "/{id}/commits" },
		getMergeRequestChanges: { path: "/{id}/changes" },
	},
});

const pipelineResource = defineResource({
	name: "pipelines",
	basePath: "/projects/{project_id}/pipelines",
	methods: {
		getPipelines: { path: "" },
		getPipeline: { path: "/{id}" },
		createPipeline: { path: "", method: "POST" },
		deletePipeline: { path: "/{id}", method: "DELETE" },
		retryPipeline: { path: "/{id}/retry", method: "POST" },
		cancelPipeline: { path: "/{id}/cancel", method: "POST" },
		getPipelineJobs: { path: "/{id}/jobs" },
		getPipelineVariables: { path: "/{id}/variables" },
	},
});

const activityResource = defineResource({
	name: "activity",
	basePath: "",
	methods: {
		getEvents: { path: "/events" },
		getUserEvents: { path: "/users/{user_id}/events" },
		getProjectEvents: { path: "/projects/{project_id}/events" },
		getTodos: { path: "/todos" },
		markTodoAsDone: { path: "/todos/{id}/mark_as_done", method: "POST" },
		markAllTodosAsDone: { path: "/todos/mark_as_done", method: "POST" },
	},
});

const authResource = defineResource({
	name: "me",
	basePath: "/user",
	methods: {
		getCurrentUser: { path: "" },
		getUserProjects: { path: "/projects" },
		getUserStarredProjects: { path: "/starred_projects" },
		getUserGPGKeys: { path: "/gpg_keys" },
		getUserSSHKeys: { path: "/keys" },
		addSSHKey: { path: "/keys", method: "POST" },
		deleteSSHKey: { path: "/keys/{key_id}", method: "DELETE" },
		getUserEmails: { path: "/emails" },
		addEmail: { path: "/emails", method: "POST" },
		deleteEmail: { path: "/emails/{email_id}", method: "DELETE" },
		getUserMemberships: { path: "/memberships" },
		getUserStatus: { path: "/status" },
		setUserStatus: { path: "/status", method: "PUT" },
	},
});

const resources = {
	users: userResource,
	projects: projectResource,
	groups: groupResource,
	search: searchResource,
	snippets: snippetResource,
	issues: issueResource,
	merge_requests: mergeRequestResource,
	pipelines: pipelineResource,
	activity: activityResource,
	me: authResource,
};

const buildGitLab = createApiBuilder({
	baseUrl: GITLAB_API_BASE,
	auth: { type: "bearer" as const },
	headers: {
		"Content-Type": "application/json",
	},
});

type TGitLabModule = TModule<typeof resources> & {
	getUser: (id: string | number) => Promise<any>;
	getProject: (id: string | number) => Promise<any>;
	getProjectFromUrl: (url: string) => Promise<any>;
	getUserCommits: (userId: string | number, options?: any) => Promise<any>;
	getUserLatestCommit: (userId: string | number) => Promise<any>;
	getUserCommitsInTimeframe: (
		userId: string | number,
		timeframe: string,
	) => Promise<any>;
	getProjectStars: (projectId: string | number) => Promise<number>;
	getUserStarredCount: (userId: string | number) => Promise<number>;
	getUserStats: (userId: string | number) => Promise<any>;
	searchProjects: (query: string, options?: any) => Promise<any>;
	getUserActivity: (userId: string | number, options?: any) => Promise<any>;
	getGroup: (id: string | number) => Promise<any>;
	searchGroups: (query: string, options?: any) => Promise<any>;
	getCurrentUser: () => Promise<any>;
};

/**
 * Create a configured GitLab API module exposing resource endpoints and higher-level helpers.
 *
 * Returns a module built against the GitLab API (https://gitlab.com/api/v4) that includes:
 * - typed resource namespaces (users, projects, groups, search, snippets, issues, merge_requests, pipelines, activity, me)
 * - convenience helpers for common workflows (e.g., getUser, getProject, getProjectFromUrl, getUserCommits, getUserStats, searchProjects, getCurrentUser)
 *
 * The returned module delegates most calls to the underlying resource clients and adds small utility functions
 * for parsing GitLab URLs and computing timeframe dates used by commit-related helpers.
 *
 * @param config - Configuration object containing a GitLab personal access token: `{ token: string }`.
 * @returns A configured TGitLabModule instance with resource methods and helper utilities.
 */
export function GitLab(config: { token: string }): TGitLabModule {
	const base = buildGitLab(config, resources);

	function parseGitLabUrl(url: string): { id: string } | null {
		// GitLab can use project ID or namespace/project format
		const match = url.match(/gitlab\.com\/([^/]+\/[^/]+)/);
		if (match) {
			return { id: encodeURIComponent(match[1]) };
		}
		return null;
	}

	function calculateTimeframeDate(timeframe: string): string {
		const now = new Date();
		const match = timeframe.match(/(\d+)([DWMY])/i);
		if (!match) return now.toISOString();

		const [, amount, unit] = match;
		const num = parseInt(amount, 10);

		switch (unit.toUpperCase()) {
			case "D":
				now.setDate(now.getDate() - num);
				break;
			case "W":
				now.setDate(now.getDate() - num * 7);
				break;
			case "M":
				now.setMonth(now.getMonth() - num);
				break;
			case "Y":
				now.setFullYear(now.getFullYear() - num);
				break;
		}
		return now.toISOString();
	}

	const gitlab = base as unknown as TGitLabModule;

	gitlab.getUser = function (id: string | number) {
		return base.users.getUser({ id: id.toString() });
	};

	gitlab.getProject = function (id: string | number) {
		return base.projects.getProject({ id: id.toString() });
	};

	gitlab.getProjectFromUrl = function (url: string) {
		const parsed = parseGitLabUrl(url);
		if (!parsed) throw new Error("Invalid GitLab URL");
		return base.projects.getProject(parsed);
	};

	gitlab.getUserCommits = async function (userId: string | number, options?: any) {
		const events = await base.users.getUserEvents({
			id: userId.toString(),
			per_page: options?.limit || 100,
		});
		return events.filter((e: any) => e.action === "pushed");
	};

	gitlab.getUserLatestCommit = async function (userId: string | number) {
		const commits = await gitlab.getUserCommits(userId, { limit: 1 });
		return commits[0] || null;
	};

	gitlab.getUserCommitsInTimeframe = async function (
		userId: string | number,
		timeframe: string,
	) {
		const since = calculateTimeframeDate(timeframe);
		const events = await base.users.getUserEvents({ id: userId.toString() });
		return events.filter(
			(e: any) =>
				e.action === "pushed" && new Date(e.created_at) >= new Date(since),
		);
	};

	gitlab.getProjectStars = async function (projectId: string | number) {
		const project = await base.projects.getProject({ id: projectId.toString() });
		return project.star_count || 0;
	};

	gitlab.getUserStarredCount = async function (userId: string | number) {
		const starred = await base.users.getUserStarredProjects({ id: userId.toString() });
		return Array.isArray(starred) ? starred.length : 0;
	};

	gitlab.getUserStats = async function (userId: string | number) {
		const [user, projects, events] = await Promise.all([
			base.users.getUser({ id: userId.toString() }),
			base.users.getUserProjects({ id: userId.toString() }),
			base.users.getUserEvents({ id: userId.toString(), per_page: 100 }),
		]);

		const pushEvents = events.filter((e: any) => e.action === "pushed");
		const totalStars = projects.reduce(
			(sum: number, project: any) => sum + (project.star_count || 0),
			0,
		);

		return {
			user,
			totalProjects: projects.length,
			totalStars,
			recentCommits: pushEvents.length,
			publicProjects: projects.filter((p: any) => p.visibility === "public").length,
			followers: user.followers || 0,
			following: user.following || 0,
		};
	};

	gitlab.searchProjects = function (query: string, options?: any) {
		return base.search.searchProjects({ search: query, ...options });
	};

	gitlab.getUserActivity = function (userId: string | number, options?: any) {
		return base.users.getUserEvents({ id: userId.toString(), ...options });
	};

	gitlab.getGroup = function (id: string | number) {
		return base.groups.getGroup({ id: id.toString() });
	};

	gitlab.searchGroups = function (query: string, options?: any) {
		return base.search.searchGroups({ search: query, ...options });
	};

	gitlab.getCurrentUser = function () {
		return base.me.getCurrentUser({});
	};

	return gitlab;
}
