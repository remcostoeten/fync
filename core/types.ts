type TSpotifyImage = {
  url: string;
  height?: number;
  width?: number;
};

type TSpotifyArtist = {
  id: string;
  name: string;
  genres: string[];
};

type TSpotifyAlbum = {
  id: string;
  name: string;
  release_date: string;
  total_tracks: number;
  images: TSpotifyImage[];
};

type TSpotifyTrack = {
  id: string;
  name: string;
  duration_ms: number;
  explicit: boolean;
  album: TSpotifyAlbum;
  artists: TSpotifyArtist[];
};

type TSpotifyPlaylist = {
  id: string;
  name: string;
  description?: string;
  tracks: {
    items: { track: TSpotifyTrack }[];
    total: number;
  };
  images: TSpotifyImage[];
};

export type {
  TSpotifyTrack,
  TSpotifyArtist,
  TSpotifyAlbum,
  TSpotifyPlaylist,
  TSpotifyImage
};

