# Google Drive API Integration

Complete Google Drive API v3 integration for the fync library with OAuth2 authentication, file management, and comprehensive operations.

## 🔑 Getting API Credentials

### Prerequisites
- A Google account
- A Google Cloud Platform (GCP) project (free tier available)

### Step-by-Step Setup

#### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** dropdown at the top
3. Click **"New Project"**
4. Enter a project name (e.g., "My Drive App")
5. Click **"Create"**

#### 2. Enable Google Drive API

1. In your project dashboard, go to **"APIs & Services"** > **"Library"**
2. Search for **"Google Drive API"**
3. Click on it and press **"Enable"**
4. Wait for the API to be enabled (usually takes a few seconds)

#### 3. Create OAuth 2.0 Credentials

1. Go to **"APIs & Services"** > **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** > **"OAuth client ID"**
3. If prompted, configure the OAuth consent screen first:
   - Choose **"External"** (unless you have a Google Workspace account)
   - Fill in required fields:
     - **App name**: Your application name
     - **User support email**: Your email
     - **Developer contact**: Your email
   - Add scopes (click **"ADD OR REMOVE SCOPES"**):
     - Search and select the Drive scopes you need
     - For full access, select `../auth/drive`
   - Add test users (your email) if in testing mode
   - Click **"SAVE AND CONTINUE"**

4. Back in Create OAuth client ID:
   - **Application type**: Select **"Web application"**
   - **Name**: Enter a name (e.g., "Drive Web Client")
   - **Authorized JavaScript origins**: Add your domains
     - For development: `http://localhost:3000`
     - For production: `https://yourdomain.com`
   - **Authorized redirect URIs**: Add your callback URLs
     - For development: `http://localhost:3000/callback`
     - For production: `https://yourdomain.com/callback`
   - Click **"CREATE"**

5. **Save your credentials**:
   - A popup will show your **Client ID** and **Client Secret**
   - Download the JSON file or copy these values
   - ⚠️ **Keep these secret and never commit them to version control!**

#### 4. (Optional) Create an API Key

For accessing public files without user authentication:

1. Go to **"APIs & Services"** > **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** > **"API key"**
3. Restrict the API key (recommended):
   - Click on the created API key
   - Under **"API restrictions"**, select **"Restrict key"**
   - Choose **"Google Drive API"**
   - Under **"Application restrictions"**, add your domains/IPs
   - Click **"SAVE"**

### Environment Variables Setup

Create a `.env` file in your project root:

```bash
# Google OAuth2 Credentials
GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/callback

# Optional: For public file access
GOOGLE_API_KEY=your_api_key_here

# Tokens (will be populated after user authorization)
GOOGLE_ACCESS_TOKEN=
GOOGLE_REFRESH_TOKEN=
```

### Security Best Practices

1. **Never commit credentials to version control**
   - Add `.env` to `.gitignore`
   - Use environment variables or secret management services

2. **Use different credentials for different environments**
   - Separate development and production credentials
   - Restrict production credentials to specific domains

3. **Implement token storage securely**
   - Store refresh tokens encrypted in your database
   - Use secure session management for access tokens

4. **Set appropriate scopes**
   - Request only the minimum scopes needed
   - Use read-only scopes when write access isn't required

