# Unified Publishing Guide

This repository includes a unified publishing script (`publish.sh`) that handles all aspects of releasing a new version of `@remcostoeten/fync`.

## What it does

The script will:
1. ✅ Check you're on the correct branch (`meester😩`)
2. 🔄 Handle uncommitted changes
3. 📦 Bump the version in `package.json`
4. 🏗️ Build the project
5. 🧪 Run tests
6. 📝 Commit the version bump
7. 🏷️ Create a git tag
8. 📤 Push to GitHub
9. 🚀 Publish to npm
10. 📋 Create a GitHub release

## Usage

### Method 1: Direct script execution

```bash
# Patch version (3.0.0 -> 3.0.1)
./publish.sh patch

# Minor version (3.0.0 -> 3.1.0)
./publish.sh minor

# Major version (3.0.0 -> 4.0.0)  
./publish.sh major

# With custom commit message
./publish.sh patch "feat: add new spotify endpoints"
```

### Method 2: Using npm scripts (from fync directory)

```bash
cd fync

# Patch version
npm run publish:patch

# Minor version
npm run publish:minor

# Major version
npm run publish:major
```

## Requirements

- **Node.js & npm**: For building and publishing
- **Git**: For version control and tagging
- **GitHub CLI (gh)**: For creating GitHub releases (optional)
  - Install with: `sudo apt install gh` or `brew install gh`
  - Authenticate with: `gh auth login`

## Current Status

- **Branch**: `meester😩`
- **Local version**: 3.0.0
- **Published version**: 3.0.2
- **Latest GitHub release**: v3.0.0

## First-time setup

Since your local version (3.0.0) is behind the published version (3.0.2), you should first sync:

```bash
# Update local version to match published version
cd fync
npm version 3.0.2 --no-git-tag-version
cd ..

# Commit and tag the current state
git add fync/package.json
git commit -m "chore: sync version with published npm package"
git tag -a "v3.0.2" -m "Release 3.0.2"
git push origin meester😩
git push origin v3.0.2
```

After that, use the publish script for future releases.

## Script Features

- 🎨 **Colored output** for better visibility
- 🔍 **Safety checks** for branch, uncommitted changes, etc.
- 📋 **Interactive prompts** for confirmation
- 🌐 **Automatic URL opening** for npm and GitHub (optional)
- 🔄 **Rollback support** if anything fails
- 📝 **Automatic release notes** generation

## Troubleshooting

### "GitHub CLI not found"
Install the GitHub CLI:
```bash
# Ubuntu/Debian
sudo apt install gh

# macOS
brew install gh

# Then authenticate
gh auth login
```

### "Permission denied"
Make sure the script is executable:
```bash
chmod +x publish.sh
```

### "Not on meester😩 branch"
The script will offer to switch branches automatically, or you can switch manually:
```bash
git checkout "meester😩"
```

## Example Output

```
🚀 Starting unified publish process...
ℹ️  Current directory: /home/remcostoeten/dev/fync/fync
ℹ️  Current version: 3.0.2
ℹ️  Bumping version (patch)...
✅ Version bumped to: 3.0.3
ℹ️  Building project...
✅ Build completed
ℹ️  Running tests...
✅ Committed version bump
✅ Created git tag: v3.0.3
ℹ️  Pushing to remote...
✅ Pushed to remote
ℹ️  Publishing to npm...
✅ Published to npm
ℹ️  Creating GitHub release...
✅ GitHub release created

🎉 Publish completed successfully!
📦 Package: @remcostoeten/fync@3.0.3
🏷️  Tag: v3.0.3
🌿 Branch: meester😩
📝 npm: https://www.npmjs.com/package/@remcostoeten/fync
🚀 GitHub: https://github.com/remcostoeten/fync/releases/tag/v3.0.3
```
