// Notion API Types
// See: https://developers.notion.com/reference

// Common Types
export type TNotionId = string;
export type TNotionUrl = string;
export type TNotionTimestamp = string;

// Parent Types
export type TNotionParent =
	| { type: "database_id"; database_id: string }
	| { type: "page_id"; page_id: string }
	| { type: "workspace"; workspace: true }
	| { type: "block_id"; block_id: string };

// User Types
export interface TNotionUser {
	object: "user";
	id: string;
	type?: "person" | "bot";
	name?: string | null;
	avatar_url?: string | null;
}

export interface TNotionPerson extends TNotionUser {
	type: "person";
	person: {
		email?: string;
	};
}

export interface TNotionBot extends TNotionUser {
	type: "bot";
	bot:
		| {
				owner: {
					type: "user";
					user: TNotionUser | TNotionPerson;
				};
		  }
		| {
				owner: {
					type: "workspace";
					workspace: true;
				};
		  };
}

// File Types
export interface TNotionFile {
	type: "file";
	file: {
		url: string;
		expiry_time: string;
	};
}

export interface TNotionExternalFile {
	type: "external";
	external: {
		url: string;
	};
}

export type TNotionFileObject = TNotionFile | TNotionExternalFile;

// Emoji Types
export interface TNotionEmoji {
	type: "emoji";
	emoji: string;
}

// Icon Types
export type TNotionIcon = TNotionEmoji | TNotionFileObject | null;

// Cover Types
export type TNotionCover = TNotionFileObject | null;

// Rich Text Types
export interface TNotionRichText {
	type: "text" | "mention" | "equation";
	plain_text: string;
	href?: string | null;
	annotations?: TNotionAnnotations;
}

export interface TNotionTextRichText extends TNotionRichText {
	type: "text";
	text: {
		content: string;
		link?: {
			url: string;
		} | null;
	};
}

export interface TNotionMentionRichText extends TNotionRichText {
	type: "mention";
	mention:
		| { type: "user"; user: TNotionUser | TNotionPerson | TNotionBot }
		| { type: "page"; page: { id: string } }
		| { type: "database"; database: { id: string } }
		| { type: "date"; date: TNotionDateProperty }
		| { type: "link_preview"; link_preview: { url: string } }
		| { type: "template_mention"; template_mention: { type: "template_mention_date" | "template_mention_user"; template_mention_date?: string; template_mention_user?: string } };
}

export interface TNotionEquationRichText extends TNotionRichText {
	type: "equation";
	equation: {
		expression: string;
	};
}

export interface TNotionAnnotations {
	bold?: boolean;
	italic?: boolean;
	strikethrough?: boolean;
	underline?: boolean;
	code?: boolean;
	color?:
		| "default"
		| "gray"
		| "brown"
		| "orange"
		| "yellow"
		| "green"
		| "blue"
		| "purple"
		| "pink"
		| "red"
		| "gray_background"
		| "brown_background"
		| "orange_background"
		| "yellow_background"
		| "green_background"
		| "blue_background"
		| "purple_background"
		| "pink_background"
		| "red_background";
}

export type TNotionRichTextItem = TNotionTextRichText | TNotionMentionRichText | TNotionEquationRichText;

// Property Value Types
export interface TNotionTitleProperty {
	id: string;
	type: "title";
	title: TNotionRichTextItem[];
}

export interface TNotionRichTextProperty {
	id: string;
	type: "rich_text";
	rich_text: TNotionRichTextItem[];
}

export interface TNotionNumberProperty {
	id: string;
	type: "number";
	number: number | null;
}

export interface TNotionSelectProperty {
	id: string;
	type: "select";
	select: {
		id?: string;
		name: string;
		color?: TNotionColor;
	} | null;
}

export interface TNotionStatusProperty {
	id: string;
	type: "status";
	status: {
		id?: string;
		name: string;
		color?: TNotionColor;
	} | null;
}

