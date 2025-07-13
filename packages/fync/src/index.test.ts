import { describe, expect, it } from "vitest";
import { fync } from "./index.js";

describe("fync", () => {
	it("should return expected placeholder message", () => {
		const result = fync();
		expect(result).toBe("fync - GitHub API client coming soon!");
	});

	it("should be a function", () => {
		expect(typeof fync).toBe("function");
	});

	it("should return a string", () => {
		const result = fync();
		expect(typeof result).toBe("string");
	});
});
