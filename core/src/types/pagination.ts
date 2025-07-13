export type TPagination = {
	page: number;
	perPage: number;
};

export type TPaginatedResponse<T> = {
	data: T[];
	total: number;
	page: number;
	perPage: number;
};
