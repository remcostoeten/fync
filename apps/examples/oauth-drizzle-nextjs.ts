/**
 * Complete OAuth2 + Drizzle ORM Integration Example for Next.js
 * 
 * This example demonstrates how to integrate fync OAuth2 authentication
 * with Drizzle ORM in a Next.js application following modular architecture.
 * 
 * Features:
 * - GitHub & Google OAuth2 authentication
 * - User session management with Drizzle ORM
 * - Refresh token handling
 * - Modular architecture following your design principles
 * - Type-safe database operations
 * - Middleware for protected routes
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import { pgTable, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';
import { eq, and } from 'drizzle-orm';
import postgres from 'postgres';
import { GitHubOAuth, GoogleOAuth, type GitHubUserInfo, type GoogleUserInfo } from '@remcostoeten/fync';
import type { NextRequest } from 'next/server';

// ==============================================================================
// Database Schema (src/server/db/schemas/index.ts)
// ==============================================================================

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  provider: text('provider').notNull(), // 'github' | 'google'
  providerAccountId: text('provider_account_id').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  expiresAt: timestamp('expires_at'),
  tokenType: text('token_type'),
  scope: text('scope'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;

// ==============================================================================
// Database Connection (src/server/db/index.ts)
// ==============================================================================

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
export const db = drizzle(client);

// ==============================================================================
// OAuth Configuration (src/modules/authentication/config/oauth.ts)
// ==============================================================================

export const githubOAuth = GitHubOAuth({
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  redirectUri: process.env.GITHUB_REDIRECT_URI || 'http://localhost:3000/auth/github/callback',
});

export const googleOAuth = GoogleOAuth({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  redirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/google/callback',
});

// ==============================================================================
// Authentication Service (src/modules/authentication/services/auth-service.ts)
// ==============================================================================

export class AuthService {
  /**
   * Create or update user from GitHub OAuth
   */
  static async handleGitHubCallback(code: string, state?: string) {
    try {
      // Exchange code for tokens
      const tokens = await githubOAuth.exchangeCodeForToken(code, state);
      
      // Get user info
      const githubUser = await githubOAuth.withToken(tokens.access_token).getUser();
      
      // Get primary email
      const primaryEmail = await githubOAuth.withToken(tokens.access_token).getPrimaryEmail();
      
      if (!primaryEmail) {
        throw new Error('GitHub account must have a public email address');
      }

      // Create/update user and account
      const user = await this.upsertUser({
        email: primaryEmail,
        name: githubUser.name || githubUser.login,
        avatarUrl: githubUser.avatar_url,
      });

      await this.upsertAccount({
        userId: user.id,
        provider: 'github',
        providerAccountId: githubUser.id.toString(),
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt: tokens.expires_in 
          ? new Date(Date.now() + tokens.expires_in * 1000) 
          : null,
        tokenType: tokens.token_type,
        scope: tokens.scope,
      });

      // Create session
      const session = await this.createSession(user.id);

      return { user, session, tokens };
    } catch (error) {
      throw new Error(`GitHub OAuth failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Create or update user from Google OAuth
   */
  static async handleGoogleCallback(code: string, codeVerifier?: string) {
    try {
      // Exchange code for tokens
      const tokens = await googleOAuth.exchangeCodeForToken(code, codeVerifier);
      
      // Get user info
      const googleUser = await googleOAuth.withToken(tokens.access_token).getUser();

      // Create/update user and account
      const user = await this.upsertUser({
        email: googleUser.email,
        name: googleUser.name,
        avatarUrl: googleUser.picture,
      });

      await this.upsertAccount({
        userId: user.id,
        provider: 'google',
        providerAccountId: googleUser.id,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
        tokenType: tokens.token_type,
        scope: tokens.scope,
      });

      // Create session
      const session = await this.createSession(user.id);

      return { user, session, tokens };
    } catch (error) {
      throw new Error(`Google OAuth failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Refresh access token for a user account
   */
  static async refreshAccessToken(userId: string, provider: 'github' | 'google') {
    const account = await db
      .select()
      .from(accounts)
      .where(and(eq(accounts.userId, userId), eq(accounts.provider, provider)))
      .limit(1);

    if (!account[0] || !account[0].refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      let newTokens;
      
      if (provider === 'github') {
        newTokens = await githubOAuth.refreshToken(account[0].refreshToken);
      } else {
        newTokens = await googleOAuth.refreshToken(account[0].refreshToken);
      }

      // Update account with new tokens
      await db
        .update(accounts)
        .set({
          accessToken: newTokens.access_token,
          refreshToken: newTokens.refresh_token || account[0].refreshToken,
          expiresAt: new Date(Date.now() + newTokens.expires_in * 1000),
          updatedAt: new Date(),
        })
        .where(eq(accounts.id, account[0].id));

      return newTokens;
    } catch (error) {
      throw new Error(`Token refresh failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Validate and refresh token if needed
   */
  static async getValidAccessToken(userId: string, provider: 'github' | 'google') {
    const account = await db
      .select()
      .from(accounts)
      .where(and(eq(accounts.userId, userId), eq(accounts.provider, provider)))
      .limit(1);

    if (!account[0]) {
      throw new Error('Account not found');
    }

    // Check if token is expired or will expire soon (5 minutes buffer)
    const now = new Date();
    const expiresAt = account[0].expiresAt;
    const bufferTime = 5 * 60 * 1000; // 5 minutes

    if (expiresAt && (expiresAt.getTime() - now.getTime()) < bufferTime) {
      // Token is expired or will expire soon, refresh it
      const newTokens = await this.refreshAccessToken(userId, provider);
      return newTokens.access_token;
    }

    return account[0].accessToken;
  }

  /**
   * Create or update user
   */
  private static async upsertUser(userData: Omit<NewUser, 'id'>) {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, userData.email))
      .limit(1);

    if (existingUser[0]) {
      // Update existing user
      const [updatedUser] = await db
        .update(users)
        .set({
          ...userData,
          updatedAt: new Date(),
        })
        .where(eq(users.id, existingUser[0].id))
        .returning();

      return updatedUser;
    } else {
      // Create new user
      const [newUser] = await db
        .insert(users)
        .values({
          id: crypto.randomUUID(),
          ...userData,
        })
        .returning();

      return newUser;
    }
  }

  /**
   * Create or update account
   */
  private static async upsertAccount(accountData: Omit<NewAccount, 'id'>) {
    const existingAccount = await db
      .select()
      .from(accounts)
      .where(
        and(
          eq(accounts.userId, accountData.userId),
          eq(accounts.provider, accountData.provider)
        )
      )
      .limit(1);

    if (existingAccount[0]) {
      // Update existing account
      const [updatedAccount] = await db
        .update(accounts)
        .set({
          ...accountData,
          updatedAt: new Date(),
        })
        .where(eq(accounts.id, existingAccount[0].id))
        .returning();

      return updatedAccount;
    } else {
      // Create new account
      const [newAccount] = await db
        .insert(accounts)
        .values({
          id: crypto.randomUUID(),
          ...accountData,
        })
        .returning();

      return newAccount;
    }
  }

  /**
   * Create a new session
   */
  private static async createSession(userId: string) {
    // Remove old sessions for this user
    await db.delete(sessions).where(eq(sessions.userId, userId));

    // Create new session (expires in 7 days)
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const [session] = await db
      .insert(sessions)
      .values({
        id: crypto.randomUUID(),
        userId,
        expiresAt,
      })
      .returning();

    return session;
  }

  /**
   * Get session with user
   */
  static async getSessionWithUser(sessionId: string) {
    const result = await db
      .select({
        session: sessions,
        user: users,
      })
      .from(sessions)
      .innerJoin(users, eq(sessions.userId, users.id))
      .where(eq(sessions.id, sessionId))
      .limit(1);

    if (!result[0]) {
      return null;
    }

    // Check if session is expired
    if (result[0].session.expiresAt < new Date()) {
      await db.delete(sessions).where(eq(sessions.id, sessionId));
      return null;
    }

    return result[0];
  }

  /**
   * Delete session (logout)
   */
  static async deleteSession(sessionId: string) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
  }

  /**
   * Revoke OAuth tokens and delete account
   */
  static async revokeAccount(userId: string, provider: 'github' | 'google') {
    const account = await db
      .select()
      .from(accounts)
      .where(and(eq(accounts.userId, userId), eq(accounts.provider, provider)))
      .limit(1);

    if (account[0] && account[0].accessToken) {
      try {
        if (provider === 'github') {
          await githubOAuth.revokeToken(account[0].accessToken);
        } else {
          await googleOAuth.revokeToken(account[0].accessToken);
        }
      } catch (error) {
        console.error('Failed to revoke token:', error);
      }
    }

    await db.delete(accounts).where(eq(accounts.id, account[0].id));
  }
}

// ==============================================================================
// Next.js API Routes
// ==============================================================================

// app/auth/github/route.ts
export async function GET() {
  const { url, codeVerifier } = githubOAuth.getAuthorizationUrl({
    scope: ['user:email', 'repo'],
    state: crypto.randomUUID(),
  });

  // In a real app, you'd store the state and codeVerifier in a secure way
  // For example, in a signed cookie or session store
  
  return Response.redirect(url);
}

// app/auth/github/callback/route.ts
export async function GitHubCallbackHandler(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  if (error) {
    return Response.redirect('/auth/error?error=' + encodeURIComponent(error));
  }

  if (!code) {
    return Response.redirect('/auth/error?error=missing_code');
  }

  try {
    const { user, session } = await AuthService.handleGitHubCallback(code, state || undefined);

    // Set session cookie
    const response = Response.redirect('/dashboard');
    response.cookies.set('session', session.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    return Response.redirect('/auth/error?error=oauth_failed');
  }
}

// app/auth/google/route.ts
export async function GoogleAuthHandler() {
  const { url, codeVerifier } = googleOAuth.getAuthorizationUrl({
    scope: ['openid', 'email', 'profile', 'https://www.googleapis.com/auth/calendar'],
    state: crypto.randomUUID(),
    accessType: 'offline', // Required for refresh tokens
    pkce: true, // Use PKCE for security
  });

  // Store codeVerifier securely (e.g., in encrypted cookie)
  const response = Response.redirect(url);
  response.cookies.set('oauth_code_verifier', codeVerifier!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 10 * 60, // 10 minutes
  });

  return response;
}

// app/auth/google/callback/route.ts
export async function GoogleCallbackHandler(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const codeVerifier = request.cookies.get('oauth_code_verifier')?.value;

  if (error) {
    return Response.redirect('/auth/error?error=' + encodeURIComponent(error));
  }

  if (!code) {
    return Response.redirect('/auth/error?error=missing_code');
  }

  try {
    const { user, session } = await AuthService.handleGoogleCallback(code, codeVerifier);

    // Set session cookie and clear code verifier
    const response = Response.redirect('/dashboard');
    response.cookies.set('session', session.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    response.cookies.delete('oauth_code_verifier');

    return response;
  } catch (error) {
    console.error('Google OAuth error:', error);
    return Response.redirect('/auth/error?error=oauth_failed');
  }
}

// ==============================================================================
// Middleware for Authentication (middleware.ts)
// ==============================================================================

export async function authMiddleware(request: NextRequest) {
  const sessionId = request.cookies.get('session')?.value;

  if (!sessionId) {
    return Response.redirect(new URL('/auth/login', request.url));
  }

  const sessionData = await AuthService.getSessionWithUser(sessionId);

  if (!sessionData) {
    const response = Response.redirect(new URL('/auth/login', request.url));
    response.cookies.delete('session');
    return response;
  }

  // Add user info to headers for the app to use
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-id', sessionData.user.id);
  requestHeaders.set('x-user-email', sessionData.user.email);

  return Response.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// ==============================================================================
// Usage Examples in Components
// ==============================================================================

// Example: Protected page that uses GitHub API
export async function GitHubIntegrationExample({ userId }: { userId: string }) {
  try {
    // Get valid access token (automatically refreshes if needed)
    const accessToken = await AuthService.getValidAccessToken(userId, 'github');
    
    // Use the token with fync GitHub API
    const github = GitHub({ token: accessToken });
    const user = await github.me.getAuthenticatedUser();
    const repos = await github.me.getMyRepos();

    return {
      user,
      repos,
    };
  } catch (error) {
    console.error('GitHub API error:', error);
    throw error;
  }
}

// Example: Google Calendar integration
export async function GoogleCalendarExample({ userId }: { userId: string }) {
  try {
    // Get valid access token (automatically refreshes if needed)
    const accessToken = await AuthService.getValidAccessToken(userId, 'google');
    
    // Use the token with fync Google Calendar API
    const { GoogleCalendar } = await import('@remcostoeten/fync/google-calendar');
    const calendar = GoogleCalendar({ token: accessToken });
    
    const events = await calendar.getUpcomingEvents('primary', 10);
    const calendars = await calendar.getCalendars();

    return {
      events,
      calendars,
    };
  } catch (error) {
    console.error('Google Calendar API error:', error);
    throw error;
  }
}

// ==============================================================================
// Environment Variables (.env.local)
// ==============================================================================

/*
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/your_db"

# GitHub OAuth
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"
GITHUB_REDIRECT_URI="http://localhost:3000/auth/github/callback"

# Google OAuth
GOOGLE_CLIENT_ID="your_google_client_id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
GOOGLE_REDIRECT_URI="http://localhost:3000/auth/google/callback"

# Session
SESSION_SECRET="your_session_secret_key"
*/

// ==============================================================================
// Drizzle Configuration (drizzle.config.ts)
// ==============================================================================

/*
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/server/db/schemas/index.ts',
  out: './src/server/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
*/

// ==============================================================================
// Package.json dependencies
// ==============================================================================

/*
{
  "dependencies": {
    "@remcostoeten/fync": "^5.0.0",
    "drizzle-orm": "^0.29.0",
    "postgres": "^3.4.0",
    "next": "^14.0.0"
  },
  "devDependencies": {
    "drizzle-kit": "^0.20.0",
    "@types/node": "^20.0.0"
  }
}
*/
