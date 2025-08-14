import { describe, it, expect, vi } from "vitest";
import type { TCoreConfig } from "./index";

/**
 * Sentinel mocks to validate that wildcard re-exports from index.ts
 * correctly surface named exports from each submodule without relying
 * on exact symbol names (which may change). This approach focuses on the
 * diff content (export * lines), ensuring re-export correctness.
 */
vi.mock("./errors/exports", () => ({ __errorsSentinel: "errors-sentinel" }));
vi.mock("./http", () => ({ __httpSentinel: "http-sentinel" }));
vi.mock("./types", () => ({ __typesSentinel: "types-sentinel" }));

describe("core/index re-exports", () => {
  it("re-exports from './errors/exports'", async () => {
    const mod = await import("./index");
    expect(mod.__errorsSentinel).toBe("errors-sentinel");
  });

  it("re-exports from './http'", async () => {
    const mod = await import("./index");
    expect(mod.__httpSentinel).toBe("http-sentinel");
  });

  it("re-exports from './types'", async () => {
    const mod = await import("./index");
    expect(mod.__typesSentinel).toBe("types-sentinel");
  });
});

describe("core/index version and userAgent", () => {
  it("exports version as a string constant set to 3.4.2", async () => {
    const mod = await import("./index");
    expect(typeof mod.version).toBe("string");
    expect(mod.version).toBe("3.4.2");
    expect(mod.version).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it("exports userAgent constructed from version", async () => {
    const mod = await import("./index");
    const expected = `@remcostoeten/fync/${mod.version}`;
    expect(mod.userAgent).toBe(expected);
    expect(mod.userAgent).toMatch(/^@remcostoeten\/fync\/\d+\.\d+\.\d+$/);
  });

  it("module loads without errors and has expected top-level exports", async () => {
    const mod = await import("./index");
    expect(mod).toBeDefined();
    expect("version" in mod).toBe(true);
    expect("userAgent" in mod).toBe(true);
  });
});

describe("TCoreConfig typing behavior", () => {
  it("accepts an empty configuration object", () => {
    const cfg: TCoreConfig = {};
    expect(cfg).toEqual({});
    expect(cfg.baseURL).toBeUndefined();
    expect(cfg.timeout).toBeUndefined();
    expect(cfg.headers).toBeUndefined();
    expect(cfg.cache).toBeUndefined();
  });

  it("accepts a fully populated configuration", () => {
    const cfg: TCoreConfig = {
      baseURL: "https://api.example.com",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer token",
      },
      cache: true,
    };

    expect(cfg.baseURL).toBe("https://api.example.com");
    expect(cfg.timeout).toBe(5000);
    expect(cfg.headers).toEqual({
      "Content-Type": "application/json",
      Authorization: "Bearer token",
    });
    expect(cfg.cache).toBe(true);
  });

  it("supports partial configurations", () => {
    const onlyBase: TCoreConfig = { baseURL: "https://example.com" };
    expect(onlyBase.baseURL).toBe("https://example.com");

    const onlyTimeout: TCoreConfig = { timeout: 10000 };
    expect(onlyTimeout.timeout).toBe(10000);

    const onlyHeaders: TCoreConfig = { headers: { "X-Test": "1" } };
    expect(onlyHeaders.headers).toEqual({ "X-Test": "1" });

    const onlyCache: TCoreConfig = { cache: false };
    expect(onlyCache.cache).toBe(false);
  });

  it("handles various header configurations including special characters and unicode", () => {
    const cfg: TCoreConfig = {
      headers: {
        Accept: "application/json",
        "X-API-Key": "secret-key",
        "User-Agent": "custom-agent",
        "Cache-Control": "no-cache",
        "X-Special-Chars": "!@#$%^&*()_+-=[]{}|;:,.<>?",
        "Unicode-Header": "你好世界 🌍",
      },
    };

    expect(cfg.headers?.Accept).toBe("application/json");
    expect(cfg.headers?.["X-API-Key"]).toBe("secret-key");
    expect(cfg.headers?.["User-Agent"]).toBe("custom-agent");
    expect(cfg.headers?.["Cache-Control"]).toBe("no-cache");
    expect(cfg.headers?.["X-Special-Chars"]).toBe("!@#$%^&*()_+-=[]{}|;:,.<>?");
    expect(cfg.headers?.["Unicode-Header"]).toBe("你好世界 🌍");
  });

  it("accepts different timeout values including edge cases", () => {
    const zero: TCoreConfig = { timeout: 0 };
    const small: TCoreConfig = { timeout: 1 };
    const large: TCoreConfig = { timeout: Number.MAX_SAFE_INTEGER };
    const negative: TCoreConfig = { timeout: -1000 };

    expect(zero.timeout).toBe(0);
    expect(small.timeout).toBe(1);
    expect(large.timeout).toBe(Number.MAX_SAFE_INTEGER);
    expect(negative.timeout).toBe(-1000);
  });

  it("supports a wide range of baseURL formats", () => {
    const urls = [
      "http://localhost:3000",
      "https://api.example.com",
      "https://api.example.com/v1",
      "http://192.168.1.1:8080",
      "/api/v1",
      "",
    ];

    urls.forEach((u) => {
      const cfg: TCoreConfig = { baseURL: u };
      expect(cfg.baseURL).toBe(u);
    });
  });

  it("demonstrates merging and environment-based configuration patterns", () => {
    const defaults: TCoreConfig = {
      timeout: 5000,
      headers: { "Content-Type": "application/json" },
      cache: true,
    };

    const overrides: TCoreConfig = {
      baseURL: "https://api.example.com",
      timeout: 10000,
      cache: false,
      headers: { Authorization: "Bearer token" },
    };

    const merged: TCoreConfig = {
      ...defaults,
      ...overrides,
      headers: { ...defaults.headers, ...overrides.headers },
    };

    expect(merged.baseURL).toBe("https://api.example.com");
    expect(merged.timeout).toBe(10000);
    expect(merged.cache).toBe(false);
    expect(merged.headers?.["Content-Type"]).toBe("application/json");
    expect(merged.headers?.Authorization).toBe("Bearer token");

    const isDev = true;
    const cfg: TCoreConfig = {
      baseURL: isDev ? "http://localhost:3000" : "https://api.example.com",
      timeout: isDev ? 5000 : 30000,
      cache: !isDev,
      headers: isDev ? { "X-Debug": "true" } : {},
    };
    expect(cfg.baseURL).toBe("http://localhost:3000");
    expect(cfg.timeout).toBe(5000);
    expect(cfg.cache).toBe(false);
    expect(cfg.headers?.["X-Debug"]).toBe("true");
  });
});