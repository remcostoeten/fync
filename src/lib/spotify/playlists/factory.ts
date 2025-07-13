import { createSpotifyRequestFactory } from '../../../../core/src/request';
import { TSpotifyPlaylist } from '../../../../core/types';

const { request } = createSpotifyRequestFactory();

export async function getPlaylist(id: string): Promise<TSpotifyPlaylist> {
    const response = await request<TSpotifyPlaylist>(`https://api.spotify.com/v1/playlists/${id}`);
    return response.data;
}

export async function createPlaylist(userId: string, name: string, description = '', isPublic = true): Promise<TSpotifyPlaylist> {
    const response = await request<TSpotifyPlaylist>(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        body: JSON.stringify({
            name,
            description,
            public: isPublic
        }),
    });
    return response.data;
}

export async function updatePlaylist(id: string, name?: string, description?: string, isPublic?: boolean): Promise<TSpotifyPlaylist> {
    const response = await request<TSpotifyPlaylist>(`https://api.spotify.com/v1/playlists/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name,
            description,
            public: isPublic
        }),
    });
    return response.data;
}

export async function deleteItems(playlistId: string, trackUris: string[]): Promise<void> {
    await request<void>(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'DELETE',
        body: JSON.stringify({
            tracks: trackUris.map(uri => ({ uri }))
        })
    });
}

export async function addItems(playlistId: string, trackUris: string[]): Promise<void> {
    await request<void>(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        body: JSON.stringify({
            uris: trackUris
        })
    });
}

export async function reorderItems(playlistId: string, rangeStart: number, insertBefore: number): Promise<void> {
    await request<void>(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'PUT',
        body: JSON.stringify({
            range_start: rangeStart,
            insert_before: insertBefore
        })
    });
}

export async function followPlaylist(playlistId: string): Promise<void> {
    await request<void>(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
        method: 'PUT'
    });
}

export async function unfollowPlaylist(playlistId: string): Promise<void> {
    await request<void>(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
        method: 'DELETE'
    });
}

export async function getPlaylistFollowers(playlistId: string): Promise<number> {
    const response = await request<{ total: number }>(`https://api.spotify.com/v1/playlists/${playlistId}/followers`);
    return response.data.total;
}
