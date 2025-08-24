import { createApiBuilder, defineResource, type TModule } from "../core";

const NOTION_API_BASE = "https://api.notion.com/v1";

const pageResource = defineResource({
	name: "pages",
	basePath: "/pages",
	methods: {
		getPage: { path: "/{page_id}" },
		createPage: { path: "", method: "POST" },
		updatePage: { path: "/{page_id}", method: "PATCH" },
		archivePage: { path: "/{page_id}", method: "PATCH" },
		trashPage: { path: "/{page_id}", method: "PATCH" },
		getPageProperty: { path: "/{page_id}/properties/{property_id}" },
	},
});

const databaseResource = defineResource({
	name: "databases",
	basePath: "/databases",
	methods: {
		getDatabase: { path: "/{database_id}" },
		createDatabase: { path: "", method: "POST" },
		updateDatabase: { path: "/{database_id}", method: "PATCH" },
		queryDatabase: { path: "/{database_id}/query", method: "POST" },
	},
});

const blockResource = defineResource({
	name: "blocks",
	basePath: "/blocks",
	methods: {
		getBlock: { path: "/{block_id}" },
		updateBlock: { path: "/{block_id}", method: "PATCH" },
		deleteBlock: { path: "/{block_id}", method: "DELETE" },
		getBlockChildren: { path: "/{block_id}/children" },
		appendBlockChildren: { path: "/{block_id}/children", method: "PATCH" },
	},
});

const userResource = defineResource({
	name: "users",
	basePath: "/users",
	methods: {
		getUser: { path: "/{user_id}" },
		getCurrentUser: { path: "/me" },
		listUsers: { path: "" },
	},
});

const commentResource = defineResource({
	name: "comments",
	basePath: "/comments",
	methods: {
		createComment: { path: "", method: "POST" },
		getComments: { path: "" },
	},
});

const searchResource = defineResource({
	name: "search",
	basePath: "/search",
	methods: {
		search: { path: "", method: "POST" },
	},
});

// Create the API builder with Notion-specific defaults
const buildNotionApi = createApiBuilder({
	baseUrl: NOTION_API_BASE,
	auth: { type: "bearer" },
	headers: {
		"Notion-Version": "2022-06-28",
		"User-Agent": "@remcostoeten/fync notion-client",
	},
});

// Define the Notion module type
type TNotionModule = TModule<{
	pages: typeof pageResource;
	databases: typeof databaseResource;
	blocks: typeof blockResource;
	users: typeof userResource;
	comments: typeof commentResource;
	search: typeof searchResource;
}> & {
	// High-level helper methods
	helpers: {
		createPageInDatabase(
			databaseId: string,
			properties: Record<string, any>,
			content?: any[]
		): Promise<any>;
		createPageWithContent(
			parent: { type: string; [key: string]: any },
			title: string,
			content: any[]
		): Promise<any>;
		createRichText(text: string): Array<{
			type: "text";
			text: { content: string; link: null };
			plain_text: string;
			href: null;
		}>;
		getAllPagesFromDatabase(databaseId: string): Promise<any[]>;
		getAllSearchResults(query: string, filter?: any): Promise<any[]>;
	};
	// Convenience methods
	getPage(pageId: string): Promise<any>;
	createPage(data: any): Promise<any>;
	updatePage(pageId: string, data: any): Promise<any>;
	archivePage(pageId: string): Promise<any>;
	trashPage(pageId: string): Promise<any>;
	getPageProperty(pageId: string, propertyId: string): Promise<any>;
	getDatabase(databaseId: string): Promise<any>;
	createDatabase(data: any): Promise<any>;
	updateDatabase(databaseId: string, data: any): Promise<any>;
	queryDatabase(databaseId: string, query?: any): Promise<any>;
	getBlock(blockId: string): Promise<any>;
	updateBlock(blockId: string, data: any): Promise<any>;
	deleteBlock(blockId: string): Promise<any>;
	getBlockChildren(blockId: string, startCursor?: string, pageSize?: number): Promise<any>;
	appendBlockChildren(blockId: string, children: any[]): Promise<any>;
	getUser(userId: string): Promise<any>;
	getCurrentUser(): Promise<any>;
	listUsers(startCursor?: string, pageSize?: number): Promise<any>;
	createComment(data: any): Promise<any>;
	getComments(blockId: string, startCursor?: string, pageSize?: number): Promise<any>;
	search(query: string, options?: any): Promise<any>;
	searchPages(query: string, options?: any): Promise<any>;
	searchDatabases(query: string, options?: any): Promise<any>;
	// Block content helper methods
	addTextBlock(blockId: string, text: string, type?: string): Promise<any>;
	addToDoBlock(blockId: string, text: string, checked?: boolean): Promise<any>;
	addBulletedListItem(blockId: string, text: string): Promise<any>;
	addNumberedListItem(blockId: string, text: string): Promise<any>;
	addToggleBlock(blockId: string, text: string, children?: any[]): Promise<any>;
	addCalloutBlock(blockId: string, text: string, emoji?: string): Promise<any>;
	addQuoteBlock(blockId: string, text: string): Promise<any>;
	addCodeBlock(blockId: string, code: string, language?: string): Promise<any>;
	addDividerBlock(blockId: string): Promise<any>;
	addBookmarkBlock(blockId: string, url: string): Promise<any>;
	addImageBlock(blockId: string, url: string, caption?: string): Promise<any>;
	addVideoBlock(blockId: string, url: string, caption?: string): Promise<any>;
	addFileBlock(blockId: string, url: string, caption?: string): Promise<any>;
	addEmbedBlock(blockId: string, url: string): Promise<any>;
	addEquationBlock(blockId: string, expression: string): Promise<any>;
	addTableOfContentsBlock(blockId: string): Promise<any>;
	addChildPageBlock(blockId: string, title: string): Promise<any>;
	addChildDatabaseBlock(blockId: string, title: string): Promise<any>;
};

