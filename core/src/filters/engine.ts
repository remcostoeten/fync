import type {
	TFilter,
	TFilterCondition,
	TFilterFunction,
	TFilterGroup,
	TFilterOperator,
} from "./types";

function evaluateCondition<T>(
	item: T,
	condition: TFilterCondition<T>,
): boolean {
	const fieldValue = item[condition.field];
	const filterValue = condition.value;

	switch (condition.operator) {
		case "eq":
			return fieldValue === filterValue;
		case "ne":
			return fieldValue !== filterValue;
		case "gt":
			return (fieldValue as number) > (filterValue as number);
		case "gte":
			return (fieldValue as number) >= (filterValue as number);
		case "lt":
			return (fieldValue as number) < (filterValue as number);
		case "lte":
			return (fieldValue as number) <= (filterValue as number);
		case "in":
			return (
				globalThis.Array.isArray(filterValue) &&
				filterValue.includes(fieldValue)
			);
		case "nin":
			return (
				globalThis.Array.isArray(filterValue) &&
				!filterValue.includes(fieldValue)
			);
		case "contains":
			return (
				typeof fieldValue === "string" &&
				typeof filterValue === "string" &&
				fieldValue.includes(filterValue)
			);
		case "startsWith":
			return (
				typeof fieldValue === "string" &&
				typeof filterValue === "string" &&
				fieldValue.startsWith(filterValue)
			);
		case "endsWith":
			return (
				typeof fieldValue === "string" &&
				typeof filterValue === "string" &&
				fieldValue.endsWith(filterValue)
			);
		case "regex":
			return (
				typeof fieldValue === "string" &&
				typeof filterValue === "string" &&
				new RegExp(filterValue).test(fieldValue)
			);
		default:
			return false;
	}
}

function evaluateGroup<T>(item: T, group: TFilterGroup<T>): boolean {
	const results = group.conditions.map((condition) =>
		evaluateCondition(item, condition),
	);

	return group.operator === "and"
		? results.every((result) => result)
		: results.some((result) => result);
}

function isFilterGroup<T>(filter: TFilter<T>): filter is TFilterGroup<T> {
	return "conditions" in filter && "operator" in filter;
}

export function createFilterFunction<T>(
	filter: TFilter<T>,
): TFilterFunction<T> {
	return function (item: T): boolean {
		return isFilterGroup(filter)
			? evaluateGroup(item, filter)
			: evaluateCondition(item, filter);
	};
}

export function applyFilters<T>(items: T[], filters: TFilter<T>[]): T[] {
	if (!filters.length) return items;

	return items.filter((item) => {
		return filters.every((filter) => createFilterFunction(filter)(item));
	});
}

export function createOperatorFilter<T>(
	field: keyof T,
	operator: TFilterOperator,
	value: unknown,
): TFilterCondition<T> {
	return { field, operator, value };
}

export function createGroupFilter<T>(
	conditions: TFilterCondition<T>[],
	operator: "and" | "or" = "and",
): TFilterGroup<T> {
	return { conditions, operator };
}
