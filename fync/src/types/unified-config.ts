import type { TGitHubConfig } from "../github/types/github-common";
import type { TGoogleCalendarConfig } from "../google-calendar";
import type { TNpmConfig } from "../npm/types/npm-common";
import type { TSpotifyConfig } from "../spotify/types/spotify-common";
import type {
	TTimestamps,
	TBaseEntity,
	TOptionalTimestamps,
	TCreateEntity,
	TUpdateEntity,
} from "../core/types";

export type TApiResponse<T> = {
	data: T;
	status: "success" | "error";
	message?: string;
};

export type TPaginatedResponse<T> = {
	data: T[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
};

export type TFactoryMethods<T> = {
	create(data: TCreateEntity<T>): Promise<T>;
	read(id: number): Promise<T | null>;
	update(data: TUpdateEntity<T>): Promise<T>;
	destroy(id: number): Promise<boolean>;
};

export type TSearchOptions = {
	query?: string;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
	limit?: number;
	offset?: number;
};

export type TFilterOptions<T> = {
	[K in keyof T]?: T[K] | T[K][];
};

export type TEnvironmentConfig = {
	nodeEnv: "development" | "production" | "test";
	port: number;
	databaseUrl: string;
	apiUrl: string;
	clientUrl: string;
};

export type TServiceConfig = {
	name: string;
	version: string;
	enabled: boolean;
	options?: Record<string, unknown>;
};

export type TIntegrationConfig = {
	github?: TServiceConfig;
	spotify?: TServiceConfig;
	googleCalendar?: TServiceConfig;
	npm?: TServiceConfig;
};

export type TUnifiedConfig = {
	environment: TEnvironmentConfig;
	integrations: TIntegrationConfig;
	features: Record<string, boolean>;
	logging: {
		level: "debug" | "info" | "warn" | "error";
		format: "json" | "pretty";
	};
};

export type TFyncConfig = {
	spotify?: TSpotifyConfig;
	github?: TGitHubConfig;
	npm?: TNpmConfig;
	googleCalendar?: TGoogleCalendarConfig;
};

export type TSpotifyClient = import("../spotify").TSpotify;
export type TGitHubClient = import("../github").TGitHub;
export type TNpmClient = import("../npm").TNpm;
export type TGoogleCalendarClient = ReturnType<
	typeof import("../google-calendar").createCalendarService
>;

export type TUnifiedFyncClient = {
	spotify?: TSpotifyClient;
	github?: TGitHubClient;
	npm?: TNpmClient;
	googleCalendar?: TGoogleCalendarClient;
};
