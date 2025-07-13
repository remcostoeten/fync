"use strict";
// Main fluent API
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUser = exports.fetchRepositories = exports.createHttpClient = exports.createGitHubClient = exports.setCache = exports.memoize = exports.getCache = exports.GitHub = exports.filterUsersByType = exports.filterUsersByPublicRepos = exports.filterUsersByLocation = exports.filterUsersByFollowers = exports.filterUsersByCompany = exports.filterUsers = exports.filterUserFields = exports.filterRepositoriesByWatchers = exports.filterRepositoriesByTopics = exports.filterRepositoriesByStars = exports.filterRepositoriesByLicense = exports.filterRepositoriesByLanguage = exports.filterRepositoriesByForks = exports.filterRepositoriesByAdvancedCriteria = exports.filterRepositories = exports.paginateData = exports.buildSuccessResponse = exports.buildStructured = exports.buildSingleItemResponse = exports.buildSimple = exports.buildFluent = exports.buildErrorResponse = void 0;
exports.fetchGitHubData = fetchGitHubData;
var response_builder_1 = require("./builders/response-builder");
Object.defineProperty(exports, "buildErrorResponse", { enumerable: true, get: function () { return response_builder_1.buildErrorResponse; } });
Object.defineProperty(exports, "buildFluent", { enumerable: true, get: function () { return response_builder_1.buildFluent; } });
Object.defineProperty(exports, "buildSimple", { enumerable: true, get: function () { return response_builder_1.buildSimple; } });
Object.defineProperty(exports, "buildSingleItemResponse", { enumerable: true, get: function () { return response_builder_1.buildSingleItemResponse; } });
Object.defineProperty(exports, "buildStructured", { enumerable: true, get: function () { return response_builder_1.buildStructured; } });
Object.defineProperty(exports, "buildSuccessResponse", { enumerable: true, get: function () { return response_builder_1.buildSuccessResponse; } });
Object.defineProperty(exports, "paginateData", { enumerable: true, get: function () { return response_builder_1.paginateData; } });
var repository_filters_1 = require("./filters/repository-filters");
Object.defineProperty(exports, "filterRepositories", { enumerable: true, get: function () { return repository_filters_1.filterRepositories; } });
Object.defineProperty(exports, "filterRepositoriesByAdvancedCriteria", { enumerable: true, get: function () { return repository_filters_1.filterRepositoriesByAdvancedCriteria; } });
Object.defineProperty(exports, "filterRepositoriesByForks", { enumerable: true, get: function () { return repository_filters_1.filterRepositoriesByForks; } });
Object.defineProperty(exports, "filterRepositoriesByLanguage", { enumerable: true, get: function () { return repository_filters_1.filterRepositoriesByLanguage; } });
Object.defineProperty(exports, "filterRepositoriesByLicense", { enumerable: true, get: function () { return repository_filters_1.filterRepositoriesByLicense; } });
Object.defineProperty(exports, "filterRepositoriesByStars", { enumerable: true, get: function () { return repository_filters_1.filterRepositoriesByStars; } });
Object.defineProperty(exports, "filterRepositoriesByTopics", { enumerable: true, get: function () { return repository_filters_1.filterRepositoriesByTopics; } });
Object.defineProperty(exports, "filterRepositoriesByWatchers", { enumerable: true, get: function () { return repository_filters_1.filterRepositoriesByWatchers; } });
var user_filters_1 = require("./filters/user-filters");
Object.defineProperty(exports, "filterUserFields", { enumerable: true, get: function () { return user_filters_1.filterUserFields; } });
Object.defineProperty(exports, "filterUsers", { enumerable: true, get: function () { return user_filters_1.filterUsers; } });
Object.defineProperty(exports, "filterUsersByCompany", { enumerable: true, get: function () { return user_filters_1.filterUsersByCompany; } });
Object.defineProperty(exports, "filterUsersByFollowers", { enumerable: true, get: function () { return user_filters_1.filterUsersByFollowers; } });
Object.defineProperty(exports, "filterUsersByLocation", { enumerable: true, get: function () { return user_filters_1.filterUsersByLocation; } });
Object.defineProperty(exports, "filterUsersByPublicRepos", { enumerable: true, get: function () { return user_filters_1.filterUsersByPublicRepos; } });
Object.defineProperty(exports, "filterUsersByType", { enumerable: true, get: function () { return user_filters_1.filterUsersByType; } });
var github_1 = require("./github");
Object.defineProperty(exports, "GitHub", { enumerable: true, get: function () { return github_1.GitHub; } });
// Cache exports (for advanced users)
var cache_service_1 = require("./services/cache-service");
Object.defineProperty(exports, "getCache", { enumerable: true, get: function () { return cache_service_1.getCache; } });
Object.defineProperty(exports, "memoize", { enumerable: true, get: function () { return cache_service_1.memoize; } });
Object.defineProperty(exports, "setCache", { enumerable: true, get: function () { return cache_service_1.setCache; } });
// Chainable client exports
var github_client_1 = require("./services/github-client");
Object.defineProperty(exports, "createGitHubClient", { enumerable: true, get: function () { return github_client_1.createGitHubClient; } });
// HTTP client exports (for advanced users)
var http_client_1 = require("./services/http-client");
Object.defineProperty(exports, "createHttpClient", { enumerable: true, get: function () { return http_client_1.createHttpClient; } });
var repo_fetcher_1 = require("./services/repo-fetcher");
Object.defineProperty(exports, "fetchRepositories", { enumerable: true, get: function () { return repo_fetcher_1.fetchRepositories; } });
// Legacy exports for backward compatibility
var user_fetcher_1 = require("./services/user-fetcher");
Object.defineProperty(exports, "fetchUser", { enumerable: true, get: function () { return user_fetcher_1.fetchUser; } });
const response_builder_2 = require("./builders/response-builder");
const repo_fetcher_2 = require("./services/repo-fetcher");
// Legacy function for backward compatibility
const user_fetcher_2 = require("./services/user-fetcher");
function fetchGitHubData(username, options = {}) {
    const { format = "simple", filters } = options;
    return async function () {
        const user = await (0, user_fetcher_2.fetchUser)(username);
        let repos = await (0, repo_fetcher_2.fetchRepositories)(username);
        if (filters) {
            repos = filters(repos);
        }
        switch (format) {
            case "structured":
                return (0, response_builder_2.buildStructured)(user, repos);
            case "fluent":
                return (0, response_builder_2.buildFluent)(user, repos);
            case "simple":
            default:
                return (0, response_builder_2.buildSimple)(user, repos);
        }
    };
}
//# sourceMappingURL=index.js.map