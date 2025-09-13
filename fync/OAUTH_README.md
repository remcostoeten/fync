# OAuth2 Authentication with Fync

Fync now includes comprehensive OAuth2 authentication support for GitHub and Google APIs. This enables you to easily integrate OAuth flows into your applications with minimal setup.

## Features

- 🔐 **Complete OAuth2 Flow**: Authorization URL generation, token exchange, and refresh
- 🛡️ **PKCE Support**: Enhanced security with Proof Key for Code Exchange
- 🔄 **Token Management**: Automatic token validation and refresh handling
- 🎯 **Chainable API**: Consistent with fync's design principles
- 📱 **Framework Agnostic**: Works with Next.js, Express, or any Node.js framework
- 🗄️ **Database Ready**: Includes Drizzle ORM integration examples
- 🛠️ **TypeScript**: Full type safety with comprehensive type definitions

## Quick Start

### GitHub OAuth

```typescript
import { GitHubOAuth } from '@remcostoeten/fync/github/oauth';

const githubAuth = GitHubOAuth({
  clientId: 'your-github-client-id',
  clientSecret: 'your-github-client-secret',
  redirectUri: 'http://localhost:3000/auth/github/callback'
});

// Generate authorization URL
const { url, codeVerifier } = githubAuth.getAuthorizationUrl({
  scope: ['user:email', 'repo'],
  state: 'random-state-string'
});

// Exchange code for token
const tokens = await githubAuth.exchangeCodeForToken(code, state);

// Get user information
const user = await githubAuth.withToken(tokens.access_token).getUser();
```

### Google OAuth

```typescript
import { GoogleOAuth } from '@remcostoeten/fync/google/oauth';

const googleAuth = GoogleOAuth({
  clientId: 'your-client-id.googleusercontent.com',
  clientSecret: 'your-client-secret',
  redirectUri: 'http://localhost:3000/auth/google/callback'
});

// Generate authorization URL with PKCE
const { url, codeVerifier } = googleAuth.getAuthorizationUrl({
  scope: ['openid', 'email', 'profile', 'https://www.googleapis.com/auth/calendar'],
  accessType: 'offline', // For refresh tokens
  pkce: true
});

// Exchange code for token
const tokens = await googleAuth.exchangeCodeForToken(code, codeVerifier);

// Get user information
const user = await googleAuth.withToken(tokens.access_token).getUser();
```

## Installation & Setup

### 1. Install Dependencies

```bash
npm install @remcostoeten/fync
```

### 2. Environment Variables

```env
# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_REDIRECT_URI=http://localhost:3000/auth/github/callback

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
```

### 3. OAuth App Setup

#### GitHub
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL to your redirect URI

#### Google
1. Go to Google Cloud Console > APIs & Services > Credentials
2. Create OAuth 2.0 Client IDs
3. Add your redirect URI to authorized redirect URIs

## Framework Integration

### Next.js App Router

```typescript
// app/auth/github/route.ts
import { GitHubOAuth } from '@remcostoeten/fync/github/oauth';

const githubAuth = GitHubOAuth({
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  redirectUri: process.env.GITHUB_REDIRECT_URI!
});

export async function GET() {
  const { url } = githubAuth.getAuthorizationUrl({
    scope: ['user:email'],
    state: crypto.randomUUID()
  });
  
  return Response.redirect(url);
}

// app/auth/github/callback/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  
  if (!code) {
    return Response.redirect('/auth/error');
  }
  
  try {
    const tokens = await githubAuth.exchangeCodeForToken(code);
    const user = await githubAuth.withToken(tokens.access_token).getUser();
    
    // Store user and tokens in your database
    // Set session cookie
    
    return Response.redirect('/dashboard');
  } catch (error) {
    return Response.redirect('/auth/error');
  }
}
```

### Express.js

```typescript
import express from 'express';
import { GitHubOAuth } from '@remcostoeten/fync/github/oauth';

const app = express();
const githubAuth = GitHubOAuth({
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  redirectUri: process.env.GITHUB_REDIRECT_URI!
});

app.get('/auth/github', (req, res) => {
  const { url } = githubAuth.getAuthorizationUrl({
    scope: ['user:email'],
    state: req.sessionID
  });
  res.redirect(url);
});

app.get('/auth/github/callback', async (req, res) => {
  try {
    const tokens = await githubAuth.exchangeCodeForToken(req.query.code);
    const user = await githubAuth.withToken(tokens.access_token).getUser();
    
    req.session.user = user;
    req.session.tokens = tokens;
    
    res.redirect('/dashboard');
  } catch (error) {
    res.redirect('/auth/error');
  }
});
```

## Database Integration

### Drizzle ORM Schema

```typescript
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  provider: text('provider').notNull(), // 'github' | 'google'
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  expiresAt: timestamp('expires_at'),
});
```

### Token Management Service

