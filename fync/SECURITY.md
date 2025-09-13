# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability within @remcostoeten/fync, please report it responsibly:

1. **Do not** open a public GitHub issue
2. Email security concerns to: [your-email@domain.com]
3. Include detailed information about the vulnerability
4. Allow reasonable time for us to address the issue before public disclosure

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 4.x     | :white_check_mark: |
| 3.x     | :x:                |
| < 3.0   | :x:                |

## Security Best Practices

### API Token Security

**Never hardcode API tokens in your source code.** Always use environment variables:

```typescript
// ❌ Bad - hardcoded token
const github = GitHub({
  token: 'ghp_your_actual_token_here'
})

// ✅ Good - environment variable
const github = GitHub({
  token: process.env.GITHUB_TOKEN
})
```

### Environment Variables

1. Create a `.env` file (never commit to version control):
```bash
# .env
GITHUB_TOKEN=ghp_your_github_token
SPOTIFY_ACCESS_TOKEN=your_spotify_token
GOOGLE_ACCESS_TOKEN=your_google_token
VERCEL_TOKEN=your_vercel_token
```

2. Add `.env` to your `.gitignore`:
```gitignore
.env
.env.local
.env.production
```

3. Load environment variables in your application:
```typescript
import 'dotenv/config'
```

### Token Permissions

Follow the principle of least privilege when creating API tokens:

#### GitHub Tokens
- Only grant necessary scopes (e.g., `repo:read` instead of full `repo`)
- Use fine-grained personal access tokens when possible
- Set expiration dates on tokens

#### Spotify Tokens
- Use OAuth 2.0 flow for production applications
- Refresh tokens before expiration
- Store tokens securely (encrypted at rest)

#### Google Tokens
- Use OAuth 2.0 with minimal required scopes
- Implement proper token refresh logic
- Store refresh tokens securely

#### Vercel Tokens
- Create project-specific tokens when possible
- Regularly rotate tokens
- Monitor token usage in Vercel dashboard

### Runtime Security

#### Input Validation
All user inputs are validated, but additional validation is recommended:

```typescript
// Validate inputs before making API calls
function validateGitHubRepo(owner: string, repo: string) {
  if (!owner || !repo || owner.includes('..') || repo.includes('..')) {
    throw new Error('Invalid repository parameters')
  }
}

const repo = await github.repo(validateGitHubRepo(owner, repo)).get()
```

#### Rate Limiting
Built-in rate limiting helps prevent abuse:

```typescript
const github = GitHub({
  token: process.env.GITHUB_TOKEN,
  rateLimiter: {
    maxRequests: 100,
    windowMs: 60000 // 1 minute
  }
})
```

#### Error Handling
Never expose sensitive information in error messages:

```typescript
try {
  const result = await github.user('username').get()
} catch (error) {
  // ❌ Don't expose internal errors
  console.log(error.response?.data)
  
  // ✅ Log safely
  console.log('Failed to fetch user data')
}
```

## Production Deployment

### Environment Security
- Use secure secret management (AWS Secrets Manager, Azure Key Vault, etc.)
- Rotate tokens regularly
- Monitor token usage and access patterns
- Implement proper logging and monitoring

### Network Security
- Use HTTPS for all API calls (default in fync)
- Implement proper CORS policies
- Consider using API proxies for additional security

### Dependency Security
- Regularly update dependencies
- Monitor for security advisories
- Use `npm audit` or similar tools
- Pin dependency versions in production

## Common Security Pitfalls

### Client-Side Exposure
```typescript
// ❌ Never do this in browser/frontend code
const github = GitHub({
  token: 'ghp_token_here' // This will be exposed to users!
})

// ✅ Use server-side proxy instead
// Frontend -> Your API -> GitHub API
```

### Log Sanitization
```typescript
// ❌ Don't log tokens
console.log('Config:', { token: process.env.GITHUB_TOKEN })

// ✅ Sanitize logs
console.log('Config loaded:', { tokenPresent: !!process.env.GITHUB_TOKEN })
```

### Token Sharing
- Never share tokens between environments (dev/staging/prod)
- Use different tokens for different applications
- Revoke tokens immediately when team members leave

## Contact

For security-related questions or concerns:
- Email: [your-security-email@domain.com]
- GitHub: [@remcostoeten](https://github.com/remcostoeten)

## Acknowledgments

We appreciate responsible disclosure of security vulnerabilities and will acknowledge contributors who help improve the security of this project.
