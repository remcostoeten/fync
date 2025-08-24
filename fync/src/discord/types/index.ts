// Discord API Types
// See: https://discord.com/developers/docs/reference

// User Types
export interface TDiscordUser {
	id: string;
	username: string;
	discriminator: string;
	global_name?: string | null;
	avatar: string | null;
	bot?: boolean;
	system?: boolean;
	mfa_enabled?: boolean;
	banner?: string | null;
	accent_color?: number | null;
	locale?: string;
	verified?: boolean;
	email?: string | null;
	flags?: number;
	premium_type?: number;
	public_flags?: number;
	avatar_decoration?: string | null;
}

// Guild Types
export interface TDiscordGuild {
	id: string;
	name: string;
	icon: string | null;
	icon_hash?: string | null;
	splash: string | null;
	discovery_splash: string | null;
	owner?: boolean;
	owner_id: string;
	permissions?: string;
	region?: string | null;
	afk_channel_id: string | null;
	afk_timeout: number;
	widget_enabled?: boolean;
	widget_channel_id?: string | null;
	verification_level: number;
	default_message_notifications: number;
	explicit_content_filter: number;
	roles: TDiscordRole[];
	emojis: TDiscordEmoji[];
	features: string[];
	mfa_level: number;
	application_id: string | null;
	system_channel_id: string | null;
	system_channel_flags: number;
	rules_channel_id: string | null;
	max_presences?: number | null;
	max_members?: number;
	vanity_url_code: string | null;
	description: string | null;
	banner: string | null;
	premium_tier: number;
	premium_subscription_count?: number;
	preferred_locale: string;
	public_updates_channel_id: string | null;
	max_video_channel_users?: number;
	max_stage_video_channel_users?: number;
	approximate_member_count?: number;
	approximate_presence_count?: number;
	welcome_screen?: TDiscordWelcomeScreen;
	nsfw_level: number;
	stickers?: TDiscordSticker[];
	premium_progress_bar_enabled: boolean;
	safety_alerts_channel_id: string | null;
}

// Channel Types
export interface TDiscordChannel {
	id: string;
	type: number;
	guild_id?: string;
	position?: number;
	permission_overwrites?: TDiscordOverwrite[];
	name?: string | null;
	topic?: string | null;
	nsfw?: boolean;
	last_message_id?: string | null;
	bitrate?: number;
	user_limit?: number;
	rate_limit_per_user?: number;
	recipients?: TDiscordUser[];
	icon?: string | null;
	owner_id?: string;
	application_id?: string;
	managed?: boolean;
	parent_id?: string | null;
	last_pin_timestamp?: string | null;
	rtc_region?: string | null;
	video_quality_mode?: number;
	message_count?: number;
	member_count?: number;
	thread_metadata?: TDiscordThreadMetadata;
	member?: TDiscordThreadMember;
	default_auto_archive_duration?: number;
	permissions?: string;
	flags?: number;
	total_message_sent?: number;
	available_tags?: TDiscordForumTag[];
	applied_tags?: string[];
	default_reaction_emoji?: TDiscordDefaultReaction | null;
	default_thread_rate_limit_per_user?: number;
	default_sort_order?: number | null;
	default_forum_layout?: number;
}

// Message Types
export interface TDiscordMessage {
	id: string;
	channel_id: string;
	author: TDiscordUser;
	content: string;
	timestamp: string;
	edited_timestamp: string | null;
	tts: boolean;
	mention_everyone: boolean;
	mentions: TDiscordUser[];
	mention_roles: string[];
	mention_channels?: TDiscordChannelMention[];
	attachments: TDiscordAttachment[];
	embeds: TDiscordEmbed[];
	reactions?: TDiscordReaction[];
	nonce?: string | number;
	pinned: boolean;
	webhook_id?: string;
	type: number;
	activity?: TDiscordMessageActivity;
	application?: TDiscordApplication;
	application_id?: string;
	message_reference?: TDiscordMessageReference;
	flags?: number;
	referenced_message?: TDiscordMessage | null;
	interaction?: TDiscordMessageInteraction;
	thread?: TDiscordChannel;
	components?: TDiscordComponent[];
	sticker_items?: TDiscordStickerItem[];
	stickers?: TDiscordSticker[];
	position?: number;
	role_subscription_data?: TDiscordRoleSubscriptionData;
	resolved?: TDiscordResolvedData;
}

