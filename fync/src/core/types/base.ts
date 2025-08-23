export type TDateValue = string | Date;

export type TEntityId = string | number;

export type TTimestamps = {
	createdAt?: TDateValue;
	updatedAt?: TDateValue;
};

export type TBaseEntity<TId extends TEntityId = TEntityId> = {
	id: TId;
} & TTimestamps;

export type TOptionalTimestamps = {
	createdAt?: TDateValue;
	updatedAt?: TDateValue;
};

export type TCreateEntity<T> = Omit<T, "id" | "createdAt" | "updatedAt">;

export type TUpdateEntity<T> = Partial<Omit<T, "id" | "createdAt">> & {
	id: T extends { id: infer Id } ? Id : TEntityId;
};
