export type { TApiResponse, TErrorResponse, TFluentResponse, TResponseBuilderOptions, TSimpleResponse, TStructuredResponse, } from "./builders/response-builder";
export { buildErrorResponse, buildFluent, buildSimple, buildSingleItemResponse, buildStructured, buildSuccessResponse, paginateData, } from "./builders/response-builder";
export type { TRepositoryFilterCriteria, TRepositoryFilterOptions, } from "./filters/repository-filters";
export { filterRepositories, filterRepositoriesByAdvancedCriteria, filterRepositoriesByForks, filterRepositoriesByLanguage, filterRepositoriesByLicense, filterRepositoriesByStars, filterRepositoriesByTopics, filterRepositoriesByWatchers, } from "./filters/repository-filters";
export type { TUserFieldFilter, TUserFilterCriteria, } from "./filters/user-filters";
export { filterUserFields, filterUsers, filterUsersByCompany, filterUsersByFollowers, filterUsersByLocation, filterUsersByPublicRepos, filterUsersByType, } from "./filters/user-filters";
export type { TAuthenticatedUserClient, TGistClient, TGitHub, TOrgClient, TRepoClient, TSearchClient, TUserClient, } from "./github";
export { GitHub } from "./github";
export { getCache, memoize, setCache } from "./services/cache-service";
export type { TChainableClient, TGitHubClientConfig, TRequestOptions, } from "./services/github-client";
export { createGitHubClient } from "./services/github-client";
export type { THttpClientConfig, THttpResponse } from "./services/http-client";
export { createHttpClient } from "./services/http-client";
export type { TFetchRepositoriesOpts } from "./services/repo-fetcher";
export { fetchRepositories } from "./services/repo-fetcher";
export type { TFetchUserOpts } from "./services/user-fetcher";
export { fetchUser } from "./services/user-fetcher";
export type { TBaseEntity } from "./types/base-entity";
export type { TGitHubRepository } from "./types/github-repository";
export type { TGitHubUser } from "./types/github-user";
import type { TGitHubRepository as TGitHubRepo } from "./types/github-repository";
type TFetchGitHubDataOptions = {
    format?: "simple" | "structured" | "fluent";
    filters?: (repos: TGitHubRepo[]) => TGitHubRepo[];
};
declare function fetchGitHubData(username: string, options?: TFetchGitHubDataOptions): () => Promise<import("./builders/response-builder").TSimpleResponse | import("./builders/response-builder").TStructuredResponse | import("./builders/response-builder").TFluentResponse>;
export { fetchGitHubData };
export type { TFetchGitHubDataOptions };
//# sourceMappingURL=index.d.ts.map