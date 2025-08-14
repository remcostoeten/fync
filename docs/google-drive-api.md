# Google Drive API Methods

## Client Configuration

```typescript
import {
  createGoogleDriveAuth,
  getAuthorizationUrl,
  exchangeCodeForTokens,
  refreshAccessToken,
  isTokenExpired,
  shouldRefreshToken,
  GOOGLE_DRIVE_SCOPES,
  createGoogleDriveClient,
  createGoogleDriveService
} from '@remcostoeten/fync/google-drive';

// OAuth config
const auth = createGoogleDriveAuth({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  redirectUri: process.env.GOOGLE_REDIRECT_URI!,
  scopes: [GOOGLE_DRIVE_SCOPES.DRIVE]
});

// Get consent URL
const url = getAuthorizationUrl(auth);

// After redirect: exchange code for tokens
const tokens = await exchangeCodeForTokens(auth, 'authorization_code_from_callback');

// Create high-level service
const drive = createGoogleDriveService({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  redirectUri: process.env.GOOGLE_REDIRECT_URI!,
  accessToken: tokens.access_token,
  refreshToken: tokens.refresh_token
});
```

## Chainable Client

```typescript
import { createGoogleDriveClient } from '@remcostoeten/fync/google-drive';

const client = createGoogleDriveClient({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  redirectUri: process.env.GOOGLE_REDIRECT_URI!,
  accessToken: process.env.GOOGLE_ACCESS_TOKEN
});

// List files
const list = await client.files.get({
  params: { pageSize: 10, fields: '*' }
});

// Get single file
const file = await client.files['FILE_ID'].get({
  params: { fields: '*' }
});

// Update metadata
const updated = await client.files['FILE_ID'].patch({
  name: 'New name'
}, { params: { supportsAllDrives: true } });

// Create folder
const folder = await client.files.post({
  name: 'Reports',
  mimeType: 'application/vnd.google-apps.folder'
}, { params: { supportsAllDrives: true } });

// Share file
const permission = await client.files['FILE_ID'].permissions.post({
  type: 'user',
  role: 'reader',
  emailAddress: 'user@example.com'
}, { params: { sendNotificationEmail: false, supportsAllDrives: true } });

// About / storage info
const about = await client.about.get({ params: { fields: 'storageQuota' } });
```

## High-level Service Methods

```typescript
// List files with sensible defaults
const files = await drive.listFiles({ pageSize: 100, fields: '*' });

// Get file
const one = await drive.getFile('FILE_ID', '*');

// Search
const results = await drive.searchFiles("name contains 'report' and trashed = false", { pageSize: 50 });

// Create folder
const createdFolder = await drive.createFolder({
  name: 'Project X',
  mimeType: 'application/vnd.google-apps.folder'
});

// Upload (multipart)
const uploaded = await drive.uploadFile({
  metadata: { name: 'hello.txt', mimeType: 'text/plain' },
  content: 'Hello world',
  uploadType: 'multipart'
});

// Update file metadata
const renamed = await drive.updateFile(uploaded.id, { metadata: { name: 'renamed.txt' } });

// Trash / untrash
await drive.trashFile(uploaded.id);
await drive.untrashFile(uploaded.id);

// Download
const blob = await drive.downloadFile({ fileId: uploaded.id });

// Export Google Docs → PDF
const pdfBlob = await drive.exportFile({ fileId: 'GOOGLE_DOC_FILE_ID', mimeType: 'application/pdf' });

// Copy and move
const copy = await drive.copyFile({ fileId: uploaded.id, name: 'copy.txt' });
await drive.moveFile({ fileId: copy.id, addParents: ['FOLDER_ID'] });

// Share and manage permissions
const perm = await drive.shareFile({
  fileId: copy.id,
  permission: { type: 'user', role: 'reader', emailAddress: 'user@example.com' },
  sendNotificationEmail: false
});
const permissions = await drive.getPermissions(copy.id);
await drive.deletePermission(copy.id, perm.id!);

// Utilities
await drive.emptyTrash();
const quota = await drive.getStorageQuota();
const ids = await drive.generateIds(5);

// Folder helpers
const nested = await drive.createFolderPath('Root/Year/Month');
const contents = await drive.listFolderContents(nested.id);
const byName = await drive.findFileByName('readme.md', nested.id);
const folderByName = await drive.findFolderByName('Month', nested.id);
```

## Notes

- Most methods accept params that map directly to the Drive v3 API and set supportsAllDrives to true by default where applicable.
- Upload supports media, multipart, and resumable strategies.
- Use GOOGLE_DRIVE_SCOPES to request minimal permissions (prefer read-only where possible).