export interface TNotionMultiSelectProperty {
	id: string;
	type: "multi_select";
	multi_select: Array<{
		id?: string;
		name: string;
		color?: TNotionColor;
	}>;
}

export interface TNotionDateProperty {
	id: string;
	type: "date";
	date: {
		start: string;
		end?: string | null;
		time_zone?: string | null;
	} | null;
}

export interface TNotionFormulaProperty {
	id: string;
	type: "formula";
	formula:
		| { type: "string"; string: string | null }
		| { type: "number"; number: number | null }
		| { type: "boolean"; boolean: boolean | null }
		| { type: "date"; date: TNotionDateProperty["date"] };
}

export interface TNotionRelationProperty {
	id: string;
	type: "relation";
	relation: Array<{ id: string }>;
	has_more?: boolean;
}

export interface TNotionRollupProperty {
	id: string;
	type: "rollup";
	rollup:
		| { type: "number"; number: number | null; function: TNotionRollupFunction }
		| { type: "date"; date: TNotionDateProperty["date"]; function: TNotionRollupFunction }
		| { type: "array"; array: Array<TNotionPropertyValue>; function: TNotionRollupFunction }
		| { type: "unsupported"; unsupported: {}; function: TNotionRollupFunction }
		| { type: "incomplete"; incomplete: {}; function: TNotionRollupFunction };
}

export interface TNotionPeopleProperty {
	id: string;
	type: "people";
	people: Array<TNotionUser | TNotionPerson | TNotionBot>;
}

export interface TNotionFilesProperty {
	id: string;
	type: "files";
	files: TNotionFileObject[];
}

export interface TNotionCheckboxProperty {
	id: string;
	type: "checkbox";
	checkbox: boolean;
}

export interface TNotionUrlProperty {
	id: string;
	type: "url";
	url: string | null;
}

export interface TNotionEmailProperty {
	id: string;
	type: "email";
	email: string | null;
}

export interface TNotionPhoneNumberProperty {
	id: string;
	type: "phone_number";
	phone_number: string | null;
}

export interface TNotionCreatedTimeProperty {
	id: string;
	type: "created_time";
	created_time: string;
}

export interface TNotionCreatedByProperty {
	id: string;
	type: "created_by";
	created_by: TNotionUser | TNotionPerson | TNotionBot;
}

export interface TNotionLastEditedTimeProperty {
	id: string;
	type: "last_edited_time";
	last_edited_time: string;
}

export interface TNotionLastEditedByProperty {
	id: string;
	type: "last_edited_by";
	last_edited_by: TNotionUser | TNotionPerson | TNotionBot;
}

export interface TNotionUniqueIdProperty {
	id: string;
	type: "unique_id";
	unique_id: {
		number: number;
		prefix: string | null;
	};
}

export interface TNotionVerificationProperty {
	id: string;
	type: "verification";
	verification: {
		state: "verified" | "unverified";
		verified_by?: TNotionUser | TNotionPerson | TNotionBot;
		date?: TNotionDateProperty["date"];
	} | null;
}

export type TNotionPropertyValue =
	| TNotionTitleProperty
	| TNotionRichTextProperty
	| TNotionNumberProperty
	| TNotionSelectProperty
	| TNotionStatusProperty
	| TNotionMultiSelectProperty
	| TNotionDateProperty
	| TNotionFormulaProperty
	| TNotionRelationProperty
	| TNotionRollupProperty
	| TNotionPeopleProperty
	| TNotionFilesProperty
	| TNotionCheckboxProperty
	| TNotionUrlProperty
	| TNotionEmailProperty
	| TNotionPhoneNumberProperty
	| TNotionCreatedTimeProperty
	| TNotionCreatedByProperty
	| TNotionLastEditedTimeProperty
	| TNotionLastEditedByProperty
	| TNotionUniqueIdProperty
	| TNotionVerificationProperty;

