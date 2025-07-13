export type TTimestamps = {
  createdAt: Date;
  updatedAt: Date;
};

export type TBaseEntity = {
  id: number;
} & TTimestamps;

export type TOptionalTimestamps = {
  createdAt?: Date;
  updatedAt?: Date;
};

export type TCreateEntity<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

export type TUpdateEntity<T> = Partial<Omit<T, 'id' | 'createdAt'>> & {
  id: number;
};

export type TFilterOptions<T> = {
  filters?: Array<{
    field: keyof T;
    operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'startsWith' | 'endsWith';
    value: unknown;
  }>;
  sort?: {
    field: keyof T;
    direction: 'asc' | 'desc';
  };
  limit?: number;
  offset?: number;
};