// Embed Types
export interface TDiscordEmbed {
	title?: string;
	type?: string;
	description?: string;
	url?: string;
	timestamp?: string;
	color?: number;
	footer?: TDiscordEmbedFooter;
	image?: TDiscordEmbedImage;
	thumbnail?: TDiscordEmbedThumbnail;
	video?: TDiscordEmbedVideo;
	provider?: TDiscordEmbedProvider;
	author?: TDiscordEmbedAuthor;
	fields?: TDiscordEmbedField[];
}

export interface TDiscordEmbedFooter {
	text: string;
	icon_url?: string;
	proxy_icon_url?: string;
}

export interface TDiscordEmbedImage {
	url: string;
	proxy_url?: string;
	height?: number;
	width?: number;
}

export interface TDiscordEmbedThumbnail {
	url: string;
	proxy_url?: string;
	height?: number;
	width?: number;
}

export interface TDiscordEmbedVideo {
	url?: string;
	proxy_url?: string;
	height?: number;
	width?: number;
}

export interface TDiscordEmbedProvider {
	name?: string;
	url?: string;
}

export interface TDiscordEmbedAuthor {
	name: string;
	url?: string;
	icon_url?: string;
	proxy_icon_url?: string;
}

export interface TDiscordEmbedField {
	name: string;
	value: string;
	inline?: boolean;
}

// Member Types
export interface TDiscordGuildMember {
	user?: TDiscordUser;
	nick?: string | null;
	avatar?: string | null;
	roles: string[];
	joined_at: string;
	premium_since?: string | null;
	deaf: boolean;
	mute: boolean;
	flags: number;
	pending?: boolean;
	permissions?: string;
	communication_disabled_until?: string | null;
}

// Role Types
export interface TDiscordRole {
	id: string;
	name: string;
	color: number;
	hoist: boolean;
	icon?: string | null;
	unicode_emoji?: string | null;
	position: number;
	permissions: string;
	managed: boolean;
	mentionable: boolean;
	tags?: TDiscordRoleTags;
	flags: number;
}

export interface TDiscordRoleTags {
	bot_id?: string;
	integration_id?: string;
	premium_subscriber?: null;
	subscription_listing_id?: string;
	available_for_purchase?: null;
	guild_connections?: null;
}

// Permission Overwrite Types
export interface TDiscordOverwrite {
	id: string;
	type: number;
	allow: string;
	deny: string;
}

// Emoji Types
export interface TDiscordEmoji {
	id: string | null;
	name: string | null;
	roles?: string[];
	user?: TDiscordUser;
	require_colons?: boolean;
	managed?: boolean;
	animated?: boolean;
	available?: boolean;
}

// Reaction Types
export interface TDiscordReaction {
	count: number;
	me: boolean;
	emoji: TDiscordEmoji;
}

// Attachment Types
export interface TDiscordAttachment {
	id: string;
	filename: string;
	description?: string;
	content_type?: string;
	size: number;
	url: string;
	proxy_url: string;
	height?: number | null;
	width?: number | null;
	ephemeral?: boolean;
	duration_secs?: number;
	waveform?: string;
	flags?: number;
}

// Thread Types
export interface TDiscordThreadMetadata {
	archived: boolean;
	auto_archive_duration: number;
	archive_timestamp: string;
	locked: boolean;
	invitable?: boolean;
	create_timestamp?: string | null;
}

export interface TDiscordThreadMember {
	id?: string;
	user_id?: string;
	join_timestamp: string;
	flags: number;
	member?: TDiscordGuildMember;
}

// Forum Types
export interface TDiscordForumTag {
	id: string;
	name: string;
	moderated: boolean;
	emoji_id: string | null;
	emoji_name: string | null;
}

export interface TDiscordDefaultReaction {
	emoji_id: string | null;
	emoji_name: string | null;
}

