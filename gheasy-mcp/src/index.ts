#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new Server(
  {
    name: 'gheasy-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('GitHub Easy Fetcher MCP server running on stdio');
}

main().catch(console.error);
