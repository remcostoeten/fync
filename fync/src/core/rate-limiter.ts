/**
 * Rate limiting implementation to prevent hitting API limits
 */

type TRateLimitConfig = {
	maxRequests: number;
	windowMs: number; // Time window in milliseconds
	retryAfter?: number; // Wait time before retry in milliseconds
};

type TRateLimitState = {
	requests: number[];
	blocked: boolean;
	blockUntil?: number;
};

export class RateLimiter {
	private limits: Map<string, TRateLimitConfig>;
	private state: Map<string, TRateLimitState>;
	private defaultConfig: TRateLimitConfig;

	constructor(defaultConfig?: Partial<TRateLimitConfig>) {
		this.limits = new Map();
		this.state = new Map();
		this.defaultConfig = {
			maxRequests: defaultConfig?.maxRequests || 100,
			windowMs: defaultConfig?.windowMs || 60 * 1000, // 1 minute default
			retryAfter: defaultConfig?.retryAfter || 1000, // 1 second default
		};
	}

	setLimit(key: string, config: TRateLimitConfig): void {
		this.limits.set(key, config);
	}

	private getConfig(key: string): TRateLimitConfig {
		return this.limits.get(key) || this.defaultConfig;
	}

	private getState(key: string): TRateLimitState {
		if (!this.state.has(key)) {
			this.state.set(key, {
				requests: [],
				blocked: false,
			});
		}
		return this.state.get(key)!;
	}

	private cleanOldRequests(state: TRateLimitState, windowMs: number): void {
		const now = Date.now();
		const cutoff = now - windowMs;
		state.requests = state.requests.filter(time => time > cutoff);
	}

	async checkLimit(key: string): Promise<boolean> {
		const config = this.getConfig(key);
		const state = this.getState(key);
		const now = Date.now();

		// Check if currently blocked
		if (state.blocked && state.blockUntil) {
			if (now < state.blockUntil) {
				return false;
			}
			// Unblock if time has passed
			state.blocked = false;
			state.blockUntil = undefined;
		}

		// Clean old requests outside the window
		this.cleanOldRequests(state, config.windowMs);

		// Check if limit exceeded
		if (state.requests.length >= config.maxRequests) {
			state.blocked = true;
			state.blockUntil = now + (config.retryAfter || 1000);
			return false;
		}

		// Record the request
		state.requests.push(now);
		return true;
	}

	async waitForLimit(key: string): Promise<void> {
		const state = this.getState(key);
		
		if (state.blocked && state.blockUntil) {
			const waitTime = state.blockUntil - Date.now();
			if (waitTime > 0) {
				await new Promise(resolve => setTimeout(resolve, waitTime));
			}
		}
	}

	getRemainingRequests(key: string): number {
		const config = this.getConfig(key);
		const state = this.getState(key);
		
		this.cleanOldRequests(state, config.windowMs);
		
		return Math.max(0, config.maxRequests - state.requests.length);
	}

	getResetTime(key: string): number | null {
		const config = this.getConfig(key);
		const state = this.getState(key);
		
		if (state.requests.length === 0) {
			return null;
		}
		
		const oldestRequest = Math.min(...state.requests);
		return oldestRequest + config.windowMs;
	}

	reset(key?: string): void {
		if (key) {
			this.state.delete(key);
		} else {
			this.state.clear();
		}
	}
}

export function createRateLimiter(defaultConfig?: Partial<TRateLimitConfig>): RateLimiter {
	return new RateLimiter(defaultConfig);
}

// Preset configurations for common APIs
export const RATE_LIMIT_PRESETS = {
	github: {
		authenticated: { maxRequests: 5000, windowMs: 60 * 60 * 1000 }, // 5000/hour
		unauthenticated: { maxRequests: 60, windowMs: 60 * 60 * 1000 }, // 60/hour
	},
	spotify: {
		default: { maxRequests: 180, windowMs: 60 * 1000 }, // ~180/minute
	},
	vercel: {
		default: { maxRequests: 100, windowMs: 10 * 1000 }, // 100/10 seconds
	},
	google: {
		default: { maxRequests: 1000, windowMs: 100 * 1000 }, // 1000/100 seconds
	},
};

export type { TRateLimitConfig };
