// Vercel API types
import type { TBaseEntity, TTimestamps } from "../../core/types";

export type TVercelProject = TBaseEntity<string> & {
	name: string;
	accountId: string;
	env?: Array<{
		key: string;
		value: string;
		target: string[];
	}>;
};

export type TVercelDeployment = TBaseEntity<string> & {
	url: string;
	name: string;
	state: string;
	ready: boolean;
	gitSource?: any;
};

export type TVercelDomain = TBaseEntity<string> & {
	name: string;
	verified: boolean;
	configured: boolean;
	expiresAt?: number;
};

export type TVercelTeam = TBaseEntity<string> & {
	name: string;
	slug: string;
	projectsCount?: number;
	membersCount?: number;
};
