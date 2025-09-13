#!/bin/bash

# Unified publish script for @remcostoeten/fync
# Usage: ./publish.sh [patch|minor|major] [commit-message]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
VERSION_TYPE=${1:-patch}
COMMIT_MSG=${2:-"chore: release new version"}
BRANCH="master"

echo -e "${BLUE}🚀 Starting unified publish process...${NC}"

# Function to print colored output
print_step() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "fync/package.json" ]; then
    print_error "Error: fync/package.json not found. Are you in the project root?"
    exit 1
fi

# Check if we're on the correct branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "$BRANCH" ]; then
    print_warning "Not on $BRANCH branch. Current branch: $CURRENT_BRANCH"
    read -p "Do you want to switch to $BRANCH? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git checkout "$BRANCH"
        print_step "Switched to $BRANCH branch"
    else
        print_error "Aborted. Please switch to $BRANCH branch manually."
        exit 1
    fi
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    print_warning "You have uncommitted changes."
    git status --short
    read -p "Do you want to commit these changes? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add -A
        git commit -m "$COMMIT_MSG"
        print_step "Committed changes"
    else
        print_error "Please commit or stash your changes first."
        exit 1
    fi
fi

# Navigate to fync directory
cd fync

print_info "Current directory: $(pwd)"

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
print_info "Current version: $CURRENT_VERSION"

# Bump version
print_info "Bumping version ($VERSION_TYPE)..."
npm version $VERSION_TYPE --no-git-tag-version

# Get new version
NEW_VERSION=$(node -p "require('./package.json').version")
print_step "Version bumped to: $NEW_VERSION"

# Build the project
print_info "Building project..."
npm run build
print_step "Build completed"

# Run tests (optional, will continue even if tests fail)
print_info "Running tests..."
npm run test:run || print_warning "Tests failed but continuing..."

# Go back to root for git operations
cd ..

# Commit the version bump
git add fync/package.json
git commit -m "chore: bump version to $NEW_VERSION"
print_step "Committed version bump"

# Create git tag
TAG_NAME="v$NEW_VERSION"
git tag -a "$TAG_NAME" -m "Release $NEW_VERSION"
print_step "Created git tag: $TAG_NAME"

# Push to remote
print_info "Pushing to remote..."
git push origin "$BRANCH"
git push origin "$TAG_NAME"
print_step "Pushed to remote"

# Go back to fync directory for npm publish
cd fync

# Publish to npm
print_info "Publishing to npm..."
npm publish --access public
print_step "Published to npm"

# Go back to root for GitHub release
cd ..

# Create GitHub release (requires gh CLI)
if command -v gh &> /dev/null; then
    print_info "Creating GitHub release..."
    
    # Generate release notes
    RELEASE_NOTES="## What's Changed

$(git log --oneline $(git describe --tags --abbrev=0 HEAD~1)..HEAD --pretty=format:"- %s" | head -10)

**Full Changelog**: https://github.com/remcostoeten/fync/compare/$(git describe --tags --abbrev=0 HEAD~1)...$TAG_NAME"

    gh release create "$TAG_NAME" \
        --title "Release $NEW_VERSION" \
        --notes "$RELEASE_NOTES" \
        --draft=false \
        --prerelease=false
    
    print_step "GitHub release created"
else
    print_warning "GitHub CLI (gh) not found. Please create the GitHub release manually."
    print_info "Tag: $TAG_NAME"
    print_info "Title: Release $NEW_VERSION"
fi

# Final summary
echo -e "\n${GREEN}🎉 Publish completed successfully!${NC}"
echo -e "${BLUE}📦 Package: @remcostoeten/fync@$NEW_VERSION${NC}"
echo -e "${BLUE}🏷️  Tag: $TAG_NAME${NC}"
echo -e "${BLUE}🌿 Branch: $BRANCH${NC}"
echo -e "${BLUE}📝 npm: https://www.npmjs.com/package/@remcostoeten/fync${NC}"
echo -e "${BLUE}🚀 GitHub: https://github.com/remcostoeten/fync/releases/tag/$TAG_NAME${NC}"

# Optional: Open URLs
read -p "Open npm and GitHub release pages? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if command -v xdg-open &> /dev/null; then
        xdg-open "https://www.npmjs.com/package/@remcostoeten/fync"
        xdg-open "https://github.com/remcostoeten/fync/releases/tag/$TAG_NAME"
    else
        print_info "Please open these URLs manually:"
        echo "npm: https://www.npmjs.com/package/@remcostoeten/fync"
        echo "GitHub: https://github.com/remcostoeten/fync/releases/tag/$TAG_NAME"
    fi
fi

print_step "All done! 🎉"
