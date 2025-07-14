function evaluateCondition(item, condition) {
	const fieldValue = item[condition.field];
	const filterValue = condition.value;
	switch (condition.operator) {
		case "eq":
			return fieldValue === filterValue;
		case "ne":
			return fieldValue !== filterValue;
		case "gt":
			return fieldValue > filterValue;
		case "gte":
			return fieldValue >= filterValue;
		case "lt":
			return fieldValue < filterValue;
		case "lte":
			return fieldValue <= filterValue;
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
function evaluateGroup(item, group) {
	const results = group.conditions.map((condition) =>
		evaluateCondition(item, condition),
	);
	return group.operator === "and"
		? results.every((result) => result)
		: results.some((result) => result);
}
function isFilterGroup(filter) {
	return "conditions" in filter && "operator" in filter;
}
export function createFilterFunction(filter) {
	return function (item) {
		return isFilterGroup(filter)
			? evaluateGroup(item, filter)
			: evaluateCondition(item, filter);
	};
}
export function applyFilters(items, filters) {
	if (!filters.length) return items;
	return items.filter((item) => {
		return filters.every((filter) => createFilterFunction(filter)(item));
	});
}
export function createOperatorFilter(field, operator, value) {
	return { field, operator, value };
}
export function createGroupFilter(conditions, operator = "and") {
	return { conditions, operator };
}
//# sourceMappingURL=engine.js.map
