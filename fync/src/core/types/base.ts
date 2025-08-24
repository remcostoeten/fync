export type TDateValue = string | Date;

export type TTimestamps = {
	createdAt?: TDateValue;
	updatedAt?: TDateValue;
};

export type TBaseEntity<TId extends string | number = string | number> = {
	id: TId;
} & TTimestamps;