// Channel Mention Types
export interface TDiscordChannelMention {
	id: string;
	guild_id: string;
	type: number;
	name: string;
}

// Message Activity Types
export interface TDiscordMessageActivity {
	type: number;
	party_id?: string;
}

// Application Types
export interface TDiscordApplication {
	id: string;
	name: string;
	icon: string | null;
	description: string;
	rpc_origins?: string[];
	bot_public: boolean;
	bot_require_code_grant: boolean;
	terms_of_service_url?: string;
	privacy_policy_url?: string;
	owner?: TDiscordUser;
	summary: string;
	verify_key: string;
	team: TDiscordTeam | null;
	guild_id?: string;
	primary_sku_id?: string;
	slug?: string;
	cover_image?: string;
	flags?: number;
	tags?: string[];
	install_params?: TDiscordInstallParams;
	custom_install_url?: string;
	role_connections_verification_url?: string;
}

export interface TDiscordTeam {
	icon: string | null;
	id: string;
	members: TDiscordTeamMember[];
	name: string;
	owner_user_id: string;
}

export interface TDiscordTeamMember {
	membership_state: number;
	permissions: string[];
	team_id: string;
	user: TDiscordUser;
}

export interface TDiscordInstallParams {
	scopes: string[];
	permissions: string;
}

// Message Reference Types
export interface TDiscordMessageReference {
	message_id?: string;
	channel_id?: string;
	guild_id?: string;
	fail_if_not_exists?: boolean;
}

// Message Interaction Types
export interface TDiscordMessageInteraction {
	id: string;
	type: number;
	name: string;
	user: TDiscordUser;
	member?: TDiscordGuildMember;
}

// Component Types
export interface TDiscordComponent {
	type: number;
	custom_id?: string;
	disabled?: boolean;
	style?: number;
	label?: string;
	emoji?: TDiscordEmoji;
	url?: string;
	options?: TDiscordSelectOption[];
	placeholder?: string;
	min_values?: number;
	max_values?: number;
	components?: TDiscordComponent[];
	min_length?: number;
	max_length?: number;
	required?: boolean;
	value?: string;
}

export interface TDiscordSelectOption {
	label: string;
	value: string;
	description?: string;
	emoji?: TDiscordEmoji;
	default?: boolean;
}

// Sticker Types
export interface TDiscordSticker {
	id: string;
	pack_id?: string;
	name: string;
	description: string | null;
	tags: string;
	asset?: string;
	type: number;
	format_type: number;
	available?: boolean;
	guild_id?: string;
	user?: TDiscordUser;
	sort_value?: number;
}

export interface TDiscordStickerItem {
	id: string;
	name: string;
	format_type: number;
}

// Role Subscription Types
export interface TDiscordRoleSubscriptionData {
	role_subscription_listing_id: string;
	tier_name: string;
	total_months_subscribed: number;
	is_renewal: boolean;
}

// Resolved Data Types (for interactions)
export interface TDiscordResolvedData {
	users?: Record<string, TDiscordUser>;
	members?: Record<string, TDiscordGuildMember>;
	roles?: Record<string, TDiscordRole>;
	channels?: Record<string, TDiscordChannel>;
	messages?: Record<string, TDiscordMessage>;
	attachments?: Record<string, TDiscordAttachment>;
}

// Welcome Screen Types
export interface TDiscordWelcomeScreen {
	description: string | null;
	welcome_channels: TDiscordWelcomeScreenChannel[];
}

export interface TDiscordWelcomeScreenChannel {
	channel_id: string;
	description: string;
	emoji_id: string | null;
	emoji_name: string | null;
}

// Invite Types
export interface TDiscordInvite {
	code: string;
	guild?: TDiscordGuild;
	channel: TDiscordChannel | null;
	inviter?: TDiscordUser;
	target_type?: number;
	target_user?: TDiscordUser;
	target_application?: TDiscordApplication;
	approximate_presence_count?: number;
	approximate_member_count?: number;
	expires_at?: string | null;
	stage_instance?: TDiscordStageInstance;
	guild_scheduled_event?: TDiscordGuildScheduledEvent;
}

