import { describe, it, expect } from 'vitest';
import { Spotify } from '../index';

describe('Spotify API - Simple Tests', () => {
  describe('Module Creation', () => {
    it('should create Spotify API instance', () => {
      const spotify = Spotify({ token: 'test-token' });
      expect(spotify).toBeDefined();
    });

    it('should have enhanced methods', () => {
      const spotify = Spotify({ token: 'test-token' });
      
      expect(typeof spotify.getCurrentUser).toBe('function');
      expect(typeof spotify.getUserProfile).toBe('function');
      expect(typeof spotify.getPlaylist).toBe('function');
      expect(typeof spotify.getTrack).toBe('function');
      expect(typeof spotify.search).toBe('function');
      expect(typeof spotify.getCurrentPlayback).toBe('function');
      expect(typeof spotify.getCurrentlyPlaying).toBe('function');
      expect(typeof spotify.getRecentlyPlayed).toBe('function');
    });

    it('should have search methods', () => {
      const spotify = Spotify({ token: 'test-token' });
      
      expect(typeof spotify.searchTracks).toBe('function');
      expect(typeof spotify.searchArtists).toBe('function');
      expect(typeof spotify.searchAlbums).toBe('function');
      expect(typeof spotify.searchPlaylists).toBe('function');
      expect(typeof spotify.searchShows).toBe('function');
      expect(typeof spotify.searchEpisodes).toBe('function');
    });

    it('should have playback control methods', () => {
      const spotify = Spotify({ token: 'test-token' });
      
      expect(typeof spotify.play).toBe('function');
      expect(typeof spotify.pause).toBe('function');
      expect(typeof spotify.skipToNext).toBe('function');
      expect(typeof spotify.skipToPrevious).toBe('function');
      expect(typeof spotify.seek).toBe('function');
      expect(typeof spotify.setRepeatMode).toBe('function');
      expect(typeof spotify.setShuffle).toBe('function');
      expect(typeof spotify.setVolume).toBe('function');
    });

    it('should have playlist management methods', () => {
      const spotify = Spotify({ token: 'test-token' });
      
      expect(typeof spotify.createPlaylist).toBe('function');
      expect(typeof spotify.updatePlaylist).toBe('function');
      expect(typeof spotify.addTracksToPlaylist).toBe('function');
      expect(typeof spotify.removeTracksFromPlaylist).toBe('function');
      expect(typeof spotify.reorderPlaylistTracks).toBe('function');
      expect(typeof spotify.replacePlaylistTracks).toBe('function');
    });

    it('should have user management methods', () => {
      const spotify = Spotify({ token: 'test-token' });
      
      expect(typeof spotify.getCurrentUserTopItems).toBe('function');
      expect(typeof spotify.getCurrentUserFollows).toBe('function');
      expect(typeof spotify.follow).toBe('function');
      expect(typeof spotify.unfollow).toBe('function');
      expect(typeof spotify.checkFollows).toBe('function');
      expect(typeof spotify.updateUserProfile).toBe('function');
      expect(typeof spotify.getCurrentUserProfile).toBe('function');
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid tokens gracefully', () => {
      expect(() => Spotify({ token: '' })).not.toThrow();
    });

    it('should handle missing configuration gracefully', () => {
      expect(() => Spotify({} as any)).not.toThrow();
    });
  });
});
