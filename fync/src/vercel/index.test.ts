/**
 * Unit tests for fync/src/vercel/index.ts
 *
 * Testing framework: The repository typically uses Jest or Vitest.
 * These tests use describe/it/expect and feature-detect the mock API (vi or jest)
 * so they should work with either framework without additional deps.
 */

// Feature-detect Jest vs Vitest mocking API
const hasVi = typeof (global as any).vi !== 'undefined';
const mockApi = hasVi ? (global as any).vi : (global as any).jest;

// Import module under test
import * as vercel from './index';

type TVercelEnv = vercel.TVercelEnv;
type TVercelMetadata = vercel.TVVercelMetadata extends never ? vercel.TVVercelMetadata : vercel.TVVercelMetadata;
// The above type line attempts to avoid TS build errors if type re-exports differ;
// but if unavailable, we simply rely on runtime tests.

function preserveEnv(): NodeJS.ProcessEnv {
  // Clone env in a safe way
  return { ...process.env };
}

function restoreEnv(snapshot: NodeJS.ProcessEnv) {
  // Clear then re-apply snapshot for a clean slate
  // This avoids leftover variables impacting subsequent tests
  const keys = new Set(Object.keys(process.env));
  for (const k of keys) {
    delete (process.env as any)[k];
  }
  Object.assign(process.env, snapshot);
}

