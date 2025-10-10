/**
 * Result type for predictable error handling
 * Following the pattern specified in architecture.md
 */

type TSuccess<T> = {
	ok: true;
	value: T;
};

type TFailure<E = string> = {
	ok: false;
	error: E;
};

export type TResult<T, E = string> = TSuccess<T> | TFailure<E>;

export type TApiError = {
	message: string;
	statusCode?: number;
	details?: Record<string, any>;
};

/**
 * Helper functions for creating and handling results
 */
export function success<T>(value: T): TSuccess<T> {
	return { ok: true, value };
}

export function failure<E = string>(error: E): TFailure<E> {
	return { ok: false, error };
}

export function isSuccess<T, E>(result: TResult<T, E>): result is TSuccess<T> {
	return result.ok === true;
}

export function isFailure<T, E>(result: TResult<T, E>): result is TFailure<E> {
	return result.ok === false;
}

export function unwrap<T, E>(result: TResult<T, E>): T {
	if (isSuccess(result)) {
		return result.value;
	}
	throw new Error(typeof result.error === 'string' ? result.error : 'Operation failed');
}

export function unwrapOr<T, E>(result: TResult<T, E>, defaultValue: T): T {
	return isSuccess(result) ? result.value : defaultValue;
}

export function mapResult<T, U, E>(
	result: TResult<T, E>,
	fn: (value: T) => U
): TResult<U, E> {
	if (isSuccess(result)) {
		return success(fn(result.value));
	}
	return result;
}

export async function tryCatch<T>(
	fn: () => Promise<T>,
	errorTransform?: (error: any) => string | TApiError
): Promise<TResult<T, string | TApiError>> {
	try {
		const value = await fn();
		return success(value);
	} catch (error) {
		if (errorTransform) {
			return failure(errorTransform(error));
		}
		if (error instanceof Error) {
			return failure(error.message);
		}
		return failure(String(error));
	}
}
