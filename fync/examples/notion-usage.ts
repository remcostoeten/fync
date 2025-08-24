import { Notion } from "../src/notion";

// Example usage of the refactored Notion module
async function example() {
	// Initialize the Notion client
	const notion = Notion({
		token: "your-notion-integration-token",
	});

	try {
		// Get a page
		const page = await notion.getPage("page-id-here");
		console.log("Page:", page);

		// Create a page in a database
		const newPage = await notion.helpers.createPageInDatabase(
			"database-id-here",
			{
				title: {
					title: [
						{
							type: "text",
							text: { content: "New Page Title" },
						},
					],
				},
			}
		);
		console.log("New page created:", newPage);

		// Add content to a block
		await notion.addTextBlock("block-id-here", "This is a new paragraph");
		await notion.addToDoBlock("block-id-here", "Complete this task", false);
		await notion.addBulletedListItem("block-id-here", "List item 1");

		// Search for pages
		const searchResults = await notion.searchPages("search query");
		console.log("Search results:", searchResults);

		// Get all pages from a database
		const allPages = await notion.helpers.getAllPagesFromDatabase("database-id-here");
		console.log("All pages:", allPages);

	} catch (error) {
		console.error("Error:", error);
	}
}

// Example of using the resource-based approach (core pattern)
async function resourceExample() {
	const notion = Notion({
		token: "your-notion-integration-token",
	});

	try {
		// Using the core resource pattern
		const page = await notion.pages.getPage({ page_id: "page-id-here" });
		console.log("Page via resource:", page);

		const database = await notion.databases.getDatabase({ database_id: "database-id-here" });
		console.log("Database via resource:", database);

		const searchResults = await notion.search.search({ query: "search query" });
		console.log("Search via resource:", searchResults);

	} catch (error) {
		console.error("Error:", error);
	}
}

// Example of creating rich text
function richTextExample() {
	const notion = Notion({
		token: "your-notion-integration-token",
	});

	const richText = notion.helpers.createRichText("This is rich text");
	console.log("Rich text:", richText);
}

export { example, resourceExample, richTextExample };
