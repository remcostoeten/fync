import type { TApiResponse, TListResponse, TPaginatedResponse } from "../types";
export declare function createListResponse<T>(
	data: T[],
	total?: number,
): TListResponse<T>;
export declare function createPaginatedResponse<T>(
	data: T[],
	total: number,
	page: number,
	perPage: number,
): TPaginatedResponse<T>;
export declare function createBatchResponse<T>(
	successful: T[],
	failed: {
		error: string;
		item: unknown;
	}[],
): TApiResponse<{
	successful: T[];
	failed: {
		error: string;
		item: unknown;
	}[];
}>;
export declare function createMetadataResponse<T>(
	data: T,
	metadata: Record<string, unknown>,
): TApiResponse<T> & {
	metadata: Record<string, unknown>;
};
//# sourceMappingURL=structured.d.ts.map
