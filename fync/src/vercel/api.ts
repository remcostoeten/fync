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

export type TVercelDomain = {
  id?: string;
  name: string;
  verified?: boolean;
  projectId?: string;
};

export type TVercelDNSRecord = {
  id?: string;
  name: string;
  type: string;
  value: string;
  ttl?: number;
  priority?: number;
};

export type TVercelEnvVar = {
  id?: string;
  key: string;
  value: string;
  target: ReadonlyArray<'production' | 'preview' | 'development'>;
  type?: 'plain' | 'encrypted' | 'system';
};

export type TVercelAlias = {
  uid?: string;
  alias: string;
  deploymentId?: string;
};

export type TVercelUser = {
  uid: string;
  username?: string;
  name?: string;
  email?: string;
};

export type TVercelUsage = Record<string, unknown>;

export type TGetProjectArgs = TVercelClientConfig & { project: string };
export type TGetProjectsArgs = TVercelClientConfig & { limit?: number };
export type TCreateProjectArgs = TVercelClientConfig & { name: string; framework?: string; gitRepository?: { type: string; repo: string } };
export type TUpdateProjectArgs = TVercelClientConfig & { projectId: string; name?: string; framework?: string };
export type TDeleteProjectArgs = TVercelClientConfig & { projectId: string };

export type TGetDeploymentsArgs = TVercelClientConfig & {
  projectIdOrName: string;
  limit?: number;
  state?: string;
  branch?: string;
};
export type TGetDeploymentByIdArgs = TVercelClientConfig & { deploymentId: string };
export type TCreateDeploymentArgs = TVercelClientConfig & { projectId: string; payload: Record<string, unknown> };
export type TRollbackDeploymentArgs = TVercelClientConfig & { deploymentId: string };

export type TGetDomainsArgs = TVercelClientConfig & { projectId: string };
export type TGetDomainArgs = TVercelClientConfig & { domain: string };
export type TAddDomainArgs = TVercelClientConfig & { projectId: string; domain: string };
export type TRemoveDomainArgs = TVercelClientConfig & { domain: string };

export type TGetDNSRecordsArgs = TVercelClientConfig & { domain: string };
export type TAddDNSRecordArgs = TVercelClientConfig & { domain: string; record: TVercelDNSRecord };
export type TRemoveDNSRecordArgs = TVercelClientConfig & { domain: string; recordId: string };

export type TGetEnvVarsArgs = TVercelClientConfig & { projectId: string };
export type TAddEnvVarArgs = TVercelClientConfig & { projectId: string; envVar: TVercelEnvVar };
export type TUpdateEnvVarArgs = TVercelClientConfig & { projectId: string; envVarId: string; updates: Partial<TVercelEnvVar> };
export type TRemoveEnvVarArgs = TVercelClientConfig & { projectId: string; envVarId: string };

export type TGetAliasesArgs = TVercelClientConfig & { projectId: string };
export type TCreateAliasArgs = TVercelClientConfig & { deploymentId: string; alias: string };
export type TRemoveAliasArgs = TVercelClientConfig & { aliasId: string };

export type TGetLogsArgs = TVercelClientConfig & { deploymentId: string; limit?: number; since?: number; until?: number; query?: string };
export type TGetUsageArgs = TVercelClientConfig & { projectId: string };

export type TGetUserArgs = TVercelClientConfig;
export type TGetTokenArgs = TVercelClientConfig;
export type TCreateTokenArgs = TVercelClientConfig & { name: string; scopes?: ReadonlyArray<string> };
export type TRevokeTokenArgs = TVercelClientConfig & { tokenId: string };

