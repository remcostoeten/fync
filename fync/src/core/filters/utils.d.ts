import type {
	TFieldPicker,
	TFilter,
	TFilterFunction,
	TFilterOptions,
	TSortConfig,
	TSortOrder,
} from "./types";
export declare function composeFilters<T>(
	...filters: TFilter<T>[]
): TFilterFunction<T>;
export declare function pickFields<T>(
	items: T[],
	picker: TFieldPicker<T>,
): Partial<T>[];
export declare function sortItems<T>(
	items: T[],
	sortConfig: TSortConfig<T>[],
): T[];
export declare function paginateItems<T>(
	items: T[],
	limit?: number,
	offset?: number,
): T[];
export declare function applyFilterOptions<T>(
	items: T[],
	options: TFilterOptions<T>,
): T[];
export declare function createFieldPicker<T>(
	fields: (keyof T)[],
): TFieldPicker<T>;
export declare function createSortConfig<T>(
	field: keyof T,
	order?: TSortOrder,
): TSortConfig<T>;
//# sourceMappingURL=utils.d.ts.map
