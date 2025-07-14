// @ts-ignore
import { NextRequest, NextResponse } from "next/server";
import { createOAuth2Flow } from "../core/flow";
import { GITHUB_OAUTH2_PROVIDER } from "../providers/github";
import type { TOAuth2Config, TOAuth2TokenResponse } from "../types";

type TNextJSOAuth2Config = TOAuth2Config & {
	onSuccess?: (
		tokens: TOAuth2TokenResponse,
		request: NextRequest,
	) => Promise<NextResponse> | NextResponse;
	onError?: (
		error: Error,
		request: NextRequest,
	) => Promise<NextResponse> | NextResponse;
	cookieName?: string;
	cookieOptions?: {
		maxAge?: number;
		httpOnly?: boolean;
		secure?: boolean;
		sameSite?: "strict" | "lax" | "none";
		path?: string;
	};
};

type TNextJSOAuth2Handler = {
	login: (request: NextRequest) => Promise<NextResponse> | NextResponse;
	callback: (request: NextRequest) => Promise<NextResponse> | NextResponse;
	logout: (request: NextRequest) => Promise<NextResponse> | NextResponse;
	middleware: (request: NextRequest) => Promise<NextResponse> | NextResponse;
};

function createNextJSOAuth2Handler(
	config: TNextJSOAuth2Config,
): TNextJSOAuth2Handler {
	const oauth2Flow = createOAuth2Flow(config, GITHUB_OAUTH2_PROVIDER);

	const cookieName = config.cookieName || "github-oauth-state";
	const cookieOptions = {
		maxAge: 600, // 10 minutes
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax" as const,
		path: "/",
		...config.cookieOptions,
	};

	function login(request: NextRequest): NextResponse {
		const { searchParams } = new URL(request.url);
		const redirectTo = searchParams.get("redirectTo") || "/";

		const state = oauth2Flow.generateState({ redirectTo });
		const authUrl = oauth2Flow.getAuthorizationUrl({ state: state.value });

		const response = NextResponse.redirect(authUrl);

		// Store state in cookie for validation
		response.cookies.set(cookieName, JSON.stringify(state), cookieOptions);

		return response;
	}

	async function callback(request: NextRequest): Promise<NextResponse> {
		const { searchParams } = new URL(request.url);
		const code = searchParams.get("code");
		const state = searchParams.get("state");
		const error = searchParams.get("error");

		if (error) {
			const errorObj = new Error(`OAuth2 Error: ${error}`);
			return config.onError
				? config.onError(errorObj, request)
				: NextResponse.redirect("/login?error=oauth");
		}

		if (!code || !state) {
			const errorObj = new Error("Missing code or state parameter");
			return config.onError
				? config.onError(errorObj, request)
				: NextResponse.redirect("/login?error=missing-params");
		}

		try {
			// Validate state
			const storedState = request.cookies.get(cookieName)?.value;
			if (!storedState) {
				throw new Error("Missing stored state");
			}

			const parsedStoredState = JSON.parse(storedState);
			if (!oauth2Flow.validateState(state, parsedStoredState.value)) {
				throw new Error("Invalid state parameter");
			}

			// Exchange code for token
			const tokens = await oauth2Flow.exchangeCodeForToken({ code, state });

			// Clear state cookie
			const response = config.onSuccess
				? await config.onSuccess(tokens, request)
				: NextResponse.redirect(
						(parsedStoredState.metadata?.redirectTo as string) || "/",
					);

			response.cookies.delete(cookieName);

			return response;
		} catch (error) {
			const errorObj =
				error instanceof Error ? error : new Error("OAuth2 callback failed");
			return config.onError
				? config.onError(errorObj, request)
				: NextResponse.redirect("/login?error=callback");
		}
	}

	function logout(request: NextRequest): NextResponse {
		const response = NextResponse.redirect("/login");

		// Clear any authentication cookies
		response.cookies.delete(cookieName);
		response.cookies.delete("github-access-token");

		return response;
	}

	function middleware(request: NextRequest): NextResponse {
		const token = request.cookies.get("github-access-token")?.value;

		if (!token) {
			const loginUrl = new URL("/api/auth/login", request.url);
			loginUrl.searchParams.set("redirectTo", request.url);
			return NextResponse.redirect(loginUrl);
		}

		return NextResponse.next();
	}

	return {
		login,
		callback,
		logout,
		middleware,
	};
}

// Helper for API route handlers
function createNextJSAPIHandler(config: TNextJSOAuth2Config) {
	const handler = createNextJSOAuth2Handler(config);

	return {
		GET: async (request: NextRequest) => {
			const { pathname } = new URL(request.url);

			if (pathname.endsWith("/login")) {
				return handler.login(request);
			}

			if (pathname.endsWith("/callback")) {
				return handler.callback(request);
			}

			if (pathname.endsWith("/logout")) {
				return handler.logout(request);
			}

			return NextResponse.json({ error: "Not found" }, { status: 404 });
		},

		POST: async (request: NextRequest) => {
			const { pathname } = new URL(request.url);

			if (pathname.endsWith("/logout")) {
				return handler.logout(request);
			}

			return NextResponse.json(
				{ error: "Method not allowed" },
				{ status: 405 },
			);
		},
	};
}

export { createNextJSOAuth2Handler, createNextJSAPIHandler };
export type { TNextJSOAuth2Config, TNextJSOAuth2Handler };
