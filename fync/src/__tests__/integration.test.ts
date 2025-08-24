import { describe, it, expect } from 'vitest';
import * as Fync from '../index';

describe('Fync Integration Tests', () => {
  describe('Package Structure', () => {
    it('should have correct version', () => {
      expect(Fync.version).toBe('4.0.0');
    });

    it('should export all API modules', () => {
      expect(Fync.GitHub).toBeDefined();
      expect(Fync.GitLab).toBeDefined();
      expect(Fync.Spotify).toBeDefined();
      expect(Fync.NPM).toBeDefined();
      expect(Fync.Vercel).toBeDefined();
      expect(Fync.GoogleCalendar).toBeDefined();
      expect(Fync.GoogleDrive).toBeDefined();
      expect(Fync.Discord).toBeDefined();
    });

    it('should export core functions', () => {
      expect(Fync.createApiBuilder).toBeDefined();
      expect(Fync.defineResource).toBeDefined();
      expect(Fync.createFyncApi).toBeDefined();
    });
  });

  describe('Module Functionality', () => {
    it('should create GitHub instance with enhanced methods', () => {
      const github = Fync.GitHub({ token: 'test-token' });
      expect(github).toBeDefined();
      expect(typeof github.getUser).toBe('function');
      expect(typeof github.getRepository).toBe('function');
    });

    it('should create Spotify instance with enhanced methods', () => {
      const spotify = Fync.Spotify({ token: 'test-token' });
      expect(spotify).toBeDefined();
      expect(typeof spotify.getCurrentUser).toBe('function');
      expect(typeof spotify.getUserProfile).toBe('function');
    });

    it('should create other API instances', () => {
      expect(Fync.GitLab({ token: 'test-token' })).toBeDefined();
      expect(Fync.NPM({})).toBeDefined();
      expect(Fync.Vercel({ token: 'test-token' })).toBeDefined();
      expect(Fync.GoogleCalendar({ token: 'test-token' })).toBeDefined();
      expect(Fync.GoogleDrive({ token: 'test-token' })).toBeDefined();
      expect(Fync.Discord({ token: 'test-token' })).toBeDefined();
    });
  });

  describe('Core Functionality', () => {
    it('should create API builder', () => {
      const builder = Fync.createApiBuilder({
        baseUrl: 'https://api.example.com',
        auth: { type: 'bearer' },
      });
      expect(builder).toBeDefined();
      expect(typeof builder).toBe('function');
    });

    it('should define resources', () => {
      const resource = Fync.defineResource({
        name: 'test',
        basePath: '/test',
        methods: {
          get: { path: '/{id}' },
        },
      });
      expect(resource).toBeDefined();
      expect(resource.name).toBe('test');
      expect(resource.basePath).toBe('/test');
    });

    it('should create API client', () => {
      const client = Fync.createFyncApi({
        baseUrl: 'https://api.example.com',
        auth: { type: 'bearer', token: 'test-token' },
      });
      expect(client).toBeDefined();
      expect(typeof client.get).toBe('function');
      expect(typeof client.post).toBe('function');
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid tokens gracefully', () => {
      expect(() => Fync.GitHub({ token: '' })).not.toThrow();
      expect(() => Fync.Spotify({ token: '' })).not.toThrow();
    });

    it('should handle missing configuration gracefully', () => {
      expect(() => Fync.NPM({} as any)).not.toThrow();
    });
  });
});
