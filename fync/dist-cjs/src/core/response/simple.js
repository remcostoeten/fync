"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDataResponse = createDataResponse;
exports.createEmptyResponse = createEmptyResponse;
exports.createErrorResponse = createErrorResponse;
exports.createSimpleResponse = createSimpleResponse;
exports.createSuccessResponse = createSuccessResponse;
function createSimpleResponse(data, success = true, message) {
  return {
    data,
    success,
    message,
    timestamp: new Date()
  };
}
function createSuccessResponse(data, message) {
  return {
    data,
    success: true,
    message,
    timestamp: new Date()
  };
}
function createErrorResponse(error, message, statusCode = 500) {
  return {
    error,
    message,
    statusCode,
    timestamp: new Date()
  };
}
function createDataResponse(data) {
  return createSimpleResponse(data, true);
}
function createEmptyResponse() {
  return createSimpleResponse(null, true);
}