/**
 * Simple OAuth2 Usage Examples
 * 
 * Quick examples showing how to use fync OAuth2 authentication
 * without complex integrations.
 */

import { GitHubOAuth, GoogleOAuth } from '@remcostoeten/fync';

// ==============================================================================
// Basic GitHub OAuth Example
// ==============================================================================

async function githubOAuthExample() {
  // Initialize GitHub OAuth
  const githubAuth = GitHubOAuth({
    clientId: 'your-github-client-id',
    clientSecret: 'your-github-client-secret',
    redirectUri: 'http://localhost:3000/auth/github/callback',
  });

  // Step 1: Generate authorization URL
  const { url, codeVerifier } = githubAuth.getAuthorizationUrl({
    scope: ['user:email', 'repo'],
    state: 'random-state-for-csrf-protection',
  });

  console.log('Visit this URL to authorize:', url);

  // Step 2: After user authorizes, you'll receive a code in your callback
  // Exchange the code for tokens
  const code = 'authorization-code-from-callback';
  const tokens = await githubAuth.exchangeCodeForToken(code);

  console.log('Access Token:', tokens.access_token);
  console.log('Token Type:', tokens.token_type);
  console.log('Scope:', tokens.scope);

  // Step 3: Use the token to get user info
  const user = await githubAuth.withToken(tokens.access_token).getUser();
  console.log('User:', user.login, user.email);

  // Get user's email addresses
  const emails = await githubAuth.withToken(tokens.access_token).getUserEmails();
  console.log('Emails:', emails);

  // Get primary email
  const primaryEmail = await githubAuth.withToken(tokens.access_token).getPrimaryEmail();
  console.log('Primary Email:', primaryEmail);

  // Check token validity
  const isValid = await githubAuth.withToken(tokens.access_token).validateToken();
  console.log('Token is valid:', isValid);

  // Get token scopes
  const scopes = await githubAuth.withToken(tokens.access_token).getTokenScopes();
  console.log('Token scopes:', scopes);

  // Get complete profile
  const profile = await githubAuth.withToken(tokens.access_token).getCompleteProfile();
  console.log('Complete profile:', profile);

  // Refresh token (if available)
  if (tokens.refresh_token) {
    const newTokens = await githubAuth.refreshToken(tokens.refresh_token);
    console.log('New access token:', newTokens.access_token);
  }

  // Revoke token
  await githubAuth.revokeToken(tokens.access_token);
  console.log('Token revoked');
}

// ==============================================================================
// Basic Google OAuth Example
// ==============================================================================

async function googleOAuthExample() {
  // Initialize Google OAuth
  const googleAuth = GoogleOAuth({
    clientId: 'your-google-client-id.apps.googleusercontent.com',
    clientSecret: 'your-google-client-secret',
    redirectUri: 'http://localhost:3000/auth/google/callback',
  });

  // Step 1: Generate authorization URL
  const { url, codeVerifier } = googleAuth.getAuthorizationUrl({
    scope: [
      'openid',
      'email',
      'profile',
      'https://www.googleapis.com/auth/calendar',
    ],
    state: 'random-state-for-csrf-protection',
    accessType: 'offline', // Required for refresh tokens
    pkce: true, // Use PKCE for better security
  });

  console.log('Visit this URL to authorize:', url);
  console.log('Store this code verifier:', codeVerifier);

  // Step 2: After user authorizes, you'll receive a code in your callback
  // Exchange the code for tokens
  const code = 'authorization-code-from-callback';
  const tokens = await googleAuth.exchangeCodeForToken(code, codeVerifier);

  console.log('Access Token:', tokens.access_token);
  console.log('Refresh Token:', tokens.refresh_token);
  console.log('Expires In:', tokens.expires_in);
  console.log('Scope:', tokens.scope);

  // Step 3: Use the token to get user info
  const user = await googleAuth.withToken(tokens.access_token).getUser();
  console.log('User:', user.name, user.email);

  // Get token information
  const tokenInfo = await googleAuth.withToken(tokens.access_token).getTokenInfo();
  console.log('Token expires at:', new Date(tokenInfo.exp * 1000));

  // Check token validity
  const isValid = await googleAuth.withToken(tokens.access_token).validateToken();
  console.log('Token is valid:', isValid);

  // Get token scopes
  const scopes = await googleAuth.withToken(tokens.access_token).getTokenScopes();
  console.log('Token scopes:', scopes);

  // Check if token has specific scope
  const hasCalendarScope = await googleAuth
    .withToken(tokens.access_token)
    .hasScope('https://www.googleapis.com/auth/calendar');
  console.log('Has calendar scope:', hasCalendarScope);

  // Get complete profile
  const profile = await googleAuth.withToken(tokens.access_token).getCompleteProfile();
  console.log('Complete profile:', profile);

  // Check token expiration
  const expirationTime = await googleAuth
    .withToken(tokens.access_token)
    .getTokenExpirationTime();
  console.log('Token expires in:', expirationTime, 'seconds');

  const isExpired = await googleAuth
    .withToken(tokens.access_token)
    .isTokenExpired(300); // 5 minutes buffer
  console.log('Token is expired (with 5min buffer):', isExpired);

  // Refresh token
  if (tokens.refresh_token) {
    const newTokens = await googleAuth.refreshToken(tokens.refresh_token);
    console.log('New access token:', newTokens.access_token);
  }

  // Revoke token
  await googleAuth.revokeToken(tokens.access_token);
  console.log('Token revoked');
}

