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
export type TCreateEntity<T> = Omit<T, "id" | "createdAt" | "updatedAt">;
export type TUpdateEntity<T> = Partial<Omit<T, "id" | "createdAt">> & {
	id: number;
};
//# sourceMappingURL=base.d.ts.map
