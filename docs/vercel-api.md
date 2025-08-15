# Vercel API

Comprehensive, pure function helpers for Vercel. Import from `@remcostoeten/fync/vercel`.

## Client Configuration

```ts
type TVercelClientConfig = {
  token: string;
  teamId?: string;
  baseURL?: string; // defaults to https://api.vercel.com
};
```

## Core Methods

- getVercelMetadata()
- getVercelHealth()
- withVercelContext(fn)

## Project Management

```ts
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} from '@remcostoeten/fync/vercel'

function exampleProjects(config: TVercelClientConfig) {
  return (async function run() {
    const projects = await getProjects(config)
    const project = await getProject({ ...config, project: projects[0].id })
    const created = await createProject({ ...config, name: 'fync-dashboard', framework: 'nextjs' })
    const updated = await updateProject({ ...config, projectId: created.id, name: 'fync-dashboard-main' })
    const removed = await deleteProject({ ...config, projectId: created.id })
    return { projects, project, created, updated, removed }
  })()
}
```

## Deployment Operations

```ts
import {
  getDeployments,
  getDeploymentById,
  getLatestDeployment,
  getLatestFailedDeployment,
  createDeployment,
  rollbackDeployment,
  getDeploymentTimestamps
} from '@remcostoeten/fync/vercel'

function exampleDeployments(config: TVercelClientConfig, projectId: string) {
  return (async function run() {
    const list = await getDeployments({ ...config, projectIdOrName: projectId, limit: 5 })
    const latest = await getLatestDeployment({ ...config, projectIdOrName: projectId })
    const failed = await getLatestFailedDeployment({ ...config, projectIdOrName: projectId })
    const created = await createDeployment({ ...config, projectId, payload: { name: 'fync', target: 'production' } })
    const rollback = await rollbackDeployment({ ...config, deploymentId: created.id })
    const timestamps = latest ? getDeploymentTimestamps(latest) : undefined
    const byId = await getDeploymentById({ ...config, deploymentId: created.id })
    return { list, latest, failed, created, rollback, timestamps, byId }
  })()
}
```

## Domains & DNS

```ts
import {
  getDomains,
  getDomain,
  addDomain,
  removeDomain,
  getDNSRecords,
  addDNSRecord,
  removeDNSRecord
} from '@remcostoeten/fync/vercel'

function exampleDomains(config: TVercelClientConfig, projectId: string, domain: string) {
  return (async function run() {
    const domains = await getDomains({ ...config, projectId })
    const details = await getDomain({ ...config, domain })
    const added = await addDomain({ ...config, projectId, domain })
    const records = await getDNSRecords({ ...config, domain })
    const record = await addDNSRecord({ ...config, domain, record: { name: '@', type: 'A', value: '1.2.3.4' } })
    const removedRecord = await removeDNSRecord({ ...config, domain, recordId: record.id! })
    const removed = await removeDomain({ ...config, domain })
    return { domains, details, added, records, record, removedRecord, removed }
  })()
}
```

## Environment Variables

```ts
import {
  getEnvVars,
  addEnvVar,
  updateEnvVar,
  removeEnvVar
} from '@remcostoeten/fync/vercel'

function exampleEnv(config: TVercelClientConfig, projectId: string) {
  return (async function run() {
    const envs = await getEnvVars({ ...config, projectId })
    const added = await addEnvVar({ ...config, projectId, envVar: { key: 'API_URL', value: 'https://api.example.com', target: ['development','preview','production'] } })
    const updated = await updateEnvVar({ ...config, projectId, envVarId: added.id!, updates: { value: 'https://api2.example.com' } })
    const removed = await removeEnvVar({ ...config, projectId, envVarId: added.id! })
    return { envs, added, updated, removed }
  })()
}
```

## Aliases & Routing

```ts
import { getAliases, createAlias, removeAlias } from '@remcostoeten/fync/vercel'

function exampleAliases(config: TVercelClientConfig, projectId: string, deploymentId: string) {
  return (async function run() {
    const aliases = await getAliases({ ...config, projectId })
    const created = await createAlias({ ...config, deploymentId, alias: 'staging.example.com' })
    const removed = await removeAlias({ ...config, aliasId: created.uid! })
    return { aliases, created, removed }
  })()
}
```

## Analytics / Logs

```ts
import { getLogs, getUsage } from '@remcostoeten/fync/vercel'

function exampleObservability(config: TVercelClientConfig, projectId: string, deploymentId: string) {
  return (async function run() {
    const logs = await getLogs({ ...config, deploymentId, limit: 100 })
    const usage = await getUsage({ ...config, projectId })
    return { logs, usage }
  })()
}
```

## Authentication

```ts
import { getUser, createToken, revokeToken } from '@remcostoeten/fync/vercel'

function exampleAuth(config: TVercelClientConfig) {
  return (async function run() {
    const user = await getUser(config)
    const token = await createToken({ ...config, name: 'fync-ci' })
    const revoked = await revokeToken({ ...config, tokenId: token.token })
    return { user, token, revoked }
  })()
}
```

## Links Helper

```ts
import { getVercelLinks } from '@remcostoeten/fync/vercel'

function exampleLinks(project: string, deployment: string) {
  return getVercelLinks(project, deployment)
}
```