// Stage Instance Types
export interface TDiscordStageInstance {
	id: string;
	guild_id: string;
	channel_id: string;
	topic: string;
	privacy_level: number;
	discoverable_disabled: boolean;
	guild_scheduled_event_id: string | null;
}

// Guild Scheduled Event Types
export interface TDiscordGuildScheduledEvent {
	id: string;
	guild_id: string;
	channel_id: string | null;
	creator_id?: string | null;
	name: string;
	description?: string | null;
	scheduled_start_time: string;
	scheduled_end_time: string | null;
	privacy_level: number;
	status: number;
	entity_type: number;
	entity_id: string | null;
	entity_metadata: TDiscordGuildScheduledEventEntityMetadata | null;
	creator?: TDiscordUser;
	user_count?: number;
	image?: string | null;
}

export interface TDiscordGuildScheduledEventEntityMetadata {
	location?: string;
}

// Webhook Types
export interface TDiscordWebhook {
	id: string;
	type: number;
	guild_id?: string | null;
	channel_id: string | null;
	user?: TDiscordUser;
	name: string | null;
	avatar: string | null;
	token?: string;
	application_id: string | null;
	source_guild?: TDiscordGuild;
	source_channel?: TDiscordChannel;
	url?: string;
}

// Audit Log Types
export interface TDiscordAuditLog {
	audit_log_entries: TDiscordAuditLogEntry[];
	guild_scheduled_events: TDiscordGuildScheduledEvent[];
	integrations: TDiscordIntegration[];
	threads: TDiscordChannel[];
	users: TDiscordUser[];
	webhooks: TDiscordWebhook[];
}

export interface TDiscordAuditLogEntry {
	target_id: string | null;
	changes?: TDiscordAuditLogChange[];
	user_id: string | null;
	id: string;
	action_type: number;
	options?: TDiscordAuditLogEntryInfo;
	reason?: string;
}

export interface TDiscordAuditLogChange {
	new_value?: any;
	old_value?: any;
	key: string;
}

export interface TDiscordAuditLogEntryInfo {
	delete_member_days?: string;
	members_removed?: string;
	channel_id?: string;
	message_id?: string;
	count?: string;
	id?: string;
	type?: string;
	role_name?: string;
}

// Integration Types
export interface TDiscordIntegration {
	id: string;
	name: string;
	type: string;
	enabled: boolean;
	syncing?: boolean;
	role_id?: string;
	enable_emoticons?: boolean;
	expire_behavior?: number;
	expire_grace_period?: number;
	user?: TDiscordUser;
	account: TDiscordIntegrationAccount;
	synced_at?: string;
	subscriber_count?: number;
	revoked?: boolean;
	application?: TDiscordIntegrationApplication;
	scopes?: string[];
}

export interface TDiscordIntegrationAccount {
	id: string;
	name: string;
}

export interface TDiscordIntegrationApplication {
	id: string;
	name: string;
	icon: string | null;
	description: string;
	bot?: TDiscordUser;
}

// Ban Types
export interface TDiscordBan {
	reason: string | null;
	user: TDiscordUser;
}

// Voice Region Types
export interface TDiscordVoiceRegion {
	id: string;
	name: string;
	optimal: boolean;
	deprecated: boolean;
	custom: boolean;
}

// Auto Moderation Types
export interface TDiscordAutoModerationRule {
	id: string;
	guild_id: string;
	name: string;
	creator_id: string;
	event_type: number;
	trigger_type: number;
	trigger_metadata: TDiscordAutoModerationTriggerMetadata;
	actions: TDiscordAutoModerationAction[];
	enabled: boolean;
	exempt_roles: string[];
	exempt_channels: string[];
}

export interface TDiscordAutoModerationTriggerMetadata {
	keyword_filter?: string[];
	regex_patterns?: string[];
	presets?: number[];
	allow_list?: string[];
	mention_total_limit?: number;
}

export interface TDiscordAutoModerationAction {
	type: number;
	metadata?: TDiscordAutoModerationActionMetadata;
}

export interface TDiscordAutoModerationActionMetadata {
	channel_id?: string;
	duration_seconds?: number;
	custom_message?: string;
}