// Database Property Schema Types
export interface TNotionPropertySchema {
	id: string;
	name: string;
	type: string;
	[key: string]: any;
}

// Page Types
export interface TNotionPage {
	object: "page";
	id: string;
	created_time: string;
	created_by: TNotionUser | TNotionPerson | TNotionBot;
	last_edited_time: string;
	last_edited_by: TNotionUser | TNotionPerson | TNotionBot;
	archived: boolean;
	in_trash: boolean;
	icon: TNotionIcon;
	cover: TNotionCover;
	properties: Record<string, TNotionPropertyValue>;
	parent: TNotionParent;
	url: string;
	public_url?: string | null;
}

// Database Types
export interface TNotionDatabase {
	object: "database";
	id: string;
	created_time: string;
	created_by: TNotionUser | TNotionPerson | TNotionBot;
	last_edited_time: string;
	last_edited_by: TNotionUser | TNotionPerson | TNotionBot;
	title: TNotionRichTextItem[];
	description: TNotionRichTextItem[];
	icon: TNotionIcon;
	cover: TNotionCover;
	properties: Record<string, TNotionPropertySchema>;
	parent: TNotionParent;
	url: string;
	archived: boolean;
	in_trash: boolean;
	is_inline: boolean;
	public_url?: string | null;
}

// Block Types
export interface TNotionBlock {
	object: "block";
	id: string;
	parent: TNotionParent;
	type: string;
	created_time: string;
	created_by: TNotionUser | TNotionPerson | TNotionBot;
	last_edited_time: string;
	last_edited_by: TNotionUser | TNotionPerson | TNotionBot;
	archived: boolean;
	in_trash: boolean;
	has_children: boolean;
	[key: string]: any;
}

export interface TNotionParagraphBlock extends TNotionBlock {
	type: "paragraph";
	paragraph: {
		rich_text: TNotionRichTextItem[];
		color?: TNotionColor;
	};
}

export interface TNotionHeadingBlock extends TNotionBlock {
	type: "heading_1" | "heading_2" | "heading_3";
	heading_1?: {
		rich_text: TNotionRichTextItem[];
		color?: TNotionColor;
		is_toggleable?: boolean;
	};
	heading_2?: {
		rich_text: TNotionRichTextItem[];
		color?: TNotionColor;
		is_toggleable?: boolean;
	};
	heading_3?: {
		rich_text: TNotionRichTextItem[];
		color?: TNotionColor;
		is_toggleable?: boolean;
	};
}

export interface TNotionCalloutBlock extends TNotionBlock {
	type: "callout";
	callout: {
		rich_text: TNotionRichTextItem[];
		icon: TNotionIcon;
		color?: TNotionColor;
	};
}

export interface TNotionQuoteBlock extends TNotionBlock {
	type: "quote";
	quote: {
		rich_text: TNotionRichTextItem[];
		color?: TNotionColor;
	};
}

export interface TNotionBulletedListItemBlock extends TNotionBlock {
	type: "bulleted_list_item";
	bulleted_list_item: {
		rich_text: TNotionRichTextItem[];
		color?: TNotionColor;
	};
}

export interface TNotionNumberedListItemBlock extends TNotionBlock {
	type: "numbered_list_item";
	numbered_list_item: {
		rich_text: TNotionRichTextItem[];
		color?: TNotionColor;
	};
}

export interface TNotionToDoBlock extends TNotionBlock {
	type: "to_do";
	to_do: {
		rich_text: TNotionRichTextItem[];
		checked?: boolean;
		color?: TNotionColor;
	};
}

export interface TNotionToggleBlock extends TNotionBlock {
	type: "toggle";
	toggle: {
		rich_text: TNotionRichTextItem[];
		color?: TNotionColor;
	};
}

export interface TNotionCodeBlock extends TNotionBlock {
	type: "code";
	code: {
		rich_text: TNotionRichTextItem[];
		caption: TNotionRichTextItem[];
		language: TNotionCodeLanguage;
	};
}

