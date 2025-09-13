import { createApiBuilder, defineResource, type TModule } from "../core";

const DISCORD_API_BASE = "https://discord.com/api/v10";

const userResource = defineResource({
	name: "users",
	basePath: "/users",
	methods: {
		getCurrentUser: { path: "/@me" },
		getUser: { path: "/{userId}" },
		modifyCurrentUser: { path: "/@me", method: "PATCH" },
		getCurrentUserGuilds: { path: "/@me/guilds" },
		getCurrentUserGuildMember: { path: "/@me/guilds/{guildId}/member" },
		leaveGuild: { path: "/@me/guilds/{guildId}", method: "DELETE" },
		createDM: { path: "/@me/channels", method: "POST" },
		getConnections: { path: "/@me/connections" },
		getApplicationRoleConnection: { path: "/@me/applications/{applicationId}/role-connection" },
		updateApplicationRoleConnection: { path: "/@me/applications/{applicationId}/role-connection", method: "PUT" },
	},
});

const guildResource = defineResource({
	name: "guilds",
	basePath: "/guilds",
	methods: {
		createGuild: { path: "", method: "POST" },
		getGuild: { path: "/{guildId}" },
		getGuildPreview: { path: "/{guildId}/preview" },
		modifyGuild: { path: "/{guildId}", method: "PATCH" },
		deleteGuild: { path: "/{guildId}", method: "DELETE" },
		getGuildChannels: { path: "/{guildId}/channels" },
		createGuildChannel: { path: "/{guildId}/channels", method: "POST" },
		modifyGuildChannelPositions: { path: "/{guildId}/channels", method: "PATCH" },
		listActiveThreads: { path: "/{guildId}/threads/active" },
		getGuildMember: { path: "/{guildId}/members/{userId}" },
		listGuildMembers: { path: "/{guildId}/members" },
		searchGuildMembers: { path: "/{guildId}/members/search" },
		addGuildMember: { path: "/{guildId}/members/{userId}", method: "PUT" },
		modifyGuildMember: { path: "/{guildId}/members/{userId}", method: "PATCH" },
		modifyCurrentMember: { path: "/{guildId}/members/@me", method: "PATCH" },
		addGuildMemberRole: { path: "/{guildId}/members/{userId}/roles/{roleId}", method: "PUT" },
		removeGuildMemberRole: { path: "/{guildId}/members/{userId}/roles/{roleId}", method: "DELETE" },
		removeGuildMember: { path: "/{guildId}/members/{userId}", method: "DELETE" },
		getGuildBans: { path: "/{guildId}/bans" },
		getGuildBan: { path: "/{guildId}/bans/{userId}" },
		createGuildBan: { path: "/{guildId}/bans/{userId}", method: "PUT" },
		removeGuildBan: { path: "/{guildId}/bans/{userId}", method: "DELETE" },
		getGuildRoles: { path: "/{guildId}/roles" },
		createGuildRole: { path: "/{guildId}/roles", method: "POST" },
		modifyGuildRolePositions: { path: "/{guildId}/roles", method: "PATCH" },
		modifyGuildRole: { path: "/{guildId}/roles/{roleId}", method: "PATCH" },
		deleteGuildRole: { path: "/{guildId}/roles/{roleId}", method: "DELETE" },
		getGuildPruneCount: { path: "/{guildId}/prune" },
		beginGuildPrune: { path: "/{guildId}/prune", method: "POST" },
		getGuildVoiceRegions: { path: "/{guildId}/regions" },
		getGuildInvites: { path: "/{guildId}/invites" },
		getGuildIntegrations: { path: "/{guildId}/integrations" },
		deleteGuildIntegration: { path: "/{guildId}/integrations/{integrationId}", method: "DELETE" },
		getGuildWidgetSettings: { path: "/{guildId}/widget" },
		modifyGuildWidget: { path: "/{guildId}/widget", method: "PATCH" },
		getGuildWidget: { path: "/{guildId}/widget.json" },
		getGuildVanityURL: { path: "/{guildId}/vanity-url" },
		getGuildWelcomeScreen: { path: "/{guildId}/welcome-screen" },
		modifyGuildWelcomeScreen: { path: "/{guildId}/welcome-screen", method: "PATCH" },
		getGuildOnboarding: { path: "/{guildId}/onboarding" },
		modifyGuildOnboarding: { path: "/{guildId}/onboarding", method: "PUT" },
		modifyCurrentUserVoiceState: { path: "/{guildId}/voice-states/@me", method: "PATCH" },
		modifyUserVoiceState: { path: "/{guildId}/voice-states/{userId}", method: "PATCH" },
		listScheduledEventsForGuild: { path: "/{guildId}/scheduled-events" },
		createGuildScheduledEvent: { path: "/{guildId}/scheduled-events", method: "POST" },
		getGuildScheduledEvent: { path: "/{guildId}/scheduled-events/{guildScheduledEventId}" },
		modifyGuildScheduledEvent: { path: "/{guildId}/scheduled-events/{guildScheduledEventId}", method: "PATCH" },
		deleteGuildScheduledEvent: { path: "/{guildId}/scheduled-events/{guildScheduledEventId}", method: "DELETE" },
		getGuildScheduledEventUsers: { path: "/{guildId}/scheduled-events/{guildScheduledEventId}/users" },
		getGuildTemplate: { path: "/templates/{templateCode}" },
		createGuildFromTemplate: { path: "/templates/{templateCode}", method: "POST" },
		getGuildTemplates: { path: "/{guildId}/templates" },
		createGuildTemplate: { path: "/{guildId}/templates", method: "POST" },
		syncGuildTemplate: { path: "/{guildId}/templates/{templateCode}", method: "PUT" },
		modifyGuildTemplate: { path: "/{guildId}/templates/{templateCode}", method: "PATCH" },
		deleteGuildTemplate: { path: "/{guildId}/templates/{templateCode}", method: "DELETE" },
	},
});

