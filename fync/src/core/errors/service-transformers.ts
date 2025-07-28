import type { TErrorInfo, TErrorTransformer } from "./types";

/**
 * Spotify-specific error transformer
 */
export function spotifyErrorTransformer(error: unknown): TErrorInfo | null {
  if (!(error instanceof Error)) return null;

  // Spotify token expiration
  if (error.message.includes("token") && error.message.includes("expired")) {
    return {
      code: "SPOTIFY_TOKEN_EXPIRED",
      category: "authentication",
      severity: "high",
      message: "Spotify access token expired",
      userMessage: "Your Spotify session has expired. Please re-authenticate.",
      documentation: "https://developer.spotify.com/documentation/web-api/concepts/access-token",
      service: "spotify",
      context: {
        service: "spotify",
        timestamp: new Date(),
        originalError: error,
      },
      isRetryable: false,
      suggestedAction: "Refresh your Spotify access token using the refresh token",
    };
  }

  // Spotify premium required
  if (error.message.includes("premium") || error.message.includes("Premium")) {
    return {
      code: "SPOTIFY_PREMIUM_REQUIRED",
      category: "authentication",
      severity: "medium",
      message: "Spotify Premium subscription required",
      userMessage: "This feature requires a Spotify Premium subscription.",
      service: "spotify",
      context: {
        service: "spotify",
        timestamp: new Date(),
        originalError: error,
      },
      isRetryable: false,
      suggestedAction: "Upgrade to Spotify Premium or use alternative endpoints",
    };
  }

  // Spotify rate limiting (different from general 429)
  if (error.message.includes("rate limit") && error.message.includes("spotify")) {
    return {
      code: "SPOTIFY_RATE_LIMITED",
      category: "ratelimit",
      severity: "medium",
      message: "Spotify API rate limit exceeded",
      userMessage: "Too many requests to Spotify. Please wait before trying again.",
      documentation: "https://developer.spotify.com/documentation/web-api/concepts/rate-limits",
      service: "spotify",
      context: {
        service: "spotify",
        timestamp: new Date(),
        originalError: error,
      },
      isRetryable: true,
      suggestedAction: "Wait 60 seconds before making another request",
    };
  }

  return null;
};

/**
 * GitHub-specific error transformer
 */
export function githubErrorTransformer(error: unknown): TErrorInfo | null {
  if (!(error instanceof Error)) return null;

  // GitHub API rate limiting
  if (error.message.includes("API rate limit exceeded")) {
    return {
      code: "GITHUB_RATE_LIMITED",
      category: "ratelimit",
      severity: "medium",
      message: "GitHub API rate limit exceeded",
      userMessage: "You've hit GitHub's rate limit. Please wait before making more requests.",
      documentation: "https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting",
      service: "github",
      context: {
        service: "github",
        timestamp: new Date(),
        originalError: error,
      },
      isRetryable: true,
      suggestedAction: "Wait until your rate limit resets or use authentication for higher limits",
    };
  }

  // GitHub repository not found or private
  if (error.message.includes("Not Found") && error.message.includes("repository")) {
    return {
      code: "GITHUB_REPO_NOT_FOUND",
      category: "api",
      severity: "medium",
      message: "GitHub repository not found",
      userMessage: "The repository doesn't exist or is private.",
      service: "github",
      context: {
        service: "github",
        timestamp: new Date(),
        originalError: error,
      },
      isRetryable: false,
      suggestedAction: "Check the repository name and your access permissions",
    };
  }

  // GitHub token scope issues
  if (error.message.includes("scope") || error.message.includes("permission")) {
    return {
      code: "GITHUB_INSUFFICIENT_SCOPE",
      category: "authentication",
      severity: "high",
      message: "Insufficient GitHub token permissions",
      userMessage: "Your GitHub token doesn't have the required permissions.",
      documentation: "https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps",
      service: "github",
      context: {
        service: "github",
        timestamp: new Date(),
        originalError: error,
      },
      isRetryable: false,
      suggestedAction: "Generate a new token with the required scopes",
    };
  }

  return null;
};

/**
 * NPM-specific error transformer
 */
export function npmErrorTransformer(error: unknown): TErrorInfo | null {
  if (!(error instanceof Error)) return null;

  // NPM package not found
  if (error.message.includes("Not found") && error.message.includes("package")) {
    return {
      code: "NPM_PACKAGE_NOT_FOUND",
      category: "api",
      severity: "medium",
      message: "NPM package not found",
      userMessage: "The requested package doesn't exist on NPM.",
      service: "npm",
      context: {
        service: "npm",
        timestamp: new Date(),
        originalError: error,
      },
      isRetryable: false,
      suggestedAction: "Check the package name spelling and try again",
    };
  }

  // NPM registry issues
  if (error.message.includes("registry") && error.message.includes("unavailable")) {
    return {
      code: "NPM_REGISTRY_UNAVAILABLE",
      category: "network",
      severity: "high",
      message: "NPM registry is unavailable",
      userMessage: "The NPM registry is temporarily unavailable.",
      service: "npm",
      context: {
        service: "npm",
        timestamp: new Date(),
        originalError: error,
      },
      isRetryable: true,
      suggestedAction: "Try again later or check NPM status page",
    };
  }

  return null;
};

/**
 * Google Calendar-specific error transformer
 */
export function googleCalendarErrorTransformer(error: unknown): TErrorInfo | null {
  if (!(error instanceof Error)) return null;

  // Google Calendar quota exceeded
  if (error.message.includes("quota") || error.message.includes("quotaExceeded")) {
    return {
      code: "GOOGLE_QUOTA_EXCEEDED",
      category: "ratelimit",
      severity: "medium",
      message: "Google Calendar quota exceeded",
      userMessage: "You've exceeded your Google Calendar API quota.",
      documentation: "https://developers.google.com/calendar/api/guides/quota",
      service: "google-calendar",
      context: {
        service: "google-calendar",
        timestamp: new Date(),
        originalError: error,
      },
      isRetryable: true,
      suggestedAction: "Wait for quota to reset or request quota increase",
    };
  }

  // Google Calendar access denied
  if (error.message.includes("calendar") && error.message.includes("access")) {
    return {
      code: "GOOGLE_CALENDAR_ACCESS_DENIED",
      category: "authentication",
      severity: "high",
      message: "Google Calendar access denied",
      userMessage: "You don't have access to this calendar.",
      service: "google-calendar",
      context: {
        service: "google-calendar",
        timestamp: new Date(),
        originalError: error,
      },
      isRetryable: false,
      suggestedAction: "Check calendar permissions or request access",
    };
  }

  return null;
};
