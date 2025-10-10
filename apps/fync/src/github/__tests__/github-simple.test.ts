import { describe, it, expect } from 'vitest';
import { GitHub } from '../index';

describe('GitHub API - Simple Tests', () => {
  describe('Module Creation', () => {
    it('should create GitHub API instance', () => {
      const github = GitHub({ token: 'test-token' });
      expect(github).toBeDefined();
    });

    it('should have enhanced methods', () => {
      const github = GitHub({ token: 'test-token' });
      
      expect(typeof github.getUser).toBe('function');
      expect(typeof github.getRepository).toBe('function');
      expect(typeof github.getRepositoryFromUrl).toBe('function');
      expect(typeof github.getUserCommits).toBe('function');
      expect(typeof github.getUserLatestCommit).toBe('function');
      expect(typeof github.getUserCommitsInTimeframe).toBe('function');
      expect(typeof github.getRepositoryStars).toBe('function');
      expect(typeof github.getUserStarredCount).toBe('function');
      expect(typeof github.getUserStats).toBe('function');
      expect(typeof github.searchRepositories).toBe('function');
      expect(typeof github.getUserActivity).toBe('function');
    });
  });

  describe('URL Parsing', () => {
    it('should parse valid GitHub URLs', () => {
      const github = GitHub({ token: 'test-token' });
      
      const validUrls = [
        'https://github.com/owner/repo',
        'https://github.com/owner/repo.git',
        'http://github.com/owner/repo',
        'github.com/owner/repo',
      ];

      validUrls.forEach(url => {
        expect(() => github.getRepositoryFromUrl(url)).not.toThrow();
      });
    });

    it('should throw error for invalid GitHub URLs', () => {
      const github = GitHub({ token: 'test-token' });
      
      const invalidUrls = [
        'https://gitlab.com/owner/repo',
        'https://bitbucket.org/owner/repo',
        'not-a-url',
        'https://github.com/owner',
        'https://github.com/',
      ];

      invalidUrls.forEach(url => {
        expect(() => github.getRepositoryFromUrl(url)).toThrow('Invalid GitHub URL');
      });
    });
  });

  describe('Timeframe Calculations', () => {
    it('should handle timeframe calculations', () => {
      const github = GitHub({ token: 'test-token' });
      
      const testCases = ['7D', '2W', '1M', '1Y'];
      
      testCases.forEach(timeframe => {
        expect(() => github.getUserCommitsInTimeframe('testuser', timeframe)).not.toThrow();
      });
    });
  });
});