const channelResource = defineResource({
	name: "channels",
	basePath: "/channels",
	methods: {
		getChannel: { path: "/{channelId}" },
		modifyChannel: { path: "/{channelId}", method: "PATCH" },
		deleteChannel: { path: "/{channelId}", method: "DELETE" },
		getChannelMessages: { path: "/{channelId}/messages" },
		getChannelMessage: { path: "/{channelId}/messages/{messageId}" },
		createMessage: { path: "/{channelId}/messages", method: "POST" },
		crosspostMessage: { path: "/{channelId}/messages/{messageId}/crosspost", method: "POST" },
		createReaction: { path: "/{channelId}/messages/{messageId}/reactions/{emoji}/@me", method: "PUT" },
		deleteOwnReaction: { path: "/{channelId}/messages/{messageId}/reactions/{emoji}/@me", method: "DELETE" },
		deleteUserReaction: { path: "/{channelId}/messages/{messageId}/reactions/{emoji}/{userId}", method: "DELETE" },
		getReactions: { path: "/{channelId}/messages/{messageId}/reactions/{emoji}" },
		deleteAllReactions: { path: "/{channelId}/messages/{messageId}/reactions", method: "DELETE" },
		deleteAllReactionsForEmoji: { path: "/{channelId}/messages/{messageId}/reactions/{emoji}", method: "DELETE" },
		editMessage: { path: "/{channelId}/messages/{messageId}", method: "PATCH" },
		deleteMessage: { path: "/{channelId}/messages/{messageId}", method: "DELETE" },
		bulkDeleteMessages: { path: "/{channelId}/messages/bulk-delete", method: "POST" },
		editChannelPermissions: { path: "/{channelId}/permissions/{overwriteId}", method: "PUT" },
		getChannelInvites: { path: "/{channelId}/invites" },
		createChannelInvite: { path: "/{channelId}/invites", method: "POST" },
		deleteChannelPermission: { path: "/{channelId}/permissions/{overwriteId}", method: "DELETE" },
		followAnnouncementChannel: { path: "/{channelId}/followers", method: "POST" },
		triggerTypingIndicator: { path: "/{channelId}/typing", method: "POST" },
		getPinnedMessages: { path: "/{channelId}/pins" },
		pinMessage: { path: "/{channelId}/pins/{messageId}", method: "PUT" },
		unpinMessage: { path: "/{channelId}/pins/{messageId}", method: "DELETE" },
		groupDMAddRecipient: { path: "/{channelId}/recipients/{userId}", method: "PUT" },
		groupDMRemoveRecipient: { path: "/{channelId}/recipients/{userId}", method: "DELETE" },
		startThreadFromMessage: { path: "/{channelId}/messages/{messageId}/threads", method: "POST" },
		startThreadWithoutMessage: { path: "/{channelId}/threads", method: "POST" },
		startThreadInForumOrMediaChannel: { path: "/{channelId}/threads", method: "POST" },
		joinThread: { path: "/{channelId}/thread-members/@me", method: "PUT" },
		addThreadMember: { path: "/{channelId}/thread-members/{userId}", method: "PUT" },
		leaveThread: { path: "/{channelId}/thread-members/@me", method: "DELETE" },
		removeThreadMember: { path: "/{channelId}/thread-members/{userId}", method: "DELETE" },
		getThreadMember: { path: "/{channelId}/thread-members/{userId}" },
		listThreadMembers: { path: "/{channelId}/thread-members" },
		listPublicArchivedThreads: { path: "/{channelId}/threads/archived/public" },
		listPrivateArchivedThreads: { path: "/{channelId}/threads/archived/private" },
		listJoinedPrivateArchivedThreads: { path: "/{channelId}/users/@me/threads/archived/private" },
	},
});