// Helper function to create rich text
function createRichText(text: string): Array<{
	type: "text";
	text: { content: string; link: null };
	plain_text: string;
	href: null;
}> {
	return [
		{
			type: "text",
			text: {
				content: text,
				link: null,
			},
			plain_text: text,
			href: null,
		},
	];
}

// Helper function to create rich text with caption
function createRichTextWithCaption(caption?: string) {
	return caption ? createRichText(caption) : undefined;
}

// Create the Notion module
function Notion(config: { token: string; baseUrl?: string; timeout?: number }): TNotionModule {
	const base = buildNotionApi(
		{
			token: config.token,
			baseUrl: config.baseUrl || NOTION_API_BASE,
			timeout: config.timeout,
		},
		{
			pages: pageResource,
			databases: databaseResource,
			blocks: blockResource,
			users: userResource,
			comments: commentResource,
			search: searchResource,
		}
	);

	const notion = base as unknown as TNotionModule;

	// Add high-level helper methods
	notion.helpers = {
		createPageInDatabase: async (databaseId: string, properties: Record<string, any>, content?: any[]) => {
			return base.pages.createPage({
				parent: { type: "database_id", database_id: databaseId },
				properties,
				children: content,
			});
		},

		createPageWithContent: async (
			parent: { type: string; [key: string]: any },
			title: string,
			content: any[]
		) => {
			const properties: Record<string, any> = {
				title: {
					title: createRichText(title),
				},
			};

			return base.pages.createPage({
				parent,
				properties,
				children: content,
			});
		},

		createRichText,

		getAllPagesFromDatabase: async (databaseId: string) => {
			const pages: any[] = [];
			let cursor: string | undefined;
			let hasMore = true;

			while (hasMore) {
				const response = await base.databases.queryDatabase({
					database_id: databaseId,
					start_cursor: cursor,
					page_size: 100,
				});

				pages.push(...response.results);
				hasMore = response.has_more;
				cursor = response.next_cursor || undefined;
			}

			return pages;
		},

		getAllSearchResults: async (query: string, filter?: any) => {
			const results: any[] = [];
			let cursor: string | undefined;
			let hasMore = true;

			while (hasMore) {
				const response = await base.search.search({
					query,
					filter,
					start_cursor: cursor,
					page_size: 100,
				});

				results.push(...response.results);
				hasMore = response.has_more;
				cursor = response.next_cursor || undefined;
			}

			return results;
		},
	};

	// Add convenience methods for common operations
	notion.getPage = function (pageId: string) {
		return base.pages.getPage({ page_id: pageId });
	};

	notion.createPage = function (data: any) {
		return base.pages.createPage(data);
	};

	notion.updatePage = function (pageId: string, data: any) {
		return base.pages.updatePage({ page_id: pageId }, data);
	};

	notion.archivePage = function (pageId: string) {
		return base.pages.archivePage({ page_id: pageId }, { archived: true });
	};

	notion.trashPage = function (pageId: string) {
		return base.pages.trashPage({ page_id: pageId }, { in_trash: true });
	};

	notion.getPageProperty = function (pageId: string, propertyId: string) {
		return base.pages.getPageProperty({ page_id: pageId, property_id: propertyId });
	};

	notion.getDatabase = function (databaseId: string) {
		return base.databases.getDatabase({ database_id: databaseId });
	};

	notion.createDatabase = function (data: any) {
		return base.databases.createDatabase(data);
	};

	notion.updateDatabase = function (databaseId: string, data: any) {
		return base.databases.updateDatabase({ database_id: databaseId }, data);
	};

	notion.queryDatabase = function (databaseId: string, query?: any) {
		return base.databases.queryDatabase({ database_id: databaseId }, query || {});
	};

	notion.getBlock = function (blockId: string) {
		return base.blocks.getBlock({ block_id: blockId });
	};

	notion.updateBlock = function (blockId: string, data: any) {
		return base.blocks.updateBlock({ block_id: blockId }, data);
	};

	notion.deleteBlock = function (blockId: string) {
		return base.blocks.deleteBlock({ block_id: blockId });
	};

	notion.getBlockChildren = function (blockId: string, startCursor?: string, pageSize?: number) {
		const params: Record<string, string | number> = {};
		if (startCursor) params.start_cursor = startCursor;
		if (pageSize) params.page_size = pageSize;
		return base.blocks.getBlockChildren({ block_id: blockId }, params);
	};

	notion.appendBlockChildren = function (blockId: string, children: any[]) {
		return base.blocks.appendBlockChildren({ block_id: blockId }, { children });
	};

	notion.getUser = function (userId: string) {
		return base.users.getUser({ user_id: userId });
	};

	notion.getCurrentUser = function () {
		return base.users.getCurrentUser();
	};

	notion.listUsers = function (startCursor?: string, pageSize?: number) {
		const params: Record<string, string | number> = {};
		if (startCursor) params.start_cursor = startCursor;
		if (pageSize) params.page_size = pageSize;
		return base.users.listUsers(params);
	};

	notion.createComment = function (data: any) {
		return base.comments.createComment(data);
	};

	notion.getComments = function (blockId: string, startCursor?: string, pageSize?: number) {
		const params: Record<string, string | number> = { block_id: blockId };
		if (startCursor) params.start_cursor = startCursor;
		if (pageSize) params.page_size = pageSize;
		return base.comments.getComments(params);
	};

	// Override the search method to provide a more convenient interface
	(notion as any).search = function (query: string, options?: any) {
		return base.search.search({ query, ...options });
	};

	(notion as any).searchPages = function (query: string, options?: any) {
		return base.search.search({
			query,
			filter: { value: "page", property: "object" },
			...options,
		});
	};

	(notion as any).searchDatabases = function (query: string, options?: any) {
		return base.search.search({
			query,
			filter: { value: "database", property: "object" },
			...options,
		});
	};

	// Add block content helper methods
	notion.addTextBlock = function (blockId: string, text: string, type = "paragraph") {
		const blockData = {
			children: [
				{
					object: "block",
					type,
					[type]: {
						rich_text: createRichText(text),
					},
				},
			],
		};
		return base.blocks.appendBlockChildren({ block_id: blockId }, blockData);
	};

	notion.addToDoBlock = function (blockId: string, text: string, checked = false) {
		const blockData = {
			children: [
				{
					object: "block",
					type: "to_do",
					to_do: {
						rich_text: createRichText(text),
						checked,
					},
				},
			],
		};
		return base.blocks.appendBlockChildren({ block_id: blockId }, blockData);
	};

	notion.addBulletedListItem = function (blockId: string, text: string) {
		const blockData = {
			children: [
				{
					object: "block",
					type: "bulleted_list_item",
					bulleted_list_item: {
						rich_text: createRichText(text),
					},
				},
			],
		};
		return base.blocks.appendBlockChildren({ block_id: blockId }, blockData);
	};

	notion.addNumberedListItem = function (blockId: string, text: string) {
		const blockData = {
			children: [
				{
					object: "block",
					type: "numbered_list_item",
					numbered_list_item: {
						rich_text: createRichText(text),
					},
				},
			],
		};
		return base.blocks.appendBlockChildren({ block_id: blockId }, blockData);
	};

	notion.addToggleBlock = function (blockId: string, text: string, children?: any[]) {
		const blockData = {
			children: [
				{
					object: "block",
					type: "toggle",
					toggle: {
						rich_text: createRichText(text),
					},
					children: children || [],
				},
			],
		};
		return base.blocks.appendBlockChildren({ block_id: blockId }, blockData);
	};

	notion.addCalloutBlock = function (blockId: string, text: string, emoji = "💡") {
		const blockData = {
			children: [
				{
					object: "block",
					type: "callout",
					callout: {
						rich_text: createRichText(text),
						icon: {
							type: "emoji",
							emoji,
						},
					},
				},
			],
		};
		return base.blocks.appendBlockChildren({ block_id: blockId }, blockData);
	};

	notion.addQuoteBlock = function (blockId: string, text: string) {
		const blockData = {
			children: [
				{
					object: "block",
					type: "quote",
					quote: {
						rich_text: createRichText(text),
					},
				},
			],
		};
		return base.blocks.appendBlockChildren({ block_id: blockId }, blockData);
	};

	notion.addCodeBlock = function (blockId: string, code: string, language = "plain text") {
		const blockData = {
			children: [
				{
					object: "block",
					type: "code",
					code: {
						rich_text: createRichText(code),
						language,
						caption: [],
					},
				},
			],
		};
		return base.blocks.appendBlockChildren({ block_id: blockId }, blockData);
	};

	notion.addDividerBlock = function (blockId: string) {
		const blockData = {
			children: [
				{
					object: "block",
					type: "divider",
					divider: {},
				},
			],
		};
		return base.blocks.appendBlockChildren({ block_id: blockId }, blockData);
	};

	notion.addBookmarkBlock = function (blockId: string, url: string) {
		const blockData = {
			children: [
				{
					object: "block",
					type: "bookmark",
					bookmark: {
						url,
					},
				},
			],
		};
		return base.blocks.appendBlockChildren({ block_id: blockId }, blockData);
	};

	notion.addImageBlock = function (blockId: string, url: string, caption?: string) {
		const blockData = {
			children: [
				{
					object: "block",
					type: "image",
					image: {
						type: "external",
						external: {
							url,
						},
						caption: createRichTextWithCaption(caption),
					},
				},
			],
		};
		return base.blocks.appendBlockChildren({ block_id: blockId }, blockData);
	};

	notion.addVideoBlock = function (blockId: string, url: string, caption?: string) {
		const blockData = {
			children: [
				{
					object: "block",
					type: "video",
					video: {
						type: "external",
						external: {
							url,
						},
						caption: createRichTextWithCaption(caption),
					},
				},
			],
		};
		return base.blocks.appendBlockChildren({ block_id: blockId }, blockData);
	};

	notion.addFileBlock = function (blockId: string, url: string, caption?: string) {
		const blockData = {
			children: [
				{
					object: "block",
					type: "file",
					file: {
						type: "external",
						external: {
							url,
						},
						caption: createRichTextWithCaption(caption),
					},
				},
			],
		};
		return base.blocks.appendBlockChildren({ block_id: blockId }, blockData);
	};

	notion.addEmbedBlock = function (blockId: string, url: string) {
		const blockData = {
			children: [
				{
					object: "block",
					type: "embed",
					embed: {
						url,
					},
				},
			],
		};
		return base.blocks.appendBlockChildren({ block_id: blockId }, blockData);
	};

	notion.addEquationBlock = function (blockId: string, expression: string) {
		const blockData = {
			children: [
				{
					object: "block",
					type: "equation",
					equation: {
						expression,
					},
				},
			],
		};
		return base.blocks.appendBlockChildren({ block_id: blockId }, blockData);
	};

	notion.addTableOfContentsBlock = function (blockId: string) {
		const blockData = {
			children: [
				{
					object: "block",
					type: "table_of_contents",
					table_of_contents: {},
				},
			],
		};
		return base.blocks.appendBlockChildren({ block_id: blockId }, blockData);
	};

	notion.addChildPageBlock = function (blockId: string, title: string) {
		const blockData = {
			children: [
				{
					object: "block",
					type: "child_page",
					child_page: {
						title,
					},
				},
			],
		};
		return base.blocks.appendBlockChildren({ block_id: blockId }, blockData);
	};

	notion.addChildDatabaseBlock = function (blockId: string, title: string) {
		const blockData = {
			children: [
				{
					object: "block",
					type: "child_database",
					child_database: {
						title,
					},
				},
			],
		};
		return base.blocks.appendBlockChildren({ block_id: blockId }, blockData);
	};

	return notion;
}

export { Notion };
export type { TNotionModule };
