export type TNotionConfig = {
	token: string;
	notionVersion?: string;
};

export type TRichText = {
	type: "text";
	text: { content: string; link: null };
	plain_text: string;
	href: null;
};

export type TSearchOptions = {
	sort?: any;
	filter?: any;
	start_cursor?: string;
	page_size?: number;
};

export type TPageParent = {
	type: "database_id" | "page_id" | "workspace";
	database_id?: string;
	page_id?: string;
	workspace?: boolean;
};

export type TBlockType = 
	| "paragraph"
	| "heading_1"
	| "heading_2"
	| "heading_3"
	| "bulleted_list_item"
	| "numbered_list_item"
	| "to_do"
	| "toggle"
	| "child_page"
	| "child_database"
	| "embed"
	| "image"
	| "video"
	| "file"
	| "pdf"
	| "bookmark"
	| "callout"
	| "quote"
	| "equation"
	| "divider"
	| "table_of_contents"
	| "column"
	| "column_list"
	| "link_preview"
	| "synced_block"
	| "template"
	| "link_to_page"
	| "table"
	| "table_row"
	| "code"
	| "audio"
	| "breadcrumb"
	| "unsupported";
