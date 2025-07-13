import type { TApiResponse } from "../types";

export class FluentResponseBuilder<T> {
	private response: Partial<TApiResponse<T>> = {};

	static create<T>(data: T): FluentResponseBuilder<T> {
		return new FluentResponseBuilder<T>().withData(data);
	}

	withData(data: T): FluentResponseBuilder<T> {
		this.response.data = data;
		return this;
	}

	withSuccess(success: boolean): FluentResponseBuilder<T> {
		this.response.success = success;
		return this;
	}

	withMessage(message: string): FluentResponseBuilder<T> {
		this.response.message = message;
		return this;
	}

	withError(error: string): FluentResponseBuilder<T> {
		this.response.error = error;
		this.response.success = false;
		return this;
	}

	withTimestamp(timestamp: Date): FluentResponseBuilder<T> {
		this.response.timestamp = timestamp;
		return this;
	}

	build(): TApiResponse<T> {
		return {
			data: this.response.data as T,
			success: this.response.success ?? true,
			message: this.response.message,
			error: this.response.error,
			timestamp: this.response.timestamp || new Date(),
		};
	}
}

export function createFluentResponse<T>(data: T): FluentResponseBuilder<T> {
	return FluentResponseBuilder.create(data);
}
