import type { TGitHubRepository } from "../types/github-repository";
type TFetchRepositoriesOpts = {
	type?: "all" | "owner" | "member";
	sort?: "created" | "updated" | "pushed" | "full_name";
	direction?: "asc" | "desc";
	per_page?: number;
	page?: number;
	signal?: AbortSignal;
};
declare function fetchRepositories(
	username: string,
	opts?: TFetchRepositoriesOpts,
): Promise<TGitHubRepository[]>;
export { fetchRepositories };
export type { TFetchRepositoriesOpts };
//# sourceMappingURL=repo-fetcher.d.ts.map
