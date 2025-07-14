import { NextRequest, NextResponse } from "next/server";
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
declare function createNextJSOAuth2Handler(
	config: TNextJSOAuth2Config,
): TNextJSOAuth2Handler;
declare function createNextJSAPIHandler(config: TNextJSOAuth2Config): {
	GET: (request: NextRequest) => Promise<NextResponse<unknown>>;
	POST: (request: NextRequest) => Promise<NextResponse<unknown>>;
};
export { createNextJSOAuth2Handler, createNextJSAPIHandler };
export type { TNextJSOAuth2Config, TNextJSOAuth2Handler };
//# sourceMappingURL=nextjs.d.ts.map
