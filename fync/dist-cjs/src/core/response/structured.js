"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBatchResponse = createBatchResponse;
exports.createListResponse = createListResponse;
exports.createMetadataResponse = createMetadataResponse;
exports.createPaginatedResponse = createPaginatedResponse;
function createListResponse(data, total) {
  return {
    data,
    total: total ?? data.length
  };
}
function createPaginatedResponse(data, total, page, perPage) {
  return {
    data,
    total,
    page,
    perPage
  };
}
function createBatchResponse(successful, failed) {
  return {
    data: {
      successful,
      failed
    },
    success: failed.length === 0,
    message: failed.length > 0 ? `${failed.length} items failed` : "All items processed successfully",
    timestamp: new Date()
  };
}
function createMetadataResponse(data, metadata) {
  return {
    data,
    success: true,
    metadata,
    timestamp: new Date()
  };
}