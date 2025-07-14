export function createListResponse(data, total) {
	return {
		data,
		total: total ?? data.length,
	};
}
export function createPaginatedResponse(data, total, page, perPage) {
	return {
		data,
		total,
		page,
		perPage,
	};
}
export function createBatchResponse(successful, failed) {
	return {
		data: {
			successful,
			failed,
		},
		success: failed.length === 0,
		message:
			failed.length > 0
				? `${failed.length} items failed`
				: "All items processed successfully",
		timestamp: new Date(),
	};
}
export function createMetadataResponse(data, metadata) {
	return {
		data,
		success: true,
		metadata,
		timestamp: new Date(),
	};
}
//# sourceMappingURL=structured.js.map
