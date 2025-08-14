export type TVercelClientConfig = {
  token: string;
  teamId?: string;
  baseURL?: string;
};

export type TVercelProject = {
  id: string;
  name: string;
  accountId?: string;
  createdAt?: number;
  updatedAt?: number;
  framework?: string;
  link?: { type?: string; repo?: string };
};

export type TVercelDeployment = {
  id: string;
  url: string;
  name?: string;
  projectId?: string;
  createdAt?: number;
  ready?: number;
  state?: string;
  readyState?: string;
  meta?: Record<string, string>;
};

export type TGetProjectArgs = TVercelClientConfig & { project: string };
export type TGetDeploymentsArgs = TVercelClientConfig & {
  projectIdOrName: string;
  limit?: number;
  state?: string;
};
export type TGetDeploymentByIdArgs = TVercelClientConfig & { deploymentId: string };

function headers(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

function qs(params: Record<string, string | number | undefined>): string {
  const pairs = Object.entries(params).filter(([, v]) => v !== undefined);
  if (pairs.length === 0) return '';
  const search = new URLSearchParams(pairs as [string, string][]);
  return `?${search.toString()}`;
}

function base(config: TVercelClientConfig): string {
  return config.baseURL ?? 'https://api.vercel.com';
}

export async function getProject(args: TGetProjectArgs): Promise<TVercelProject> {
  const u = `${base(args)}/v9/projects/${encodeURIComponent(args.project)}${qs({ teamId: args.teamId })}`;
  const res = await fetch(u, { method: 'GET', headers: headers(args.token) });
  if (!res.ok) throw new Error(`vercel.getProject ${res.status}`);
  const data = await res.json();
  return data as TVercelProject;
}

export async function getDeployments(args: TGetDeploymentsArgs): Promise<ReadonlyArray<TVercelDeployment>> {
  const u = `${base(args)}/v13/deployments${qs({ teamId: args.teamId, projectId: args.projectIdOrName, project: args.projectIdOrName, limit: args.limit, state: args.state })}`;
  const res = await fetch(u, { method: 'GET', headers: headers(args.token) });
  if (!res.ok) throw new Error(`vercel.getDeployments ${res.status}`);
  const data = await res.json();
  const items = Array.isArray((data as any).deployments) ? (data as any).deployments : (Array.isArray(data) ? data : []);
  return items as ReadonlyArray<TVercelDeployment>;
}

export async function getLatestDeployment(args: TGetDeploymentsArgs): Promise<TVercelDeployment | undefined> {
  const list = await getDeployments({ ...args, limit: 1 });
  return list[0];
}

export async function getLatestFailedDeployment(args: TGetDeploymentsArgs): Promise<TVercelDeployment | undefined> {
  const list = await getDeployments({ ...args, limit: 1, state: 'ERROR' });
  return list[0];
}

export async function getDeploymentById(args: TGetDeploymentByIdArgs): Promise<TVercelDeployment> {
  const u = `${base(args)}/v13/deployments/${encodeURIComponent(args.deploymentId)}${qs({ teamId: args.teamId })}`;
  const res = await fetch(u, { method: 'GET', headers: headers(args.token) });
  if (!res.ok) throw new Error(`vercel.getDeploymentById ${res.status}`);
  const data = await res.json();
  return data as TVercelDeployment;
}

export type TDeploymentTimestamps = {
  createdAt?: string;
  readyAt?: string;
};

export function getDeploymentTimestamps(deployment: TVercelDeployment): TDeploymentTimestamps {
  const createdAt = typeof deployment.createdAt === 'number' ? new Date(deployment.createdAt).toISOString() : undefined;
  const readyAt = typeof deployment.ready === 'number' ? new Date(deployment.ready).toISOString() : undefined;
  return { createdAt, readyAt };
}

export type TVercelLinks = {
  project: string;
  deployment: string;
};

export function getVercelLinks(projectNameOrId: string, deploymentId: string): TVercelLinks {
  const project = `https://vercel.com/dashboard/project/${encodeURIComponent(projectNameOrId)}`;
  const deployment = `https://vercel.com/dashboard/deployments/${encodeURIComponent(deploymentId)}`;
  return { project, deployment };
}
