import { createApiBuilder, defineResource, type TModule } from "../core";

const NOTION_API_BASE = "https://api.notion.com/v1";

const pagesResource = defineResource({
	name: "pages",
	basePath: "/pages",
	methods: {
		getPage: { path: "/{page_id}" },
		createPage: { path: "", method: "POST" },
		updatePage: { path: "/{page_id}", method: "PATCH" },
		getPageProperty: { path: "/{page_id}/properties/{property_id}" },
	},
});

const databasesResource = defineResource({
	name: "databases",
	basePath: "/databases",
	methods: {
		getDatabase: { path: "/{database_id}" },
		createDatabase: { path: "", method: "POST" },
		updateDatabase: { path: "/{database_id}", method: "PATCH" },
		queryDatabase: { path: "/{database_id}/query", method: "POST" },
	},
});

const blocksResource = defineResource({
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

const usersResource = defineResource({
	name: "users",
	basePath: "/users",
	methods: {
		getUser: { path: "/{user_id}" },
		getCurrentUser: { path: "/me" },
		listUsers: { path: "" },
	},
});

const commentsResource = defineResource({
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

const resources = {
	pages: pagesResource,
	databases: databasesResource,
	blocks: blocksResource,
	users: usersResource,
	comments: commentsResource,
	search: searchResource,
};

const buildNotion = createApiBuilder({
	baseUrl: NOTION_API_BASE,
	auth: { type: "bearer" as const },
	headers: {
		"Notion-Version": "2022-06-28",
		"Content-Type": "application/json",
	},
});

type TNotionModule = TModule<typeof resources> & {
	getPage: (pageId: string) => Promise<any>;
	createPage: (data: any) => Promise<any>;
	updatePage: (pageId: string, data: any) => Promise<any>;
	archivePage: (pageId: string) => Promise<any>;
	getPageProperty: (pageId: string, propertyId: string) => Promise<any>;
	getDatabase: (databaseId: string) => Promise<any>;
	createDatabase: (data: any) => Promise<any>;
	updateDatabase: (databaseId: string, data: any) => Promise<any>;
	queryDatabase: (databaseId: string, query?: any) => Promise<any>;
	getBlock: (blockId: string) => Promise<any>;
	updateBlock: (blockId: string, data: any) => Promise<any>;
	deleteBlock: (blockId: string) => Promise<any>;
	getBlockChildren: (blockId: string, startCursor?: string, pageSize?: number) => Promise<any>;
	appendBlockChildren: (blockId: string, children: any[]) => Promise<any>;
	getUser: (userId: string) => Promise<any>;
	getCurrentUser: () => Promise<any>;
	listUsers: (startCursor?: string, pageSize?: number) => Promise<any>;
	createComment: (data: any) => Promise<any>;
	getComments: (blockId: string, startCursor?: string, pageSize?: number) => Promise<any>;
	search: (query: string, options?: any) => Promise<any>;
	searchPages: (query: string, options?: any) => Promise<any>;
	searchDatabases: (query: string, options?: any) => Promise<any>;
	createPageInDatabase: (databaseId: string, properties: Record<string, any>, content?: any[]) => Promise<any>;
	createPageWithContent: (parent: { type: string; [key: string]: any }, title: string, content: any[]) => Promise<any>;
	createRichText: (text: string) => Array<{ type: "text"; text: { content: string; link: null }; plain_text: string; href: null }>;
	addTextBlock: (blockId: string, text: string, type?: string) => Promise<any>;
	addToDoBlock: (blockId: string, text: string, checked?: boolean) => Promise<any>;
	addBulletedListItem: (blockId: string, text: string) => Promise<any>;
	addNumberedListItem: (blockId: string, text: string) => Promise<any>;
	addToggleBlock: (blockId: string, text: string, children?: any[]) => Promise<any>;
	addCalloutBlock: (blockId: string, text: string, emoji?: string) => Promise<any>;
	addQuoteBlock: (blockId: string, text: string) => Promise<any>;
	addCodeBlock: (blockId: string, code: string, language?: string) => Promise<any>;
	addDividerBlock: (blockId: string) => Promise<any>;
};

export function Notion(config: { token: string; notionVersion?: string }): TNotionModule {
	const configWithHeaders = config.notionVersion ? 
		{ ...config, headers: { "Notion-Version": config.notionVersion } } : 
		config;
	
	const base = buildNotion(configWithHeaders, resources);
	const notion = base as unknown as TNotionModule;

	notion.getPage = function (pageId: string) {
		return base.pages.getPage({ page_id: pageId });
	};

	notion.createPage = function (data: any) {
		return base.pages.createPage(data);
	};

	notion.updatePage = function (pageId: string, data: any) {
		return base.pages.updatePage(data, { page_id: pageId });
	};

	notion.archivePage = function (pageId: string) {
		return base.pages.updatePage({ archived: true }, { page_id: pageId });
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
		return base.databases.updateDatabase(data, { database_id: databaseId });
	};

	notion.queryDatabase = function (databaseId: string, query?: any) {
		return base.databases.queryDatabase(query || {}, { database_id: databaseId });
	};

	notion.getBlock = function (blockId: string) {
		return base.blocks.getBlock({ block_id: blockId });
	};

	notion.updateBlock = function (blockId: string, data: any) {
		return base.blocks.updateBlock(data, { block_id: blockId });
	};

	notion.deleteBlock = function (blockId: string) {
		return base.blocks.deleteBlock({ block_id: blockId });
	};

	notion.getBlockChildren = function (blockId: string, startCursor?: string, pageSize?: number) {
		const params: any = { block_id: blockId };
		if (startCursor) params.start_cursor = startCursor;
		if (pageSize) params.page_size = pageSize;
		return base.blocks.getBlockChildren(params);
	};

	notion.appendBlockChildren = function (blockId: string, children: any[]) {
		return base.blocks.appendBlockChildren({ children }, { block_id: blockId });
	};

	notion.getUser = function (userId: string) {
		return base.users.getUser({ user_id: userId });
	};

	notion.getCurrentUser = function () {
		return base.users.getCurrentUser({});
	};

	notion.listUsers = function (startCursor?: string, pageSize?: number) {
		const params: any = {};
		if (startCursor) params.start_cursor = startCursor;
		if (pageSize) params.page_size = pageSize;
		return base.users.listUsers(params);
	};

	notion.createComment = function (data: any) {
		return base.comments.createComment(data);
	};

	notion.getComments = function (blockId: string, startCursor?: string, pageSize?: number) {
		const params: any = { block_id: blockId };
		if (startCursor) params.start_cursor = startCursor;
		if (pageSize) params.page_size = pageSize;
		return base.comments.getComments(params);
	};

	(notion as any).search = function (query: string, options?: any) {
		return base.search.search({ query, ...options });
	};

	notion.searchPages = function (query: string, options?: any) {
		return base.search.search({ query, filter: { property: "object", value: "page" }, ...options });
	};

	notion.searchDatabases = function (query: string, options?: any) {
		return base.search.search({ query, filter: { property: "object", value: "database" }, ...options });
	};

	notion.createRichText = function (text: string) {
		return [{ type: "text", text: { content: text, link: null }, plain_text: text, href: null }];
	};

	notion.createPageInDatabase = function (databaseId: string, properties: Record<string, any>, content?: any[]) {
		return base.pages.createPage({ parent: { database_id: databaseId }, properties, children: content || [] });
	};

	notion.createPageWithContent = function (parent: { type: string; [key: string]: any }, title: string, content: any[]) {
		return base.pages.createPage({ parent, properties: { title: { title: notion.createRichText(title) } }, children: content });
	};

	notion.addTextBlock = function (blockId: string, text: string, type?: string) {
		const blockType = type || "paragraph";
		const children = [{ type: blockType, [blockType]: { rich_text: notion.createRichText(text) } }];
		return base.blocks.appendBlockChildren({ children }, { block_id: blockId });
	};

	notion.addToDoBlock = function (blockId: string, text: string, checked?: boolean) {
		const children = [{ type: "to_do", to_do: { rich_text: notion.createRichText(text), checked: checked || false } }];
		return base.blocks.appendBlockChildren({ children }, { block_id: blockId });
	};

	notion.addBulletedListItem = function (blockId: string, text: string) {
		const children = [{ type: "bulleted_list_item", bulleted_list_item: { rich_text: notion.createRichText(text) } }];
		return base.blocks.appendBlockChildren({ children }, { block_id: blockId });
	};

	notion.addNumberedListItem = function (blockId: string, text: string) {
		const children = [{ type: "numbered_list_item", numbered_list_item: { rich_text: notion.createRichText(text) } }];
		return base.blocks.appendBlockChildren({ children }, { block_id: blockId });
	};

	notion.addToggleBlock = function (blockId: string, text: string, children?: any[]) {
		const block = { type: "toggle", toggle: { rich_text: notion.createRichText(text), children: children || [] } };
		return base.blocks.appendBlockChildren({ children: [block] }, { block_id: blockId });
	};

	notion.addCalloutBlock = function (blockId: string, text: string, emoji?: string) {
		const block = { type: "callout", callout: { rich_text: notion.createRichText(text), icon: emoji ? { type: "emoji", emoji } : undefined } };
		return base.blocks.appendBlockChildren({ children: [block] }, { block_id: blockId });
	};

	notion.addQuoteBlock = function (blockId: string, text: string) {
		const children = [{ type: "quote", quote: { rich_text: notion.createRichText(text) } }];
		return base.blocks.appendBlockChildren({ children }, { block_id: blockId });
	};

	notion.addCodeBlock = function (blockId: string, code: string, language?: string) {
		const children = [{ type: "code", code: { rich_text: notion.createRichText(code), language: language || "plain text" } }];
		return base.blocks.appendBlockChildren({ children }, { block_id: blockId });
	};

	notion.addDividerBlock = function (blockId: string) {
		const children = [{ type: "divider", divider: {} }];
		return base.blocks.appendBlockChildren({ children }, { block_id: blockId });
	};

	return notion;
}

export type { TNotionModule };
