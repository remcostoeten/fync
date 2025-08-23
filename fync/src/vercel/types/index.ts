// Vercel API types
export type TVercelProject = {
	id: string;
	name: string;
	accountId: string;
	createdAt: number;
	updatedAt: number;
	env?: Array<{
		key: string;
		value: string;
		target: string[];
	}>;
};

export type TVercelDeployment = {
	id: string;
	url: string;
	name: string;
	state: string;
	ready: boolean;
	createdAt: number;
	gitSource?: any;
};

export type TVercelDomain = {
	name: string;
	verified: boolean;
	configured: boolean;
	expiresAt?: number;
};

export type TVercelTeam = {
	id: string;
	name: string;
	slug: string;
	projectsCount?: number;
	membersCount?: number;
};