function headers(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

function qs(params: Record<string, string | number | boolean | null | undefined>): string {
  const entries = Object.entries(params).filter(([, v]) => v !== undefined && v !== null);
  if (entries.length === 0) return '';
  const search = new URLSearchParams(entries.map(([k, v]) => [k, String(v)]));
  return `?${search.toString()}`;
}
function base(config: TVercelClientConfig): string {
  return config.baseURL ?? 'https://api.vercel.com';
}

export async function getProjects(args: TGetProjectsArgs): Promise<ReadonlyArray<TVercelProject>> {
  const u = `${base(args)}/v9/projects${qs({ teamId: args.teamId, limit: args.limit })}`;
  const res = await fetch(u, { method: 'GET', headers: headers(args.token) });
  if (!res.ok) throw new Error(`vercel.getProjects ${res.status}`);
  const data = await res.json();
  const items = Array.isArray((data as any).projects) ? (data as any).projects : (Array.isArray(data) ? data : []);
  return items as ReadonlyArray<TVercelProject>;
}

export async function getProject(args: TGetProjectArgs): Promise<TVercelProject> {
  const u = `${base(args)}/v9/projects/${encodeURIComponent(args.project)}${qs({ teamId: args.teamId })}`;
  const res = await fetch(u, { method: 'GET', headers: headers(args.token) });
  if (!res.ok) throw new Error(`vercel.getProject ${res.status}`);
  const data = await res.json();
  return data as TVercelProject;
}

export async function createProject(args: TCreateProjectArgs): Promise<TVercelProject> {
  const u = `${base(args)}/v9/projects${qs({ teamId: args.teamId })}`;
  const body = { name: args.name, framework: args.framework, gitRepository: args.gitRepository };
  const res = await fetch(u, { method: 'POST', headers: headers(args.token), body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`vercel.createProject ${res.status}`);
  const data = await res.json();
  return data as TVercelProject;
}

export async function updateProject(args: TUpdateProjectArgs): Promise<TVercelProject> {
  const u = `${base(args)}/v9/projects/${encodeURIComponent(args.projectId)}${qs({ teamId: args.teamId })}`;
  const res = await fetch(u, { method: 'PATCH', headers: headers(args.token), body: JSON.stringify({ name: args.name, framework: args.framework }) });
  if (!res.ok) throw new Error(`vercel.updateProject ${res.status}`);
  const data = await res.json();
  return data as TVercelProject;
}

export async function deleteProject(args: TDeleteProjectArgs): Promise<{ deleted: true }> {
  const u = `${base(args)}/v9/projects/${encodeURIComponent(args.projectId)}${qs({ teamId: args.teamId })}`;
  const res = await fetch(u, { method: 'DELETE', headers: headers(args.token) });
  if (!res.ok) throw new Error(`vercel.deleteProject ${res.status}`);
  return { deleted: true };
}

export async function getDeployments(args: TGetDeploymentsArgs): Promise<ReadonlyArray<TVercelDeployment>> {
  const u = `${base(args)}/v13/deployments${qs({ teamId: args.teamId, projectId: args.projectIdOrName, project: args.projectIdOrName, limit: args.limit, state: args.state, branch: args.branch })}`;
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

export async function createDeployment(args: TCreateDeploymentArgs): Promise<TVercelDeployment> {
  const u = `${base(args)}/v13/deployments${qs({ teamId: args.teamId, projectId: args.projectId })}`;
  const res = await fetch(u, { method: 'POST', headers: headers(args.token), body: JSON.stringify(args.payload) });
  if (!res.ok) throw new Error(`vercel.createDeployment ${res.status}`);
  const data = await res.json();
  return data as TVercelDeployment;
}

export async function rollbackDeployment(args: TRollbackDeploymentArgs): Promise<TVercelDeployment> {
  const u = `${base(args)}/v13/deployments/${encodeURIComponent(args.deploymentId)}/rollback${qs({ teamId: args.teamId })}`;
  const res = await fetch(u, { method: 'POST', headers: headers(args.token) });
  if (!res.ok) throw new Error(`vercel.rollbackDeployment ${res.status}`);
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

export async function getDomains(args: TGetDomainsArgs): Promise<ReadonlyArray<TVercelDomain>> {
  const u = `${base(args)}/v10/projects/${encodeURIComponent(args.projectId)}/domains${qs({ teamId: args.teamId })}`;
  const res = await fetch(u, { method: 'GET', headers: headers(args.token) });
  if (!res.ok) throw new Error(`vercel.getDomains ${res.status}`);
  const data = await res.json();
  const items = Array.isArray((data as any).domains) ? (data as any).domains : (Array.isArray(data) ? data : []);
  return items as ReadonlyArray<TVercelDomain>;
}

export async function getDomain(args: TGetDomainArgs): Promise<TVercelDomain> {
  const u = `${base(args)}/v10/domains/${encodeURIComponent(args.domain)}${qs({ teamId: args.teamId })}`;
  const res = await fetch(u, { method: 'GET', headers: headers(args.token) });
  if (!res.ok) throw new Error(`vercel.getDomain ${res.status}`);
  const data = await res.json();
  return data as TVercelDomain;
}

export async function addDomain(args: TAddDomainArgs): Promise<TVercelDomain> {
  const u = `${base(args)}/v10/projects/${encodeURIComponent(args.projectId)}/domains${qs({ teamId: args.teamId })}`;
  const res = await fetch(u, { method: 'POST', headers: headers(args.token), body: JSON.stringify({ name: args.domain }) });
  if (!res.ok) throw new Error(`vercel.addDomain ${res.status}`);
  const data = await res.json();
  return data as TVercelDomain;
}

export async function removeDomain(args: TRemoveDomainArgs): Promise<{ removed: true }> {
  const u = `${base(args)}/v10/domains/${encodeURIComponent(args.domain)}${qs({ teamId: args.teamId })}`;
  const res = await fetch(u, { method: 'DELETE', headers: headers(args.token) });
  if (!res.ok) throw new Error(`vercel.removeDomain ${res.status}`);
  return { removed: true };
}

export async function getDNSRecords(args: TGetDNSRecordsArgs): Promise<ReadonlyArray<TVercelDNSRecord>> {
  const u = `${base(args)}/v4/domains/${encodeURIComponent(args.domain)}/records${qs({ teamId: args.teamId })}`;
  const res = await fetch(u, { method: 'GET', headers: headers(args.token) });
  if (!res.ok) throw new Error(`vercel.getDNSRecords ${res.status}`);
  const data = await res.json();
  const items = Array.isArray((data as any).records) ? (data as any).records : (Array.isArray(data) ? data : []);
  return items as ReadonlyArray<TVercelDNSRecord>;
}

export async function addDNSRecord(args: TAddDNSRecordArgs): Promise<TVercelDNSRecord> {
  const u = `${base(args)}/v4/domains/${encodeURIComponent(args.domain)}/records${qs({ teamId: args.teamId })}`;
  const res = await fetch(u, { method: 'POST', headers: headers(args.token), body: JSON.stringify(args.record) });
  if (!res.ok) throw new Error(`vercel.addDNSRecord ${res.status}`);
  const data = await res.json();
  return data as TVercelDNSRecord;
}

export async function removeDNSRecord(args: TRemoveDNSRecordArgs): Promise<{ removed: true }> {
  const u = `${base(args)}/v4/domains/${encodeURIComponent(args.domain)}/records/${encodeURIComponent(args.recordId)}${qs({ teamId: args.teamId })}`;
  const res = await fetch(u, { method: 'DELETE', headers: headers(args.token) });
  if (!res.ok) throw new Error(`vercel.removeDNSRecord ${res.status}`);
  return { removed: true };
}

export async function getEnvVars(args: TGetEnvVarsArgs): Promise<ReadonlyArray<TVercelEnvVar>> {
  const u = `${base(args)}/v9/projects/${encodeURIComponent(args.projectId)}/env${qs({ teamId: args.teamId })}`;
  const res = await fetch(u, { method: 'GET', headers: headers(args.token) });
  if (!res.ok) throw new Error(`vercel.getEnvVars ${res.status}`);
  const data = await res.json();
  const items = Array.isArray((data as any).envs) ? (data as any).envs : (Array.isArray(data) ? data : []);
  return items as ReadonlyArray<TVercelEnvVar>;
}

export async function addEnvVar(args: TAddEnvVarArgs): Promise<TVercelEnvVar> {
  const u = `${base(args)}/v9/projects/${encodeURIComponent(args.projectId)}/env${qs({ teamId: args.teamId })}`;
  const res = await fetch(u, { method: 'POST', headers: headers(args.token), body: JSON.stringify(args.envVar) });
  if (!res.ok) throw new Error(`vercel.addEnvVar ${res.status}`);
  const data = await res.json();
  return data as TVercelEnvVar;
}

export async function updateEnvVar(args: TUpdateEnvVarArgs): Promise<TVercelEnvVar> {
  const u = `${base(args)}/v9/projects/${encodeURIComponent(args.projectId)}/env/${encodeURIComponent(args.envVarId)}${qs({ teamId: args.teamId })}`;
  const res = await fetch(u, { method: 'PATCH', headers: headers(args.token), body: JSON.stringify(args.updates) });
  if (!res.ok) throw new Error(`vercel.updateEnvVar ${res.status}`);
  const data = await res.json();
  return data as TVercelEnvVar;
}

export async function removeEnvVar(args: TRemoveEnvVarArgs): Promise<{ removed: true }> {
  const u = `${base(args)}/v9/projects/${encodeURIComponent(args.projectId)}/env/${encodeURIComponent(args.envVarId)}${qs({ teamId: args.teamId })}`;
  const res = await fetch(u, { method: 'DELETE', headers: headers(args.token) });
  if (!res.ok) throw new Error(`vercel.removeEnvVar ${res.status}`);
  return { removed: true };
}

export async function getAliases(args: TGetAliasesArgs): Promise<ReadonlyArray<TVercelAlias>> {
  const u = `${base(args)}/v2/projects/${encodeURIComponent(args.projectId)}/aliases${qs({ teamId: args.teamId })}`;
  const res = await fetch(u, { method: 'GET', headers: headers(args.token) });
  if (!res.ok) throw new Error(`vercel.getAliases ${res.status}`);
  const data = await res.json();
  const items = Array.isArray((data as any).aliases) ? (data as any).aliases : (Array.isArray(data) ? data : []);
  return items as ReadonlyArray<TVercelAlias>;
}

export async function createAlias(args: TCreateAliasArgs): Promise<TVercelAlias> {
  const u = `${base(args)}/v2/aliases${qs({ teamId: args.teamId })}`;
  const res = await fetch(u, { method: 'POST', headers: headers(args.token), body: JSON.stringify({ deploymentId: args.deploymentId, alias: args.alias }) });
  if (!res.ok) throw new Error(`vercel.createAlias ${res.status}`);
  const data = await res.json();
  return data as TVercelAlias;
}

export async function removeAlias(args: TRemoveAliasArgs): Promise<{ removed: true }> {
  const u = `${base(args)}/v2/aliases/${encodeURIComponent(args.aliasId)}${qs({ teamId: args.teamId })}`;
  const res = await fetch(u, { method: 'DELETE', headers: headers(args.token) });
  if (!res.ok) throw new Error(`vercel.removeAlias ${res.status}`);
  return { removed: true };
}

export async function getLogs(args: TGetLogsArgs): Promise<unknown> {
  const u = `${base(args)}/v2/deployments/${encodeURIComponent(args.deploymentId)}/logs${qs({ teamId: args.teamId, limit: args.limit, since: args.since, until: args.until, q: args.query })}`;
  const res = await fetch(u, { method: 'GET', headers: headers(args.token) });
  if (!res.ok) throw new Error(`vercel.getLogs ${res.status}`);
  const data = await res.json();
  return data as unknown;
}

export async function getUsage(args: TGetUsageArgs): Promise<TVercelUsage> {
  const u = `${base(args)}/v1/usage/projects/${encodeURIComponent(args.projectId)}${qs({ teamId: args.teamId })}`;
  const res = await fetch(u, { method: 'GET', headers: headers(args.token) });
  if (!res.ok) throw new Error(`vercel.getUsage ${res.status}`);
  const data = await res.json();
  return data as TVercelUsage;
}

export async function getUser(args: TGetUserArgs): Promise<TVercelUser> {
  const u = `${base(args)}/v2/user${qs({ teamId: args.teamId })}`;
  const res = await fetch(u, { method: 'GET', headers: headers(args.token) });
  if (!res.ok) throw new Error(`vercel.getUser ${res.status}`);
  const data = await res.json();
  return (data as any).user as TVercelUser;
}

export async function getToken(_args: TGetTokenArgs): Promise<null> {
  return null;
}

export async function createToken(args: TCreateTokenArgs): Promise<{ token: string }> {
  const u = `${base(args)}/v3/user/tokens`;
  const res = await fetch(u, { method: 'POST', headers: headers(args.token), body: JSON.stringify({ name: args.name, scopes: args.scopes }) });
  if (!res.ok) throw new Error(`vercel.createToken ${res.status}`);
  const data = await res.json();
  return { token: (data as any).token as string };
}

export async function revokeToken(args: TRevokeTokenArgs): Promise<{ revoked: true }> {
  const u = `${base(args)}/v3/user/tokens/${encodeURIComponent(args.tokenId)}`;
  const res = await fetch(u, { method: 'DELETE', headers: headers(args.token) });
  if (!res.ok) throw new Error(`vercel.revokeToken ${res.status}`);
  return { revoked: true };
}
