---
title: Fync Documentation
description: Comprehensive guide to using Fync - a powerful TypeScript API client library
---

# Fync Documentation

You are being redirected to the live documentation...

**[Click here to view the complete documentation →](https://fync-docs.vercel.app/docs)**

---

## What is Fync?

Fync is a TypeScript client library for integrating with multiple APIs using a consistent interface. It supports GitHub, Spotify, Google Calendar, Google Drive, Vercel, Discord, Notion, NPM, and GitLab.

Use one library instead of managing multiple API clients with different interfaces.

### Features

- **Type-safe**: Full TypeScript support
- **Lightweight**: No dependencies
- **OAuth support**: Built-in OAuth 2.0 flows
- **9+ providers**: GitHub, GitLab, Spotify, Google Calendar, Google Drive, Vercel, Discord, Notion, NPM
- **Documentation**: Guides and examples for each provider

The complete interactive documentation is available at **[fync-docs.vercel.app](https://fync-docs.vercel.app/docs)**.
- **Consistent**: Same method patterns across all APIs

## Quick Start

Install Fync with your favorite package manager:


<Tabs items={['npm', 'pnpm', 'yarn', 'bun']}>
  <Tab value="npm">
    ```bash
    npm install @remcostoeten/fync
    ```
  </Tab>
  <Tab value="pnpm">
    ```bash
    pnpm install @remcostoeten/fync
    ```
  </Tab>
  <Tab value="yarn">
    ```bash
    yarn add @remcostoeten/fync
    ```
  </Tab>
  <Tab value="bun">
    ```bash
    bun add @remcostoeten/fync
    ```
  </Tab>
</Tabs>

Initialize your clients:

```ts
import { GitHub, Spotify, GoogleCalendar } from '@remcostoeten/fync';

const github = GitHub({ token: process.env.GITHUB_TOKEN! });
const spotify = Spotify({ token: process.env.SPOTIFY_TOKEN! });
const calendar = GoogleCalendar({ token: process.env.GOOGLE_TOKEN! });
```

Start making API calls:

```ts
// GitHub
const user = await github.getUser('octocat');
const repo = await github.getRepository('facebook', 'react');

// Spotify
const playlist = await spotify.getPlaylist('37i9dQZF1DXcBWIGoYBM5M');
await spotify.addTracksToPlaylist('playlistId', ['spotify:track:...']);

// Google Calendar
const events = await calendar.getUpcomingEvents('primary', 10);
await calendar.createEvent('primary', { summary: 'Meeting' });
```

## Supported Providers

| Provider | Features |
|----------|----------|
| **GitHub** | Users, repositories, search, organizations, issues, pull requests |
| **GitLab** | Projects, issues, merge requests, pipelines, search |
| **Spotify** | Tracks, playlists, player control, search, personalization |
| **Google Calendar** | Calendars, events, free/busy, colors, ACL |
| **Google Drive** | Files, folders, permissions, exports, search |
| **Vercel** | Projects, deployments, domains, teams |
| **Discord** | (Available - see provider guide) |
| **Notion** | (Available - see provider guide) |
| **NPM** | Package search and information |

## Documentation Structure

- **[Getting Started](/docs/getting-started)** - Installation and basic usage
- **[Core Concepts](/docs/core-concepts)** - Modules, resources, and API patterns
- **[Authentication](/docs/authentication)** - Bearer tokens and OAuth flows
- **[Provider Guides](/docs/providers)** - Guides for each provider

## Need Help?

- Check the [Getting Started](/docs/getting-started) guide
- Browse [provider-specific guides](/docs/providers)
- Report issues on [GitHub](https://github.com/remcostoeten/fync/issues)
- Start a discussion on [GitHub Discussions](https://github.com/remcostoeten/fync/discussions)

## Contributing

Contributions are welcome! Please visit the [GitHub repository](https://github.com/remcostoeten/fync) to contribute.

---

**Happy integrating!**
