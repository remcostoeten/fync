export type TDateValue = string | Date;

export type TTimestamps = {
	createdAt?: TDateValue;
	updatedAt?: TDateValue;
};

export type TBaseEntity = {
	id: number;
} & TTimestamps;

export type TOptionalTimestamps = {
	createdAt?: TDateValue;
	updatedAt?: TDateValue;
};

export type TCreateEntity<T> = Omit<T, "id" | "createdAt" | "updatedAt">;

export type TUpdateEntity<T> = Partial<Omit<T, "id" | "createdAt">> & {
	id: number;
};
