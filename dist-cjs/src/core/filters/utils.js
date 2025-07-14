"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyFilterOptions = applyFilterOptions;
exports.composeFilters = composeFilters;
exports.createFieldPicker = createFieldPicker;
exports.createSortConfig = createSortConfig;
exports.paginateItems = paginateItems;
exports.pickFields = pickFields;
exports.sortItems = sortItems;
var _engine = require("./engine");
function composeFilters(...filters) {
  return function (item) {
    return filters.every(filter => (0, _engine.createFilterFunction)(filter)(item));
  };
}
function pickFields(items, picker) {
  if (globalThis.Array.isArray(picker)) {
    return items.map(item => {
      const result = {};
      for (const field of picker) {
        result[field] = item[field];
      }
      return result;
    });
  } else {
    return items.map(item => {
      const result = {};
      for (const [field, include] of Object.entries(picker)) {
        if (include) {
          result[field] = item[field];
        }
      }
      return result;
    });
  }
}
function sortItems(items, sortConfig) {
  if (!sortConfig.length) return items;
  return [...items].sort((a, b) => {
    for (const config of sortConfig) {
      const aValue = a[config.field];
      const bValue = b[config.field];
      let comparison = 0;
      if (aValue < bValue) comparison = -1;else if (aValue > bValue) comparison = 1;
      if (comparison !== 0) {
        return config.order === "asc" ? comparison : -comparison;
      }
    }
    return 0;
  });
}
function paginateItems(items, limit, offset) {
  if (!limit && !offset) return items;
  const start = offset || 0;
  const end = limit ? start + limit : undefined;
  return items.slice(start, end);
}
function applyFilterOptions(items, options) {
  let result = [...items];
  if (options.filters) {
    result = (0, _engine.applyFilters)(result, options.filters);
  }
  if (options.sort) {
    result = sortItems(result, options.sort);
  }
  if (options.limit || options.offset) {
    result = paginateItems(result, options.limit, options.offset);
  }
  return result;
}
function createFieldPicker(fields) {
  return fields;
}
function createSortConfig(field, order = "asc") {
  return {
    field,
    order
  };
}