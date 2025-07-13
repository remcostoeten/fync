import { getAccessToken } from '../../src/lib/spotify/auth/getAccessToken';
import { createHttpClient } from './http/client';
import { THttpResponse, THttpError } from './http/types';
import { createErrorResponse } from './response/simple';

export function createSpotifyRequestFactory() {
    const httpClient = createHttpClient();

    async function spotifyRequest<T>(
        url: string,
        options: RequestInit = {}
    ): Promise<THttpResponse<T>> {
        try {
            const accessToken = await getAccessToken();
            const response = await httpClient.request<T>(url, {
                ...options,
                headers: {
                    ...(options.headers || {}),
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (response.status === 401) {
                // Retry once on 401 error
                const newAccessToken = await getAccessToken();
                return httpClient.request<T>(url, {
                    ...options,
                    headers: {
                        ...(options.headers || {}),
                        'Authorization': `Bearer ${newAccessToken}`,
                    },
                });
            }

            if (response.status === 429) {
                const retryAfter = response.headers['retry-after'];
                throw createErrorResponse(
                    'Too Many Requests',
                    'Rate limit exceeded. Please retry after some time.',
                    429
                );
            }

            return response;
        } catch (error) {
            const httpError: THttpError = {
                message: error instanceof Error ? error.message : 'Unknown error',
                status: error instanceof Error ? error['status'] : 500,
            };

            throw httpError;
        }
    }

    return {
        request: spotifyRequest,
    };
}