```typescript
import { db } from './db';
import { GitHubOAuth, GoogleOAuth } from '@remcostoeten/fync';

export class TokenService {
  static async refreshAccessToken(userId: string, provider: 'github' | 'google') {
    const account = await db.select()
      .from(accounts)
      .where(eq(accounts.userId, userId))
      .where(eq(accounts.provider, provider))
      .limit(1);

    if (!account[0]?.refreshToken) {
      throw new Error('No refresh token available');
    }

    const auth = provider === 'github' ? githubAuth : googleAuth;
    const newTokens = await auth.refreshToken(account[0].refreshToken);

    // Update database with new tokens
    await db.update(accounts)
      .set({
        accessToken: newTokens.access_token,
        refreshToken: newTokens.refresh_token || account[0].refreshToken,
        expiresAt: new Date(Date.now() + newTokens.expires_in * 1000),
      })
      .where(eq(accounts.id, account[0].id));

    return newTokens;
  }

  static async getValidAccessToken(userId: string, provider: 'github' | 'google') {
    const account = await db.select()
      .from(accounts)
      .where(eq(accounts.userId, userId))
      .where(eq(accounts.provider, provider))
      .limit(1);

    if (!account[0]) {
      throw new Error('Account not found');
    }

    // Check if token is expired
    const now = new Date();
    const expiresAt = account[0].expiresAt;
    const bufferTime = 5 * 60 * 1000; // 5 minutes

    if (expiresAt && (expiresAt.getTime() - now.getTime()) < bufferTime) {
      const newTokens = await this.refreshAccessToken(userId, provider);
      return newTokens.access_token;
    }

    return account[0].accessToken;
  }
}
```

## Using OAuth Tokens with APIs

Once you have tokens, you can use them with fync's API clients:

```typescript
// GitHub API with OAuth token
const accessToken = await TokenService.getValidAccessToken(userId, 'github');
const github = GitHub({ token: accessToken });

const user = await github.me.getAuthenticatedUser();
const repos = await github.me.getMyRepos();

// Google Calendar API with OAuth token
const googleToken = await TokenService.getValidAccessToken(userId, 'google');
const calendar = GoogleCalendar({ token: googleToken });

const events = await calendar.getUpcomingEvents('primary', 10);
const calendars = await calendar.getCalendars();
```

## Security Best Practices

### PKCE (Proof Key for Code Exchange)

Always use PKCE for public clients (SPAs, mobile apps):

```typescript
const { url, codeVerifier } = googleAuth.getAuthorizationUrl({
  pkce: true,
  // ... other options
});

// Store codeVerifier securely (encrypted cookie, session)
// Use it when exchanging code for token
const tokens = await googleAuth.exchangeCodeForToken(code, codeVerifier);
```

### State Parameter

Always use a state parameter to prevent CSRF attacks:

```typescript
const state = crypto.randomUUID();
const { url } = githubAuth.getAuthorizationUrl({
  state,
  // ... other options
});

// Verify state in callback
if (receivedState !== expectedState) {
  throw new Error('Invalid state parameter');
}
```

### Token Storage

- Store tokens securely (encrypted in database)
- Use secure, HTTP-only cookies for sessions
- Implement proper token rotation
- Set appropriate expiration times

### Scope Management

Request only the scopes you need:

```typescript
// GitHub - be specific
scope: ['user:email', 'repo:status'] // Not 'repo' if you don't need full access

// Google - use specific scopes
scope: [
  'openid',
  'email', 
  'profile',
  'https://www.googleapis.com/auth/calendar.readonly' // Read-only if sufficient
]
```

## Error Handling

```typescript
try {
  const tokens = await githubAuth.exchangeCodeForToken(code);
} catch (error) {
  if (error instanceof Error) {
    console.error('OAuth error:', error.message);
    
    if (error.message.includes('invalid_client')) {
      // Handle invalid client credentials
    } else if (error.message.includes('invalid_grant')) {
      // Handle invalid/expired authorization code
    }
  }
}
```

## API Reference

### GitHubOAuth

#### Methods

- `getAuthorizationUrl(options)` - Generate authorization URL
- `exchangeCodeForToken(code, state?, codeVerifier?)` - Exchange code for tokens
- `refreshToken(refreshToken)` - Refresh access token
- `revokeToken(accessToken?)` - Revoke access token
- `withToken(token)` - Create instance with token
- `getUser()` - Get authenticated user info
- `getUserEmails()` - Get user's email addresses
- `getPrimaryEmail()` - Get primary email
- `validateToken()` - Check if token is valid
- `getTokenScopes()` - Get token scopes
- `getCompleteProfile()` - Get complete user profile

### GoogleOAuth

#### Methods

- `getAuthorizationUrl(options)` - Generate authorization URL
- `exchangeCodeForToken(code, codeVerifier?)` - Exchange code for tokens
- `refreshToken(refreshToken)` - Refresh access token
- `revokeToken(token?)` - Revoke token
- `withToken(token)` - Create instance with token
- `getUser()` - Get authenticated user info
- `getTokenInfo()` - Get token information
- `validateToken()` - Check if token is valid
- `getTokenScopes()` - Get token scopes
- `hasScope(scope)` - Check if token has specific scope
- `hasScopes(scopes)` - Check if token has all required scopes
- `getTokenExpirationTime()` - Get remaining time until expiration
- `isTokenExpired(bufferSeconds?)` - Check if token is expired
- `getCompleteProfile()` - Get complete user profile

## Examples

Check out the complete examples in the `examples/` directory:

- `oauth-simple-usage.ts` - Basic usage examples
- `oauth-drizzle-nextjs.ts` - Complete Next.js + Drizzle ORM integration

## Supported Scopes

### GitHub Scopes

- `repo` - Full repository access
- `public_repo` - Public repository access
- `user` - User profile access
- `user:email` - Email access
- `read:user` - Read user profile
- And many more...

### Google Scopes

- `openid` - OpenID Connect
- `email` - Email address
- `profile` - Basic profile
- `https://www.googleapis.com/auth/calendar` - Calendar access
- `https://www.googleapis.com/auth/drive` - Drive access
- `https://www.googleapis.com/auth/gmail.readonly` - Gmail read access
- And many more...

## License

MIT License - see LICENSE file for details.
