import type { TApiSection } from '@/types/content'

export const driveContent: TApiSection[] = [
  {
    id: 'core-exports',
    title: 'Core Exports',
    description: 'Main entry points and core functionality for Google Drive API integration',
    methods: [
      {
        id: 'main-entry-points',
        name: 'Main Entry Points',
        description: 'Primary package exports for Google Drive API client and utilities',
        signature: 'import { ... } from "@remcostoeten/fync"',
        parameters: [],
        returnType: 'Drive client factories and utilities',
        examples: [
          {
            id: 'core-imports',
            title: 'Core Package Imports',
            description: 'Import Google Drive parts of the Fync library',
            code: `import { GoogleDrive } from '@remcostoeten/fync/google-drive'
import { GoogleOAuth, createGoogleOAuth } from '@remcostoeten/fync/google/oauth'`,
            language: 'typescript',
            category: 'drive',
            tags: ['imports', 'setup']
          }
        ]
      }
    ]
  },
  {
    id: 'drive-client',
    title: 'Google Drive API Client',
    description: 'Comprehensive Google Drive API client with OAuth2 authentication and file management',
    methods: [
      {
        id: 'drive-main-client',
        name: 'GoogleDrive()',
        description: 'Main Google Drive client factory with OAuth2 configuration',
        signature: 'GoogleDrive(config: { token: string }): GoogleDriveClient',
        parameters: [
          {
            name: 'config',
            type: 'TDriveClientConfig',
            description: 'OAuth2 configuration including clientId, clientSecret, and access tokens',
            required: false
          }
        ],
        returnType: 'DriveClient',
        examples: [
          {
            id: 'drive-client-init',
            title: 'Initialize Drive Client',
            description: 'Create a Google Drive client with OAuth2 authentication',
            code: `import { GoogleDrive } from '@remcostoeten/fync/google-drive'

const drive = GoogleDrive({
  token: 'your-oauth-access-token'
})

const files = drive.files
const folders = drive.folders
const permissions = drive.permissions`,
            language: 'typescript',
            category: 'drive',
            tags: ['initialization', 'authentication']
          }
        ]
      },
      {
        id: 'drive-client-methods',
        name: 'Client Methods',
        description: 'Available methods on the main Google Drive client',
        signature: 'drive.files | drive.folders | drive.permissions | drive.comments | drive.revisions',
        parameters: [],
        returnType: 'Various specialized clients',
        examples: [
          {
            id: 'drive-client-methods-example',
            title: 'Drive Client Methods',
            description: 'Access different Google Drive API endpoints through specialized clients',
            code: `const drive = GoogleDrive({ token: 'your-token' })

const filesClient = drive.files
const foldersClient = drive.folders
const permissionsClient = drive.permissions
const commentsClient = drive.comments
const revisionsClient = drive.revisions
const aboutClient = drive.about`,
            language: 'typescript',
            category: 'drive',
            tags: ['client', 'methods']
          }
        ]
      }
    ]
  },
  {
    id: 'drive-files-operations',
    title: 'Files Client Methods',
    description: 'Methods for managing Google Drive files including upload, download, and metadata operations',
    methods: [
      {
        id: 'files-list',
        name: 'files.list()',
        description: 'List files and folders from Google Drive with optional filtering',
        signature: 'drive.files.list(options?: TFileListOptions): Promise<TDriveFile[]>',
        parameters: [
          {
            name: 'options',
            type: 'TFileListOptions',
            description: 'Optional filtering options like query, pageSize, orderBy',
            required: false
          }
        ],
        returnType: 'Promise<TDriveFile[]>',
        examples: [
          {
            id: 'files-list-example',
            title: 'List Drive Files',
            description: 'Fetch files from Google Drive with filtering',
            code: `const files = await drive.files.list({
  q: "mimeType='application/pdf'",
  pageSize: 10,
  orderBy: 'modifiedTime desc',
  fields: 'files(id,name,mimeType,size,modifiedTime)'
})

files.forEach(function displayFile(file) {
  console.log(file.name, file.mimeType, file.size)
})`,
            language: 'typescript',
            category: 'drive',
            tags: ['files', 'list']
          },
          {
            id: 'files-search-example',
            title: 'Search Files by Type',
            description: 'Search for specific file types and recently modified files',
            code: `const images = await drive.files.list({
  q: "mimeType contains 'image/' and modifiedTime > '2024-01-01T00:00:00Z'",
  pageSize: 50
})

const documents = await drive.files.list({
  q: "mimeType='application/vnd.google-apps.document'",
  orderBy: 'name'
})

const recentFiles = await drive.files.list({
  q: "modifiedTime > '2024-01-01T00:00:00Z'",
  orderBy: 'modifiedTime desc',
  pageSize: 20
})

console.log('Found images:', images.length)
console.log('Found documents:', documents.length)
console.log('Recent files:', recentFiles.length)`,
            language: 'typescript',
            category: 'drive',
            tags: ['files', 'search']
          }
        ]
      },
      {
        id: 'files-get',
        name: 'files.get()',
        description: 'Get file metadata or download file content',
        signature: 'drive.files.get(fileId: string, options?: TFileGetOptions): Promise<TDriveFile>',
        parameters: [
          {
            name: 'fileId',
            type: 'string',
            description: 'ID of the file to retrieve',
            required: true
          },
          {
            name: 'options',
            type: 'TFileGetOptions',
            description: 'Options for metadata fields or download content',
            required: false
          }
        ],
        returnType: 'Promise<TDriveFile>',
        examples: [
          {
            id: 'files-get-example',
            title: 'Get File Metadata',
            description: 'Retrieve detailed file information',
            code: `const file = await drive.files.get('file-id-123', {
  fields: 'id,name,mimeType,size,parents,createdTime,modifiedTime,owners'
})

console.log('File name:', file.name)
console.log('File size:', file.size, 'bytes')
console.log('Created:', file.createdTime)
console.log('Owner:', file.owners[0].emailAddress)`,
            language: 'typescript',
            category: 'drive',
            tags: ['files', 'metadata']
          },
          {
            id: 'files-download-example',
            title: 'Download File Content',
            description: 'Download file binary content',
            code: `const fileContent = await drive.files.download('file-id-123')
const buffer = Buffer.from(fileContent)

function saveToFile(fileName, content) {
  require('fs').writeFileSync(fileName, content)
}

saveToFile('downloaded-file.pdf', buffer)
console.log('File downloaded successfully')`,
            language: 'typescript',
            category: 'drive',
            tags: ['files', 'download']
          }
        ]
      },
      {
        id: 'files-upload',
        name: 'files.upload()',
        description: 'Upload new files to Google Drive',
        signature: 'drive.files.upload(fileData: TFileUploadData): Promise<TDriveFile>',
        parameters: [
          {
            name: 'fileData',
            type: 'TFileUploadData',
            description: 'File data including content, name, and metadata',
            required: true
          }
        ],
        returnType: 'Promise<TDriveFile>',
        examples: [
          {
            id: 'files-upload-example',
            title: 'Upload File to Drive',
            description: 'Upload a new file with metadata',
            code: `const fileContent = Buffer.from('Hello, World!')

const uploadedFile = await drive.files.upload({
  name: 'hello.txt',
  mimeType: 'text/plain',
  content: fileContent,
  parents: ['folder-id-123'],
  description: 'A simple text file'
})

console.log('File uploaded:', uploadedFile.name)
console.log('File ID:', uploadedFile.id)
console.log('File URL:', uploadedFile.webViewLink)`,
            language: 'typescript',
            category: 'drive',
            tags: ['files', 'upload']
          },
          {
            id: 'files-upload-image',
            title: 'Upload Image File',
            description: 'Upload an image file with proper MIME type',
            code: `import { createReadStream } from 'fs'

const imageStream = createReadStream('photo.jpg')
const imageBuffer = []

imageStream.on('data', function collectData(chunk) {
  imageBuffer.push(chunk)
})

imageStream.on('end', async function uploadImage() {
  const content = Buffer.concat(imageBuffer)
  
  const uploadedImage = await drive.files.upload({
    name: 'vacation-photo.jpg',
    mimeType: 'image/jpeg',
    content: content,
    parents: ['photos-folder-id']
  })
  
  console.log('Image uploaded:', uploadedImage.webViewLink)
})`,
            language: 'typescript',
            category: 'drive',
            tags: ['files', 'image', 'upload']
          }
        ]
      },
      {
        id: 'files-update',
        name: 'files.update()',
        description: 'Update file content or metadata',
        signature: 'drive.files.update(fileId: string, updateData: TFileUpdateData): Promise<TDriveFile>',
        parameters: [
          {
            name: 'fileId',
            type: 'string',
            description: 'ID of the file to update',
            required: true
          },
          {
            name: 'updateData',
            type: 'TFileUpdateData',
            description: 'Updated file data',
            required: true
          }
        ],
        returnType: 'Promise<TDriveFile>',
        examples: [
          {
            id: 'files-update-example',
            title: 'Update File Metadata',
            description: 'Update file name and description',
            code: `const updatedFile = await drive.files.update('file-id-123', {
  name: 'Updated Document Name.pdf',
  description: 'Updated description with more details',
  starred: true
})

console.log('File updated:', updatedFile.name)
console.log('Modified time:', updatedFile.modifiedTime)`,
            language: 'typescript',
            category: 'drive',
            tags: ['files', 'update']
          }
        ]
      },
      {
        id: 'files-delete',
        name: 'files.delete()',
        description: 'Delete a file from Google Drive',
        signature: 'drive.files.delete(fileId: string): Promise<void>',
        parameters: [
          {
            name: 'fileId',
            type: 'string',
            description: 'ID of the file to delete',
            required: true
          }
        ],
        returnType: 'Promise<void>',
        examples: [
          {
            id: 'files-delete-example',
            title: 'Delete File',
            description: 'Remove a file from Google Drive',
            code: `await drive.files.delete('file-id-123')

console.log('File deleted successfully')`,
            language: 'typescript',
            category: 'drive',
            tags: ['files', 'delete']
          }
        ]
      }
    ]
  },
  {
    id: 'drive-folders-operations',
    title: 'Folders Management',
    description: 'Methods for creating and managing Google Drive folders',
    methods: [
      {
        id: 'folders-create',
        name: 'folders.create()',
        description: 'Create a new folder in Google Drive',
        signature: 'drive.folders.create(folderData: TFolderCreateData): Promise<TDriveFile>',
        parameters: [
          {
            name: 'folderData',
            type: 'TFolderCreateData',
            description: 'Folder details including name and parent folder',
            required: true
          }
        ],
        returnType: 'Promise<TDriveFile>',
        examples: [
          {
            id: 'folders-create-example',
            title: 'Create New Folder',
            description: 'Create a project folder structure',
            code: `const projectFolder = await drive.folders.create({
  name: 'Project Alpha Documents',
  parents: ['root'],
  description: 'Main folder for Project Alpha documents'
})

const subFolders = await Promise.all([
  drive.folders.create({
    name: 'Contracts',
    parents: [projectFolder.id]
  }),
  drive.folders.create({
    name: 'Presentations',
    parents: [projectFolder.id]
  }),
  drive.folders.create({
    name: 'Resources',
    parents: [projectFolder.id]
  })
])

console.log('Created project folder:', projectFolder.name)
console.log('Created subfolders:', subFolders.length)`,
            language: 'typescript',
            category: 'drive',
            tags: ['folders', 'create']
          }
        ]
      },
      {
        id: 'folders-list-contents',
        name: 'folders.listContents()',
        description: 'List all files and folders within a specific folder',
        signature: 'drive.folders.listContents(folderId: string): Promise<TDriveFile[]>',
        parameters: [
          {
            name: 'folderId',
            type: 'string',
            description: 'ID of the folder to list contents from',
            required: true
          }
        ],
        returnType: 'Promise<TDriveFile[]>',
        examples: [
          {
            id: 'folders-list-contents-example',
            title: 'List Folder Contents',
            description: 'Get all files and folders in a directory',
            code: `const contents = await drive.folders.listContents('folder-id-123')

const files = contents.filter(function isFile(item) {
  return item.mimeType !== 'application/vnd.google-apps.folder'
})

const folders = contents.filter(function isFolder(item) {
  return item.mimeType === 'application/vnd.google-apps.folder'
})

console.log('Files:', files.length)
console.log('Subfolders:', folders.length)

folders.forEach(function displayFolder(folder) {
  console.log('Folder:', folder.name)
})`,
            language: 'typescript',
            category: 'drive',
            tags: ['folders', 'contents']
          }
        ]
      }
    ]
  },
  {
    id: 'drive-permissions',
    title: 'Permissions Management',
    description: 'Methods for managing file and folder sharing permissions',
    methods: [
      {
        id: 'permissions-create',
        name: 'permissions.create()',
        description: 'Grant permissions to users or make files public',
        signature: 'drive.permissions.create(fileId: string, permission: TPermissionData): Promise<TPermission>',
        parameters: [
          {
            name: 'fileId',
            type: 'string',
            description: 'ID of the file or folder to share',
            required: true
          },
          {
            name: 'permission',
            type: 'TPermissionData',
            description: 'Permission details including role and email',
            required: true
          }
        ],
        returnType: 'Promise<TPermission>',
        examples: [
          {
            id: 'permissions-create-example',
            title: 'Share File with User',
            description: 'Grant read or write access to specific users',
            code: `const editorPermission = await drive.permissions.create('file-id-123', {
  role: 'writer',
  type: 'user',
  emailAddress: 'colleague@company.com',
  sendNotificationEmail: true
})

const viewerPermission = await drive.permissions.create('file-id-123', {
  role: 'reader',
  type: 'user',
  emailAddress: 'stakeholder@company.com'
})

const publicPermission = await drive.permissions.create('file-id-123', {
  role: 'reader',
  type: 'anyone'
})

console.log('Editor access granted to:', editorPermission.emailAddress)
console.log('File is now public for reading')`,
            language: 'typescript',
            category: 'drive',
            tags: ['permissions', 'sharing']
          }
        ]
      },
      {
        id: 'permissions-list',
        name: 'permissions.list()',
        description: 'List all permissions for a file or folder',
        signature: 'drive.permissions.list(fileId: string): Promise<TPermission[]>',
        parameters: [
          {
            name: 'fileId',
            type: 'string',
            description: 'ID of the file or folder',
            required: true
          }
        ],
        returnType: 'Promise<TPermission[]>',
        examples: [
          {
            id: 'permissions-list-example',
            title: 'List File Permissions',
            description: 'Get all users and permissions for a file',
            code: `const permissions = await drive.permissions.list('file-id-123')

permissions.forEach(function displayPermission(permission) {
  console.log('User:', permission.emailAddress || permission.type)
  console.log('Role:', permission.role)
  console.log('Type:', permission.type)
})

const owners = permissions.filter(function findOwners(p) {
  return p.role === 'owner'
})

const editors = permissions.filter(function findEditors(p) {
  return p.role === 'writer'
})

console.log('Owners:', owners.length)
console.log('Editors:', editors.length)`,
            language: 'typescript',
            category: 'drive',
            tags: ['permissions', 'list']
          }
        ]
      }
    ]
  },
  {
    id: 'drive-oauth2',
    title: 'OAuth2 Authentication System',
    description: 'Complete OAuth2 flow implementation for Google Drive API access',
    methods: [
      {
        id: 'oauth2-flow',
        name: 'Google Drive OAuth2',
        description: 'Create and manage OAuth2 authentication flows for Drive access',
        signature: 'createGoogleDriveOAuth2Flow()',
        parameters: [],
        returnType: 'OAuth2Flow',
        examples: [
          {
            id: 'oauth2-flow-example',
            title: 'OAuth2 Flow Setup',
            description: 'Set up OAuth2 authentication for Google Drive access',
            code: `import { GoogleOAuth, createGoogleOAuth } from '@remcostoeten/fync/google/oauth'
import { GoogleDrive } from '@remcostoeten/fync/google-drive'

const oauth = createGoogleOAuth({
  clientId: 'your-google-client-id',
  clientSecret: 'your-google-client-secret',
  redirectUri: 'http://localhost:3000/api/auth/callback'
})

const authUrl = oauth.getAuthorizationUrl()
const tokens = await oauth.exchangeCodeForToken('auth-code-from-callback')

const drive = GoogleDrive({
  token: tokens.access_token
})`,
            language: 'typescript',
            category: 'drive',
            tags: ['oauth2', 'authentication']
          }
        ]
      }
    ]
  },
]