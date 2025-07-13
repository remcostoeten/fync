export type TFilterOperator = 
  | 'eq' 
  | 'ne' 
  | 'gt' 
  | 'gte' 
  | 'lt' 
  | 'lte' 
  | 'in' 
  | 'nin' 
  | 'contains' 
  | 'startsWith' 
  | 'endsWith' 
  | 'regex';

export type TFilterCondition<T = unknown> = {
  field: keyof T;
  operator: TFilterOperator;
  value: unknown;
};

export type TFilterGroup<T = unknown> = {
  conditions: TFilterCondition<T>[];
  operator: 'and' | 'or';
};

export type TFilter<T = unknown> = TFilterCondition<T> | TFilterGroup<T>;

export type TFilterFunction<T> = (item: T) => boolean;

export type TFieldPicker<T> = (keyof T)[] | Record<keyof T, boolean>;

export type TSortOrder = 'asc' | 'desc';

export type TSortConfig<T> = {
  field: keyof T;
  order: TSortOrder;
};

export type TFilterOptions<T = unknown> = {
  filters?: TFilter<T>[];
  sort?: TSortConfig<T>[];
  limit?: number;
  offset?: number;
  fields?: TFieldPicker<T>;
};
