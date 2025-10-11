# Fync API Documentation

A modern, interactive documentation site for the Fync library - a type-safe TypeScript library for GitHub and Spotify APIs.

## Features

- 📚 Comprehensive API documentation
- 🎮 Interactive playground with live API testing
- 🔐 Secure token management
- 🎨 Beautiful, responsive design
- ⚡ Fast search functionality

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Serverless API Proxy

This project includes a serverless function (`/api/proxy`) that enables live API testing in the interactive playground. The proxy:

- Securely handles API tokens server-side
- Supports both GitHub and Spotify APIs
- Works with Vercel and Netlify deployments
- Provides real-time API responses

### Environment Variables

Set these environment variables in your deployment platform:

- `GITHUB_API_TOKEN` - Your GitHub personal access token
- `SPOTIFY_API_TOKEN` - Your Spotify API access token

### Supported API Methods

#### GitHub
- `user.get` - Get user profile
- `me.get` - Get authenticated user
- `user.repos` - Get user repositories
- `me.repos` - Get authenticated user repositories
- `repo.get` - Get repository details
- `search.repositories` - Search repositories

#### Spotify
- `me.get` - Get current user profile
- `me.playlists` - Get user playlists
- `me.tracks` - Get saved tracks
- `me.albums` - Get saved albums
- `me.artists` - Get followed artists
- `player.currently-playing` - Get currently playing track
- `search.tracks` - Search tracks
- `search.artists` - Search artists
- `playlist.get` - Get playlist details

## Deployment

### Netlify
1. Connect your repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on push

### Vercel
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

## Usage

1. Add your API tokens using the Token Manager
2. Use the Interactive Playground to test API calls
3. Browse the comprehensive documentation
4. Copy code examples for your projects

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details.