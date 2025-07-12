import type { TGitHubUser } from "../types/github-user";
import { memoize } from "./cache-service";
import { httpRequest } from "./http-client";

type TFetchUserOpts = {
	signal?: AbortSignal;
};

async function fetchUserInternal(
	username: string,
	opts: TFetchUserOpts = {},
): Promise<TGitHubUser> {
	const response = await httpRequest<TGitHubUser>(
		`https://api.github.com/users/${username}`,
		undefined,
		opts.signal,
	);

	return response.data;
}

function fetchUser(
	username: string,
	opts: TFetchUserOpts = {},
): Promise<TGitHubUser> {
	return memoizedFetchUser(username, opts);
}

const memoizedFetchUser = memoize(fetchUserInternal, (...args: unknown[]) => {
	const username = args[0] as string;
	return `user:${username}`;
}) as typeof fetchUserInternal;

export { fetchUser };
export type { TFetchUserOpts };
