import { createApiBuilder, defineResource, type TModule } from "../core";

const GITHUB_API_BASE = "https://api.github.com";

const userResource = defineResource({
	name: "users",
	basePath: "/users",
	methods: {
		getUser: { path: "/{username}" },
		getUserRepos: { path: "/{username}/repos" },
		getUserGists: { path: "/{username}/gists" },
		getUserFollowers: { path: "/{username}/followers" },
		getUserFollowing: { path: "/{username}/following" },
		getUserStarred: { path: "/{username}/starred" },
		getUserOrgs: { path: "/{username}/orgs" },
		getUserEvents: { path: "/{username}/events" },
		getUserReceivedEvents: { path: "/{username}/received_events" },
		checkUserFollowing: { path: "/{username}/following/{target}" },
	},
});

const repoResource = defineResource({
	name: "repos",
	basePath: "/repos",
	methods: {
		getRepo: { path: "/{owner}/{repo}" },
		getRepoCommits: { path: "/{owner}/{repo}/commits" },
		getRepoCommit: { path: "/{owner}/{repo}/commits/{sha}" },
		getRepoBranches: { path: "/{owner}/{repo}/branches" },
		getRepoTags: { path: "/{owner}/{repo}/tags" },
		getRepoReleases: { path: "/{owner}/{repo}/releases" },
		getRepoLatestRelease: { path: "/{owner}/{repo}/releases/latest" },
		getRepoContributors: { path: "/{owner}/{repo}/contributors" },
		getRepoLanguages: { path: "/{owner}/{repo}/languages" },
		getRepoTopics: { path: "/{owner}/{repo}/topics" },
		getRepoStargazers: { path: "/{owner}/{repo}/stargazers" },
		getRepoForks: { path: "/{owner}/{repo}/forks" },
		getRepoIssues: { path: "/{owner}/{repo}/issues" },
		getRepoIssue: { path: "/{owner}/{repo}/issues/{issue_number}" },
		getRepoPulls: { path: "/{owner}/{repo}/pulls" },
		getRepoPull: { path: "/{owner}/{repo}/pulls/{pull_number}" },
		getRepoContents: { path: "/{owner}/{repo}/contents/{path}" },
		getRepoReadme: { path: "/{owner}/{repo}/readme" },
		createRepoIssue: {
			path: "/{owner}/{repo}/issues",
			method: "POST",
		},
		updateRepoIssue: {
			path: "/{owner}/{repo}/issues/{issue_number}",
			method: "PATCH",
		},
		createRepoPull: {
			path: "/{owner}/{repo}/pulls",
			method: "POST",
		},
	},
});

const searchResource = defineResource({
	name: "search",
	basePath: "/search",
	methods: {
		searchRepos: { path: "/repositories" },
		searchCode: { path: "/code" },
		searchIssues: { path: "/issues" },
		searchUsers: { path: "/users" },
		searchTopics: { path: "/topics" },
		searchLabels: { path: "/labels" },
		searchCommits: { path: "/commits" },
	},
});

const gistResource = defineResource({
	name: "gists",
	basePath: "/gists",
	methods: {
		getPublicGists: { path: "" },
		getUserGists: { path: "/users/{username}/gists" },
		getGist: { path: "/{gist_id}" },
		createGist: { path: "", method: "POST" },
		updateGist: { path: "/{gist_id}", method: "PATCH" },
		deleteGist: { path: "/{gist_id}", method: "DELETE" },
		getGistComments: { path: "/{gist_id}/comments" },
		createGistComment: { path: "/{gist_id}/comments", method: "POST" },
	},
});

const orgResource = defineResource({
	name: "orgs",
	basePath: "/orgs",
	methods: {
		getOrg: { path: "/{org}" },
		getOrgRepos: { path: "/{org}/repos" },
		getOrgMembers: { path: "/{org}/members" },
		getOrgTeams: { path: "/{org}/teams" },
		getOrgProjects: { path: "/{org}/projects" },
		getOrgEvents: { path: "/{org}/events" },
		checkOrgMembership: { path: "/{org}/members/{username}" },
	},
});

const activityResource = defineResource({
	name: "activity",
	basePath: "",
	methods: {
		getPublicEvents: { path: "/events" },
		getNotifications: { path: "/notifications" },
		markNotificationAsRead: {
			path: "/notifications/{notification_id}",
			method: "PATCH",
		},
		getStarred: { path: "/user/starred" },
		starRepo: {
			path: "/user/starred/{owner}/{repo}",
			method: "PUT",
		},
		unstarRepo: {
			path: "/user/starred/{owner}/{repo}",
			method: "DELETE",
		},
		getWatching: { path: "/user/subscriptions" },
		watchRepo: {
			path: "/user/subscriptions/{owner}/{repo}",
			method: "PUT",
		},
		unwatchRepo: {
			path: "/user/subscriptions/{owner}/{repo}",
			method: "DELETE",
		},
	},
});

const authUserResource = defineResource({
	name: "me",
	basePath: "/user",
	methods: {
		getAuthenticatedUser: { path: "" },
		updateAuthenticatedUser: { path: "", method: "PATCH" },
		getMyRepos: { path: "/repos" },
		getMyOrgs: { path: "/orgs" },
		getMyGists: { path: "/gists" },
		getMyFollowers: { path: "/followers" },
		getMyFollowing: { path: "/following" },
		followUser: { path: "/following/{username}", method: "PUT" },
		unfollowUser: { path: "/following/{username}", method: "DELETE" },
		getMyEmails: { path: "/emails" },
		getMySSHKeys: { path: "/keys" },
		addSSHKey: { path: "/keys", method: "POST" },
		deleteSSHKey: { path: "/keys/{key_id}", method: "DELETE" },
	},
});

