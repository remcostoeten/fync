import type { TApiResponse } from "../types";
export declare class FluentResponseBuilder<T> {
	private response;
	static create<T>(data: T): FluentResponseBuilder<T>;
	withData(data: T): FluentResponseBuilder<T>;
	withSuccess(success: boolean): FluentResponseBuilder<T>;
	withMessage(message: string): FluentResponseBuilder<T>;
	withError(error: string): FluentResponseBuilder<T>;
	withTimestamp(timestamp: Date): FluentResponseBuilder<T>;
	build(): TApiResponse<T>;
}
export declare function createFluentResponse<T>(
	data: T,
): FluentResponseBuilder<T>;
//# sourceMappingURL=fluent.d.ts.map