const emojiResource = defineResource({
	name: "emojis",
	basePath: "/guilds/{guildId}/emojis",
	methods: {
		listGuildEmojis: { path: "" },
		getGuildEmoji: { path: "/{emojiId}" },
		createGuildEmoji: { path: "", method: "POST" },
		modifyGuildEmoji: { path: "/{emojiId}", method: "PATCH" },
		deleteGuildEmoji: { path: "/{emojiId}", method: "DELETE" },
	},
});

const inviteResource = defineResource({
	name: "invites",
	basePath: "/invites",
	methods: {
		getInvite: { path: "/{inviteCode}" },
		deleteInvite: { path: "/{inviteCode}", method: "DELETE" },
	},
});

const voiceResource = defineResource({
	name: "voice",
	basePath: "/voice",
	methods: {
		listVoiceRegions: { path: "/regions" },
	},
});

const webhookResource = defineResource({
	name: "webhooks",
	basePath: "/webhooks",
	methods: {
		createWebhook: { path: "/channels/{channelId}/webhooks", method: "POST" },
		getChannelWebhooks: { path: "/channels/{channelId}/webhooks" },
		getGuildWebhooks: { path: "/guilds/{guildId}/webhooks" },
		getWebhook: { path: "/{webhookId}" },
		getWebhookWithToken: { path: "/{webhookId}/{webhookToken}" },
		modifyWebhook: { path: "/{webhookId}", method: "PATCH" },
		modifyWebhookWithToken: { path: "/{webhookId}/{webhookToken}", method: "PATCH" },
		deleteWebhook: { path: "/{webhookId}", method: "DELETE" },
		deleteWebhookWithToken: { path: "/{webhookId}/{webhookToken}", method: "DELETE" },
		executeWebhook: { path: "/{webhookId}/{webhookToken}", method: "POST" },
		executeSlackCompatibleWebhook: { path: "/{webhookId}/{webhookToken}/slack", method: "POST" },
		executeGitHubCompatibleWebhook: { path: "/{webhookId}/{webhookToken}/github", method: "POST" },
		getWebhookMessage: { path: "/{webhookId}/{webhookToken}/messages/{messageId}" },
		editWebhookMessage: { path: "/{webhookId}/{webhookToken}/messages/{messageId}", method: "PATCH" },
		deleteWebhookMessage: { path: "/{webhookId}/{webhookToken}/messages/{messageId}", method: "DELETE" },
	},
});

