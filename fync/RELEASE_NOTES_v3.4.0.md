# Release v3.4.0 - Error System Modernization

## 🚀 Major Features & Improvements

### **Modernized Error Handling System**
- **Enhanced TErrorTransformer**: Now supports `null` returns for graceful error handling decline
- **Mandatory Service Categorization**: All errors now include a `service` field at root level for better logging and categorization
- **Functional Programming Compliance**: Converted all arrow function transformers to named function declarations

### **Comprehensive Error Coverage**
- ✅ **Core HTTP Errors**: Network, timeout, and status code handling
- ✅ **Spotify**: Token expiration, premium requirements, rate limits
- ✅ **GitHub**: Rate limits, repository access, insufficient scopes
- ✅ **NPM**: Package not found, registry unavailable
- ✅ **Google Calendar**: Quota exceeded, access denied

### **Bug Fixes**
- **Fixed Spotify Config**: Resolved `config.token` → `config.accessToken` property mismatch
- **TypeScript Compliance**: All 66 files now compile successfully with no errors
- **Conditional Authorization**: Headers only sent when access tokens are present

## 📋 Technical Changes

**Modified Files:**
- `src/core/errors/types.ts` - Enhanced type definitions
- `src/core/errors/transformers.ts` - Function style + service fields  
- `src/core/errors/service-transformers.ts` - Function style + service fields
- `src/core/errors/index.ts` - Fixed missing service property
- `src/core/errors/http-handler.ts` - Fixed missing service property
- `src/spotify/utils/http-with-errors.ts` - Fixed config property mismatch

## 🔄 Breaking Changes

⚠️ **BREAKING CHANGES:**
- `TErrorTransformer` now returns `TErrorInfo | null` instead of `TErrorInfo`
- `TErrorInfo` now requires mandatory `service` field at root level

## 📦 What's Included

- Full TypeScript support with enhanced error types
- Better error categorization and service tagging
- Consistent functional programming patterns
- Robust HTTP client with proper error handling
- Comprehensive API coverage for all supported services

## 🎯 Migration Guide

If you're using custom error transformers:

**Before:**
```ts
const myTransformer: TErrorTransformer = (error: unknown): TErrorInfo => {
  return { /* ... */ };
};
```

**After:**
```ts
const myTransformer: TErrorTransformer = (error: unknown): TErrorInfo | null => {
  if (!canHandle(error)) return null;
  return { 
    service: "your-service",
    /* ... other fields */
  };
};
```

---

**Full Changelog**: https://github.com/remcostoeten/fync/compare/v3.3.0...v3.4.0
