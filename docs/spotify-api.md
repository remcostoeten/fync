# Spotify API Methods

## Client Configuration

```typescript
import { Spotify } from '@remcostoeten/fync/spotify';

const spotify = Spotify({ 
  token: process.env.SPOTIFY_ACCESS_TOKEN,
  cache: true,
  cacheTTL: 300000
});
```

## Core Client Methods

### spotify.api
```typescript
const response = await spotify.api.me.get();
```

### spotify.user(userId)
```typescript
const userClient = spotify.user('spotify');
const profile = await userClient.get();
```

### spotify.playlist(playlistId)
```typescript
const playlistClient = spotify.playlist('37i9dQZEVXbMDoHDwVN2tF');
const playlist = await playlistClient.get();
```

## User Methods

### user.get()
```typescript
const user = await spotify.user('spotify').get();
console.log(user.display_name);
```

### user.playlists.get(options?)
```typescript
const playlists = await spotify.user('spotify').playlists.get({
  params: { limit: 50 }
});
```

## Authenticated User Methods

### me.get()
```typescript
const currentUser = await spotify.me.get();
console.log(currentUser.display_name);
```

### me.playlists.get(options?)
```typescript
const myPlaylists = await spotify.me.playlists.get({
  params: { limit: 50 }
});
```

### me.tracks.get(options?)
```typescript
const savedTracks = await spotify.me.tracks.get({
  params: { limit: 50 }
});
```

### me.albums.get(options?)
```typescript
const savedAlbums = await spotify.me.albums.get({
  params: { limit: 50 }
});
```

### me.artists.get(options?)
```typescript
const followedArtists = await spotify.me.artists.get({
  params: { limit: 50 }
});
```

### me.recentlyPlayed.get(options?)
```typescript
const recentTracks = await spotify.me.recentlyPlayed.get({
  params: { limit: 50 }
});
```

## Player Methods

### player.play(options?)
```typescript
await spotify.player.play({
  uris: ['spotify:track:4iV5W9uYEdYUVa79Axb7Rh']
});
```

### player.pause(options?)
```typescript
await spotify.player.pause();
```

### player.next(options?)
```typescript
await spotify.player.next();
```

### player.previous(options?)
```typescript
await spotify.player.previous();
```

### player.queue(uri, options?)
```typescript
await spotify.player.queue('spotify:track:4iV5W9uYEdYUVa79Axb7Rh');
```

### player.devices()
```typescript
const devices = await spotify.player.devices();
console.log(devices.devices);
```

### player.currentlyPlaying()
```typescript
const nowPlaying = await spotify.player.currentlyPlaying();
console.log(nowPlaying.item?.name);
```

## Playlist Methods

### playlist.get()
```typescript
const playlist = await spotify.playlist('37i9dQZEVXbMDoHDwVN2tF').get();
console.log(playlist.name);
```

### playlist.tracks.get(options?)
```typescript
const tracks = await spotify.playlist('37i9dQZEVXbMDoHDwVN2tF').tracks.get({
  params: { limit: 100 }
});
```

### playlist.tracks.add(uris, position?)
```typescript
await spotify.playlist('37i9dQZEVXbMDoHDwVN2tF').tracks.add([
  'spotify:track:4iV5W9uYEdYUVa79Axb7Rh',
  'spotify:track:1301WleyT98MSxVHPZCA6M'
]);
```

### playlist.tracks.remove(uris)
```typescript
await spotify.playlist('37i9dQZEVXbMDoHDwVN2tF').tracks.remove([
  'spotify:track:4iV5W9uYEdYUVa79Axb7Rh'
]);
```

## Search Methods

### search.tracks(query, options?)
```typescript
const tracks = await spotify.search.tracks('bohemian rhapsody', {
  params: { limit: 10 }
});
```

### search.artists(query, options?)
```typescript
const artists = await spotify.search.artists('queen', {
  params: { limit: 10 }
});
```

### search.albums(query, options?)
```typescript
const albums = await spotify.search.albums('a night at the opera', {
  params: { limit: 10 }
});
```

### search.playlists(query, options?)
```typescript
const playlists = await spotify.search.playlists('rock classics', {
  params: { limit: 10 }
});
```

### search.shows(query, options?)
```typescript
const shows = await spotify.search.shows('joe rogan', {
  params: { limit: 10 }
});
```

### search.episodes(query, options?)
```typescript
const episodes = await spotify.search.episodes('tech podcast', {
  params: { limit: 10 }
});
```

## Library Methods

### library.savedTracks.get(options?)
```typescript
const savedTracks = await spotify.library.savedTracks.get({
  params: { limit: 50 }
});
```

### library.savedAlbums.get(options?)
```typescript
const savedAlbums = await spotify.library.savedAlbums.get({
  params: { limit: 50 }
});
```

### library.savedShows.get(options?)
```typescript
const savedShows = await spotify.library.savedShows.get({
  params: { limit: 50 }
});
```

### library.savedEpisodes.get(options?)
```typescript
const savedEpisodes = await spotify.library.savedEpisodes.get({
  params: { limit: 50 }
});
```

## Authentication Methods

### createSpotifyAuth(config)
```typescript
import { createSpotifyAuth } from '@remcostoeten/fync/spotify';

const auth = createSpotifyAuth({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/callback'
});
```

### isTokenExpired(token)
```typescript
import { isTokenExpired } from '@remcostoeten/fync/spotify';

const expired = isTokenExpired(token);
if (expired) {
  console.log('Token needs refresh');
}
```

### shouldRefreshToken(token)
```typescript
import { shouldRefreshToken } from '@remcostoeten/fync/spotify';

const shouldRefresh = shouldRefreshToken(token);
if (shouldRefresh) {
  console.log('Token should be refreshed soon');
}
```

### SPOTIFY_SCOPES
```typescript
import { SPOTIFY_SCOPES } from '@remcostoeten/fync/spotify';

const scopes = [
  SPOTIFY_SCOPES.USER_READ_PRIVATE,
  SPOTIFY_SCOPES.USER_READ_EMAIL,
  SPOTIFY_SCOPES.PLAYLIST_READ_PRIVATE
];
```

## Chainable Client Methods

### .get<T>(options?)
```typescript
const data = await spotify.api.me.get();
```

### .post<T>(data, options?)
```typescript
const result = await spotify.api.users.me.playlists.post({
  name: 'My New Playlist',
  public: false
});
```

### .put<T>(data, options?)
```typescript
await spotify.api.me.player.play.put({
  uris: ['spotify:track:4iV5W9uYEdYUVa79Axb7Rh']
});
```

### .patch<T>(data, options?)
```typescript
const updated = await spotify.api.playlists['playlist-id'].patch({
  name: 'Updated Playlist Name'
});
```

### .delete<T>(data?, options?)
```typescript
await spotify.api.playlists['playlist-id'].tracks.delete({
  tracks: [{ uri: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh' }]
});
```

### .paginate<T>(options?)
```typescript
const allTracks = await spotify.api.me.tracks.paginate();
```

### .stream<T>(options?)
```typescript
for await (const track of spotify.api.me.tracks.stream()) {
  console.log(track.track.name);
}
```

### .path()
```typescript
const currentPath = spotify.api.me.playlists.path();
console.log(currentPath);
```
