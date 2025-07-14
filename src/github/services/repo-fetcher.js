import { memoize } from "./cache-service";
import { httpRequestWithPagination } from "./http-client";

async function fetchRepositoriesInternal(username, opts = {}) {
	const { signal, ...queryParams } = opts;
	const defaultParams = {
		type: "all",
		sort: "updated",
		direction: "desc",
		per_page: 30,
		...queryParams,
	};
	const response = await httpRequestWithPagination(
		`https://api.github.com/users/${username}/repos`,
		defaultParams,
		signal,
	);
	return response.data;
}
function fetchRepositories(username, opts = {}) {
	return memoizedFetchRepositories(username, opts);
}
const fetchRepositoriesWrapper = async (...args) => {
	const username = args[0];
	const opts = args[1] || {};
	return fetchRepositoriesInternal(username, opts);
};
const memoizedFetchRepositories = memoize(
	fetchRepositoriesWrapper,
	(...args) => {
		const username = args[0];
		const opts = args[1] || {};
		const { signal: _signal, ...cacheableOpts } = opts;
		return `repos:${username}:${JSON.stringify(cacheableOpts)}`;
	},
);
export { fetchRepositories };
//# sourceMappingURL=repo-fetcher.js.map
