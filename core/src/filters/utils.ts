import { applyFilters, createFilterFunction } from "./engine";
import type {
	TFieldPicker,
	TFilter,
	TFilterFunction,
	TFilterOptions,
	TSortConfig,
	TSortOrder,
} from "./types";

export function composeFilters<T>(
	...filters: TFilter<T>[]
): TFilterFunction<T> {
	return function (item: T): boolean {
		return filters.every((filter) => createFilterFunction(filter)(item));
	};
}

export function pickFields<T>(
	items: T[],
	picker: TFieldPicker<T>,
): Partial<T>[] {
	if (globalThis.Array.isArray(picker)) {
		return items.map((item) => {
			const result: Partial<T> = {};
			for (const field of picker) {
				result[field] = item[field];
			}
			return result;
		});
	} else {
		return items.map((item) => {
			const result: Partial<T> = {};
			for (const [field, include] of Object.entries(picker)) {
				if (include) {
					result[field as keyof T] = item[field as keyof T];
				}
			}
			return result;
		});
	}
}

export function sortItems<T>(items: T[], sortConfig: TSortConfig<T>[]): T[] {
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

export function paginateItems<T>(
	items: T[],
	limit?: number,
	offset?: number,
): T[] {
	if (!limit && !offset) return items;

	const start = offset || 0;
	const end = limit ? start + limit : undefined;

	return items.slice(start, end);
}

export function applyFilterOptions<T>(
	items: T[],
	options: TFilterOptions<T>,
): T[] {
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

export function createFieldPicker<T>(fields: (keyof T)[]): TFieldPicker<T> {
	return fields;
}

export function createSortConfig<T>(
	field: keyof T,
	order: TSortOrder = "asc",
): TSortConfig<T> {
	return { field, order };
}
