export class FluentResponseBuilder {
	constructor() {
		this.response = {};
	}
	static create(data) {
		return new FluentResponseBuilder().withData(data);
	}
	withData(data) {
		this.response.data = data;
		return this;
	}
	withSuccess(success) {
		this.response.success = success;
		return this;
	}
	withMessage(message) {
		this.response.message = message;
		return this;
	}
	withError(error) {
		this.response.error = error;
		this.response.success = false;
		return this;
	}
	withTimestamp(timestamp) {
		this.response.timestamp = timestamp;
		return this;
	}
	build() {
		return {
			data: this.response.data,
			success: this.response.success ?? true,
			message: this.response.message,
			error: this.response.error,
			timestamp: this.response.timestamp || new Date(),
		};
	}
}
export function createFluentResponse(data) {
	return FluentResponseBuilder.create(data);
}
//# sourceMappingURL=fluent.js.map