const statsResource = defineResource({
	name: "stats",
	basePath: "/repos/{owner}/{repo}/stats",
	methods: {
		getContributorStats: { path: "/contributors" },
		getCommitActivity: { path: "/commit_activity" },
		getCodeFrequency: { path: "/code_frequency" },
		getParticipation: { path: "/participation" },
		getPunchCard: { path: "/punch_card" },
	},
});

const gitDataResource = defineResource({
	name: "git",
	basePath: "/repos/{owner}/{repo}/git",
	methods: {
		getRef: { path: "/ref/{ref}" },
		getRefs: { path: "/refs" },
		createRef: { path: "/refs", method: "POST" },
		updateRef: { path: "/refs/{ref}", method: "PATCH" },
		deleteRef: { path: "/refs/{ref}", method: "DELETE" },
		getCommit: { path: "/commits/{commit_sha}" },
		createCommit: { path: "/commits", method: "POST" },
		getTree: { path: "/trees/{tree_sha}" },
		createTree: { path: "/trees", method: "POST" },
		getBlob: { path: "/blobs/{file_sha}" },
		createBlob: { path: "/blobs", method: "POST" },
		getTag: { path: "/tags/{tag_sha}" },
		createTag: { path: "/tags", method: "POST" },
	},
});

const resources = {
	users: userResource,
	repos: repoResource,
	search: searchResource,
	gists: gistResource,
	orgs: orgResource,
	activity: activityResource,
	me: authUserResource,
	stats: statsResource,
	git: gitDataResource,
};

const buildGitHub = createApiBuilder({
	baseUrl: GITHUB_API_BASE,
	auth: { type: "bearer" as const },
	headers: {
		Accept: "application/vnd.github.v3+json",
		"X-GitHub-Api-Version": "2022-11-28",
	},
});

type TGitHubModule = TModule<typeof resources> & {
	getUser: (username: string) => Promise<any>;
	getRepository: (owner: string, repo: string) => Promise<any>;
	getRepositoryFromUrl: (url: string) => Promise<any>;
	getUserCommits: (username: string, options?: any) => Promise<any>;
	getUserLatestCommit: (username: string) => Promise<any>;
	getUserCommitsInTimeframe: (
		username: string,
		timeframe: string,
	) => Promise<any>;
	getRepositoryStars: (owner: string, repo: string) => Promise<number>;
	getUserStarredCount: (username: string) => Promise<number>;
	getUserStats: (username: string) => Promise<any>;
	searchRepositories: (query: string, options?: any) => Promise<any>;
	getUserActivity: (username: string, options?: any) => Promise<any>;
};

export function GitHub(config: { token: string }): TGitHubModule {
	const base = buildGitHub(config, resources);

	function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
		const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
		if (match) {
			return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
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

	const github = base as unknown as TGitHubModule;

	github.getUser = function (username: string) {
		return base.users.getUser({ username });
	};

	github.getRepository = function (owner: string, repo: string) {
		return base.repos.getRepo({ owner, repo });
	};

	github.getRepositoryFromUrl = function (url: string) {
		const parsed = parseGitHubUrl(url);
		if (!parsed) throw new Error("Invalid GitHub URL");
		return base.repos.getRepo(parsed);
	};

	github.getUserCommits = async function (username: string, options?: any) {
		const events = await base.users.getUserEvents({
			username,
			per_page: options?.limit || 100,
		});
		return events.filter((e: any) => e.type === "PushEvent");
	};

	github.getUserLatestCommit = async function (username: string) {
		const commits = await github.getUserCommits(username, { limit: 1 });
		return commits[0] || null;
	};

	github.getUserCommitsInTimeframe = async function (
		username: string,
		timeframe: string,
	) {
		const since = calculateTimeframeDate(timeframe);
		const events = await base.users.getUserEvents({ username });
		return events.filter(
			(e: any) =>
				e.type === "PushEvent" && new Date(e.created_at) >= new Date(since),
		);
	};

	github.getRepositoryStars = async function (owner: string, repo: string) {
		const repository = await base.repos.getRepo({ owner, repo });
		return repository.stargazers_count || 0;
	};

	github.getUserStarredCount = async function (username: string) {
		const starred = await base.users.getUserStarred({ username });
		return Array.isArray(starred) ? starred.length : 0;
	};

	github.getUserStats = async function (username: string) {
		const [user, repos, events] = await Promise.all([
			base.users.getUser({ username }),
			base.users.getUserRepos({ username }),
			base.users.getUserEvents({ username, per_page: 100 }),
		]);

		const pushEvents = events.filter((e: any) => e.type === "PushEvent");
		const totalStars = repos.reduce(
			(sum: number, repo: any) => sum + (repo.stargazers_count || 0),
			0,
		);

		return {
			user,
			totalRepos: repos.length,
			totalStars,
			recentCommits: pushEvents.length,
			publicRepos: user.public_repos,
			publicGists: user.public_gists,
			followers: user.followers,
			following: user.following,
		};
	};

	github.searchRepositories = function (query: string, options?: any) {
		return base.search.searchRepos({ q: query, ...options });
	};

	github.getUserActivity = function (username: string, options?: any) {
		return base.users.getUserEvents({ username, ...options });
	};

	return github;
}

// Export OAuth functionality
export { GitHubOAuth } from "./oauth";
export * from "./types";