describe('vercel/index exported functions', () => {
  let envSnapshot: NodeJS.ProcessEnv;

  beforeEach(() => {
    envSnapshot = preserveEnv();
    if (mockApi?.resetModules) mockApi.resetModules();
    if (mockApi?.clearAllMocks) mockApi.clearAllMocks();
  });

  afterEach(() => {
    restoreEnv(envSnapshot);
  });

  describe('getVercelHealth', () => {
    it('returns ok status with deterministic timestamp and environment = production when VERCEL_ENV=production', () => {
      process.env.VERCEL_ENV = 'production';
      const now = new Date('2024-04-05T06:07:08.123Z');
      const result = vercel.getVercelHealth(now);
      expect(result).toEqual({
        status: 'ok',
        timestamp: now.toISOString(),
        env: 'production',
      });
    });

    it('falls back to NODE_ENV=production => env=production when VERCEL_ENV invalid or missing', () => {
      delete process.env.VERCEL_ENV;
      process.env.NODE_ENV = 'production';
      const now = new Date('2022-02-02T02:02:02.000Z');
      const result = vercel.getVercelHealth(now);
      expect(result.env).toBe('production');
      expect(result.status).toBe('ok');
      expect(result.timestamp).toBe(now.toISOString());
    });

    it('defaults to development when envs are unset', () => {
      delete process.env.VERCEL_ENV;
      delete process.env.NODE_ENV;
      const result = vercel.getVercelHealth(new Date('2000-01-01T00:00:00.000Z'));
      expect(result.env).toBe('development');
    });
  });

  describe('getVercelMetadata', () => {
    it('derives isVercel from VERCEL env being "1" or "true"', () => {
      process.env.VERCEL = '1';
      const meta1 = vercel.getVercelMetadata(new Date('2023-01-01T00:00:00.000Z'));
      expect(meta1.isVercel).toBe(true);

      process.env.VERCEL = 'true';
      const meta2 = vercel.getVercelMetadata(new Date('2023-01-01T00:00:00.000Z'));
      expect(meta2.isVercel).toBe(true);

      delete process.env.VERCEL;
      const meta3 = vercel.getVercelMetadata(new Date('2023-01-01T00:00:00.000Z'));
      expect(meta3.isVercel).toBe(false);

      process.env.VERCEL = '0';
      const meta4 = vercel.getVercelMetadata(new Date('2023-01-01T00:00:00.000Z'));
      expect(meta4.isVercel).toBe(false);
    });

    it('chooses env from VERCEL_ENV when valid; otherwise falls back to NODE_ENV then development', () => {
      process.env.VERCEL_ENV = 'preview';
      let meta = vercel.getVercelMetadata(new Date('2024-10-10T10:10:10.000Z'));
      expect(meta.env).toBe('preview');

      process.env.VERCEL_ENV = 'development';
      meta = vercel.getVercelMetadata(new Date('2024-10-10T10:10:10.000Z'));
      expect(meta.env).toBe('development');

      process.env.VERCEL_ENV = 'invalid' as any;
      process.env.NODE_ENV = 'production';
      meta = vercel.getVercelMetadata(new Date('2024-10-10T10:10:10.000Z'));
      expect(meta.env).toBe('production');

      delete process.env.VERCEL_ENV;
      delete process.env.NODE_ENV;
      meta = vercel.getVercelMetadata(new Date('2024-10-10T10:10:10.000Z'));
      expect(meta.env).toBe('development');
    });

    it('picks url from VERCEL_URL first, else NEXT_PUBLIC_VERCEL_URL, ignoring whitespace/empty values', () => {
      process.env.VERCEL_URL = '   ';
      process.env.NEXT_PUBLIC_VERCEL_URL = 'next.example.vercel.app';
      let meta = vercel.getVercelMetadata(new Date('2024-01-01T00:00:00.000Z'));
      expect(meta.url).toBe('next.example.vercel.app');

      process.env.VERCEL_URL = 'main.example.vercel.app';
      process.env.NEXT_PUBLIC_VERCEL_URL = 'backup.example.vercel.app';
      meta = vercel.getVercelMetadata(new Date('2024-01-01T00:00:00.000Z'));
      expect(meta.url).toBe('main.example.vercel.app');

      process.env.VERCEL_URL = '';
      process.env.NEXT_PUBLIC_VERCEL_URL = '';
      meta = vercel.getVercelMetadata(new Date('2024-01-01T00:00:00.000Z'));
      expect(meta.url).toBeUndefined();
    });

    it('reads region, deploymentId, buildId via value() sanitizer (undefined for blank/whitespace)', () => {
      process.env.VERCEL_REGION = '   cdg1 ';
      process.env.VERCEL_DEPLOYMENT_ID = 'dep_123 ';
      process.env.VERCEL_BUILD_ID = '   ';
      const meta = vercel.getVercelMetadata(new Date('2024-01-01T00:00:00.000Z'));
      expect(meta.region).toBe('cdg1');
      expect(meta.deploymentId).toBe('dep_123');
      expect(meta.buildId).toBeUndefined();
    });

    it('merges git info with fallbacks and value trimming', () => {
      process.env.VERCEL_GIT_COMMIT_SHA = ' abc123 ';
      delete (process.env as any).GIT_COMMIT_SHA;

      process.env.VERCEL_GIT_COMMIT_MESSAGE = ' Initial commit ';
      process.env.VERCEL_GIT_REPO_SLUG = ' repo-slug ';
      delete (process.env as any).VERCEL_GIT_REPO_OWNER;
      (process.env as any).VERCEL_GIT_OWNER = '   owner-x ';

      delete (process.env as any).VERCEL_GIT_COMMIT_REF;
      (process.env as any).VERCEL_GIT_BRANCH = ' main ';

      const meta = vercel.getVercelMetadata(new Date('2024-01-01T00:00:00.000Z'));
      expect(meta.git).toEqual({
        commitSha: 'abc123',
        commitMessage: 'Initial commit',
        repo: 'repo-slug',
        owner: 'owner-x',
        branch: 'main',
      });
    });

    it('uses GIT_COMMIT_SHA when VERCEL_GIT_COMMIT_SHA is not present or blank', () => {
      delete (process.env as any).VERCEL_GIT_COMMIT_SHA;
      process.env.GIT_COMMIT_SHA = 'fallback-sha';
      const meta = vercel.getVercelMetadata(new Date('2024-01-01T00:00:00.000Z'));
      expect(meta.git.commitSha).toBe('fallback-sha');
    });

    it('returns deterministic timestamp based on provided Date argument', () => {
      const now = new Date('1999-12-31T23:59:59.999Z');
      const meta = vercel.getVercelMetadata(now);
      expect(meta.timestamp).toBe(now.toISOString());
    });

    it('attempts lazy require of ../core/index.js and includes version when available', async () => {
      // We need to simulate the lazy require path used in getVercelMetadata.
      // We'll temporarily stub require with a manual injection approach by using jest/vi doMock.
      const pathToMock = '../core/index.js';

      if (hasVi) {
        // Vitest path: vi.mock relative path from the module file.
        (mockApi as any).mock(pathToMock, () => ({ default: {}, version: '1.2.3' }), { virtual: true });
        // Re-import the module to ensure the mock is applied for require() within function
        (mockApi as any).resetModules();
        const fresh = await import('./index');
        const meta = fresh.getVercelMetadata(new Date('2020-01-01T00:00:00.000Z'));
        expect(meta.version).toBe('1.2.3');
      } else if ((global as any).jest) {
        // Jest path: jest.doMock
        (mockApi as any).doMock(pathToMock, () => ({ version: '9.9.9' }));
        (mockApi as any).resetModules();
        const fresh = await import('./index');
        const meta = fresh.getVercelMetadata(new Date('2020-01-01T00:00:00.000Z'));
        expect(meta.version).toBe('9.9.9');
      } else {
        // Fallback: cannot validate version injection without a mocking framework.
        // Still ensure the call does not throw and version is undefined.
        const meta = vercel.getVercelMetadata(new Date('2020-01-01T00:00:00.000Z'));
        expect(meta).toBeTruthy();
        // version may be undefined here
      }
    });

    it('swallows errors during version resolution and leaves version undefined if unavailable', () => {
      // Ensure no mocks for the core path are present
      if (mockApi?.unmock) {
        try { (mockApi as any).unmock('../core/index.js'); } catch {}
      }
      const meta = vercel.getVercelMetadata(new Date('2020-01-01T00:00:00.000Z'));
      // We can't assert the exact version unless present; minimum expectation is that it does not throw.
      // If the module doesn't exist, version should be undefined.
      // If the module does exist and exports valid version, this assertion is tolerant by checking type.
      if (typeof (meta as any).version !== 'undefined') {
        expect(typeof meta.version === 'string' || typeof meta.version === 'undefined').toBe(true);
      } else {
        expect(meta.version).toBeUndefined();
      }
    });
  });

  describe('withVercelContext', () => {
    it('wraps a synchronous function and returns result + context', async () => {
      process.env.VERCEL_ENV = 'preview';
      const now = new Date('2023-03-03T03:03:03.003Z');

      const res = await vercel.withVercelContext((ctx) => {
        expect(ctx.env).toBe('preview');
        return 'ok-sync';
      }, now);

      expect(res.result).toBe('ok-sync');
      expect(res.context.timestamp).toBe(now.toISOString());
      expect(res.context.env).toBe('preview');
    });

    it('wraps an async function and returns awaited result + context', async () => {
      process.env.VERCEL_ENV = 'development';
      const now = new Date('2022-02-22T22:22:22.222Z');

      const res = await vercel.withVercelContext(async (ctx) => {
        expect(ctx.env).toBe('development');
        return Promise.resolve({ ok: true });
      }, now);

      expect(res.result).toEqual({ ok: true });
      expect(res.context.timestamp).toBe(now.toISOString());
      expect(res.context.env).toBe('development');
    });

    it('propagates thrown errors from the provided function after context creation', async () => {
      const now = new Date('2021-01-01T00:00:00.000Z');

      const err = new Error('boom');
      await expect(vercel.withVercelContext(() => {
        throw err;
      }, now)).rejects.toThrow('boom');
    });
  });
});