export interface TNotionChildPageBlock extends TNotionBlock {
	type: "child_page";
	child_page: {
		title: string;
	};
}

export interface TNotionChildDatabaseBlock extends TNotionBlock {
	type: "child_database";
	child_database: {
		title: string;
	};
}

export interface TNotionEmbedBlock extends TNotionBlock {
	type: "embed";
	embed: {
		url: string;
		caption?: TNotionRichTextItem[];
	};
}

export interface TNotionImageBlock extends TNotionBlock {
	type: "image";
	image: TNotionFileObject & {
		caption?: TNotionRichTextItem[];
	};
}

export interface TNotionVideoBlock extends TNotionBlock {
	type: "video";
	video: TNotionFileObject & {
		caption?: TNotionRichTextItem[];
	};
}

export interface TNotionFileBlock extends TNotionBlock {
	type: "file";
	file: TNotionFileObject & {
		caption?: TNotionRichTextItem[];
	};
}

export interface TNotionPdfBlock extends TNotionBlock {
	type: "pdf";
	pdf: TNotionFileObject & {
		caption?: TNotionRichTextItem[];
	};
}

export interface TNotionBookmarkBlock extends TNotionBlock {
	type: "bookmark";
	bookmark: {
		url: string;
		caption?: TNotionRichTextItem[];
	};
}

export interface TNotionEquationBlock extends TNotionBlock {
	type: "equation";
	equation: {
		expression: string;
	};
}

export interface TNotionDividerBlock extends TNotionBlock {
	type: "divider";
	divider: {};
}

export interface TNotionTableOfContentsBlock extends TNotionBlock {
	type: "table_of_contents";
	table_of_contents: {
		color?: TNotionColor;
	};
}

export interface TNotionBreadcrumbBlock extends TNotionBlock {
	type: "breadcrumb";
	breadcrumb: {};
}

export interface TNotionColumnListBlock extends TNotionBlock {
	type: "column_list";
	column_list: {};
}

export interface TNotionColumnBlock extends TNotionBlock {
	type: "column";
	column: {};
}

export interface TNotionLinkPreviewBlock extends TNotionBlock {
	type: "link_preview";
	link_preview: {
		url: string;
	};
}

export interface TNotionSyncedBlock extends TNotionBlock {
	type: "synced_block";
	synced_block: {
		synced_from: {
			type?: "block_id";
			block_id?: string;
		} | null;
	};
}

export interface TNotionTemplateBlock extends TNotionBlock {
	type: "template";
	template: {
		rich_text: TNotionRichTextItem[];
	};
}

export interface TNotionLinkToPageBlock extends TNotionBlock {
	type: "link_to_page";
	link_to_page:
		| { type: "page_id"; page_id: string }
		| { type: "database_id"; database_id: string }
		| { type: "comment_id"; comment_id: string };
}

export interface TNotionTableBlock extends TNotionBlock {
	type: "table";
	table: {
		table_width: number;
		has_column_header?: boolean;
		has_row_header?: boolean;
	};
}

export interface TNotionTableRowBlock extends TNotionBlock {
	type: "table_row";
	table_row: {
		cells: TNotionRichTextItem[][];
	};
}

// Filter Types
export interface TNotionFilter {
	and?: TNotionFilter[];
	or?: TNotionFilter[];
	property?: string;
	title?: TNotionTextFilter;
	rich_text?: TNotionTextFilter;
	number?: TNotionNumberFilter;
	checkbox?: TNotionCheckboxFilter;
	select?: TNotionSelectFilter;
	multi_select?: TNotionMultiSelectFilter;
	status?: TNotionStatusFilter;
	date?: TNotionDateFilter;
	people?: TNotionPeopleFilter;
	files?: TNotionFilesFilter;
	url?: TNotionTextFilter;
	email?: TNotionTextFilter;
	phone_number?: TNotionTextFilter;
	relation?: TNotionRelationFilter;
	created_by?: TNotionPeopleFilter;
	created_time?: TNotionDateFilter;
	last_edited_by?: TNotionPeopleFilter;
	last_edited_time?: TNotionDateFilter;
	formula?: TNotionFormulaFilter;
	unique_id?: TNotionUniqueIdFilter;
	rollup?: TNotionRollupFilter;
	timestamp?: TNotionTimestampFilter;
}

