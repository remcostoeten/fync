import type {
	TFilter,
	TFilterCondition,
	TFilterFunction,
	TFilterGroup,
	TFilterOperator,
} from "./types";
export declare function createFilterFunction<T>(
	filter: TFilter<T>,
): TFilterFunction<T>;
export declare function applyFilters<T>(items: T[], filters: TFilter<T>[]): T[];
export declare function createOperatorFilter<T>(
	field: keyof T,
	operator: TFilterOperator,
	value: unknown,
): TFilterCondition<T>;
export declare function createGroupFilter<T>(
	conditions: TFilterCondition<T>[],
	operator?: "and" | "or",
): TFilterGroup<T>;
//# sourceMappingURL=engine.d.ts.map
