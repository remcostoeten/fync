import { createGitHubOAuth2Flow, GITHUB_OAUTH2_SCOPES, createNextJSAPIHandler } from './src/oauth';
@ts-ignore
import type { NextRequest } from 'next/server';

// Example 1: Basic OAuth2 flow
async function basicOAuth2Example() {
  const oauth2 = createGitHubOAuth2Flow({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    redirectUri: 'http://localhost:3000/api/auth/callback',
    scopes: [GITHUB_OAUTH2_SCOPES.USER_EMAIL, GITHUB_OAUTH2_SCOPES.REPO_READ],
  });

  // Generate authorization URL
  const state = oauth2.generateState({ userId: '123' });
  const authUrl = oauth2.getAuthorizationUrl({ 
    state: state.value,
    scopes: [GITHUB_OAUTH2_SCOPES.USER_EMAIL, GITHUB_OAUTH2_SCOPES.REPO_READ]
  });
  
  console.log('Visit this URL to authorize:', authUrl);
  
  // After user authorizes, you get a code
  const code = 'authorization_code_from_callback';
  
  try {
    // Exchange code for token
    const tokens = await oauth2.exchangeCodeForToken({ code, state: state.value });
    console.log('Access token:', tokens.access_token);
    console.log('Expires in:', tokens.expires_in);
    
    // Use the token to create authenticated GitHub client
    const { GitHub } = await import('./src/index');
    const github = GitHub({ token: tokens.access_token });
    
    const user = await github.me.get();
    console.log('Authenticated user:', user.login);
    
    // Refresh token if needed
    if (tokens.refresh_token) {
      const refreshed = await oauth2.refreshAccessToken({ 
        refreshToken: tokens.refresh_token 
      });
      console.log('Refreshed token:', refreshed.access_token);
    }
    
  } catch (error) {
    console.error('OAuth2 error:', error);
  }
}

// Example 2: Next.js API route handler
const nextjsHandler = createNextJSAPIHandler({
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  redirectUri: 'http://localhost:3000/api/auth/callback',
  scopes: [GITHUB_OAUTH2_SCOPES.USER_EMAIL, GITHUB_OAUTH2_SCOPES.REPO_READ],
  
  // Custom success handler
  onSuccess: async (tokens, request) => {
    const { GitHub } = await import('./src/index');
    const github = GitHub({ token: tokens.access_token });
    
    try {
      const user = await github.me.get();
      
      // Store user info in database or session
      console.log('User authenticated:', user.login);
      
      // Set secure cookie with token
      const { NextResponse } = await import('next/server');
      const response = NextResponse.redirect('/dashboard');
      response.cookies.set('github-access-token', tokens.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: tokens.expires_in || 3600,
      });
      
      return response;
    } catch (error) {
      console.error('Error getting user info:', error);
      const { NextResponse } = await import('next/server');
      return NextResponse.redirect('/login?error=user-info');
    }
  },
  
  // Custom error handler
  onError: (error, request) => {
    console.error('OAuth2 error:', error);
    const { NextResponse } = await import('next/server');
    return NextResponse.redirect('/login?error=auth-failed');
  },
});

// Example 3: Express.js-like usage (framework agnostic)
async function expressLikeExample() {
  const oauth2 = createGitHubOAuth2Flow({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    redirectUri: 'http://localhost:3000/auth/callback',
  });

  // Login route
  function loginRoute(req: any, res: any) {
    const state = oauth2.generateState({ 
      userId: req.user?.id,
      redirectTo: req.query.redirectTo || '/'
    });
    
    const authUrl = oauth2.getAuthorizationUrl({ 
      state: state.value,
      scopes: [GITHUB_OAUTH2_SCOPES.USER_EMAIL, GITHUB_OAUTH2_SCOPES.REPO_READ]
    });
    
    // Store state in session
    req.session.oauthState = state;
    
    res.redirect(authUrl);
  }
  
  // Callback route
  async function callbackRoute(req: any, res: any) {
    const { code, state } = req.query;
    
    if (!code || !state) {
      return res.redirect('/login?error=missing-params');
    }
    
    try {
      // Validate state
      const storedState = req.session.oauthState;
      if (!storedState || !oauth2.validateState(state, storedState.value)) {
        return res.redirect('/login?error=invalid-state');
      }
      
      // Exchange code for token
      const tokens = await oauth2.exchangeCodeForToken({ code, state });
      
      // Get user info
      const { GitHub } = await import('./src/index');
      const github = GitHub({ token: tokens.access_token });
      const user = await github.me.get();
      
      // Store in session
      req.session.user = user;
      req.session.tokens = tokens;
      
      // Redirect to original destination
      const redirectTo = storedState.metadata?.redirectTo as string || '/';
      res.redirect(redirectTo);
      
    } catch (error) {
      console.error('OAuth2 callback error:', error);
      res.redirect('/login?error=callback-failed');
    }
  }
  
  return { loginRoute, callbackRoute };
}