const applicationResource = defineResource({
	name: "applications",
	basePath: "/applications",
	methods: {
		getGlobalApplicationCommands: { path: "/{applicationId}/commands" },
		createGlobalApplicationCommand: { path: "/{applicationId}/commands", method: "POST" },
		getGlobalApplicationCommand: { path: "/{applicationId}/commands/{commandId}" },
		editGlobalApplicationCommand: { path: "/{applicationId}/commands/{commandId}", method: "PATCH" },
		deleteGlobalApplicationCommand: { path: "/{applicationId}/commands/{commandId}", method: "DELETE" },
		bulkOverwriteGlobalApplicationCommands: { path: "/{applicationId}/commands", method: "PUT" },
		getGuildApplicationCommands: { path: "/{applicationId}/guilds/{guildId}/commands" },
		createGuildApplicationCommand: { path: "/{applicationId}/guilds/{guildId}/commands", method: "POST" },
		getGuildApplicationCommand: { path: "/{applicationId}/guilds/{guildId}/commands/{commandId}" },
		editGuildApplicationCommand: { path: "/{applicationId}/guilds/{guildId}/commands/{commandId}", method: "PATCH" },
		deleteGuildApplicationCommand: { path: "/{applicationId}/guilds/{guildId}/commands/{commandId}", method: "DELETE" },
		bulkOverwriteGuildApplicationCommands: { path: "/{applicationId}/guilds/{guildId}/commands", method: "PUT" },
		getGuildApplicationCommandPermissions: { path: "/{applicationId}/guilds/{guildId}/commands/permissions" },
		getApplicationCommandPermissions: { path: "/{applicationId}/guilds/{guildId}/commands/{commandId}/permissions" },
		editApplicationCommandPermissions: { path: "/{applicationId}/guilds/{guildId}/commands/{commandId}/permissions", method: "PUT" },
		createInteractionResponse: { path: "/interactions/{interactionId}/{interactionToken}/callback", method: "POST" },
		getOriginalInteractionResponse: { path: "/webhooks/{applicationId}/{interactionToken}/messages/@original" },
		editOriginalInteractionResponse: { path: "/webhooks/{applicationId}/{interactionToken}/messages/@original", method: "PATCH" },
		deleteOriginalInteractionResponse: { path: "/webhooks/{applicationId}/{interactionToken}/messages/@original", method: "DELETE" },
		createFollowupMessage: { path: "/webhooks/{applicationId}/{interactionToken}", method: "POST" },
		getFollowupMessage: { path: "/webhooks/{applicationId}/{interactionToken}/messages/{messageId}" },
		editFollowupMessage: { path: "/webhooks/{applicationId}/{interactionToken}/messages/{messageId}", method: "PATCH" },
		deleteFollowupMessage: { path: "/webhooks/{applicationId}/{interactionToken}/messages/{messageId}", method: "DELETE" },
		getCurrentApplication: { path: "/@me" },
		editCurrentApplication: { path: "/@me", method: "PATCH" },
	},
});

const auditLogResource = defineResource({
	name: "auditLogs",
	basePath: "/guilds/{guildId}/audit-logs",
	methods: {
		getGuildAuditLog: { path: "" },
	},
});

const autoModerationResource = defineResource({
	name: "autoModeration",
	basePath: "/guilds/{guildId}/auto-moderation",
	methods: {
		listAutoModerationRulesForGuild: { path: "/rules" },
		getAutoModerationRule: { path: "/rules/{autoModerationRuleId}" },
		createAutoModerationRule: { path: "/rules", method: "POST" },
		modifyAutoModerationRule: { path: "/rules/{autoModerationRuleId}", method: "PATCH" },
		deleteAutoModerationRule: { path: "/rules/{autoModerationRuleId}", method: "DELETE" },
	},
});

const stickerResource = defineResource({
	name: "stickers",
	basePath: "",
	methods: {
		getSticker: { path: "/stickers/{stickerId}" },
		listStickerPacks: { path: "/sticker-packs" },
		listGuildStickers: { path: "/guilds/{guildId}/stickers" },
		getGuildSticker: { path: "/guilds/{guildId}/stickers/{stickerId}" },
		createGuildSticker: { path: "/guilds/{guildId}/stickers", method: "POST" },
		modifyGuildSticker: { path: "/guilds/{guildId}/stickers/{stickerId}", method: "PATCH" },
		deleteGuildSticker: { path: "/guilds/{guildId}/stickers/{stickerId}", method: "DELETE" },
	},
});

const stageInstanceResource = defineResource({
	name: "stageInstances",
	basePath: "/stage-instances",
	methods: {
		createStageInstance: { path: "", method: "POST" },
		getStageInstance: { path: "/{channelId}" },
		modifyStageInstance: { path: "/{channelId}", method: "PATCH" },
		deleteStageInstance: { path: "/{channelId}", method: "DELETE" },
	},
});

