import { createGitHubClient } from "./services/github-client";
function GitHub(config) {
    const client = createGitHubClient(config);
    function createUserClient(username) {
        const userBase = client.users[username];
        return {
            get: () => userBase.get(),
            repos: userBase.repos,
            gists: userBase.gists,
            followers: userBase.followers,
            following: userBase.following,
            starred: userBase.starred,
            subscriptions: userBase.subscriptions,
            orgs: userBase.orgs,
            events: userBase.events,
            received_events: userBase.received_events,
            chain: userBase,
        };
    }
    function createRepoClient(owner, repo) {
        const repoBase = client.repos[owner][repo];
        return {
            get: () => repoBase.get(),
            branches: repoBase.branches,
            commits: repoBase.commits,
            contents: repoBase.contents,
            contributors: repoBase.contributors,
            deployments: repoBase.deployments,
            forks: repoBase.forks,
            issues: repoBase.issues,
            pulls: repoBase.pulls,
            releases: repoBase.releases,
            tags: repoBase.tags,
            topics: repoBase.topics,
            chain: repoBase,
        };
    }
    function createOrgClient(orgName) {
        const orgBase = client.orgs[orgName];
        return {
            get: () => orgBase.get(),
            repos: orgBase.repos,
            members: orgBase.members,
            teams: orgBase.teams,
            events: orgBase.events,
            chain: orgBase,
        };
    }
    function createGistClient(gistId) {
        const gistBase = client.gists[gistId];
        return {
            get: () => gistBase.get(),
            comments: gistBase.comments,
            commits: gistBase.commits,
            forks: gistBase.forks,
            star: gistBase.star,
            chain: gistBase,
        };
    }
    const searchClient = {
        repositories: (query, options) => client.search.repositories.get({
            ...options,
            params: { ...options?.params, q: query },
        }),
        users: (query, options) => client.search.users.get({
            ...options,
            params: { ...options?.params, q: query },
        }),
        issues: (query, options) => client.search.issues.get({
            ...options,
            params: { ...options?.params, q: query },
        }),
        code: (query, options) => client.search.code.get({
            ...options,
            params: { ...options?.params, q: query },
        }),
        commits: (query, options) => client.search.commits.get({
            ...options,
            params: { ...options?.params, q: query },
        }),
        topics: (query, options) => client.search.topics.get({
            ...options,
            params: { ...options?.params, q: query },
        }),
        labels: (query, options) => client.search.labels.get({
            ...options,
            params: { ...options?.params, q: query },
        }),
    };
    const authenticatedUserClient = {
        get: () => client.user.get(),
        repos: client.user.repos,
        gists: client.user.gists,
        followers: client.user.followers,
        following: client.user.following,
        starred: client.user.starred,
        subscriptions: client.user.subscriptions,
        orgs: client.user.orgs,
        issues: client.user.issues,
        chain: client.user,
    };
    return {
        api: client,
        user: createUserClient,
        repo: createRepoClient,
        org: createOrgClient,
        gist: createGistClient,
        search: searchClient,
        me: authenticatedUserClient,
    };
}
export { GitHub };
//# sourceMappingURL=index.js.map