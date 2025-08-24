import { describe, it, expect } from 'vitest';
import * as Core from '../index';

describe('Core Module', () => {
  describe('Exports', () => {
    it('should export all expected functions and constants', () => {
      const expectedExports = [
        'version',
        'userAgent',
        'createApiBuilder',
        'defineResource',
        'createFyncApi',
      ];

      expectedExports.forEach(exportName => {
        expect(Core).toHaveProperty(exportName);
      });
    });

    it('should export version constant with correct format', () => {
      expect(Core.version).toBeDefined();
      expect(typeof Core.version).toBe('string');
      expect(Core.version).toBe('4.0.0');
      expect(Core.version).toMatch(/^\d+\.\d+\.\d+$/);
    });

    it('should export userAgent constant with correct format', () => {
      expect(Core.userAgent).toBeDefined();
      expect(typeof Core.userAgent).toBe('string');
      expect(Core.userAgent).toContain('@remcostoeten/fync/4.0.0');
      expect(Core.userAgent).toMatch(/^@remcostoeten\/fync\/\d+\.\d+\.\d+$/);
    });
  });

  describe('Functionality', () => {
    it('should create resources with defineResource', () => {
      const resource = Core.defineResource({
        name: 'test',
        basePath: '/test',
        methods: {
          get: { path: '/{id}' },
          create: { path: '', method: 'POST' },
        },
      });

      expect(resource.name).toBe('test');
      expect(resource.basePath).toBe('/test');
      expect(resource.methods.get).toBeDefined();
      expect(resource.methods.create).toBeDefined();
    });

    it('should create API builder with createApiBuilder', () => {
      const builder = Core.createApiBuilder({
        baseUrl: 'https://api.example.com',
        auth: { type: 'bearer' },
      });

      expect(typeof builder).toBe('function');
    });

    it('should create API client with createFyncApi', () => {
      const client = Core.createFyncApi({
        baseUrl: 'https://api.example.com',
        auth: { type: 'bearer', token: 'test-token' },
      });

      expect(client).toBeDefined();
      expect(typeof client.get).toBe('function');
      expect(typeof client.post).toBe('function');
      expect(typeof client.put).toBe('function');
      expect(typeof client.delete).toBe('function');
      expect(typeof client.patch).toBe('function');
    });
  });
});
