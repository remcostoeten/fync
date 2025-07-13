type TDevice = {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
  supports_volume: boolean;
};

type TTrack = {
  id: string;
  name: string;
  artists: Array<{
    id: string;
    name: string;
  }>;
  album: {
    id: string;
    name: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
  };
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  uri: string;
};

type TPlaybackState = {
  device: TDevice;
  repeat_state: 'off' | 'track' | 'context';
  shuffle_state: boolean;
  context: {
    type: string;
    href: string;
    external_urls: {
      spotify: string;
    };
    uri: string;
  } | null;
  timestamp: number;
  progress_ms: number;
  is_playing: boolean;
  item: TTrack | null;
  currently_playing_type: string;
  actions: {
    interrupting_playback: boolean;
    pausing: boolean;
    resuming: boolean;
    seeking: boolean;
    skipping_next: boolean;
    skipping_prev: boolean;
    toggling_repeat_context: boolean;
    toggling_shuffle: boolean;
    toggling_repeat_track: boolean;
    transferring_playback: boolean;
  };
};

type TQueueItem = {
  track: TTrack;
  played_at: string;
  context: {
    type: string;
    href: string;
    external_urls: {
      spotify: string;
    };
    uri: string;
  } | null;
};

type TQueue = {
  currently_playing: TTrack | null;
  queue: TTrack[];
};

type TSpotifyPlayerFactory = {
  getPlaybackState: () => Promise<TPlaybackState | null>;
  play: (contextUri?: string, trackUris?: string[], positionMs?: number) => Promise<boolean>;
  pause: () => Promise<boolean>;
  next: () => Promise<boolean>;
  previous: () => Promise<boolean>;
  seek: (positionMs: number) => Promise<boolean>;
  setVolume: (volumePercent: number) => Promise<boolean>;
  shuffle: (state: boolean) => Promise<boolean>;
  repeat: (state: 'off' | 'track' | 'context') => Promise<boolean>;
  getQueue: () => Promise<TQueue | null>;
  addToQueue: (uri: string) => Promise<boolean>;
};

type TSpotifyRequest = (endpoint: string, options?: RequestInit) => Promise<Response>;

export type {
  TDevice,
  TTrack,
  TPlaybackState,
  TQueueItem,
  TQueue,
  TSpotifyPlayerFactory,
  TSpotifyRequest,
};