// Guild Template Types
export interface TDiscordGuildTemplate {
	code: string;
	name: string;
	description: string | null;
	usage_count: number;
	creator_id: string;
	creator: TDiscordUser;
	created_at: string;
	updated_at: string;
	source_guild_id: string;
	serialized_source_guild: Partial<TDiscordGuild>;
	is_dirty: boolean | null;
}

// Guild Widget Types
export interface TDiscordGuildWidget {
	id: string;
	name: string;
	instant_invite: string | null;
	channels: Partial<TDiscordChannel>[];
	members: Partial<TDiscordUser>[];
	presence_count: number;
}

export interface TDiscordGuildWidgetSettings {
	enabled: boolean;
	channel_id: string | null;
}

// Guild Onboarding Types
export interface TDiscordGuildOnboarding {
	guild_id: string;
	prompts: TDiscordOnboardingPrompt[];
	default_channel_ids: string[];
	enabled: boolean;
}

export interface TDiscordOnboardingPrompt {
	id: string;
	type: number;
	options: TDiscordPromptOption[];
	title: string;
	single_select: boolean;
	required: boolean;
	in_onboarding: boolean;
}

export interface TDiscordPromptOption {
	id: string;
	channel_ids: string[];
	role_ids: string[];
	emoji?: TDiscordEmoji;
	title: string;
	description: string | null;
}

// Application Command Types
export interface TDiscordApplicationCommand {
	id: string;
	type?: number;
	application_id: string;
	guild_id?: string;
	name: string;
	name_localizations?: Record<string, string> | null;
	description: string;
	description_localizations?: Record<string, string> | null;
	options?: TDiscordApplicationCommandOption[];
	default_member_permissions: string | null;
	dm_permission?: boolean;
	default_permission?: boolean | null;
	nsfw?: boolean;
	version: string;
}

export interface TDiscordApplicationCommandOption {
	type: number;
	name: string;
	name_localizations?: Record<string, string> | null;
	description: string;
	description_localizations?: Record<string, string> | null;
	required?: boolean;
	choices?: TDiscordApplicationCommandOptionChoice[];
	options?: TDiscordApplicationCommandOption[];
	channel_types?: number[];
	min_value?: number;
	max_value?: number;
	min_length?: number;
	max_length?: number;
	autocomplete?: boolean;
}

export interface TDiscordApplicationCommandOptionChoice {
	name: string;
	name_localizations?: Record<string, string> | null;
	value: string | number;
}

// Interaction Types
export interface TDiscordInteraction {
	id: string;
	application_id: string;
	type: number;
	data?: TDiscordInteractionData;
	guild_id?: string;
	channel_id?: string;
	member?: TDiscordGuildMember;
	user?: TDiscordUser;
	token: string;
	version: number;
	message?: TDiscordMessage;
	app_permissions?: string;
	locale?: string;
	guild_locale?: string;
}

export interface TDiscordInteractionData {
	id?: string;
	name?: string;
	type?: number;
	resolved?: TDiscordResolvedData;
	options?: TDiscordInteractionDataOption[];
	custom_id?: string;
	component_type?: number;
	values?: string[];
	target_id?: string;
	components?: TDiscordComponent[];
}

export interface TDiscordInteractionDataOption {
	name: string;
	type: number;
	value?: string | number | boolean;
	options?: TDiscordInteractionDataOption[];
	focused?: boolean;
}

// Interaction Response Types
export interface TDiscordInteractionResponse {
	type: number;
	data?: TDiscordInteractionResponseData;
}

export interface TDiscordInteractionResponseData {
	tts?: boolean;
	content?: string;
	embeds?: TDiscordEmbed[];
	allowed_mentions?: TDiscordAllowedMentions;
	flags?: number;
	components?: TDiscordComponent[];
	attachments?: TDiscordAttachment[];
	choices?: TDiscordApplicationCommandOptionChoice[];
}

// Allowed Mentions Types
export interface TDiscordAllowedMentions {
	parse?: string[];
	roles?: string[];
	users?: string[];
	replied_user?: boolean;
}