const resources = {
	users: userResource,
	guilds: guildResource,
	channels: channelResource,
	emojis: emojiResource,
	invites: inviteResource,
	voice: voiceResource,
	webhooks: webhookResource,
	applications: applicationResource,
	auditLogs: auditLogResource,
	autoModeration: autoModerationResource,
	stickers: stickerResource,
	stageInstances: stageInstanceResource,
};

const buildDiscord = createApiBuilder({
	baseUrl: DISCORD_API_BASE,
	auth: { type: "bearer" as const },
	headers: {
		"Content-Type": "application/json",
	},
});

type TDiscordModule = TModule<typeof resources> & {
	getCurrentUser: () => Promise<any>;
	getUser: (userId: string) => Promise<any>;
	getGuild: (guildId: string) => Promise<any>;
	getChannel: (channelId: string) => Promise<any>;
	sendMessage: (channelId: string, content: string, options?: any) => Promise<any>;
	sendEmbed: (channelId: string, embed: any, content?: string) => Promise<any>;
	editMessage: (channelId: string, messageId: string, content: string, options?: any) => Promise<any>;
	deleteMessage: (channelId: string, messageId: string) => Promise<any>;
	getMessages: (channelId: string, limit?: number) => Promise<any>;
	createChannel: (guildId: string, name: string, type?: number, options?: any) => Promise<any>;
	deleteChannel: (channelId: string) => Promise<any>;
	getGuildMembers: (guildId: string, limit?: number) => Promise<any>;
	getGuildMember: (guildId: string, userId: string) => Promise<any>;
	kickMember: (guildId: string, userId: string, reason?: string) => Promise<any>;
	banMember: (guildId: string, userId: string, options?: any) => Promise<any>;
	unbanMember: (guildId: string, userId: string) => Promise<any>;
	addRole: (guildId: string, userId: string, roleId: string) => Promise<any>;
	removeRole: (guildId: string, userId: string, roleId: string) => Promise<any>;
	createRole: (guildId: string, name: string, options?: any) => Promise<any>;
	deleteRole: (guildId: string, roleId: string) => Promise<any>;
	createInvite: (channelId: string, options?: any) => Promise<any>;
	getInvite: (inviteCode: string) => Promise<any>;
	deleteInvite: (inviteCode: string) => Promise<any>;
	createWebhook: (channelId: string, name: string, avatar?: string) => Promise<any>;
	executeWebhook: (webhookId: string, webhookToken: string, content: any) => Promise<any>;
	getGuildRoles: (guildId: string) => Promise<any>;
	getGuildChannels: (guildId: string) => Promise<any>;
	getGuildBans: (guildId: string) => Promise<any>;
	getGuildInvites: (guildId: string) => Promise<any>;
	getGuildEmojis: (guildId: string) => Promise<any>;
	createGuildEmoji: (guildId: string, name: string, image: string, roles?: string[]) => Promise<any>;
	deleteGuildEmoji: (guildId: string, emojiId: string) => Promise<any>;
	getGuildAuditLog: (guildId: string, options?: any) => Promise<any>;
	getCurrentUserGuilds: (limit?: number) => Promise<any>;
	leaveGuild: (guildId: string) => Promise<any>;
	createDM: (recipientId: string) => Promise<any>;
	addReaction: (channelId: string, messageId: string, emoji: string) => Promise<any>;
	removeReaction: (channelId: string, messageId: string, emoji: string) => Promise<any>;
	getReactions: (channelId: string, messageId: string, emoji: string) => Promise<any>;
	createThread: (channelId: string, name: string, options?: any) => Promise<any>;
	joinThread: (threadId: string) => Promise<any>;
	leaveThread: (threadId: string) => Promise<any>;
	listThreadMembers: (threadId: string) => Promise<any>;
	modifyCurrentUser: (options: any) => Promise<any>;
	modifyGuild: (guildId: string, options: any) => Promise<any>;
	modifyChannel: (channelId: string, options: any) => Promise<any>;
	modifyGuildMember: (guildId: string, userId: string, options: any) => Promise<any>;
	modifyGuildRole: (guildId: string, roleId: string, options: any) => Promise<any>;
	triggerTyping: (channelId: string) => Promise<any>;
	getPinnedMessages: (channelId: string) => Promise<any>;
	pinMessage: (channelId: string, messageId: string) => Promise<any>;
	unpinMessage: (channelId: string, messageId: string) => Promise<any>;
	bulkDeleteMessages: (channelId: string, messageIds: string[]) => Promise<any>;
	searchGuildMembers: (guildId: string, query: string, limit?: number) => Promise<any>;
	getGuildPreview: (guildId: string) => Promise<any>;
	getGuildVanityURL: (guildId: string) => Promise<any>;
	getGuildWidgetSettings: (guildId: string) => Promise<any>;
	getGuildWelcomeScreen: (guildId: string) => Promise<any>;
	getVoiceRegions: () => Promise<any>;
	createStageInstance: (channelId: string, topic: string, options?: any) => Promise<any>;
	modifyStageInstance: (channelId: string, topic?: string, privacyLevel?: number) => Promise<any>;
	deleteStageInstance: (channelId: string) => Promise<any>;
	getStageInstance: (channelId: string) => Promise<any>;
};