export interface TNotionTextFilter {
	equals?: string;
	does_not_equal?: string;
	contains?: string;
	does_not_contain?: string;
	starts_with?: string;
	ends_with?: string;
	is_empty?: boolean;
	is_not_empty?: boolean;
}

export interface TNotionNumberFilter {
	equals?: number;
	does_not_equal?: number;
	greater_than?: number;
	less_than?: number;
	greater_than_or_equal_to?: number;
	less_than_or_equal_to?: number;
	is_empty?: boolean;
	is_not_empty?: boolean;
}

export interface TNotionCheckboxFilter {
	equals?: boolean;
	does_not_equal?: boolean;
}

export interface TNotionSelectFilter {
	equals?: string;
	does_not_equal?: string;
	is_empty?: boolean;
	is_not_empty?: boolean;
}

export interface TNotionMultiSelectFilter {
	contains?: string;
	does_not_contain?: string;
	is_empty?: boolean;
	is_not_empty?: boolean;
}

export interface TNotionStatusFilter {
	equals?: string;
	does_not_equal?: string;
	is_empty?: boolean;
	is_not_empty?: boolean;
}

export interface TNotionDateFilter {
	equals?: string;
	before?: string;
	after?: string;
	on_or_before?: string;
	on_or_after?: string;
	past_week?: {};
	past_month?: {};
	past_year?: {};
	next_week?: {};
	next_month?: {};
	next_year?: {};
	is_empty?: boolean;
	is_not_empty?: boolean;
}

export interface TNotionPeopleFilter {
	contains?: string;
	does_not_contain?: string;
	is_empty?: boolean;
	is_not_empty?: boolean;
}

export interface TNotionFilesFilter {
	is_empty?: boolean;
	is_not_empty?: boolean;
}

export interface TNotionRelationFilter {
	contains?: string;
	does_not_contain?: string;
	is_empty?: boolean;
	is_not_empty?: boolean;
}

export interface TNotionFormulaFilter {
	string?: TNotionTextFilter;
	checkbox?: TNotionCheckboxFilter;
	number?: TNotionNumberFilter;
	date?: TNotionDateFilter;
}

export interface TNotionRollupFilter {
	any?: TNotionFilter;
	none?: TNotionFilter;
	every?: TNotionFilter;
	date?: TNotionDateFilter;
	number?: TNotionNumberFilter;
}

export interface TNotionUniqueIdFilter {
	equals?: number;
	does_not_equal?: number;
	greater_than?: number;
	less_than?: number;
	greater_than_or_equal_to?: number;
	less_than_or_equal_to?: number;
}

export interface TNotionTimestampFilter {
	timestamp: "created_time" | "last_edited_time";
	created_time?: TNotionDateFilter;
	last_edited_time?: TNotionDateFilter;
}

// Sort Types
export interface TNotionSort {
	property?: string;
	direction?: "ascending" | "descending";
	timestamp?: "created_time" | "last_edited_time";
}

// Search Types
export interface TNotionSearch {
	query: string;
	sort?: TNotionSort;
	filter?: {
		value: "page" | "database";
		property: "object";
	};
	start_cursor?: string;
	page_size?: number;
}

// List Response Types
export interface TNotionListResponse<T> {
	object: "list";
	results: T[];
	next_cursor: string | null;
	has_more: boolean;
	type?: string;
	page_or_database?: {};
}

