export type TApiResponse<T = unknown> = {
	data: T;
	success: boolean;
	message?: string;
	error?: string;
	timestamp?: Date;
};
export type TListResponse<T> = {
	data: T[];
	total: number;
};
export type TErrorResponse = {
	error: string;
	message: string;
	statusCode: number;
	timestamp?: Date;
};
export type TSuccessResponse<T> = {
	data: T;
	success: true;
	message?: string;
	timestamp?: Date;
};
export type TResult<T, E = string> =
	| {
			success: true;
			data: T;
	  }
	| {
			success: false;
			error: E;
	  };
//# sourceMappingURL=response.d.ts.map