export function Discord(config: { token: string }): TDiscordModule {
	const base = buildDiscord(config, resources);
	const discord = base as unknown as TDiscordModule;

	discord.getCurrentUser = function () {
		return base.users.getCurrentUser();
	};

	discord.getUser = function (userId: string) {
		return base.users.getUser({ userId });
	};

	discord.getGuild = function (guildId: string) {
		return base.guilds.getGuild({ guildId });
	};

	discord.getChannel = function (channelId: string) {
		return base.channels.getChannel({ channelId });
	};

	discord.sendMessage = function (channelId: string, content: string, options?: any) {
		return base.channels.createMessage(
			{
				content,
				tts: options?.tts || false,
				embeds: options?.embeds || [],
				allowed_mentions: options?.allowedMentions,
				message_reference: options?.messageReference,
				components: options?.components,
				sticker_ids: options?.stickerIds,
				attachments: options?.attachments,
				flags: options?.flags,
			},
			{ channelId },
		);
	};

	discord.sendEmbed = function (channelId: string, embed: any, content?: string) {
		return base.channels.createMessage(
			{
				content: content || "",
				embeds: [embed],
			},
			{ channelId },
		);
	};

	discord.editMessage = function (channelId: string, messageId: string, content: string, options?: any) {
		return base.channels.editMessage(
			{
				content,
				embeds: options?.embeds,
				flags: options?.flags,
				allowed_mentions: options?.allowedMentions,
				components: options?.components,
				attachments: options?.attachments,
			},
			{ channelId, messageId },
		);
	};

	discord.deleteMessage = function (channelId: string, messageId: string) {
		return base.channels.deleteMessage({ channelId, messageId });
	};

	discord.getMessages = function (channelId: string, limit: number = 50) {
		return base.channels.getChannelMessages({ channelId, limit });
	};

	discord.createChannel = function (guildId: string, name: string, type: number = 0, options?: any) {
		return base.guilds.createGuildChannel(
			{
				name,
				type,
				topic: options?.topic,
				bitrate: options?.bitrate,
				user_limit: options?.userLimit,
				rate_limit_per_user: options?.rateLimitPerUser,
				position: options?.position,
				permission_overwrites: options?.permissionOverwrites,
				parent_id: options?.parentId,
				nsfw: options?.nsfw,
				rtc_region: options?.rtcRegion,
				video_quality_mode: options?.videoQualityMode,
				default_auto_archive_duration: options?.defaultAutoArchiveDuration,
				default_reaction_emoji: options?.defaultReactionEmoji,
				available_tags: options?.availableTags,
				default_sort_order: options?.defaultSortOrder,
				default_forum_layout: options?.defaultForumLayout,
				default_thread_rate_limit_per_user: options?.defaultThreadRateLimitPerUser,
			},
			{ guildId },
		);
	};

	discord.deleteChannel = function (channelId: string) {
		return base.channels.deleteChannel({ channelId });
	};

	discord.getGuildMembers = function (guildId: string, limit: number = 100) {
		return base.guilds.listGuildMembers({ guildId, limit });
	};

	discord.getGuildMember = function (guildId: string, userId: string) {
		return base.guilds.getGuildMember({ guildId, userId });
	};

	discord.kickMember = function (guildId: string, userId: string, reason?: string) {
		return base.guilds.removeGuildMember({ guildId, userId });
	};

	discord.banMember = function (guildId: string, userId: string, options?: any) {
		return base.guilds.createGuildBan(
			{
				delete_message_seconds: options?.deleteMessageSeconds,
			},
			{ guildId, userId },
		);
	};

	discord.unbanMember = function (guildId: string, userId: string) {
		return base.guilds.removeGuildBan({ guildId, userId });
	};

	discord.addRole = function (guildId: string, userId: string, roleId: string) {
		return base.guilds.addGuildMemberRole({ guildId, userId, roleId });
	};

	discord.removeRole = function (guildId: string, userId: string, roleId: string) {
		return base.guilds.removeGuildMemberRole({ guildId, userId, roleId });
	};

	discord.createRole = function (guildId: string, name: string, options?: any) {
		return base.guilds.createGuildRole(
			{
				name,
				permissions: options?.permissions,
				color: options?.color || 0,
				hoist: options?.hoist || false,
				icon: options?.icon,
				unicode_emoji: options?.unicodeEmoji,
				mentionable: options?.mentionable || false,
			},
			{ guildId },
		);
	};

	discord.deleteRole = function (guildId: string, roleId: string) {
		return base.guilds.deleteGuildRole({ guildId, roleId });
	};

	discord.createInvite = function (channelId: string, options?: any) {
		return base.channels.createChannelInvite(
			{
				max_age: options?.maxAge || 86400,
				max_uses: options?.maxUses || 0,
				temporary: options?.temporary || false,
				unique: options?.unique || false,
				target_type: options?.targetType,
				target_user_id: options?.targetUserId,
				target_application_id: options?.targetApplicationId,
			},
			{ channelId },
		);
	};

	discord.getInvite = function (inviteCode: string) {
		return base.invites.getInvite({ inviteCode, with_counts: true, with_expiration: true });
	};

	discord.deleteInvite = function (inviteCode: string) {
		return base.invites.deleteInvite({ inviteCode });
	};

	discord.createWebhook = function (channelId: string, name: string, avatar?: string) {
		return base.webhooks.createWebhook(
			{
				name,
				avatar,
			},
			{ channelId },
		);
	};

	discord.executeWebhook = function (webhookId: string, webhookToken: string, content: any) {
		if (typeof content === "string") {
			return base.webhooks.executeWebhook(
				{ content },
				{ webhookId, webhookToken },
			);
		}
		return base.webhooks.executeWebhook(content, { webhookId, webhookToken });
	};

	discord.getGuildRoles = function (guildId: string) {
		return base.guilds.getGuildRoles({ guildId });
	};

	discord.getGuildChannels = function (guildId: string) {
		return base.guilds.getGuildChannels({ guildId });
	};

	discord.getGuildBans = function (guildId: string) {
		return base.guilds.getGuildBans({ guildId });
	};

	discord.getGuildInvites = function (guildId: string) {
		return base.guilds.getGuildInvites({ guildId });
	};

	discord.getGuildEmojis = function (guildId: string) {
		return base.emojis.listGuildEmojis({ guildId });
	};

	discord.createGuildEmoji = function (guildId: string, name: string, image: string, roles?: string[]) {
		return base.emojis.createGuildEmoji(
			{
				name,
				image,
				roles,
			},
			{ guildId },
		);
	};

	discord.deleteGuildEmoji = function (guildId: string, emojiId: string) {
		return base.emojis.deleteGuildEmoji({ guildId, emojiId });
	};

	discord.getGuildAuditLog = function (guildId: string, options?: any) {
		return base.auditLogs.getGuildAuditLog({
			guildId,
			user_id: options?.userId,
			action_type: options?.actionType,
			before: options?.before,
			after: options?.after,
			limit: options?.limit || 50,
		});
	};

	discord.getCurrentUserGuilds = function (limit: number = 200) {
		return base.users.getCurrentUserGuilds({ limit });
	};

	discord.leaveGuild = function (guildId: string) {
		return base.users.leaveGuild({ guildId });
	};

	discord.createDM = function (recipientId: string) {
		return base.users.createDM({ recipient_id: recipientId }, {});
	};

	discord.addReaction = function (channelId: string, messageId: string, emoji: string) {
		return base.channels.createReaction({ channelId, messageId, emoji });
	};

	discord.removeReaction = function (channelId: string, messageId: string, emoji: string) {
		return base.channels.deleteOwnReaction({ channelId, messageId, emoji });
	};

	discord.getReactions = function (channelId: string, messageId: string, emoji: string) {
		return base.channels.getReactions({ channelId, messageId, emoji });
	};

	discord.createThread = function (channelId: string, name: string, options?: any) {
		if (options?.messageId) {
			return base.channels.startThreadFromMessage(
				{
					name,
					auto_archive_duration: options?.autoArchiveDuration || 1440,
					rate_limit_per_user: options?.rateLimitPerUser,
				},
				{ channelId, messageId: options.messageId },
			);
		}
		return base.channels.startThreadWithoutMessage(
			{
				name,
				auto_archive_duration: options?.autoArchiveDuration || 1440,
				type: options?.type || 11,
				invitable: options?.invitable,
				rate_limit_per_user: options?.rateLimitPerUser,
			},
			{ channelId },
		);
	};

	discord.joinThread = function (threadId: string) {
		return base.channels.joinThread({ channelId: threadId });
	};

	discord.leaveThread = function (threadId: string) {
		return base.channels.leaveThread({ channelId: threadId });
	};

	discord.listThreadMembers = function (threadId: string) {
		return base.channels.listThreadMembers({ channelId: threadId });
	};

	discord.modifyCurrentUser = function (options: any) {
		return base.users.modifyCurrentUser(options, {});
	};

	discord.modifyGuild = function (guildId: string, options: any) {
		return base.guilds.modifyGuild(options, { guildId });
	};

	discord.modifyChannel = function (channelId: string, options: any) {
		return base.channels.modifyChannel(options, { channelId });
	};

	discord.modifyGuildMember = function (guildId: string, userId: string, options: any) {
		return base.guilds.modifyGuildMember(options, { guildId, userId });
	};

	discord.modifyGuildRole = function (guildId: string, roleId: string, options: any) {
		return base.guilds.modifyGuildRole(options, { guildId, roleId });
	};

	discord.triggerTyping = function (channelId: string) {
		return base.channels.triggerTypingIndicator({}, { channelId });
	};

	discord.getPinnedMessages = function (channelId: string) {
		return base.channels.getPinnedMessages({ channelId });
	};

	discord.pinMessage = function (channelId: string, messageId: string) {
		return base.channels.pinMessage({}, { channelId, messageId });
	};

	discord.unpinMessage = function (channelId: string, messageId: string) {
		return base.channels.unpinMessage({ channelId, messageId });
	};

	discord.bulkDeleteMessages = function (channelId: string, messageIds: string[]) {
		return base.channels.bulkDeleteMessages({ messages: messageIds }, { channelId });
	};

	discord.searchGuildMembers = function (guildId: string, query: string, limit: number = 100) {
		return base.guilds.searchGuildMembers({ guildId, query, limit });
	};

	discord.getGuildPreview = function (guildId: string) {
		return base.guilds.getGuildPreview({ guildId });
	};

	discord.getGuildVanityURL = function (guildId: string) {
		return base.guilds.getGuildVanityURL({ guildId });
	};

	discord.getGuildWidgetSettings = function (guildId: string) {
		return base.guilds.getGuildWidgetSettings({ guildId });
	};

	discord.getGuildWelcomeScreen = function (guildId: string) {
		return base.guilds.getGuildWelcomeScreen({ guildId });
	};

	discord.getVoiceRegions = function () {
		return base.voice.listVoiceRegions();
	};

	discord.createStageInstance = function (channelId: string, topic: string, options?: any) {
		return base.stageInstances.createStageInstance(
			{
				channel_id: channelId,
				topic,
				privacy_level: options?.privacyLevel || 2,
				send_start_notification: options?.sendStartNotification,
				guild_scheduled_event_id: options?.guildScheduledEventId,
			},
			{},
		);
	};

	discord.modifyStageInstance = function (channelId: string, topic?: string, privacyLevel?: number) {
		const data: any = {};
		if (topic !== undefined) data.topic = topic;
		if (privacyLevel !== undefined) data.privacy_level = privacyLevel;
		return base.stageInstances.modifyStageInstance(data, { channelId });
	};

	discord.deleteStageInstance = function (channelId: string) {
		return base.stageInstances.deleteStageInstance({ channelId });
	};

	discord.getStageInstance = function (channelId: string) {
		return base.stageInstances.getStageInstance({ channelId });
	};

	return discord;
}
