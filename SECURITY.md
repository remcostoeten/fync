# Security Policy

## API Token Security

This library requires API tokens to access GitHub and Spotify APIs. Follow these security best practices:

### 🔐 Token Storage

**✅ DO:**
- Store tokens in environment variables
- Use `.env` files for local development (add to `.gitignore`)
- Use secure secret management in production
- Rotate tokens regularly

**❌ DON'T:**
- Hardcode tokens in your source code
- Commit tokens to version control
- Share tokens in plain text
- Use tokens in client-side code

### 🎯 Required Scopes

#### GitHub Personal Access Token
Create a token at: https://github.com/settings/tokens

**Minimum scopes needed:**
- `repo` - Access to repositories
- `user` - Access to user profile
- `read:org` - Access to organization data

#### Spotify Access Token
Get tokens via OAuth 2.0 flow: https://developer.spotify.com/documentation/web-api/tutorials/getting-started

**Required scopes depend on usage:**
- `user-read-private` - User profile access
- `user-read-email` - User email access
- `playlist-read-private` - Private playlists
- `user-library-read` - Saved tracks/albums
- `user-modify-playback-state` - Control playback
- `user-read-playback-state` - Current playback info

### 📝 Environment Variables

Create a `.env` file in your project root:

```env
# GitHub
GITHUB_TOKEN=ghp_your_github_personal_access_token_here

# Spotify
SPOTIFY_ACCESS_TOKEN=your_spotify_access_token_here
```

### 🛡️ Usage Example

```typescript
import { GitHub, Spotify } from '@remcostoeten/fync'

// Use environment variables
const github = GitHub({
  token: process.env.GITHUB_TOKEN
})

const spotify = Spotify({
  token: process.env.SPOTIFY_ACCESS_TOKEN
})
```

## Reporting Security Issues

If you discover a security vulnerability, please report it privately:

1. **Do NOT** create a public GitHub issue
2. Email security concerns to: [your-email@domain.com]
3. Include detailed information about the vulnerability
4. Allow reasonable time for response before public disclosure

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 3.x.x   | ✅ Full support    |
| 2.x.x   | ⚠️ Security fixes only |
| < 2.0   | ❌ No longer supported |

## Security Updates

Security updates will be released as patch versions and announced in:
- GitHub Security Advisories
- Release notes
- npm package updates
