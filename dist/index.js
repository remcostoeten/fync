// Main fluent API
export { buildErrorResponse, buildFluent, buildSimple, buildSingleItemResponse, buildStructured, buildSuccessResponse, paginateData, } from "./builders/response-builder";
export { filterRepositories, filterRepositoriesByAdvancedCriteria, filterRepositoriesByForks, filterRepositoriesByLanguage, filterRepositoriesByLicense, filterRepositoriesByStars, filterRepositoriesByTopics, filterRepositoriesByWatchers, } from "./filters/repository-filters";
export { filterUserFields, filterUsers, filterUsersByCompany, filterUsersByFollowers, filterUsersByLocation, filterUsersByPublicRepos, filterUsersByType, } from "./filters/user-filters";
export { GitHub } from "./github";
// Cache exports (for advanced users)
export { getCache, memoize, setCache } from "./services/cache-service";
// Chainable client exports
export { createGitHubClient } from "./services/github-client";
// HTTP client exports (for advanced users)
export { createHttpClient } from "./services/http-client";
export { fetchRepositories } from "./services/repo-fetcher";
// Legacy exports for backward compatibility
export { fetchUser } from "./services/user-fetcher";
import { buildFluent as buildFluentFunc, buildSimple as buildSimpleFunc, buildStructured as buildStructuredFunc, } from "./builders/response-builder";
import { fetchRepositories as fetchReposFunc } from "./services/repo-fetcher";
// Legacy function for backward compatibility
import { fetchUser as fetchUserFunc } from "./services/user-fetcher";
function fetchGitHubData(username, options = {}) {
    const { format = "simple", filters } = options;
    return async function () {
        const user = await fetchUserFunc(username);
        let repos = await fetchReposFunc(username);
        if (filters) {
            repos = filters(repos);
        }
        switch (format) {
            case "structured":
                return buildStructuredFunc(user, repos);
            case "fluent":
                return buildFluentFunc(user, repos);
            case "simple":
            default:
                return buildSimpleFunc(user, repos);
        }
    };
}
export { fetchGitHubData };
//# sourceMappingURL=index.js.map