// ==============================================================================
// Using OAuth tokens with other fync APIs
// ==============================================================================

async function usingOAuthWithAPIs() {
  // After getting tokens from OAuth flow...
  const githubAccessToken = 'github-access-token';
  const googleAccessToken = 'google-access-token';

  // Use GitHub token with GitHub API
  const { GitHub } = await import('@remcostoeten/fync/github');
  const github = GitHub({ token: githubAccessToken });
  
  const user = await github.me.getAuthenticatedUser();
  const repos = await github.me.getMyRepos();
  console.log('GitHub user:', user.login);
  console.log('Repositories count:', repos.length);

  // Use Google token with Google Calendar API
  const { GoogleCalendar } = await import('@remcostoeten/fync/google-calendar');
  const calendar = GoogleCalendar({ token: googleAccessToken });
  
  const calendars = await calendar.getCalendars();
  const events = await calendar.getUpcomingEvents('primary', 10);
  console.log('Calendars count:', calendars.items?.length || 0);
  console.log('Upcoming events count:', events.length);
}

// ==============================================================================
// Express.js Integration Example
// ==============================================================================

async function expressIntegrationExample() {
  // This would be in your Express.js routes
  
  const express = require('express');
  const app = express();

  // GitHub OAuth routes
  app.get('/auth/github', (req, res) => {
    const githubAuth = GitHubOAuth({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      redirectUri: 'http://localhost:3000/auth/github/callback',
    });

    const { url } = githubAuth.getAuthorizationUrl({
      scope: ['user:email'],
      state: req.session?.id || 'random-state',
    });

    res.redirect(url);
  });

  app.get('/auth/github/callback', async (req, res) => {
    const { code, state } = req.query;

    try {
      const githubAuth = GitHubOAuth({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        redirectUri: 'http://localhost:3000/auth/github/callback',
      });

      const tokens = await githubAuth.exchangeCodeForToken(code as string, state as string);
      const user = await githubAuth.withToken(tokens.access_token).getUser();

      // Store user and tokens in session/database
      req.session.user = user;
      req.session.tokens = tokens;

      res.redirect('/dashboard');
    } catch (error) {
      res.redirect('/auth/error');
    }
  });

  // Google OAuth routes
  app.get('/auth/google', (req, res) => {
    const googleAuth = GoogleOAuth({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      redirectUri: 'http://localhost:3000/auth/google/callback',
    });

    const { url, codeVerifier } = googleAuth.getAuthorizationUrl({
      scope: ['openid', 'email', 'profile'],
      state: req.session?.id || 'random-state',
      accessType: 'offline',
      pkce: true,
    });

    // Store code verifier in session
    req.session.codeVerifier = codeVerifier;
    res.redirect(url);
  });

  app.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;
    const codeVerifier = req.session?.codeVerifier;

    try {
      const googleAuth = GoogleOAuth({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        redirectUri: 'http://localhost:3000/auth/google/callback',
      });

      const tokens = await googleAuth.exchangeCodeForToken(code as string, codeVerifier);
      const user = await googleAuth.withToken(tokens.access_token).getUser();

      // Store user and tokens in session/database
      req.session.user = user;
      req.session.tokens = tokens;

      res.redirect('/dashboard');
    } catch (error) {
      res.redirect('/auth/error');
    }
  });

  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}

// ==============================================================================
// Error Handling Examples
// ==============================================================================

async function errorHandlingExample() {
  const githubAuth = GitHubOAuth({
    clientId: 'invalid-client-id',
    clientSecret: 'invalid-client-secret',
    redirectUri: 'http://localhost:3000/callback',
  });

  try {
    const tokens = await githubAuth.exchangeCodeForToken('invalid-code');
  } catch (error) {
    if (error instanceof Error) {
      console.error('OAuth error:', error.message);
      
      // Handle specific error cases
      if (error.message.includes('invalid_client')) {
        console.log('Invalid client credentials');
      } else if (error.message.includes('invalid_grant')) {
        console.log('Invalid authorization code');
      } else if (error.message.includes('expired')) {
        console.log('Authorization code has expired');
      }
    }
  }

  // Token validation with error handling
  try {
    const isValid = await githubAuth.withToken('invalid-token').validateToken();
    console.log('Token is valid:', isValid); // Will be false
  } catch (error) {
    console.log('Token validation failed');
  }
}

// Run examples
if (require.main === module) {
  console.log('Running OAuth examples...');
  
  // Uncomment the examples you want to run
  // githubOAuthExample();
  // googleOAuthExample();
  // usingOAuthWithAPIs();
  // errorHandlingExample();
}
