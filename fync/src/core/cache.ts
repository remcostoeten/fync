/**
 * Simple in-memory cache implementation
 */

type TCacheEntry<T> = {
	value: T;
	expiry: number;
};

type TCacheConfig = {
	enabled: boolean;
	ttl: number; // Time to live in milliseconds
	maxSize?: number; // Maximum number of cache entries
};

export class Cache {
	private store: Map<string, TCacheEntry<any>>;
	private config: TCacheConfig;

	constructor(config: Partial<TCacheConfig> = {}) {
		this.store = new Map();
		this.config = {
			enabled: config.enabled !== false,
			ttl: config.ttl || 5 * 60 * 1000, // 5 minutes default
			maxSize: config.maxSize || 1000,
		};
	}

	private createKey(method: string, url: string, params?: any): string {
		const paramString = params ? JSON.stringify(params) : '';
		return `${method}:${url}:${paramString}`;
	}

	private isExpired(entry: TCacheEntry<any>): boolean {
		return Date.now() > entry.expiry;
	}

	private cleanup(): void {
		if (this.store.size > this.config.maxSize!) {
			// Remove oldest entries
			const entriesToRemove = this.store.size - Math.floor(this.config.maxSize! * 0.8);
			const keys = Array.from(this.store.keys()).slice(0, entriesToRemove);
			keys.forEach(key => this.store.delete(key));
		}
	}

	get<T>(method: string, url: string, params?: any): T | null {
		if (!this.config.enabled) return null;

		const key = this.createKey(method, url, params);
		const entry = this.store.get(key);

		if (!entry) return null;

		if (this.isExpired(entry)) {
			this.store.delete(key);
			return null;
		}

		return entry.value as T;
	}

	set<T>(method: string, url: string, value: T, params?: any, customTTL?: number): void {
		if (!this.config.enabled) return;

		const key = this.createKey(method, url, params);
		const ttl = customTTL || this.config.ttl;
		
		this.store.set(key, {
			value,
			expiry: Date.now() + ttl,
		});

		this.cleanup();
	}

	invalidate(pattern?: string): void {
		if (!pattern) {
			this.store.clear();
			return;
		}

		const keys = Array.from(this.store.keys());
		keys.forEach(key => {
			if (key.includes(pattern)) {
				this.store.delete(key);
			}
		});
	}

	invalidateByUrl(url: string): void {
		const keys = Array.from(this.store.keys());
		keys.forEach(key => {
			if (key.includes(url)) {
				this.store.delete(key);
			}
		});
	}

	clear(): void {
		this.store.clear();
	}

	size(): number {
		return this.store.size;
	}

	setEnabled(enabled: boolean): void {
		this.config.enabled = enabled;
		if (!enabled) {
			this.clear();
		}
	}

	setTTL(ttl: number): void {
		this.config.ttl = ttl;
	}
}

export function createCache(config?: Partial<TCacheConfig>): Cache {
	return new Cache(config);
}

export type { TCacheConfig };