// Comment Types
export interface TNotionComment {
	object: "comment";
	id: string;
	parent: {
		type: "page_id" | "block_id";
		page_id?: string;
		block_id?: string;
	};
	discussion_id: string;
	created_time: string;
	last_edited_time: string;
	created_by: TNotionUser | TNotionPerson | TNotionBot;
	rich_text: TNotionRichTextItem[];
}

// Constants
export type TNotionColor =
	| "default"
	| "gray"
	| "brown"
	| "orange"
	| "yellow"
	| "green"
	| "blue"
	| "purple"
	| "pink"
	| "red";

export type TNotionCodeLanguage =
	| "abap"
	| "arduino"
	| "bash"
	| "basic"
	| "c"
	| "clojure"
	| "coffeescript"
	| "c++"
	| "c#"
	| "css"
	| "dart"
	| "diff"
	| "docker"
	| "elixir"
	| "elm"
	| "erlang"
	| "flow"
	| "fortran"
	| "f#"
	| "gherkin"
	| "glsl"
	| "go"
	| "graphql"
	| "groovy"
	| "haskell"
	| "html"
	| "java"
	| "javascript"
	| "json"
	| "julia"
	| "kotlin"
	| "latex"
	| "less"
	| "lisp"
	| "livescript"
	| "lua"
	| "makefile"
	| "markdown"
	| "markup"
	| "matlab"
	| "mermaid"
	| "nix"
	| "objective-c"
	| "ocaml"
	| "pascal"
	| "perl"
	| "php"
	| "plain text"
	| "powershell"
	| "prolog"
	| "protobuf"
	| "python"
	| "r"
	| "reason"
	| "ruby"
	| "rust"
	| "sass"
	| "scala"
	| "scheme"
	| "scss"
	| "shell"
	| "solidity"
	| "sql"
	| "swift"
	| "typescript"
	| "vb.net"
	| "verilog"
	| "vhdl"
	| "visual basic"
	| "webassembly"
	| "xml"
	| "yaml"
	| "java/c/c++/c#";

export type TNotionRollupFunction =
	| "count"
	| "count_values"
	| "empty"
	| "not_empty"
	| "unique"
	| "show_unique"
	| "percent_empty"
	| "percent_not_empty"
	| "sum"
	| "average"
	| "median"
	| "min"
	| "max"
	| "range"
	| "earliest_date"
	| "latest_date"
	| "date_range"
	| "checked"
	| "unchecked"
	| "percent_checked"
	| "percent_unchecked"
	| "show_original";

// Request/Response Types
export interface TNotionCreatePageRequest {
	parent: TNotionParent;
	properties: Record<string, any>;
	children?: any[];
	icon?: TNotionIcon;
	cover?: TNotionCover;
}

export interface TNotionUpdatePageRequest {
	properties?: Record<string, any>;
	archived?: boolean;
	in_trash?: boolean;
	icon?: TNotionIcon;
	cover?: TNotionCover;
}

export interface TNotionCreateDatabaseRequest {
	parent: TNotionParent;
	title?: TNotionRichTextItem[];
	description?: TNotionRichTextItem[];
	properties: Record<string, any>;
	icon?: TNotionIcon;
	cover?: TNotionCover;
	is_inline?: boolean;
}

export interface TNotionUpdateDatabaseRequest {
	title?: TNotionRichTextItem[];
	description?: TNotionRichTextItem[];
	properties?: Record<string, any>;
	archived?: boolean;
	icon?: TNotionIcon;
	cover?: TNotionCover;
}

export interface TNotionQueryDatabaseRequest {
	filter?: TNotionFilter;
	sorts?: TNotionSort[];
	start_cursor?: string;
	page_size?: number;
	archived?: boolean;
	filter_properties?: string[];
}

export interface TNotionAppendBlockChildrenRequest {
	children: any[];
	after?: string;
}

export interface TNotionCreateCommentRequest {
	parent: {
		page_id?: string;
		block_id?: string;
	};
	rich_text: TNotionRichTextItem[];
}
