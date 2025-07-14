export type TCacheEntry<T = unknown> = {
	value: T;
	expiry?: number;
	timestamp: number;
};
export type TCacheOptions = {
	ttl?: number;
	maxSize?: number;
	serialize?: (value: unknown) => string;
	deserialize?: (value: string) => unknown;
};
export type TCacheAdapter<T = unknown> = {
	get(key: string): Promise<T | undefined> | T | undefined;
	set(key: string, value: T, ttl?: number): Promise<void> | void;
	delete(key: string): Promise<boolean> | boolean;
	clear(): Promise<void> | void;
	has(key: string): Promise<boolean> | boolean;
	size(): Promise<number> | number;
};
//# sourceMappingURL=types.d.ts.map
