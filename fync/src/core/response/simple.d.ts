import type { TApiResponse, TErrorResponse, TSuccessResponse } from "../types";
export declare function createSimpleResponse<T>(
	data: T,
	success?: boolean,
	message?: string,
): TApiResponse<T>;
export declare function createSuccessResponse<T>(
	data: T,
	message?: string,
): TSuccessResponse<T>;
export declare function createErrorResponse(
	error: string,
	message: string,
	statusCode?: number,
): TErrorResponse;
export declare function createDataResponse<T>(data: T): TApiResponse<T>;
export declare function createEmptyResponse(): TApiResponse<null>;
//# sourceMappingURL=simple.d.ts.map
