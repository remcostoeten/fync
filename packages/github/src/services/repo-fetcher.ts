import type { TGitHubRepository } from "../types/github-repository";
import { memoize } from "./cache-service";
import { httpRequestWithPagination } from "./http-client";

type TFetchRepositoriesOpts = {
	type?: "all" | "owner" | "member";
	sort?: "created" | "updated" | "pushed" | "full_name";
	direction?: "asc" | "desc";
	per_page?: number;
	page?: number;
	signal?: AbortSignal;
};

async function fetchRepositoriesInternal(
	username: string,
	opts: TFetchRepositoriesOpts = {},
): Promise<TGitHubRepository[]> {
	const { signal, ...queryParams } = opts;

	const defaultParams = {
		type: "all",
		sort: "updated",
		direction: "desc",
		per_page: 30,
		...queryParams,
	};

	const response = await httpRequestWithPagination<TGitHubRepository>(
		`https://api.github.com/users/${username}/repos`,
		defaultParams,
		signal,
	);

	return response.data;
}

function fetchRepositories(
	username: string,
	opts: TFetchRepositoriesOpts = {},
): Promise<TGitHubRepository[]> {
	return memoizedFetchRepositories(username, opts);
}

const fetchRepositoriesWrapper = async (
	...args: unknown[]
): Promise<TGitHubRepository[]> => {
	const username = args[0] as string;
	const opts = (args[1] as TFetchRepositoriesOpts) || {};
	return fetchRepositoriesInternal(username, opts);
};

const memoizedFetchRepositories = memoize(
	fetchRepositoriesWrapper,
	(...args: unknown[]) => {
		const username = args[0] as string;
		const opts = (args[1] as TFetchRepositoriesOpts) || {};
		const { signal: _signal, ...cacheableOpts } = opts;
		return `repos:${username}:${JSON.stringify(cacheableOpts)}`;
	},
) as typeof fetchRepositoriesWrapper;

export { fetchRepositories };
export type { TFetchRepositoriesOpts };
