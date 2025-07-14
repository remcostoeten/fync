import type { TGitHubRepository } from "../types/github-repository";
type TRepositoryFilterCriteria = {
	language?: string;
	minForks?: number;
	maxForks?: number;
	minStars?: number;
	maxStars?: number;
	minWatchers?: number;
	maxWatchers?: number;
	topics?: string[];
	license?: string;
	isPrivate?: boolean;
	isFork?: boolean;
	isArchived?: boolean;
	isDisabled?: boolean;
	visibility?: "public" | "private" | "internal";
};
type TRepositoryFilterOptions = {
	names?: string[];
	languages?: string[];
	starsMin?: number;
	starsMax?: number;
	forksMin?: number;
	forksMax?: number;
	topics?: string[];
	license?: string;
	isPrivate?: boolean;
	isFork?: boolean;
	isArchived?: boolean;
	isDisabled?: boolean;
	visibility?: "public" | "private" | "internal";
};
declare function filterRepositoriesByLanguage(
	repos: TGitHubRepository[],
	language: string,
): TGitHubRepository[];
declare function filterRepositoriesByForks(
	repos: TGitHubRepository[],
	min?: number,
	max?: number,
): TGitHubRepository[];
declare function filterRepositoriesByStars(
	repos: TGitHubRepository[],
	min?: number,
	max?: number,
): TGitHubRepository[];
declare function filterRepositoriesByWatchers(
	repos: TGitHubRepository[],
	min?: number,
	max?: number,
): TGitHubRepository[];
declare function filterRepositoriesByTopics(
	repos: TGitHubRepository[],
	topics: string[],
): TGitHubRepository[];
declare function filterRepositoriesByLicense(
	repos: TGitHubRepository[],
	license: string,
): TGitHubRepository[];
declare function filterRepositories(
	repos: TGitHubRepository[],
	options: TRepositoryFilterOptions,
): TGitHubRepository[];
declare function filterRepositoriesByAdvancedCriteria(
	repos: TGitHubRepository[],
	criteria: TRepositoryFilterCriteria,
): TGitHubRepository[];
export {
	filterRepositories,
	filterRepositoriesByAdvancedCriteria,
	filterRepositoriesByLanguage,
	filterRepositoriesByForks,
	filterRepositoriesByStars,
	filterRepositoriesByWatchers,
	filterRepositoriesByTopics,
	filterRepositoriesByLicense,
};
export type { TRepositoryFilterCriteria, TRepositoryFilterOptions };
//# sourceMappingURL=repository-filters.d.ts.map
