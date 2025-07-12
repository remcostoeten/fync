# GitHub Easy Fetcher MCP Server

This is a Model Context Protocol (MCP) server for the GitHub Easy Fetcher project.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Run the server:
   ```bash
   npm start
   ```

## Development

- Use `npm run dev` to watch for changes and rebuild automatically
- The server runs on stdio transport for MCP communication
- TypeScript is configured with strict settings and ES modules

## Requirements

- Node.js ≥ 18.0.0
- TypeScript 5.0+

## Project Structure

```
gheasy-mcp/
├── src/           # TypeScript source files
├── dist/          # Compiled JavaScript output
├── package.json   # Project configuration
├── tsconfig.json  # TypeScript configuration
└── README.md      # This file
```
