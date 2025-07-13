// Main fluent API

export type {
	TApiResponse,
	TErrorResponse,
	TFluentResponse,
	TResponseBuilderOptions,
	TSimpleResponse,
	TStructuredResponse,
} from "./builders/response-builder";
export {
	buildErrorResponse,
	buildFluent,
	buildSimple,
	buildSingleItemResponse,
	buildStructured,
	buildSuccessResponse,
	paginateData,
} from "./builders/response-builder";
export type {
	TRepositoryFilterCriteria,
	TRepositoryFilterOptions,
} from "./filters/repository-filters";
export {
	filterRepositories,
	filterRepositoriesByAdvancedCriteria,
	filterRepositoriesByForks,
	filterRepositoriesByLanguage,
	filterRepositoriesByLicense,
	filterRepositoriesByStars,
	filterRepositoriesByTopics,
	filterRepositoriesByWatchers,
} from "./filters/repository-filters";
export type {
	TUserFieldFilter,
	TUserFilterCriteria,
} from "./filters/user-filters";
export {
	filterUserFields,
	filterUsers,
	filterUsersByCompany,
	filterUsersByFollowers,
	filterUsersByLocation,
	filterUsersByPublicRepos,
	filterUsersByType,
} from "./filters/user-filters";
export type {
	TAuthenticatedUserClient,
	TGistClient,
	TGitHub,
	TOrgClient,
	TRepoClient,
	TSearchClient,
	TUserClient,
} from "./github";
export { GitHub } from "./github";
export { GitHub as github } from "./github";
export { GitHub as default } from "./github";
// Cache exports (for advanced users)
export { getCache, memoize, setCache } from "./services/cache-service";
export type {
	TChainableClient,
	TGitHubClientConfig,
	TRequestOptions,
} from "./services/github-client";
// Chainable client exports
export { createGitHubClient } from "./services/github-client";
export type { THttpClientConfig, THttpResponse } from "./services/http-client";
// HTTP client exports (for advanced users)
export { createHttpClient } from "./services/http-client";
export type { TFetchRepositoriesOpts } from "./services/repo-fetcher";
export { fetchRepositories } from "./services/repo-fetcher";
export type { TFetchUserOpts } from "./services/user-fetcher";
// Legacy exports for backward compatibility
export { fetchUser } from "./services/user-fetcher";
// Type exports
export type { TBaseEntity } from "./types/base-entity";
export type { TGitHubRepository } from "./types/github-repository";
export type { TGitHubUser } from "./types/github-user";

import {
	buildFluent as buildFluentFunc,
	buildSimple as buildSimpleFunc,
	buildStructured as buildStructuredFunc,
} from "./builders/response-builder";
import { fetchRepositories as fetchReposFunc } from "./services/repo-fetcher";
// Legacy function for backward compatibility
import { fetchUser as fetchUserFunc } from "./services/user-fetcher";
import type { TGitHubRepository as TGitHubRepo } from "./types/github-repository";

type TFetchGitHubDataOptions = {
	format?: "simple" | "structured" | "fluent";
	filters?: (repos: TGitHubRepo[]) => TGitHubRepo[];
};

function fetchGitHubData(
	username: string,
	options: TFetchGitHubDataOptions = {},
) {
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
export type { TFetchGitHubDataOptions };
