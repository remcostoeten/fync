import type { TGitHubUser } from "../types/github-user";
type TFetchUserOpts = {
	signal?: AbortSignal;
};
declare function fetchUser(
	username: string,
	opts?: TFetchUserOpts,
): Promise<TGitHubUser>;
export { fetchUser };
export type { TFetchUserOpts };
//# sourceMappingURL=user-fetcher.d.ts.map
