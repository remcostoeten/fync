// Note on testing library/framework used:
// These tests are written to be compatible with Vitest or Jest.
// If using Vitest: import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
// If using Jest: the global functions exist; replace vi with jest if needed.
// Adjust the import below to match your environment.

import { describe, it, expect, beforeEach, afterEach } from 'vitest'; // If using Jest, replace with '@jest/globals'
import { vi } from 'vitest'; // If using Jest, replace with 'jest'

import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getDeployments,
  getLatestDeployment,
  getLatestFailedDeployment,
  getDeploymentById,
  createDeployment,
  rollbackDeployment,
  getDeploymentTimestamps,
  getVercelLinks,
  getDomains,
  getDomain,
  addDomain,
  removeDomain,
  getDNSRecords,
  addDNSRecord,
  removeDNSRecord,
  getEnvVars,
  addEnvVar,
  updateEnvVar,
  removeEnvVar,
  getAliases,
  createAlias,
  removeAlias,
  getLogs,
  getUsage,
  getUser,
  getToken,
  createToken,
  revokeToken,
  type TVercelDeployment,
} from './api.test'; // The implementation appears to be in api.test.ts (misnamed); adjust if moved.

type MockResponseInit = {
  ok: boolean;
  status: number;
  jsonData?: any;
};

function mockFetchResponse({ ok, status, jsonData }: MockResponseInit): Response {
  return {
    ok,
    status,
    json: vi.fn(async () => jsonData),
  } as any as Response;
}

const token = 'tkn';
const teamId = 'team_123';
const baseURL = 'https://api.vercel.com'; // default base
const customBase = 'https://custom.example.com';