5. **Monitor usage**
   - Check the [Google Cloud Console](https://console.cloud.google.com/) for API usage
   - Set up quota alerts to prevent unexpected charges

### Quota Limits (Free Tier)

- **Queries per day**: 1,000,000,000
- **Queries per 100 seconds per user**: 1,000
- **Queries per 100 seconds**: 10,000

For most applications, the free tier is more than sufficient.

### Troubleshooting Common Issues

#### "Access blocked: This app's request is invalid"
- Ensure redirect URI in your code exactly matches the one in Google Console
- Check that you've added all necessary OAuth scopes

#### "401 Unauthorized" errors
- Verify your Client ID and Client Secret are correct
- Check if the access token has expired (they expire after 1 hour)
- Ensure refresh token is being used to get new access tokens

#### "403 Forbidden" errors
- Check if the Drive API is enabled in your Google Cloud project
- Verify the user has granted necessary permissions
- Ensure you're not exceeding rate limits

#### "Redirect URI mismatch"
- The redirect URI must match exactly (including trailing slashes)
- HTTP vs HTTPS matters - use the exact protocol
- Port numbers must match (e.g., `:3000`)

## Features

- 🔐 **OAuth2 Authentication** - Full OAuth2 flow with token refresh
- 📁 **File Operations** - Upload, download, update, delete files
- 📂 **Folder Management** - Create folders, nested paths, list contents
- 🔍 **Search & Query** - Advanced file search with query builder
- 🔗 **Sharing & Permissions** - Share files, manage permissions
- 📤 **Export & Convert** - Export Google Workspace files to different formats
- 🗑️ **Trash Management** - Trash, restore, and permanently delete files
- 📊 **Storage Quota** - Monitor Drive storage usage
- 🔄 **Automatic Retry** - Built-in retry logic with exponential backoff

## Installation

```bash
npm install @remcostoeten/fync
# or
bun add @remcostoeten/fync
```

## Quick Start

### Setup Authentication

```typescript
import { 
  createGoogleDriveAuth, 
  getAuthorizationUrl, 
  exchangeCodeForTokens,
  createGoogleDriveService,
  GOOGLE_DRIVE_SCOPES 
} from '@remcostoeten/fync';

// 1. Create auth configuration
const auth = createGoogleDriveAuth({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/callback',
  scopes: [GOOGLE_DRIVE_SCOPES.DRIVE]
});

// 2. Get authorization URL for user consent
const authUrl = getAuthorizationUrl(auth);
console.log('Authorize here:', authUrl);

// 3. Exchange authorization code for tokens
const tokens = await exchangeCodeForTokens(auth, authorizationCode);
```

### Create Service Instance

```typescript
const driveService = createGoogleDriveService({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/callback',
  accessToken: tokens.access_token,
  refreshToken: tokens.refresh_token,
  onTokenRefresh: async (newTokens) => {
    // Save refreshed tokens to your database
    await saveTokens(newTokens);
  }
});
```

## Core Operations

### File Management

```typescript
// List files
const files = await driveService.listFiles({
  pageSize: 10,
  orderBy: 'modifiedTime desc'
});

// Upload file
const uploaded = await driveService.uploadFile({
  metadata: {
    name: 'document.pdf',
    mimeType: 'application/pdf',
    parents: ['folder-id']
  },
  content: fileBuffer,
  uploadType: 'multipart'
});

// Download file
const blob = await driveService.downloadFile({
  fileId: 'file-id',
  acknowledgeAbuse: false
});

// Update file
const updated = await driveService.updateFile('file-id', {
  metadata: {
    name: 'renamed-document.pdf',
    description: 'Updated description'
  }
});

// Delete file
await driveService.deleteFile('file-id');
```

### Folder Operations

```typescript
// Create folder
const folder = await driveService.createFolder({
  name: 'My Project',
  mimeType: 'application/vnd.google-apps.folder',
  description: 'Project files'
});

// Create nested folder structure
const nested = await driveService.createFolderPath(
  'Projects/2024/Documents',
  parentId
);

// List folder contents
const contents = await driveService.listFolderContents('folder-id');

// Find folder by name
const found = await driveService.findFolderByName('Documents', parentId);
```

### Search Files

```typescript
// Simple search
const results = await driveService.searchFiles(
  "mimeType='application/pdf' and name contains 'report'"
);

// Advanced search with helper
import { buildSearchQuery } from '@remcostoeten/fync/google-drive/helpers';

const query = buildSearchQuery({
  name: 'report',
  mimeType: 'application/pdf',
  modifiedAfter: new Date('2024-01-01'),
  ownedByMe: true,
  starred: true
});

const results = await driveService.searchFiles(query);
```

### Sharing & Permissions

```typescript
// Share file with user
const permission = await driveService.shareFile({
  fileId: 'file-id',
  permission: {
    type: 'user',
    role: 'reader',
    emailAddress: 'user@example.com'
  },
  sendNotificationEmail: true,
  emailMessage: 'Here is the file we discussed'
});

// Create shareable link
const link = await driveService.shareFile({
  fileId: 'file-id',
  permission: {
    type: 'anyone',
    role: 'reader'
  }
});

// Get permissions
const permissions = await driveService.getPermissions('file-id');

// Remove permission
await driveService.deletePermission('file-id', 'permission-id');
```

### Export & Convert

```typescript
// Export Google Doc to PDF
const pdfBlob = await driveService.exportFile({
  fileId: 'google-doc-id',
  mimeType: 'application/pdf'
});

// Export Google Sheet to Excel
const excelBlob = await driveService.exportFile({
  fileId: 'google-sheet-id',
  mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
});
```

## Helper Utilities

```typescript
import {
  isFolder,
  isGoogleWorkspaceFile,
  formatFileSize,
  buildSearchQuery,
  MIME_TYPES,
  getExportFormats,
  getMimeTypeFromExtension,
  sanitizeFileName,
  parseFileIdFromUrl,
  buildFileUrl,
  sortFiles
} from '@remcostoeten/fync/google-drive/helpers';

// Check file types
if (isFolder(file)) {
  console.log('This is a folder');
}

// Format file size
console.log(formatFileSize(file.size)); // "10.5 MB"

// Get MIME type
const mimeType = getMimeTypeFromExtension('pdf'); // "application/pdf"

// Parse Drive URL
const fileId = parseFileIdFromUrl('https://drive.google.com/file/d/abc123/view');

// Sort files
const sorted = sortFiles(files, 'modifiedTime', 'desc');
```

## Available Scopes

```typescript
GOOGLE_DRIVE_SCOPES = {
  DRIVE: "https://www.googleapis.com/auth/drive",                    // Full access
  DRIVE_FILE: "https://www.googleapis.com/auth/drive.file",          // Per-file access
  DRIVE_APPDATA: "https://www.googleapis.com/auth/drive.appdata",    // App data folder
  DRIVE_METADATA: "https://www.googleapis.com/auth/drive.metadata",  // Metadata access
  DRIVE_READONLY: "https://www.googleapis.com/auth/drive.readonly",  // Read-only access
  // ... and more
}
```

## Advanced Features

### Batch Operations

```typescript
// Upload multiple files
const files = ['file1.txt', 'file2.txt', 'file3.txt'];
const uploads = await Promise.all(
  files.map(name =>
    driveService.uploadFile({
      metadata: { name, mimeType: 'text/plain' },
      content: `Content of ${name}`
    })
  )
);

// Batch update permissions
const updates = await Promise.all(
  fileIds.map(id =>
    driveService.shareFile({
      fileId: id,
      permission: { type: 'anyone', role: 'reader' }
    })
  )
);
```

### Storage Management

```typescript
// Get storage quota
const quota = await driveService.getStorageQuota();
console.log(`Used: ${quota.usage} of ${quota.limit}`);

// Empty trash
await driveService.emptyTrash();

// Generate unique file IDs
const ids = await driveService.generateIds(5);
```

### Direct Client Access

For advanced use cases, you can access the chainable client directly:

```typescript
// Access the underlying chainable client
const client = driveService.client;

// Make custom API calls
const response = await client.files.get({
  params: {
    q: "custom query",
    fields: "files(id,name)"
  }
});

// Chain API paths dynamically
const data = await client.files[fileId].comments[commentId].replies.get();
```

## Error Handling

All methods return promises and will throw errors for failed operations:

```typescript
try {
  const file = await driveService.getFile('invalid-id');
} catch (error) {
  if (error.message.includes('404')) {
    console.log('File not found');
  } else if (error.message.includes('401')) {
    console.log('Authentication failed');
  } else {
    console.log('Error:', error.message);
  }
}
```

## Configuration Options

```typescript
const service = createGoogleDriveService({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  redirectUri: 'http://localhost:3000/callback',
  accessToken: 'current-access-token',
  refreshToken: 'refresh-token',
  apiKey: 'optional-api-key',        // For public file access
  onTokenRefresh: async (tokens) => {
    // Called when tokens are refreshed
    await saveTokens(tokens);
  }
});
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import type {
  TGoogleDriveFile,
  TGoogleDriveFolder,
  TGoogleDrivePermission,
  TGoogleDriveSearchParameters,
  TUploadOptions,
  TDownloadOptions,
  TGoogleDriveService
} from '@remcostoeten/fync';
```

## License

MIT
