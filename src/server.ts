import { createServer } from "http";
import { WebSocketServer } from "ws";
import { handleMCPRequest } from "./mcp-handler"; // Assume this handles the MCP requests based on incoming commands.

// Set up an HTTP server
const server = createServer();

// Create WebSocket server attached to HTTP server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
	ws.on("message", (message) => {
		try {
			// Parse the incoming message
			const request = JSON.parse(message.toString());
			// Handle the MCP request and get a response
			const response = handleMCPRequest(request);
			// Send the response back to client
			ws.send(JSON.stringify(response));
		} catch (_error) {
			// Send error response
			ws.send(
				JSON.stringify({
					id: null,
					version: "1.0",
					status: "error",
					error: "Invalid JSON format",
				}),
			);
		}
	});
});

// Start server on specified port
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
	// Server started successfully
});