// Activity Types
export interface TDiscordActivity {
	name: string;
	type: number;
	url?: string | null;
	created_at: number;
	timestamps?: TDiscordActivityTimestamps;
	application_id?: string;
	details?: string | null;
	state?: string | null;
	emoji?: TDiscordActivityEmoji | null;
	party?: TDiscordActivityParty;
	assets?: TDiscordActivityAssets;
	secrets?: TDiscordActivitySecrets;
	instance?: boolean;
	flags?: number;
	buttons?: TDiscordActivityButton[];
}

export interface TDiscordActivityTimestamps {
	start?: number;
	end?: number;
}

export interface TDiscordActivityEmoji {
	name: string;
	id?: string;
	animated?: boolean;
}

export interface TDiscordActivityParty {
	id?: string;
	size?: [number, number];
}

export interface TDiscordActivityAssets {
	large_image?: string;
	large_text?: string;
	small_image?: string;
	small_text?: string;
}

export interface TDiscordActivitySecrets {
	join?: string;
	spectate?: string;
	match?: string;
}

export interface TDiscordActivityButton {
	label: string;
	url: string;
}

// Presence Types
export interface TDiscordPresenceUpdate {
	user: Partial<TDiscordUser>;
	guild_id: string;
	status: string;
	activities: TDiscordActivity[];
	client_status: TDiscordClientStatus;
}

export interface TDiscordClientStatus {
	desktop?: string;
	mobile?: string;
	web?: string;
}

// Voice State Types
export interface TDiscordVoiceState {
	guild_id?: string;
	channel_id: string | null;
	user_id: string;
	member?: TDiscordGuildMember;
	session_id: string;
	deaf: boolean;
	mute: boolean;
	self_deaf: boolean;
	self_mute: boolean;
	self_stream?: boolean;
	self_video: boolean;
	suppress: boolean;
	request_to_speak_timestamp: string | null;
}

// Enums and Constants
export enum DiscordChannelType {
	GUILD_TEXT = 0,
	DM = 1,
	GUILD_VOICE = 2,
	GROUP_DM = 3,
	GUILD_CATEGORY = 4,
	GUILD_ANNOUNCEMENT = 5,
	ANNOUNCEMENT_THREAD = 10,
	PUBLIC_THREAD = 11,
	PRIVATE_THREAD = 12,
	GUILD_STAGE_VOICE = 13,
	GUILD_DIRECTORY = 14,
	GUILD_FORUM = 15,
	GUILD_MEDIA = 16,
}

export enum DiscordMessageType {
	DEFAULT = 0,
	RECIPIENT_ADD = 1,
	RECIPIENT_REMOVE = 2,
	CALL = 3,
	CHANNEL_NAME_CHANGE = 4,
	CHANNEL_ICON_CHANGE = 5,
	CHANNEL_PINNED_MESSAGE = 6,
	USER_JOIN = 7,
	GUILD_BOOST = 8,
	GUILD_BOOST_TIER_1 = 9,
	GUILD_BOOST_TIER_2 = 10,
	GUILD_BOOST_TIER_3 = 11,
	CHANNEL_FOLLOW_ADD = 12,
	GUILD_DISCOVERY_DISQUALIFIED = 14,
	GUILD_DISCOVERY_REQUALIFIED = 15,
	GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING = 16,
	GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING = 17,
	THREAD_CREATED = 18,
	REPLY = 19,
	CHAT_INPUT_COMMAND = 20,
	THREAD_STARTER_MESSAGE = 21,
	GUILD_INVITE_REMINDER = 22,
	CONTEXT_MENU_COMMAND = 23,
	AUTO_MODERATION_ACTION = 24,
	ROLE_SUBSCRIPTION_PURCHASE = 25,
	INTERACTION_PREMIUM_UPSELL = 26,
	STAGE_START = 27,
	STAGE_END = 28,
	STAGE_SPEAKER = 29,
	STAGE_TOPIC = 31,
	GUILD_APPLICATION_PREMIUM_SUBSCRIPTION = 32,
}