describe('vercel api utilities', () => {
  const originalFetch = global.fetch as any;

  beforeEach(() => {
    (global as any).fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    (global as any).fetch = originalFetch;
  });

  describe('helpers behavior via public functions', () => {
    it('uses default base URL when baseURL is not provided', async () => {
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 200, jsonData: { projects: [] } }));
      await getProjects({ token, teamId });
      const url = (global.fetch as any).mock.calls[0][0] as string;
      expect(url.startsWith(`${baseURL}/v9/projects`)).toBe(true);
    });

    it('uses provided baseURL when specified', async () => {
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 200, jsonData: { projects: [] } }));
      await getProjects({ token, teamId, baseURL: customBase });
      const url = (global.fetch as any).mock.calls[0][0] as string;
      expect(url.startsWith(`${customBase}/v9/projects`)).toBe(true);
    });

    it('applies auth and content-type headers', async () => {
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 200, jsonData: { projects: [] } }));
      await getProjects({ token, teamId });
      const headers = (global.fetch as any).mock.calls[0][1].headers as Record<string, string>;
      expect(headers.Authorization).toBe(`Bearer ${token}`);
      expect(headers['Content-Type']).toBe('application/json');
    });
  });

  describe('projects endpoints', () => {
    it('getProjects returns projects from "projects" array', async () => {
      const projects = [{ id: 'p1', name: 'one' }];
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 200, jsonData: { projects } }));
      const res = await getProjects({ token, teamId, limit: 10 });
      expect(res).toEqual(projects);
      const url = (global.fetch as any).mock.calls[0][0] as string;
      expect(url).toContain(`/v9/projects?teamId=${encodeURIComponent(teamId)}&limit=10`);
    });

    it('getProjects tolerates top-level array shape', async () => {
      const projects = [{ id: 'p2', name: 'two' }];
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 200, jsonData: projects }));
      const res = await getProjects({ token, teamId });
      expect(res).toEqual(projects);
    });

    it('getProjects throws on non-ok', async () => {
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: false, status: 403 }));
      await expect(getProjects({ token, teamId })).rejects.toThrow('vercel.getProjects 403');
    });

    it('getProject returns single project and encodes project param', async () => {
      const prj = { id: 'id', name: 'name' };
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 200, jsonData: prj }));
      await getProject({ token, teamId, project: 'sp ace' });
      const calledUrl = (global.fetch as any).mock.calls[0][0] as string;
      expect(calledUrl).toContain('/v9/projects/sp%20ace');
      const res = await getProject({ token, teamId, project: 'my' });
      expect(res).toEqual(prj);
    });

    it('getProject throws on non-ok', async () => {
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: false, status: 404 }));
      await expect(getProject({ token, teamId, project: 'missing' })).rejects.toThrow('vercel.getProject 404');
    });

    it('createProject posts body and returns project', async () => {
      const prj = { id: 'p3', name: 'new' };
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 201, jsonData: prj }));
      const res = await createProject({ token, teamId, name: 'new', framework: 'nextjs', gitRepository: { type: 'github', repo: 'org/repo' } });
      const call = (global.fetch as any).mock.calls[0];
      expect(call[0]).toContain('/v9/projects?teamId=' + encodeURIComponent(teamId));
      expect(call[1].method).toBe('POST');
      expect(JSON.parse(call[1].body)).toEqual({ name: 'new', framework: 'nextjs', gitRepository: { type: 'github', repo: 'org/repo' } });
      expect(res).toEqual(prj);
    });

    it('updateProject patches name/framework', async () => {
      const prj = { id: 'p4', name: 'updated' };
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 200, jsonData: prj }));
      const res = await updateProject({ token, teamId, projectId: 'p4', name: 'updated', framework: 'sveltekit' });
      const call = (global.fetch as any).mock.calls[0];
      expect(call[0]).toContain('/v9/projects/p4?teamId=' + encodeURIComponent(teamId));
      expect(call[1].method).toBe('PATCH');
      expect(JSON.parse(call[1].body)).toEqual({ name: 'updated', framework: 'sveltekit' });
      expect(res).toEqual(prj);
    });

    it('deleteProject sends DELETE and returns confirmation', async () => {
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 204, jsonData: {} }));
      const res = await deleteProject({ token, teamId, projectId: 'p5' });
      const call = (global.fetch as any).mock.calls[0];
      expect(call[0]).toContain('/v9/projects/p5?teamId=' + encodeURIComponent(teamId));
      expect(call[1].method).toBe('DELETE');
      expect(res).toEqual({ deleted: true });
    });
  });

  describe('deployments', () => {
    it('getDeployments returns deployments from "deployments" array', async () => {
      const deployments = [{ id: 'd1', url: 'u1' }];
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 200, jsonData: { deployments } }));
      const res = await getDeployments({ token, teamId, projectIdOrName: 'p1', limit: 3 });
      expect(res).toEqual(deployments);
      const url = (global.fetch as any).mock.calls[0][0] as string;
      // state and branch undefined should not appear; limit should appear
      expect(url).toContain('limit=3');
      expect(url).toContain('projectId=p1');
      expect(url).toContain('project=p1');
      expect(url.includes('state=')).toBe(false);
      expect(url.includes('branch=')).toBe(false);
    });

    it('getDeployments tolerates top-level array', async () => {
      const deployments = [{ id: 'd2', url: 'u2' }];
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 200, jsonData: deployments }));
      const res = await getDeployments({ token, teamId, projectIdOrName: 'p1' });
      expect(res).toEqual(deployments);
    });

    it('getLatestDeployment returns first item or undefined', async () => {
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 200, jsonData: { deployments: [{ id: 'd3', url: 'x' }] } }));
      const latest = await getLatestDeployment({ token, teamId, projectIdOrName: 'p1' });
      expect(latest?.id).toBe('d3');

      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 200, jsonData: { deployments: [] } }));
      const none = await getLatestDeployment({ token, teamId, projectIdOrName: 'p1' });
      expect(none).toBeUndefined();
    });

    it('getLatestFailedDeployment filters with state=ERROR', async () => {
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 200, jsonData: { deployments: [{ id: 'dErr', url: 'err' }] } }));
      const latest = await getLatestFailedDeployment({ token, teamId, projectIdOrName: 'p1' });
      expect((global.fetch as any).mock.calls[0][0]).toContain('state=ERROR');
      expect(latest?.id).toBe('dErr');
    });

    it('getDeploymentById returns deployment', async () => {
      const d = { id: 'd4', url: 'u4' };
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 200, jsonData: d }));
      const res = await getDeploymentById({ token, teamId, deploymentId: 'd4' });
      expect(res).toEqual(d);
      expect((global.fetch as any).mock.calls[0][0]).toContain('/v13/deployments/d4?teamId=' + encodeURIComponent(teamId));
    });

    it('createDeployment posts payload', async () => {
      const d = { id: 'd5', url: 'u5' };
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 201, jsonData: d }));
      const payload = { target: 'production' };
      const res = await createDeployment({ token, teamId, projectId: 'p1', payload });
      const call = (global.fetch as any).mock.calls[0];
      expect(call[0]).toContain('/v13/deployments?teamId=' + encodeURIComponent(teamId) + '&projectId=p1');
      expect(call[1].method).toBe('POST');
      expect(JSON.parse(call[1].body)).toEqual(payload);
      expect(res).toEqual(d);
    });

    it('rollbackDeployment posts to rollback endpoint', async () => {
      const d = { id: 'd6', url: 'u6' };
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 200, jsonData: d }));
      const res = await rollbackDeployment({ token, teamId, deploymentId: 'd6' });
      const call = (global.fetch as any).mock.calls[0];
      expect(call[0]).toContain('/v13/deployments/d6/rollback?teamId=' + encodeURIComponent(teamId));
      expect(call[1].method).toBe('POST');
      expect(res).toEqual(d);
    });

    it('getDeploymentTimestamps converts numeric dates to ISO', () => {
      const created = Date.now();
      const ready = created + 1000;
      const ts = getDeploymentTimestamps({ id: 'x', url: 'y', createdAt: created, ready } as TVercelDeployment);
      expect(ts.createdAt).toBe(new Date(created).toISOString());
      expect(ts.readyAt).toBe(new Date(ready).toISOString());
    });

    it('getDeploymentTimestamps returns undefined for missing or non-numeric', () => {
      const ts = getDeploymentTimestamps({ id: 'x', url: 'y', createdAt: undefined, ready: undefined } as TVercelDeployment);
      expect(ts.createdAt).toBeUndefined();
      expect(ts.readyAt).toBeUndefined();
    });

    it('throws specific errors on non-ok calls', async () => {
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: false, status: 500 }));
      await expect(getDeployments({ token, teamId, projectIdOrName: 'p' })).rejects.toThrow('vercel.getDeployments 500');
    });
  });

  describe('links', () => {
    it('getVercelLinks encodes and builds URLs', () => {
      const links = getVercelLinks('my proj', 'dep/1');
      expect(links.project).toBe('https://vercel.com/dashboard/project/my%20proj');
      expect(links.deployment).toBe('https://vercel.com/dashboard/deployments/dep%2F1');
    });
  });

  describe('domains', () => {
    it('getDomains returns domains from "domains" array', async () => {
      const domains = [{ name: 'example.com' }];
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 200, jsonData: { domains } }));
      const res = await getDomains({ token, teamId, projectId: 'p' });
      expect(res).toEqual(domains);
      expect((global.fetch as any).mock.calls[0][0]).toContain('/v10/projects/p/domains?teamId=' + encodeURIComponent(teamId));
    });

    it('getDomain returns domain by name and encodes', async () => {
      const dom = { name: 'ex ample.com' };
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 200, jsonData: dom }));
      const res = await getDomain({ token, teamId, domain: 'ex ample.com' });
      expect(res).toEqual(dom);
      expect((global.fetch as any).mock.calls[0][0]).toContain('/v10/domains/ex%20ample.com?teamId=' + encodeURIComponent(teamId));
    });

    it('addDomain posts name', async () => {
      const dom = { name: 'example.com' };
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 201, jsonData: dom }));
      const res = await addDomain({ token, teamId, projectId: 'p', domain: 'example.com' });
      const call = (global.fetch as any).mock.calls[0];
      expect(call[1].method).toBe('POST');
      expect(JSON.parse(call[1].body)).toEqual({ name: 'example.com' });
      expect(res).toEqual(dom);
    });

    it('removeDomain deletes and returns confirmation', async () => {
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 204, jsonData: {} }));
      const res = await removeDomain({ token, teamId, domain: 'example.com' });
      expect(res).toEqual({ removed: true });
      expect((global.fetch as any).mock.calls[0][0]).toContain('/v10/domains/example.com?teamId=' + encodeURIComponent(teamId));
    });
  });

  describe('DNS records', () => {
    it('getDNSRecords returns records from "records" array', async () => {
      const records = [{ id: 'r1', name: 'www', type: 'CNAME', value: 'example.vercel.app' }];
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 200, jsonData: { records } }));
      const res = await getDNSRecords({ token, teamId, domain: 'example.com' });
      expect(res).toEqual(records);
      expect((global.fetch as any).mock.calls[0][0]).toContain('/v4/domains/example.com/records?teamId=' + encodeURIComponent(teamId));
    });

    it('addDNSRecord posts record', async () => {
      const record = { id: 'r2', name: 'api', type: 'A', value: '1.2.3.4' };
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 201, jsonData: record }));
      const res = await addDNSRecord({ token, teamId, domain: 'example.com', record: { name: 'api', type: 'A', value: '1.2.3.4' } as any });
      expect(res).toEqual(record);
      const call = (global.fetch as any).mock.calls[0];
      expect(call[1].method).toBe('POST');
      expect(JSON.parse(call[1].body)).toEqual({ name: 'api', type: 'A', value: '1.2.3.4' });
    });

    it('removeDNSRecord deletes and returns confirmation', async () => {
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 204, jsonData: {} }));
      const res = await removeDNSRecord({ token, teamId, domain: 'example.com', recordId: 'r2' });
      expect(res).toEqual({ removed: true });
      expect((global.fetch as any).mock.calls[0][0]).toContain('/v4/domains/example.com/records/r2?teamId=' + encodeURIComponent(teamId));
    });
  });

  describe('env vars', () => {
    it('getEnvVars returns from "envs" array', async () => {
      const envs = [{ key: 'A', value: '1', target: ['production' as const] }];
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 200, jsonData: { envs } }));
      const res = await getEnvVars({ token, teamId, projectId: 'p' });
      expect(res).toEqual(envs);
      expect((global.fetch as any).mock.calls[0][0]).toContain('/v9/projects/p/env?teamId=' + encodeURIComponent(teamId));
    });

    it('addEnvVar posts env var', async () => {
      const env = { id: 'e1', key: 'A', value: '1', target: ['production' as const] };
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 201, jsonData: env }));
      const res = await addEnvVar({ token, teamId, projectId: 'p', envVar: { key: 'A', value: '1', target: ['production'] } as any });
      expect(res).toEqual(env);
      const call = (global.fetch as any).mock.calls[0];
      expect(call[1].method).toBe('POST');
      expect(JSON.parse(call[1].body)).toEqual({ key: 'A', value: '1', target: ['production'] });
    });

    it('updateEnvVar patches updates', async () => {
      const env = { id: 'e1', key: 'A', value: '2', target: ['production' as const] };
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 200, jsonData: env }));
      const res = await updateEnvVar({ token, teamId, projectId: 'p', envVarId: 'e1', updates: { value: '2' } });
      expect(res).toEqual(env);
      const call = (global.fetch as any).mock.calls[0];
      expect(call[1].method).toBe('PATCH');
      expect(JSON.parse(call[1].body)).toEqual({ value: '2' });
    });

    it('removeEnvVar deletes and returns confirmation', async () => {
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 204, jsonData: {} }));
      const res = await removeEnvVar({ token, teamId, projectId: 'p', envVarId: 'e1' });
      expect(res).toEqual({ removed: true });
      expect((global.fetch as any).mock.calls[0][0]).toContain('/v9/projects/p/env/e1?teamId=' + encodeURIComponent(teamId));
    });
  });

  describe('aliases', () => {
    it('getAliases returns from "aliases" array', async () => {
      const aliases = [{ alias: 'a.example.com' }];
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 200, jsonData: { aliases } }));
      const res = await getAliases({ token, teamId, projectId: 'p' });
      expect(res).toEqual(aliases);
      expect((global.fetch as any).mock.calls[0][0]).toContain('/v2/projects/p/aliases?teamId=' + encodeURIComponent(teamId));
    });

    it('createAlias posts alias payload', async () => {
      const alias = { alias: 'a.example.com' };
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 201, jsonData: alias }));
      const res = await createAlias({ token, teamId, deploymentId: 'd', alias: 'a.example.com' });
      expect(res).toEqual(alias);
      const call = (global.fetch as any).mock.calls[0];
      expect(call[0]).toContain('/v2/aliases?teamId=' + encodeURIComponent(teamId));
      expect(call[1].method).toBe('POST');
      expect(JSON.parse(call[1].body)).toEqual({ deploymentId: 'd', alias: 'a.example.com' });
    });

    it('removeAlias deletes and returns confirmation', async () => {
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 204, jsonData: {} }));
      const res = await removeAlias({ token, teamId, aliasId: 'a1' });
      expect(res).toEqual({ removed: true });
      expect((global.fetch as any).mock.calls[0][0]).toContain('/v2/aliases/a1?teamId=' + encodeURIComponent(teamId));
    });
  });

  describe('logs and usage', () => {
    it('getLogs queries with optional params', async () => {
      const logs = { entries: [] };
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 200, jsonData: logs }));
      const res = await getLogs({ token, teamId, deploymentId: 'd', limit: 100, since: 10, until: 20, query: 'error' });
      expect(res).toEqual(logs);
      const url = (global.fetch as any).mock.calls[0][0] as string;
      expect(url).toContain('/v2/deployments/d/logs?teamId=' + encodeURIComponent(teamId));
      expect(url).toContain('limit=100');
      expect(url).toContain('since=10');
      expect(url).toContain('until=20');
      expect(url).toContain('q=error');
    });

    it('getUsage returns usage object', async () => {
      const usage = { any: 'thing' };
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 200, jsonData: usage }));
      const res = await getUsage({ token, teamId, projectId: 'p' });
      expect(res).toEqual(usage);
      expect((global.fetch as any).mock.calls[0][0]).toContain('/v1/usage/projects/p?teamId=' + encodeURIComponent(teamId));
    });
  });

  describe('users and tokens', () => {
    it('getUser returns nested user object', async () => {
      const user = { uid: 'u1', email: 'a@b.c' };
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 200, jsonData: { user } }));
      const res = await getUser({ token, teamId });
      expect(res).toEqual(user);
      expect((global.fetch as any).mock.calls[0][0]).toContain('/v2/user?teamId=' + encodeURIComponent(teamId));
    });

    it('getToken returns null by design', async () => {
      const res = await getToken({ token }); // unused by impl
      expect(res).toBeNull();
    });

    it('createToken returns token string', async () => {
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 201, jsonData: { token: 'secret' } }));
      const res = await createToken({ token, name: 'cli', scopes: ['read', 'write'] });
      expect(res).toEqual({ token: 'secret' });
      const call = (global.fetch as any).mock.calls[0];
      expect(call[0]).toContain('/v3/user/tokens');
      expect(call[1].method).toBe('POST');
      expect(JSON.parse(call[1].body)).toEqual({ name: 'cli', scopes: ['read', 'write'] });
    });

    it('revokeToken deletes a token and returns confirmation', async () => {
      (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: true, status: 204, jsonData: {} }));
      const res = await revokeToken({ token, tokenId: 'tok_1' });
      expect(res).toEqual({ revoked: true });
      expect((global.fetch as any).mock.calls[0][0]).toContain('/v3/user/tokens/tok_1');
    });
  });

  describe('error handling consistency', () => {
    const cases: Array<{
      name: string;
      call: () => Promise<any>;
      expected: string;
    }> = [
      { name: 'getProject', call: () => getProject({ token, project: 'x' }), expected: 'vercel.getProject ' },
      { name: 'createProject', call: () => createProject({ token, name: 'x' }), expected: 'vercel.createProject ' },
      { name: 'updateProject', call: () => updateProject({ token, projectId: 'p' }), expected: 'vercel.updateProject ' },
      { name: 'deleteProject', call: () => deleteProject({ token, projectId: 'p' }), expected: 'vercel.deleteProject ' },
      { name: 'getDeployments', call: () => getDeployments({ token, projectIdOrName: 'p' }), expected: 'vercel.getDeployments ' },
      { name: 'getDeploymentById', call: () => getDeploymentById({ token, deploymentId: 'd' }), expected: 'vercel.getDeploymentById ' },
      { name: 'createDeployment', call: () => createDeployment({ token, projectId: 'p', payload: {} }), expected: 'vercel.createDeployment ' },
      { name: 'rollbackDeployment', call: () => rollbackDeployment({ token, deploymentId: 'd' }), expected: 'vercel.rollbackDeployment ' },
      { name: 'getDomains', call: () => getDomains({ token, projectId: 'p' }), expected: 'vercel.getDomains ' },
      { name: 'getDomain', call: () => getDomain({ token, domain: 'd' }), expected: 'vercel.getDomain ' },
      { name: 'addDomain', call: () => addDomain({ token, projectId: 'p', domain: 'd' }), expected: 'vercel.addDomain ' },
      { name: 'removeDomain', call: () => removeDomain({ token, domain: 'd' }), expected: 'vercel.removeDomain ' },
      { name: 'getDNSRecords', call: () => getDNSRecords({ token, domain: 'd' }), expected: 'vercel.getDNSRecords ' },
      { name: 'addDNSRecord', call: () => addDNSRecord({ token, domain: 'd', record: { name: 'a', type: 'A', value: '1.1.1.1' } as any }), expected: 'vercel.addDNSRecord ' },
      { name: 'removeDNSRecord', call: () => removeDNSRecord({ token, domain: 'd', recordId: 'r' }), expected: 'vercel.removeDNSRecord ' },
      { name: 'getEnvVars', call: () => getEnvVars({ token, projectId: 'p' }), expected: 'vercel.getEnvVars ' },
      { name: 'addEnvVar', call: () => addEnvVar({ token, projectId: 'p', envVar: { key: 'K', value: 'V', target: ['production'] } as any }), expected: 'vercel.addEnvVar ' },
      { name: 'updateEnvVar', call: () => updateEnvVar({ token, projectId: 'p', envVarId: 'e', updates: {} }), expected: 'vercel.updateEnvVar ' },
      { name: 'removeEnvVar', call: () => removeEnvVar({ token, projectId: 'p', envVarId: 'e' }), expected: 'vercel.removeEnvVar ' },
      { name: 'getAliases', call: () => getAliases({ token, projectId: 'p' }), expected: 'vercel.getAliases ' },
      { name: 'createAlias', call: () => createAlias({ token, deploymentId: 'd', alias: 'a' }), expected: 'vercel.createAlias ' },
      { name: 'removeAlias', call: () => removeAlias({ token, aliasId: 'a' }), expected: 'vercel.removeAlias ' },
      { name: 'getLogs', call: () => getLogs({ token, deploymentId: 'd' }), expected: 'vercel.getLogs ' },
      { name: 'getUsage', call: () => getUsage({ token, projectId: 'p' }), expected: 'vercel.getUsage ' },
      { name: 'getUser', call: () => getUser({ token }), expected: 'vercel.getUser ' },
      { name: 'createToken', call: () => createToken({ token, name: 'n' }), expected: 'vercel.createToken ' },
      { name: 'revokeToken', call: () => revokeToken({ token, tokenId: 't' }), expected: 'vercel.revokeToken ' },
    ];

    for (const c of cases) {
      it(`${c.name} throws with consistent error prefix and status`, async () => {
        (global.fetch as any).mockResolvedValueOnce(mockFetchResponse({ ok: false, status: 418 }));
        await expect(c.call()).rejects.toThrow(`${c.expected}418`);
      });
    }
  });
});