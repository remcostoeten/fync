import type { TSpotifyPlayerFactory, TSpotifyRequest, TPlaybackState, TQueue } from './types';

function createSpotifyPlayerFactory(request: TSpotifyRequest): TSpotifyPlayerFactory {
  async function getPlaybackState(): Promise<TPlaybackState | null> {
    try {
      const response = await request('/me/player');
      
      if (response.status === 204) {
        return null;
      }
      
      if (!response.ok) {
        throw new Error(`Failed to get playback state: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error getting playback state:', error);
      return null;
    }
  }

  async function play(contextUri?: string, trackUris?: string[], positionMs?: number): Promise<boolean> {
    try {
      const body: Record<string, unknown> = {};
      
      if (contextUri) {
        body.context_uri = contextUri;
      }
      
      if (trackUris && trackUris.length > 0) {
        body.uris = trackUris;
      }
      
      if (positionMs !== undefined) {
        body.position_ms = positionMs;
      }

      const response = await request('/me/player/play', {
        method: 'PUT',
        body: Object.keys(body).length > 0 ? JSON.stringify(body) : undefined,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Error playing track:', error);
      return false;
    }
  }

  async function pause(): Promise<boolean> {
    try {
      const response = await request('/me/player/pause', {
        method: 'PUT',
      });

      return response.ok;
    } catch (error) {
      console.error('Error pausing playback:', error);
      return false;
    }
  }

  async function next(): Promise<boolean> {
    try {
      const response = await request('/me/player/next', {
        method: 'POST',
      });

      return response.ok;
    } catch (error) {
      console.error('Error skipping to next track:', error);
      return false;
    }
  }

  async function previous(): Promise<boolean> {
    try {
      const response = await request('/me/player/previous', {
        method: 'POST',
      });

      return response.ok;
    } catch (error) {
      console.error('Error skipping to previous track:', error);
      return false;
    }
  }

  async function seek(positionMs: number): Promise<boolean> {
    try {
      const response = await request(`/me/player/seek?position_ms=${positionMs}`, {
        method: 'PUT',
      });

      return response.ok;
    } catch (error) {
      console.error('Error seeking to position:', error);
      return false;
    }
  }

  async function setVolume(volumePercent: number): Promise<boolean> {
    try {
      const clampedVolume = Math.max(0, Math.min(100, volumePercent));
      const response = await request(`/me/player/volume?volume_percent=${clampedVolume}`, {
        method: 'PUT',
      });

      return response.ok;
    } catch (error) {
      console.error('Error setting volume:', error);
      return false;
    }
  }

  async function shuffle(state: boolean): Promise<boolean> {
    try {
      const response = await request(`/me/player/shuffle?state=${state}`, {
        method: 'PUT',
      });

      return response.ok;
    } catch (error) {
      console.error('Error setting shuffle state:', error);
      return false;
    }
  }

  async function repeat(state: 'off' | 'track' | 'context'): Promise<boolean> {
    try {
      const response = await request(`/me/player/repeat?state=${state}`, {
        method: 'PUT',
      });

      return response.ok;
    } catch (error) {
      console.error('Error setting repeat state:', error);
      return false;
    }
  }

  async function getQueue(): Promise<TQueue | null> {
    try {
      const response = await request('/me/player/queue');
      
      if (!response.ok) {
        throw new Error(`Failed to get queue: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error getting queue:', error);
      return null;
    }
  }

  async function addToQueue(uri: string): Promise<boolean> {
    try {
      const response = await request(`/me/player/queue?uri=${encodeURIComponent(uri)}`, {
        method: 'POST',
      });

      return response.ok;
    } catch (error) {
      console.error('Error adding to queue:', error);
      return false;
    }
  }

  return {
    getPlaybackState,
    play,
    pause,
    next,
    previous,
    seek,
    setVolume,
    shuffle,
    repeat,
    getQueue,
    addToQueue,
  };
}

export { createSpotifyPlayerFactory };
