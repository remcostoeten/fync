import type { TGitHubRepository } from "../types/github-repository";
import type { TGitHubUser } from "../types/github-user";
type TSimpleResponse = {
    user: TGitHubUser;
    repos: TGitHubRepository[];
};
type TStructuredResponse = {
    metadata: {
        fetchedAt: string;
        repoCount: number;
    };
    data: {
        user: TGitHubUser;
        repos: TGitHubRepository[];
    };
};
type TFluentResponse = {
    getUser(): TGitHubUser;
    filterRepos(callback: (repo: TGitHubRepository) => boolean): TFluentResponse;
    value(): TSimpleResponse;
};
declare function buildSimple(user: TGitHubUser, repos: TGitHubRepository[]): TSimpleResponse;
declare function buildStructured(user: TGitHubUser, repos: TGitHubRepository[]): TStructuredResponse;
declare function buildFluent(user: TGitHubUser, repos: TGitHubRepository[]): TFluentResponse;
export { buildSimple, buildStructured, buildFluent };
export type { TSimpleResponse, TStructuredResponse, TFluentResponse };
type TApiResponse<T = unknown> = {
    data: T;
    meta: {
        total: number;
        page: number;
        per_page: number;
        total_pages: number;
    };
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
};
type TErrorResponse = {
    error: {
        message: string;
        code: string;
        details?: Record<string, unknown>;
    };
};
type TResponseBuilderOptions = {
    baseUrl?: string;
    page?: number;
    per_page?: number;
    total?: number;
};
declare function buildSuccessResponse<T>(data: T[], options?: TResponseBuilderOptions): TApiResponse<T[]>;
declare function buildErrorResponse(message: string, code: string, details?: Record<string, unknown>): TErrorResponse;
declare function buildSingleItemResponse<T>(data: T): {
    data: T;
};
declare function paginateData<T>(data: T[], page: number, per_page: number): T[];
export { buildSuccessResponse, buildErrorResponse, buildSingleItemResponse, paginateData, };
export type { TApiResponse, TErrorResponse, TResponseBuilderOptions };
//# sourceMappingURL=response-builder.d.ts.map