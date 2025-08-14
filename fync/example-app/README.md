# 🚀 Google Drive Integration Example App

An interactive example application demonstrating the full capabilities of the Fync Google Drive integration with a step-by-step setup wizard.

## Features

### 🎯 Interactive Setup Wizard
- **Guided Configuration**: Step-by-step guide through Google Cloud setup
- **Auto-Opening Links**: Automatically opens necessary Google Console pages
- **Validation**: Validates API credentials format
- **Environment Setup**: Automatically creates `.env` file with your credentials

### 📱 Main Application Features
- **OAuth2 Authentication**: Complete OAuth flow with callback handling
- **File Operations**: List, search, upload, download files
- **Folder Management**: Create folders and nested structures
- **Sharing**: Share files with anyone or specific users
- **Storage Info**: View Drive storage quota and usage
- **Trash Operations**: Move to trash, restore, empty trash
- **Advanced Demo**: Creates sample folder structure with files

## Installation

```bash
# Navigate to example app directory
cd example-app

# Install dependencies
npm install
# or
bun install
```

## Usage

### Option 1: Run the Setup Wizard (Recommended for first-time users)

```bash
npm start
# or
npm run setup
```

The wizard will:
1. ✅ Check if you have a Google account
2. 🔧 Guide you through creating a Google Cloud Project
3. 🔌 Help you enable the Google Drive API
4. 🔑 Walk you through creating OAuth2 credentials
5. 📝 Save your configuration to `.env`
6. 🎯 Optionally run the example app

### Option 2: Manual Setup

1. Create a `.env` file with your credentials:

```env
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/callback
GOOGLE_API_KEY=optional_api_key
PORT=3000
```

2. Run the example app:

```bash
npm run dev
```

## Interactive Menu Options

Once authenticated, you'll see an interactive menu with these options:

### 📁 List Files
- Shows your most recent files
- Displays file size and modification date
- Distinguishes between files and folders

### 🔍 Search Files
Multiple search options:
- Search by name
- Filter by file type (PDFs, Images, Documents, etc.)
- Find recent files (last 7 days)
- Show starred files
- Custom query support

### 📤 Upload File
- Create and upload text files
- Specify custom file names
- Automatic MIME type detection

### 📂 Create Folder
- Create new folders
- Support for nested folder structures

### 📥 Download File
- Download files by ID
- Shows file size after download

### 🔗 Share File
- Share with anyone via link
- Share with specific email addresses
- Send notification emails

### 📊 Storage Info
- View total storage quota
- See used space breakdown
- Check trash size

### 🗑️ Trash Operations
- Move files to trash
- Restore files from trash
- Empty trash (with confirmation)

### 🎯 Advanced Demo
Demonstrates advanced features:
- Creates nested folder structure: `Demo/Projects/2024`
- Uploads multiple files simultaneously
- Shows batch operations

## Architecture

```
example-app/
├── src/
│   ├── setup-wizard.js    # Interactive setup guide
│   └── index.js           # Main application
├── package.json
├── README.md
├── .env                   # Your credentials (created by wizard)
└── .env.example          # Template for credentials
```

## How It Works

1. **Setup Wizard** (`setup-wizard.js`):
   - Uses `inquirer` for interactive prompts
   - Opens browser tabs with `open` package
   - Validates input formats
   - Creates `.env` file automatically

2. **Main App** (`index.js`):
   - Express server for OAuth callbacks
   - Interactive CLI menu
   - Demonstrates all Drive API features
   - Automatic token refresh
   - Saves tokens to `.env` for persistence

## OAuth Flow

1. App generates authorization URL
2. Opens browser for user consent
3. User authorizes the app
4. Google redirects to `http://localhost:3000/callback`
5. App exchanges code for tokens
6. Tokens are saved to `.env`
7. App can now access Drive API

## Security Notes

- **Never commit `.env` to version control**
- Tokens are stored locally in `.env`
- Access tokens expire after 1 hour (auto-refreshed)
- Refresh tokens persist until revoked

## Troubleshooting

### "Cannot find module '@remcostoeten/fync'"
Make sure you've built the main library:
```bash
cd .. && npm run build && cd example-app
```

### "Invalid Client ID format"
Client IDs should end with `.apps.googleusercontent.com`

### "Invalid Client Secret format"
Client Secrets should start with `GOCSPX-`

### Port 3000 is already in use
Change the port in `.env`:
```env
PORT=3001
GOOGLE_REDIRECT_URI=http://localhost:3001/callback
```

### Authentication keeps failing
1. Check that redirect URI in Google Console matches exactly
2. Ensure Drive API is enabled
3. Verify you're a test user (if app is in testing mode)

## Learn More

- [Google Drive API Documentation](https://developers.google.com/drive/api/v3/about-sdk)
- [OAuth 2.0 for Web Apps](https://developers.google.com/identity/protocols/oauth2/web-server)
- [Fync Library Documentation](../README.md)

## License

MIT
