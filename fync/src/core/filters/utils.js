import { applyFilters, createFilterFunction } from "./engine";
export function composeFilters(...filters) {
	return function (item) {
		return filters.every((filter) => createFilterFunction(filter)(item));
	};
}
export function pickFields(items, picker) {
	if (globalThis.Array.isArray(picker)) {
		return items.map((item) => {
			const result = {};
			for (const field of picker) {
				result[field] = item[field];
			}
			return result;
		});
	} else {
		return items.map((item) => {
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
export function sortItems(items, sortConfig) {
	if (!sortConfig.length) return items;
	return [...items].sort((a, b) => {
		for (const config of sortConfig) {
			const aValue = a[config.field];
			const bValue = b[config.field];
			let comparison = 0;
			if (aValue < bValue) comparison = -1;
			else if (aValue > bValue) comparison = 1;
			if (comparison !== 0) {
				return config.order === "asc" ? comparison : -comparison;
			}
		}
		return 0;
	});
}
export function paginateItems(items, limit, offset) {
	if (!limit && !offset) return items;
	const start = offset || 0;
	const end = limit ? start + limit : undefined;
	return items.slice(start, end);
}
export function applyFilterOptions(items, options) {
	let result = [...items];
	if (options.filters) {
		result = applyFilters(result, options.filters);
	}
	if (options.sort) {
		result = sortItems(result, options.sort);
	}
	if (options.limit || options.offset) {
		result = paginateItems(result, options.limit, options.offset);
	}
	return result;
}
export function createFieldPicker(fields) {
	return fields;
}
export function createSortConfig(field, order = "asc") {
	return { field, order };
}
//# sourceMappingURL=utils.js.map
