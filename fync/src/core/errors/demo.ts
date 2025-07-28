import { HttpErrorHandler, initializeErrorHandling, BaseError } from "./exports";

/**
 * Demo function showing how the error handling system works
 */
export async function demoErrorHandling() {
  console.log("🚀 Initializing Error Handling System...");
  
  // Initialize the error handling system
  initializeErrorHandling();
  
  // Create an HTTP error handler
  const errorHandler = new HttpErrorHandler();
  
  console.log("\n📝 Testing different error scenarios:\n");

  // Test 1: Network error
  console.log("1️⃣ Testing network error...");
  try {
    await errorHandler.execute(
      async () => {
        throw new Error("fetch failed - network error");
      },
      {
        service: "spotify",
        endpoint: "/me",
        method: "GET",
      }
    );
  } catch (error) {
    if (error instanceof BaseError) {
      console.log("✅ Network error handled:", {
        code: error.info.code,
        category: error.info.category,
        userMessage: error.info.userMessage,
        isRetryable: error.info.isRetryable,
      });
    }
  }

  // Test 2: HTTP 401 error
  console.log("\n2️⃣ Testing authentication error...");
  try {
    await errorHandler.execute(
      async () => {
        throw new Error("HTTP 401: Unauthorized - Invalid token");
      },
      {
        service: "spotify",
        endpoint: "/me/playlists",
        method: "GET",
      }
    );
  } catch (error) {
    if (error instanceof BaseError) {
      console.log("✅ Auth error handled:", {
        code: error.info.code,
        category: error.info.category,
        userMessage: error.info.userMessage,
        suggestedAction: error.info.suggestedAction,
        isRetryable: error.info.isRetryable,
      });
    }
  }

  // Test 3: Rate limiting
  console.log("\n3️⃣ Testing rate limit error...");
  try {
    await errorHandler.execute(
      async () => {
        throw new Error("HTTP 429: Too Many Requests - Rate limit exceeded");
      },
      {
        service: "spotify",
        endpoint: "/search",
        method: "GET",
      }
    );
  } catch (error) {
    if (error instanceof BaseError) {
      console.log("✅ Rate limit error handled:", {
        code: error.info.code,
        category: error.info.category,
        userMessage: error.info.userMessage,
        isRetryable: error.info.isRetryable,
        retryCount: error.info.context.retryCount,
      });
    }
  }

  // Test 4: Spotify-specific error
  console.log("\n4️⃣ Testing Spotify premium error...");
  try {
    await errorHandler.execute(
      async () => {
        throw new Error("Player command failed: Premium required");
      },
      {
        service: "spotify",
        endpoint: "/me/player/play",
        method: "PUT",
      }
    );
  } catch (error) {
    if (error instanceof BaseError) {
      console.log("✅ Spotify premium error handled:", {
        code: error.info.code,
        category: error.info.category,
        userMessage: error.info.userMessage,
        suggestedAction: error.info.suggestedAction,
        documentation: error.info.documentation,
      });
    }
  }

  // Test 5: Successful request (no error)
  console.log("\n5️⃣ Testing successful request...");
  const result = await errorHandler.execute(
    async () => {
      return { message: "Success!", data: { user: "test" } };
    },
    {
      service: "spotify",
      endpoint: "/me",
      method: "GET",
    }
  );
  console.log("✅ Successful request:", result);

  console.log("\n🎉 Error handling system demo completed!");
}
