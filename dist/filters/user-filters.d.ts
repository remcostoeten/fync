import type { TGitHubUser } from "../types/github-user";
type TUserFilterCriteria = {
    type?: "User" | "Organization";
    minFollowers?: number;
    maxFollowers?: number;
    minPublicRepos?: number;
    maxPublicRepos?: number;
    location?: string;
    company?: string;
    hasBio?: boolean;
    hasEmail?: boolean;
};
type TUserFieldFilter = {
    include?: (keyof TGitHubUser)[];
    exclude?: (keyof TGitHubUser)[];
};
declare function filterUsersByType(users: TGitHubUser[], type: "User" | "Organization"): TGitHubUser[];
declare function filterUsersByFollowers(users: TGitHubUser[], min?: number, max?: number): TGitHubUser[];
declare function filterUsersByPublicRepos(users: TGitHubUser[], min?: number, max?: number): TGitHubUser[];
declare function filterUsersByLocation(users: TGitHubUser[], location: string): TGitHubUser[];
declare function filterUsersByCompany(users: TGitHubUser[], company: string): TGitHubUser[];
declare function filterUserFields(user: TGitHubUser, filter: TUserFieldFilter): Partial<TGitHubUser>;
declare function filterUsers(users: TGitHubUser[], criteria: TUserFilterCriteria): TGitHubUser[];
export { filterUsers, filterUserFields, filterUsersByType, filterUsersByFollowers, filterUsersByPublicRepos, filterUsersByLocation, filterUsersByCompany, };
export type { TUserFilterCriteria, TUserFieldFilter };
//# sourceMappingURL=user-filters.d.ts.map