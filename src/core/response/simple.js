export function createSimpleResponse(data, success = true, message) {
	return {
		data,
		success,
		message,
		timestamp: new Date(),
	};
}
export function createSuccessResponse(data, message) {
	return {
		data,
		success: true,
		message,
		timestamp: new Date(),
	};
}
export function createErrorResponse(error, message, statusCode = 500) {
	return {
		error,
		message,
		statusCode,
		timestamp: new Date(),
	};
}
export function createDataResponse(data) {
	return createSimpleResponse(data, true);
}
export function createEmptyResponse() {
	return createSimpleResponse(null, true);
}
//# sourceMappingURL=simple.js.map