// Example 4: Advanced usage with scope management
async function advancedScopeExample() {
  const oauth2 = createGitHubOAuth2Flow({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    redirectUri: 'http://localhost:3000/api/auth/callback',
  });

  // Different permission levels
  const permissionLevels = {
    readonly: [
      GITHUB_OAUTH2_SCOPES.USER_EMAIL,
      GITHUB_OAUTH2_SCOPES.PUBLIC_REPO,
    ],
    readwrite: [
      GITHUB_OAUTH2_SCOPES.USER_EMAIL,
      GITHUB_OAUTH2_SCOPES.REPO_READ,
      GITHUB_OAUTH2_SCOPES.GIST,
    ],
    admin: [
      GITHUB_OAUTH2_SCOPES.USER_EMAIL,
      GITHUB_OAUTH2_SCOPES.REPO_WRITE,
      GITHUB_OAUTH2_SCOPES.ADMIN_READ_ORG,
      GITHUB_OAUTH2_SCOPES.WORKFLOW,
    ],
  };

  // Generate auth URL based on permission level
  function getAuthUrl(level: keyof typeof permissionLevels, userId: string) {
    const state = oauth2.generateState({ userId, permissionLevel: level });
    return oauth2.getAuthorizationUrl({
      state: state.value,
      scopes: permissionLevels[level],
    });
  }

  // Example usage
  const readonlyUrl = getAuthUrl('readonly', 'user123');
  const adminUrl = getAuthUrl('admin', 'user123');
  
  console.log('Readonly access:', readonlyUrl);
  console.log('Admin access:', adminUrl);
}

// Example 5: Token management and refresh
async function tokenManagementExample() {
  const oauth2 = createGitHubOAuth2Flow({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    redirectUri: 'http://localhost:3000/api/auth/callback',
  });

  // Simulate stored tokens
  const storedTokens = {
    access_token: 'stored_access_token',
    refresh_token: 'stored_refresh_token',
    expires_in: 3600,
    created_at: Math.floor(Date.now() / 1000) - 3000, // 50 minutes ago
  };

  // Check if token needs refresh
  const { shouldRefreshToken } = await import('./src/oauth');
  
  if (shouldRefreshToken(storedTokens, 300)) { // 5 minutes buffer
    console.log('Token needs refresh');
    
    try {
      const refreshed = await oauth2.refreshAccessToken({
        refreshToken: storedTokens.refresh_token!,
      });
      
      console.log('Token refreshed successfully');
      
      // Update stored tokens
      const updatedTokens = {
        ...refreshed,
        created_at: Math.floor(Date.now() / 1000),
      };
      
      // Use refreshed token
      const { GitHub } = await import('./src/index');
      const github = GitHub({ token: updatedTokens.access_token });
      
    } catch (error) {
      console.error('Token refresh failed:', error);
      // Redirect to login
    }
  }
}

export {
  basicOAuth2Example,
  nextjsHandler,
  expressLikeExample,
  advancedScopeExample,
  tokenManagementExample,
};

// Example Next.js API route usage:
/*
// pages/api/auth/[...oauth].ts
import { nextjsHandler } from '@remcostoeten/fync-github/oauth';

export default nextjsHandler;
*/

// Example middleware usage:
/*
// middleware.ts
import { createNextJSOAuth2Handler } from '@remcostoeten/fync-github/oauth';

const auth = createNextJSOAuth2Handler({
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  redirectUri: 'http://localhost:3000/api/auth/callback',
});

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    return auth.middleware(request);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
*/