// Discord Permission Flags
// Note: Using BigInt for values that exceed JavaScript's safe integer range
export const DiscordPermissionFlags = {
	CREATE_INSTANT_INVITE: 1 << 0,
	KICK_MEMBERS: 1 << 1,
	BAN_MEMBERS: 1 << 2,
	ADMINISTRATOR: 1 << 3,
	MANAGE_CHANNELS: 1 << 4,
	MANAGE_GUILD: 1 << 5,
	ADD_REACTIONS: 1 << 6,
	VIEW_AUDIT_LOG: 1 << 7,
	PRIORITY_SPEAKER: 1 << 8,
	STREAM: 1 << 9,
	VIEW_CHANNEL: 1 << 10,
	SEND_MESSAGES: 1 << 11,
	SEND_TTS_MESSAGES: 1 << 12,
	MANAGE_MESSAGES: 1 << 13,
	EMBED_LINKS: 1 << 14,
	ATTACH_FILES: 1 << 15,
	READ_MESSAGE_HISTORY: 1 << 16,
	MENTION_EVERYONE: 1 << 17,
	USE_EXTERNAL_EMOJIS: 1 << 18,
	VIEW_GUILD_INSIGHTS: 1 << 19,
	CONNECT: 1 << 20,
	SPEAK: 1 << 21,
	MUTE_MEMBERS: 1 << 22,
	DEAFEN_MEMBERS: 1 << 23,
	MOVE_MEMBERS: 1 << 24,
	USE_VAD: 1 << 25,
	CHANGE_NICKNAME: 1 << 26,
	MANAGE_NICKNAMES: 1 << 27,
	MANAGE_ROLES: 1 << 28,
	MANAGE_WEBHOOKS: 1 << 29,
	MANAGE_GUILD_EXPRESSIONS: 1 << 30,
	USE_APPLICATION_COMMANDS: 2147483648, // 1 << 31
	REQUEST_TO_SPEAK: 0x100000000, // 1n << 32n
	MANAGE_EVENTS: 0x200000000, // 1n << 33n
	MANAGE_THREADS: 0x400000000, // 1n << 34n
	CREATE_PUBLIC_THREADS: 0x800000000, // 1n << 35n
	CREATE_PRIVATE_THREADS: 0x1000000000, // 1n << 36n
	USE_EXTERNAL_STICKERS: 0x2000000000, // 1n << 37n
	SEND_MESSAGES_IN_THREADS: 0x4000000000, // 1n << 38n
	USE_EMBEDDED_ACTIVITIES: 0x8000000000, // 1n << 39n
	MODERATE_MEMBERS: 0x10000000000, // 1n << 40n
	VIEW_CREATOR_MONETIZATION_ANALYTICS: 0x20000000000, // 1n << 41n
	USE_SOUNDBOARD: 0x40000000000, // 1n << 42n
	USE_EXTERNAL_SOUNDS: 0x200000000000, // 1n << 45n
	SEND_VOICE_MESSAGES: 0x400000000000, // 1n << 46n
} as const;

export enum DiscordIntents {
	GUILDS = 1 << 0,
	GUILD_MEMBERS = 1 << 1,
	GUILD_MODERATION = 1 << 2,
	GUILD_EMOJIS_AND_STICKERS = 1 << 3,
	GUILD_INTEGRATIONS = 1 << 4,
	GUILD_WEBHOOKS = 1 << 5,
	GUILD_INVITES = 1 << 6,
	GUILD_VOICE_STATES = 1 << 7,
	GUILD_PRESENCES = 1 << 8,
	GUILD_MESSAGES = 1 << 9,
	GUILD_MESSAGE_REACTIONS = 1 << 10,
	GUILD_MESSAGE_TYPING = 1 << 11,
	DIRECT_MESSAGES = 1 << 12,
	DIRECT_MESSAGE_REACTIONS = 1 << 13,
	DIRECT_MESSAGE_TYPING = 1 << 14,
	MESSAGE_CONTENT = 1 << 15,
	GUILD_SCHEDULED_EVENTS = 1 << 16,
	AUTO_MODERATION_CONFIGURATION = 1 << 20,
	AUTO_MODERATION_EXECUTION = 1 << 21,
}
