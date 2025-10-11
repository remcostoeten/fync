import type { TApiSection } from '@/types/content'

export const discordContent: TApiSection[] = [
  {
    id: 'core-exports',
    title: 'Core Exports',
    description: 'Main entry points and core functionality for Discord API integration',
    methods: [
      {
        id: 'main-entry-points',
        name: 'Main Entry Points',
        description: 'Primary package exports for Discord API client and utilities',
        signature: 'import { ... } from "@remcostoeten/fync"',
        parameters: [],
        returnType: 'Discord client factories and utilities',
        examples: [
          {
            id: 'core-imports',
            title: 'Core Package Imports',
            description: 'Import Discord parts of the Fync library',
            code: `import { Discord } from '@remcostoeten/fync/discord'`,
            language: 'typescript',
            category: 'discord',
            tags: ['imports', 'setup']
          }
        ]
      }
    ]
  },
  {
    id: 'discord-client',
    title: 'Discord API Client',
    description: 'Comprehensive Discord API client for REST operations and bot interactions',
    methods: [
      {
        id: 'discord-main-client',
        name: 'Discord()',
        description: 'Main Discord client factory with bot token authentication',
        signature: 'Discord(config?: TDiscordClientConfig): DiscordClient',
        parameters: [
          {
            name: 'config',
            type: 'TDiscordClientConfig',
            description: 'Configuration including bot token and application settings',
            required: false
          }
        ],
        returnType: 'DiscordClient',
        examples: [
          {
            id: 'discord-client-init',
            title: 'Initialize Discord Client',
            description: 'Create a Discord client with bot token authentication',
            code: `import { Discord } from '@remcostoeten/fync/discord'

const discord = Discord({
  token: 'your-bot-token',
  intents: ['GUILDS', 'GUILD_MESSAGES', 'MESSAGE_CONTENT'],
  applicationId: 'your-application-id'
})

const guilds = discord.guilds
const channels = discord.channels
const users = discord.users`,
            language: 'typescript',
            category: 'discord',
            tags: ['initialization', 'authentication']
          }
        ]
      },
      {
        id: 'discord-client-methods',
        name: 'Client Methods',
        description: 'Available methods on the main Discord client',
        signature: 'discord.guilds | discord.channels | discord.users | discord.messages | discord.webhooks',
        parameters: [],
        returnType: 'Various specialized clients',
        examples: [
          {
            id: 'discord-client-methods-example',
            title: 'Discord Client Methods',
            description: 'Access different Discord API endpoints through specialized clients',
            code: `const discord = Discord({ token: 'your-bot-token' })

const guildsClient = discord.guilds
const channelsClient = discord.channels
const usersClient = discord.users
const messagesClient = discord.messages
const webhooksClient = discord.webhooks
const applicationClient = discord.application`,
            language: 'typescript',
            category: 'discord',
            tags: ['client', 'methods']
          }
        ]
      }
    ]
  },
  {
    id: 'discord-guilds-operations',
    title: 'Guilds (Servers) Management',
    description: 'Methods for managing Discord guilds, members, and server settings',
    methods: [
      {
        id: 'guilds-list',
        name: 'guilds.list()',
        description: 'List all guilds the bot is a member of',
        signature: 'discord.guilds.list(): Promise<TDiscordGuild[]>',
        parameters: [],
        returnType: 'Promise<TDiscordGuild[]>',
        examples: [
          {
            id: 'guilds-list-example',
            title: 'List Bot Guilds',
            description: 'Get all guilds the bot has access to',
            code: `const guilds = await discord.guilds.list()

guilds.forEach(function displayGuild(guild) {
  console.log('Guild:', guild.name)
  console.log('ID:', guild.id)
  console.log('Members:', guild.memberCount)
  console.log('Owner:', guild.ownerId)
})

const largeGuilds = guilds.filter(function isLarge(guild) {
  return guild.memberCount > 100
})

console.log('Large guilds:', largeGuilds.length)`,
            language: 'typescript',
            category: 'discord',
            tags: ['guilds', 'list']
          }
        ]
      },
      {
        id: 'guilds-get',
        name: 'guilds.get()',
        description: 'Get detailed information about a specific guild',
        signature: 'discord.guilds.get(guildId: string): Promise<TDiscordGuild>',
        parameters: [
          {
            name: 'guildId',
            type: 'string',
            description: 'ID of the guild to retrieve',
            required: true
          }
        ],
        returnType: 'Promise<TDiscordGuild>',
        examples: [
          {
            id: 'guilds-get-example',
            title: 'Get Guild Details',
            description: 'Retrieve comprehensive guild information',
            code: `const guild = await discord.guilds.get('123456789012345678')

console.log('Guild name:', guild.name)
console.log('Description:', guild.description)
console.log('Member count:', guild.memberCount)
console.log('Created:', new Date(guild.createdTimestamp))
console.log('Features:', guild.features)

if (guild.iconURL) {
  console.log('Icon URL:', guild.iconURL)
}`,
            language: 'typescript',
            category: 'discord',
            tags: ['guilds', 'details']
          }
        ]
      },
      {
        id: 'guilds-members',
        name: 'guilds.getMembers()',
        description: 'Get members of a guild with optional filtering',
        signature: 'discord.guilds.getMembers(guildId: string, options?: TMemberListOptions): Promise<TDiscordMember[]>',
        parameters: [
          {
            name: 'guildId',
            type: 'string',
            description: 'ID of the guild',
            required: true
          },
          {
            name: 'options',
            type: 'TMemberListOptions',
            description: 'Optional filtering and pagination options',
            required: false
          }
        ],
        returnType: 'Promise<TDiscordMember[]>',
        examples: [
          {
            id: 'guilds-members-example',
            title: 'Get Guild Members',
            description: 'Retrieve and analyze guild membership',
            code: `const members = await discord.guilds.getMembers('123456789012345678', {
  limit: 100
})

const bots = members.filter(function isBot(member) {
  return member.user.bot === true
})

const admins = members.filter(function hasAdminRole(member) {
  return member.roles.some(function isAdmin(roleId) {
    return guild.roles[roleId]?.permissions.includes('ADMINISTRATOR')
  })
})

console.log('Total members:', members.length)
console.log('Bots:', bots.length)
console.log('Admins:', admins.length)`,
            language: 'typescript',
            category: 'discord',
            tags: ['guilds', 'members']
          }
        ]
      },
      {
        id: 'guilds-roles',
        name: 'guilds.getRoles()',
        description: 'Get all roles in a guild',
        signature: 'discord.guilds.getRoles(guildId: string): Promise<TDiscordRole[]>',
        parameters: [
          {
            name: 'guildId',
            type: 'string',
            description: 'ID of the guild',
            required: true
          }
        ],
        returnType: 'Promise<TDiscordRole[]>',
        examples: [
          {
            id: 'guilds-roles-example',
            title: 'Manage Guild Roles',
            description: 'Work with guild roles and permissions',
            code: `const roles = await discord.guilds.getRoles('123456789012345678')

const adminRoles = roles.filter(function hasAdmin(role) {
  return role.permissions.includes('ADMINISTRATOR')
})

const coloredRoles = roles.filter(function hasColor(role) {
  return role.color !== 0
})

roles.forEach(function displayRole(role) {
  console.log('Role:', role.name)
  console.log('Color:', role.color.toString(16))
  console.log('Position:', role.position)
  console.log('Members:', role.memberCount)
})

console.log('Admin roles:', adminRoles.length)
console.log('Colored roles:', coloredRoles.length)`,
            language: 'typescript',
            category: 'discord',
            tags: ['guilds', 'roles']
          }
        ]
      }
    ]
  },
  {
    id: 'discord-channels-operations',
    title: 'Channels Management',
    description: 'Methods for managing Discord channels and their content',
    methods: [
      {
        id: 'channels-get',
        name: 'channels.get()',
        description: 'Get information about a specific channel',
        signature: 'discord.channels.get(channelId: string): Promise<TDiscordChannel>',
        parameters: [
          {
            name: 'channelId',
            type: 'string',
            description: 'ID of the channel to retrieve',
            required: true
          }
        ],
        returnType: 'Promise<TDiscordChannel>',
        examples: [
          {
            id: 'channels-get-example',
            title: 'Get Channel Information',
            description: 'Retrieve channel details and settings',
            code: `const channel = await discord.channels.get('123456789012345678')

console.log('Channel name:', channel.name)
console.log('Type:', channel.type)
console.log('Topic:', channel.topic)
console.log('NSFW:', channel.nsfw)

if (channel.type === 'GUILD_TEXT') {
  console.log('Slowmode:', channel.rateLimitPerUser, 'seconds')
  console.log('Last message:', channel.lastMessageId)
}`,
            language: 'typescript',
            category: 'discord',
            tags: ['channels', 'details']
          }
        ]
      },
      {
        id: 'channels-create',
        name: 'channels.create()',
        description: 'Create a new channel in a guild',
        signature: 'discord.channels.create(guildId: string, channelData: TChannelCreateData): Promise<TDiscordChannel>',
        parameters: [
          {
            name: 'guildId',
            type: 'string',
            description: 'ID of the guild to create the channel in',
            required: true
          },
          {
            name: 'channelData',
            type: 'TChannelCreateData',
            description: 'Channel configuration including name, type, and permissions',
            required: true
          }
        ],
        returnType: 'Promise<TDiscordChannel>',
        examples: [
          {
            id: 'channels-create-example',
            title: 'Create Guild Channel',
            description: 'Create different types of channels with permissions',
            code: `const textChannel = await discord.channels.create('123456789012345678', {
  name: 'general-chat',
  type: 'GUILD_TEXT',
  topic: 'General discussion for all members',
  nsfw: false,
  rateLimitPerUser: 0,
  permissionOverwrites: [
    {
      id: '123456789012345678',
      type: 'role',
      allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
      deny: ['MANAGE_MESSAGES']
    }
  ]
})

const voiceChannel = await discord.channels.create('123456789012345678', {
  name: 'General Voice',
  type: 'GUILD_VOICE',
  userLimit: 10,
  bitrate: 64000
})

console.log('Text channel created:', textChannel.name)
console.log('Voice channel created:', voiceChannel.name)`,
            language: 'typescript',
            category: 'discord',
            tags: ['channels', 'create']
          }
        ]
      },
      {
        id: 'channels-messages',
        name: 'channels.getMessages()',
        description: 'Retrieve messages from a text channel',
        signature: 'discord.channels.getMessages(channelId: string, options?: TMessageFetchOptions): Promise<TDiscordMessage[]>',
        parameters: [
          {
            name: 'channelId',
            type: 'string',
            description: 'ID of the text channel',
            required: true
          },
          {
            name: 'options',
            type: 'TMessageFetchOptions',
            description: 'Options for filtering and pagination',
            required: false
          }
        ],
        returnType: 'Promise<TDiscordMessage[]>',
        examples: [
          {
            id: 'channels-messages-example',
            title: 'Fetch Channel Messages',
            description: 'Retrieve and analyze channel messages',
            code: `const messages = await discord.channels.getMessages('123456789012345678', {
  limit: 50,
  before: '987654321098765432'
})

const userMessages = messages.filter(function isFromUser(message) {
  return !message.author.bot
})

const botMessages = messages.filter(function isFromBot(message) {
  return message.author.bot === true
})

const recentMessages = messages.filter(function isRecent(message) {
  return Date.now() - message.createdTimestamp < 86400000
})

console.log('Total messages:', messages.length)
console.log('User messages:', userMessages.length)
console.log('Bot messages:', botMessages.length)
console.log('Recent (24h):', recentMessages.length)`,
            language: 'typescript',
            category: 'discord',
            tags: ['channels', 'messages']
          }
        ]
      }
    ]
  },
  {
    id: 'discord-messages-operations',
    title: 'Messages Management',
    description: 'Methods for sending, editing, and managing Discord messages',
    methods: [
      {
        id: 'messages-send',
        name: 'messages.send()',
        description: 'Send a message to a channel',
        signature: 'discord.messages.send(channelId: string, messageData: TMessageSendData): Promise<TDiscordMessage>',
        parameters: [
          {
            name: 'channelId',
            type: 'string',
            description: 'ID of the channel to send the message to',
            required: true
          },
          {
            name: 'messageData',
            type: 'TMessageSendData',
            description: 'Message content including text, embeds, and attachments',
            required: true
          }
        ],
        returnType: 'Promise<TDiscordMessage>',
        examples: [
          {
            id: 'messages-send-example',
            title: 'Send Messages',
            description: 'Send different types of messages with embeds and components',
            code: `const simpleMessage = await discord.messages.send('123456789012345678', {
  content: 'Hello, Discord! 👋'
})

const embedMessage = await discord.messages.send('123456789012345678', {
  embeds: [
    {
      title: 'Server Statistics',
      description: 'Current server information',
      color: 0x00ff00,
      fields: [
        { name: 'Members', value: '150', inline: true },
        { name: 'Online', value: '45', inline: true },
        { name: 'Channels', value: '12', inline: true }
      ],
      timestamp: new Date().toISOString(),
      footer: { text: 'Updated automatically' }
    }
  ]
})

console.log('Simple message sent:', simpleMessage.id)
console.log('Embed message sent:', embedMessage.id)`,
            language: 'typescript',
            category: 'discord',
            tags: ['messages', 'send']
          },
          {
            id: 'messages-components-example',
            title: 'Send Messages with Components',
            description: 'Add buttons and select menus to messages',
            code: `const interactiveMessage = await discord.messages.send('123456789012345678', {
  content: 'Choose your role:',
  components: [
    {
      type: 1,
      components: [
        {
          type: 2,
          style: 1,
          label: 'Member',
          customId: 'role_member',
          emoji: { name: '👤' }
        },
        {
          type: 2,
          style: 3,
          label: 'Developer',
          customId: 'role_developer',
          emoji: { name: '💻' }
        },
        {
          type: 2,
          style: 4,
          label: 'Moderator',
          customId: 'role_moderator',
          emoji: { name: '🛡️' }
        }
      ]
    }
  ]
})

console.log('Interactive message sent:', interactiveMessage.id)`,
            language: 'typescript',
            category: 'discord',
            tags: ['messages', 'components']
          }
        ]
      },
      {
        id: 'messages-edit',
        name: 'messages.edit()',
        description: 'Edit an existing message',
        signature: 'discord.messages.edit(channelId: string, messageId: string, messageData: TMessageEditData): Promise<TDiscordMessage>',
        parameters: [
          {
            name: 'channelId',
            type: 'string',
            description: 'ID of the channel containing the message',
            required: true
          },
          {
            name: 'messageId',
            type: 'string',
            description: 'ID of the message to edit',
            required: true
          },
          {
            name: 'messageData',
            type: 'TMessageEditData',
            description: 'Updated message content',
            required: true
          }
        ],
        returnType: 'Promise<TDiscordMessage>',
        examples: [
          {
            id: 'messages-edit-example',
            title: 'Edit Message Content',
            description: 'Update message text and embeds',
            code: `const editedMessage = await discord.messages.edit(
  '123456789012345678',
  '987654321098765432',
  {
    content: 'Updated message content! ✅',
    embeds: [
      {
        title: 'Status Update',
        description: 'Task completed successfully',
        color: 0x00ff00,
        timestamp: new Date().toISOString()
      }
    ]
  }
)

console.log('Message edited:', editedMessage.editedTimestamp)`,
            language: 'typescript',
            category: 'discord',
            tags: ['messages', 'edit']
          }
        ]
      },
      {
        id: 'messages-delete',
        name: 'messages.delete()',
        description: 'Delete a message from a channel',
        signature: 'discord.messages.delete(channelId: string, messageId: string): Promise<void>',
        parameters: [
          {
            name: 'channelId',
            type: 'string',
            description: 'ID of the channel containing the message',
            required: true
          },
          {
            name: 'messageId',
            type: 'string',
            description: 'ID of the message to delete',
            required: true
          }
        ],
        returnType: 'Promise<void>',
        examples: [
          {
            id: 'messages-delete-example',
            title: 'Delete Messages',
            description: 'Remove messages from channels',
            code: `await discord.messages.delete('123456789012345678', '987654321098765432')

console.log('Message deleted successfully')`,
            language: 'typescript',
            category: 'discord',
            tags: ['messages', 'delete']
          }
        ]
      },
      {
        id: 'messages-reactions',
        name: 'messages.addReaction()',
        description: 'Add reactions to messages',
        signature: 'discord.messages.addReaction(channelId: string, messageId: string, emoji: string): Promise<void>',
        parameters: [
          {
            name: 'channelId',
            type: 'string',
            description: 'ID of the channel containing the message',
            required: true
          },
          {
            name: 'messageId',
            type: 'string',
            description: 'ID of the message to react to',
            required: true
          },
          {
            name: 'emoji',
            type: 'string',
            description: 'Emoji to add as reaction',
            required: true
          }
        ],
        returnType: 'Promise<void>',
        examples: [
          {
            id: 'messages-reactions-example',
            title: 'Manage Message Reactions',
            description: 'Add and manage reactions on messages',
            code: `await discord.messages.addReaction('123456789012345678', '987654321098765432', '👍')
await discord.messages.addReaction('123456789012345678', '987654321098765432', '👎')
await discord.messages.addReaction('123456789012345678', '987654321098765432', '❤️')

const reactions = await discord.messages.getReactions(
  '123456789012345678',
  '987654321098765432',
  '👍'
)

console.log('Users who reacted with 👍:', reactions.length)`,
            language: 'typescript',
            category: 'discord',
            tags: ['messages', 'reactions']
          }
        ]
      }
    ]
  },
  {
    id: 'discord-webhooks',
    title: 'Webhooks Management',
    description: 'Methods for creating and managing Discord webhooks for automated messaging',
    methods: [
      {
        id: 'webhooks-create',
        name: 'webhooks.create()',
        description: 'Create a new webhook for a channel',
        signature: 'discord.webhooks.create(channelId: string, webhookData: TWebhookCreateData): Promise<TDiscordWebhook>',
        parameters: [
          {
            name: 'channelId',
            type: 'string',
            description: 'ID of the channel to create the webhook in',
            required: true
          },
          {
            name: 'webhookData',
            type: 'TWebhookCreateData',
            description: 'Webhook configuration including name and avatar',
            required: true
          }
        ],
        returnType: 'Promise<TDiscordWebhook>',
        examples: [
          {
            id: 'webhooks-create-example',
            title: 'Create Channel Webhook',
            description: 'Set up webhooks for automated messaging',
            code: `const webhook = await discord.webhooks.create('123456789012345678', {
  name: 'GitHub Notifications',
  avatar: 'https://github.com/github.png'
})

console.log('Webhook created:', webhook.name)
console.log('Webhook URL:', webhook.url)
console.log('Webhook ID:', webhook.id)`,
            language: 'typescript',
            category: 'discord',
            tags: ['webhooks', 'create']
          }
        ]
      },
      {
        id: 'webhooks-execute',
        name: 'webhooks.execute()',
        description: 'Send a message through a webhook',
        signature: 'discord.webhooks.execute(webhookUrl: string, messageData: TWebhookMessageData): Promise<void>',
        parameters: [
          {
            name: 'webhookUrl',
            type: 'string',
            description: 'URL of the webhook to execute',
            required: true
          },
          {
            name: 'messageData',
            type: 'TWebhookMessageData',
            description: 'Message content to send through the webhook',
            required: true
          }
        ],
        returnType: 'Promise<void>',
        examples: [
          {
            id: 'webhooks-execute-example',
            title: 'Send Webhook Messages',
            description: 'Use webhooks for automated notifications',
            code: `await discord.webhooks.execute(webhook.url, {
  username: 'GitHub Bot',
  avatarUrl: 'https://github.com/github.png',
  content: '🚀 New deployment started!',
  embeds: [
    {
      title: 'Deployment Status',
      description: 'Production deployment in progress',
      color: 0xffa500,
      fields: [
        { name: 'Repository', value: 'my-app', inline: true },
        { name: 'Branch', value: 'main', inline: true },
        { name: 'Environment', value: 'production', inline: true }
      ],
      timestamp: new Date().toISOString()
    }
  ]
})

console.log('Webhook message sent successfully')`,
            language: 'typescript',
            category: 'discord',
            tags: ['webhooks', 'execute']
          }
        ]
      }
    ]
  }
]