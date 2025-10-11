import type { TApiSection } from '@/types/content'

export const notionContent: TApiSection[] = [
  {
    id: 'core-exports',
    title: 'Core Exports',
    description: 'Main entry points and core functionality for Notion API integration',
    methods: [
      {
        id: 'main-entry-points',
        name: 'Main Entry Points',
        description: 'Primary package exports for Notion API client and utilities',
        signature: 'import { ... } from "@remcostoeten/fync"',
        parameters: [],
        returnType: 'Notion client factories and utilities',
        examples: [
          {
            id: 'core-imports',
            title: 'Core Package Imports',
            description: 'Import Notion parts of the Fync library',
            code: `import { Notion } from '@remcostoeten/fync/notion'`,
            language: 'typescript',
            category: 'notion',
            tags: ['imports', 'setup']
          }
        ]
      }
    ]
  },
  {
    id: 'notion-client',
    title: 'Notion API Client',
    description: 'Comprehensive Notion API client for workspace, database, and page management',
    methods: [
      {
        id: 'notion-main-client',
        name: 'Notion()',
        description: 'Main Notion client factory with API token authentication',
        signature: 'Notion(config?: TNotionClientConfig): NotionClient',
        parameters: [
          {
            name: 'config',
            type: 'TNotionClientConfig',
            description: 'Configuration including API token and version settings',
            required: false
          }
        ],
        returnType: 'NotionClient',
        examples: [
          {
            id: 'notion-client-init',
            title: 'Initialize Notion Client',
            description: 'Create a Notion client with API token authentication',
            code: `import { Notion } from '@remcostoeten/fync/notion'

const notion = Notion({
  token: 'your-notion-integration-token',
  version: '2022-06-28'
})

const databases = notion.databases
const pages = notion.pages
const blocks = notion.blocks`,
            language: 'typescript',
            category: 'notion',
            tags: ['initialization', 'authentication']
          }
        ]
      },
      {
        id: 'notion-client-methods',
        name: 'Client Methods',
        description: 'Available methods on the main Notion client',
        signature: 'notion.databases | notion.pages | notion.blocks | notion.users | notion.search',
        parameters: [],
        returnType: 'Various specialized clients',
        examples: [
          {
            id: 'notion-client-methods-example',
            title: 'Notion Client Methods',
            description: 'Access different Notion API endpoints through specialized clients',
            code: `const notion = Notion({ token: 'your-token' })

const databasesClient = notion.databases
const pagesClient = notion.pages
const blocksClient = notion.blocks
const usersClient = notion.users
const searchClient = notion.search
const commentsClient = notion.comments`,
            language: 'typescript',
            category: 'notion',
            tags: ['client', 'methods']
          }
        ]
      }
    ]
  },
  {
    id: 'notion-databases-operations',
    title: 'Databases Management',
    description: 'Methods for managing Notion databases and their structure',
    methods: [
      {
        id: 'databases-list',
        name: 'databases.list()',
        description: 'List all databases accessible to the integration',
        signature: 'notion.databases.list(options?: TDatabaseListOptions): Promise<TNotionDatabase[]>',
        parameters: [
          {
            name: 'options',
            type: 'TDatabaseListOptions',
            description: 'Optional pagination and filtering options',
            required: false
          }
        ],
        returnType: 'Promise<TNotionDatabase[]>',
        examples: [
          {
            id: 'databases-list-example',
            title: 'List Accessible Databases',
            description: 'Get all databases the integration can access',
            code: `const databases = await notion.databases.list()

databases.forEach(function displayDatabase(database) {
  console.log('Database:', database.title[0]?.plain_text)
  console.log('ID:', database.id)
  console.log('Created:', new Date(database.created_time))
  console.log('Properties:', Object.keys(database.properties).length)
})

const recentDatabases = databases.filter(function isRecent(db) {
  return new Date(db.created_time) > new Date('2024-01-01')
})

console.log('Recent databases:', recentDatabases.length)`,
            language: 'typescript',
            category: 'notion',
            tags: ['databases', 'list']
          }
        ]
      },
      {
        id: 'databases-get',
        name: 'databases.get()',
        description: 'Get detailed information about a specific database',
        signature: 'notion.databases.get(databaseId: string): Promise<TNotionDatabase>',
        parameters: [
          {
            name: 'databaseId',
            type: 'string',
            description: 'ID of the database to retrieve',
            required: true
          }
        ],
        returnType: 'Promise<TNotionDatabase>',
        examples: [
          {
            id: 'databases-get-example',
            title: 'Get Database Schema',
            description: 'Retrieve database structure and properties',
            code: `const database = await notion.databases.get('database-id-123')

console.log('Database title:', database.title[0]?.plain_text)
console.log('Description:', database.description[0]?.plain_text)

Object.entries(database.properties).forEach(function displayProperty([name, property]) {
  console.log('Property:', name)
  console.log('Type:', property.type)
  
  if (property.type === 'select') {
    console.log('Options:', property.select.options.map(function getLabel(opt) {
      return opt.name
    }))
  }
})`,
            language: 'typescript',
            category: 'notion',
            tags: ['databases', 'schema']
          }
        ]
      },
      {
        id: 'databases-create',
        name: 'databases.create()',
        description: 'Create a new database with properties and schema',
        signature: 'notion.databases.create(databaseData: TDatabaseCreateData): Promise<TNotionDatabase>',
        parameters: [
          {
            name: 'databaseData',
            type: 'TDatabaseCreateData',
            description: 'Database configuration including title, properties, and parent page',
            required: true
          }
        ],
        returnType: 'Promise<TNotionDatabase>',
        examples: [
          {
            id: 'databases-create-example',
            title: 'Create New Database',
            description: 'Set up a project tracking database',
            code: `const database = await notion.databases.create({
  parent: {
    type: 'page_id',
    page_id: 'parent-page-id'
  },
  title: [
    {
      type: 'text',
      text: { content: 'Project Tracker' }
    }
  ],
  properties: {
    'Name': {
      title: {}
    },
    'Status': {
      select: {
        options: [
          { name: 'Not Started', color: 'red' },
          { name: 'In Progress', color: 'yellow' },
          { name: 'Complete', color: 'green' }
        ]
      }
    },
    'Priority': {
      select: {
        options: [
          { name: 'High', color: 'red' },
          { name: 'Medium', color: 'yellow' },
          { name: 'Low', color: 'gray' }
        ]
      }
    },
    'Due Date': {
      date: {}
    },
    'Assignee': {
      people: {}
    }
  }
})

console.log('Database created:', database.title[0]?.plain_text)
console.log('Database ID:', database.id)`,
            language: 'typescript',
            category: 'notion',
            tags: ['databases', 'create']
          }
        ]
      },
      {
        id: 'databases-query',
        name: 'databases.query()',
        description: 'Query database entries with filtering and sorting',
        signature: 'notion.databases.query(databaseId: string, query?: TDatabaseQuery): Promise<TNotionPage[]>',
        parameters: [
          {
            name: 'databaseId',
            type: 'string',
            description: 'ID of the database to query',
            required: true
          },
          {
            name: 'query',
            type: 'TDatabaseQuery',
            description: 'Optional query parameters for filtering and sorting',
            required: false
          }
        ],
        returnType: 'Promise<TNotionPage[]>',
        examples: [
          {
            id: 'databases-query-example',
            title: 'Query Database Entries',
            description: 'Filter and sort database pages',
            code: `const pages = await notion.databases.query('database-id-123', {
  filter: {
    and: [
      {
        property: 'Status',
        select: {
          equals: 'In Progress'
        }
      },
      {
        property: 'Priority',
        select: {
          equals: 'High'
        }
      }
    ]
  },
  sorts: [
    {
      property: 'Due Date',
      direction: 'ascending'
    }
  ]
})

const highPriorityTasks = pages.filter(function isHighPriority(page) {
  const priority = page.properties.Priority?.select?.name
  return priority === 'High'
})

console.log('High priority in-progress tasks:', highPriorityTasks.length)

pages.forEach(function displayTask(page) {
  console.log('Task:', page.properties.Name?.title[0]?.plain_text)
  console.log('Due:', page.properties['Due Date']?.date?.start)
})`,
            language: 'typescript',
            category: 'notion',
            tags: ['databases', 'query']
          }
        ]
      }
    ]
  },
  {
    id: 'notion-pages-operations',
    title: 'Pages Management',
    description: 'Methods for creating, updating, and managing Notion pages',
    methods: [
      {
        id: 'pages-get',
        name: 'pages.get()',
        description: 'Get page properties and metadata',
        signature: 'notion.pages.get(pageId: string): Promise<TNotionPage>',
        parameters: [
          {
            name: 'pageId',
            type: 'string',
            description: 'ID of the page to retrieve',
            required: true
          }
        ],
        returnType: 'Promise<TNotionPage>',
        examples: [
          {
            id: 'pages-get-example',
            title: 'Get Page Information',
            description: 'Retrieve page properties and metadata',
            code: `const page = await notion.pages.get('page-id-123')

console.log('Page ID:', page.id)
console.log('Created:', new Date(page.created_time))
console.log('Last edited:', new Date(page.last_edited_time))

Object.entries(page.properties).forEach(function displayProperty([name, property]) {
  console.log('Property:', name)
  
  switch (property.type) {
    case 'title':
      console.log('Title:', property.title[0]?.plain_text)
      break
    case 'rich_text':
      console.log('Text:', property.rich_text[0]?.plain_text)
      break
    case 'select':
      console.log('Select:', property.select?.name)
      break
    case 'date':
      console.log('Date:', property.date?.start)
      break
  }
})`,
            language: 'typescript',
            category: 'notion',
            tags: ['pages', 'properties']
          }
        ]
      },
      {
        id: 'pages-create',
        name: 'pages.create()',
        description: 'Create a new page with content and properties',
        signature: 'notion.pages.create(pageData: TPageCreateData): Promise<TNotionPage>',
        parameters: [
          {
            name: 'pageData',
            type: 'TPageCreateData',
            description: 'Page configuration including parent, properties, and content',
            required: true
          }
        ],
        returnType: 'Promise<TNotionPage>',
        examples: [
          {
            id: 'pages-create-example',
            title: 'Create New Page',
            description: 'Add a new entry to a database',
            code: `const page = await notion.pages.create({
  parent: {
    type: 'database_id',
    database_id: 'database-id-123'
  },
  properties: {
    'Name': {
      title: [
        {
          type: 'text',
          text: { content: 'New Project Task' }
        }
      ]
    },
    'Status': {
      select: { name: 'Not Started' }
    },
    'Priority': {
      select: { name: 'High' }
    },
    'Due Date': {
      date: { start: '2024-12-31' }
    },
    'Description': {
      rich_text: [
        {
          type: 'text',
          text: { content: 'This is a high priority task that needs to be completed by year end.' }
        }
      ]
    }
  },
  children: [
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: { content: 'Task details and requirements will be added here.' }
          }
        ]
      }
    }
  ]
})

console.log('Page created:', page.id)`,
            language: 'typescript',
            category: 'notion',
            tags: ['pages', 'create']
          }
        ]
      },
      {
        id: 'pages-update',
        name: 'pages.update()',
        description: 'Update page properties and metadata',
        signature: 'notion.pages.update(pageId: string, updates: TPageUpdateData): Promise<TNotionPage>',
        parameters: [
          {
            name: 'pageId',
            type: 'string',
            description: 'ID of the page to update',
            required: true
          },
          {
            name: 'updates',
            type: 'TPageUpdateData',
            description: 'Updated page properties',
            required: true
          }
        ],
        returnType: 'Promise<TNotionPage>',
        examples: [
          {
            id: 'pages-update-example',
            title: 'Update Page Properties',
            description: 'Modify page properties and status',
            code: `const updatedPage = await notion.pages.update('page-id-123', {
  properties: {
    'Status': {
      select: { name: 'In Progress' }
    },
    'Progress': {
      number: 25
    },
    'Notes': {
      rich_text: [
        {
          type: 'text',
          text: { content: 'Started working on this task. Making good progress.' }
        }
      ]
    }
  }
})

console.log('Page updated:', updatedPage.id)
console.log('Status:', updatedPage.properties.Status?.select?.name)`,
            language: 'typescript',
            category: 'notion',
            tags: ['pages', 'update']
          }
        ]
      }
    ]
  },
  {
    id: 'notion-blocks-operations',
    title: 'Blocks Management',
    description: 'Methods for managing page content blocks and rich formatting',
    methods: [
      {
        id: 'blocks-get-children',
        name: 'blocks.getChildren()',
        description: 'Get child blocks of a page or block',
        signature: 'notion.blocks.getChildren(blockId: string, options?: TBlockListOptions): Promise<TNotionBlock[]>',
        parameters: [
          {
            name: 'blockId',
            type: 'string',
            description: 'ID of the parent block or page',
            required: true
          },
          {
            name: 'options',
            type: 'TBlockListOptions',
            description: 'Optional pagination options',
            required: false
          }
        ],
        returnType: 'Promise<TNotionBlock[]>',
        examples: [
          {
            id: 'blocks-get-children-example',
            title: 'Get Page Content',
            description: 'Retrieve all blocks from a page',
            code: `const blocks = await notion.blocks.getChildren('page-id-123')

blocks.forEach(function displayBlock(block) {
  console.log('Block type:', block.type)
  
  switch (block.type) {
    case 'paragraph':
      console.log('Text:', block.paragraph.rich_text[0]?.plain_text)
      break
    case 'heading_1':
      console.log('Heading 1:', block.heading_1.rich_text[0]?.plain_text)
      break
    case 'heading_2':
      console.log('Heading 2:', block.heading_2.rich_text[0]?.plain_text)
      break
    case 'bulleted_list_item':
      console.log('Bullet:', block.bulleted_list_item.rich_text[0]?.plain_text)
      break
    case 'code':
      console.log('Code:', block.code.rich_text[0]?.plain_text)
      console.log('Language:', block.code.language)
      break
  }
})`,
            language: 'typescript',
            category: 'notion',
            tags: ['blocks', 'content']
          }
        ]
      },
      {
        id: 'blocks-append',
        name: 'blocks.append()',
        description: 'Add new blocks to a page or parent block',
        signature: 'notion.blocks.append(parentId: string, blocks: TNotionBlockInput[]): Promise<TNotionBlock[]>',
        parameters: [
          {
            name: 'parentId',
            type: 'string',
            description: 'ID of the parent page or block',
            required: true
          },
          {
            name: 'blocks',
            type: 'TNotionBlockInput[]',
            description: 'Array of blocks to append',
            required: true
          }
        ],
        returnType: 'Promise<TNotionBlock[]>',
        examples: [
          {
            id: 'blocks-append-example',
            title: 'Add Content Blocks',
            description: 'Append various types of content to a page',
            code: `const blocks = await notion.blocks.append('page-id-123', [
  {
    object: 'block',
    type: 'heading_1',
    heading_1: {
      rich_text: [
        {
          type: 'text',
          text: { content: 'Project Overview' }
        }
      ]
    }
  },
  {
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: [
        {
          type: 'text',
          text: { content: 'This project aims to improve our API documentation.' }
        }
      ]
    }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: [
        {
          type: 'text',
          text: { content: 'Research existing documentation' }
        }
      ]
    }
  },
  {
    object: 'block',
    type: 'code',
    code: {
      language: 'typescript',
      rich_text: [
        {
          type: 'text',
          text: { content: 'const api = new APIClient()' }
        }
      ]
    }
  }
])

console.log('Added blocks:', blocks.length)`,
            language: 'typescript',
            category: 'notion',
            tags: ['blocks', 'append']
          }
        ]
      },
      {
        id: 'blocks-update',
        name: 'blocks.update()',
        description: 'Update an existing block content',
        signature: 'notion.blocks.update(blockId: string, updates: TBlockUpdateData): Promise<TNotionBlock>',
        parameters: [
          {
            name: 'blockId',
            type: 'string',
            description: 'ID of the block to update',
            required: true
          },
          {
            name: 'updates',
            type: 'TBlockUpdateData',
            description: 'Updated block content',
            required: true
          }
        ],
        returnType: 'Promise<TNotionBlock>',
        examples: [
          {
            id: 'blocks-update-example',
            title: 'Update Block Content',
            description: 'Modify existing block text and formatting',
            code: `const updatedBlock = await notion.blocks.update('block-id-123', {
  paragraph: {
    rich_text: [
      {
        type: 'text',
        text: { content: 'Updated paragraph content with ' },
        annotations: { bold: false }
      },
      {
        type: 'text',
        text: { content: 'bold text' },
        annotations: { bold: true }
      },
      {
        type: 'text',
        text: { content: ' and ' },
        annotations: { bold: false }
      },
      {
        type: 'text',
        text: { content: 'italic text' },
        annotations: { italic: true }
      }
    ]
  }
})

console.log('Block updated:', updatedBlock.id)`,
            language: 'typescript',
            category: 'notion',
            tags: ['blocks', 'update']
          }
        ]
      }
    ]
  },
  {
    id: 'notion-search-operations',
    title: 'Search and Discovery',
    description: 'Methods for searching across Notion workspace content',
    methods: [
      {
        id: 'search-all',
        name: 'search.all()',
        description: 'Search across all accessible pages and databases',
        signature: 'notion.search.all(query?: TSearchQuery): Promise<TSearchResult[]>',
        parameters: [
          {
            name: 'query',
            type: 'TSearchQuery',
            description: 'Optional search parameters including text and filters',
            required: false
          }
        ],
        returnType: 'Promise<TSearchResult[]>',
        examples: [
          {
            id: 'search-all-example',
            title: 'Search Workspace Content',
            description: 'Find pages and databases by text and properties',
            code: `const results = await notion.search.all({
  query: 'project management',
  filter: {
    value: 'page',
    property: 'object'
  },
  sort: {
    direction: 'descending',
    timestamp: 'last_edited_time'
  }
})

const pages = results.filter(function isPage(result) {
  return result.object === 'page'
})

const databases = results.filter(function isDatabase(result) {
  return result.object === 'database'
})

console.log('Found pages:', pages.length)
console.log('Found databases:', databases.length)

results.forEach(function displayResult(result) {
  if (result.object === 'page') {
    console.log('Page:', result.properties?.Name?.title[0]?.plain_text)
  } else if (result.object === 'database') {
    console.log('Database:', result.title[0]?.plain_text)
  }
})`,
            language: 'typescript',
            category: 'notion',
            tags: ['search', 'workspace']
          }
        ]
      }
    ]
  }
]