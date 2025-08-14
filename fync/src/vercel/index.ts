export type TVercelEnv = 'production' | 'preview' | 'development';

export type TVercelGit = {
  commitSha?: string;
  commitMessage?: string;
  repo?: string;
  owner?: string;
  branch?: string;
};

export type TVercelMetadata = {
  env: TVercelEnv;
  isVercel: boolean;
  url?: string;
  region?: string;
  git: TVercelGit;
  deploymentId?: string;
  buildId?: string;
  timestamp: string;
  version?: string;
};

function value(v: string | undefined): string | undefined {
  if (typeof v !== 'string') return undefined;
  const trimmed = v.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function vercelEnv(): TVercelEnv {
  const env = value(process.env.VERCEL_ENV) as TVercelEnv | undefined;
  if (env === 'production' || env === 'preview' || env === 'development') return env;
  if (process.env.NODE_ENV === 'production') return 'production';
  return 'development';
}

export function getVercelMetadata(now?: Date): TVercelMetadata {
  const timestamp = (now ?? new Date()).toISOString();
  const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true';
  const env = vercelEnv();
  const url = value(process.env.VERCEL_URL) ?? value(process.env.NEXT_PUBLIC_VERCEL_URL);
  const region = value((process.env as any).VERCEL_REGION);
  const deploymentId = value((process.env as any).VERCEL_DEPLOYMENT_ID);
  const buildId = value((process.env as any).VERCEL_BUILD_ID);
  const git: TVercelGit = {
    commitSha: value((process.env as any).VERCEL_GIT_COMMIT_SHA) ?? value(process.env.GIT_COMMIT_SHA),
    commitMessage: value((process.env as any).VERCEL_GIT_COMMIT_MESSAGE),
    repo: value((process.env as any).VERCEL_GIT_REPO_SLUG),
    owner: value((process.env as any).VERCEL_GIT_REPO_OWNER) ?? value((process.env as any).VERCEL_GIT_OWNER),
    branch: value((process.env as any).VERCEL_GIT_COMMIT_REF) ?? value((process.env as any).VERCEL_GIT_BRANCH)
  };

  let version: string | undefined;
  try {
    // Import lazily to avoid circular deps when not needed
    const core = require('../core/index.js');
    version = typeof core.version === 'string' ? core.version : undefined;
  } catch {}

  return {
    env,
    isVercel,
    url,
    region,
    git,
    deploymentId,
    buildId,
    timestamp,
    version
  };
}

export type TVercelHealth = {
  status: 'ok';
  timestamp: string;
  env: TVercelEnv;
};

export function getVercelHealth(now?: Date): TVercelHealth {
  const timestamp = (now ?? new Date()).toISOString();
  return { status: 'ok', timestamp, env: vercelEnv() };
}

export type TVercelContextResult<T> = {
  result: T;
  context: TVercelMetadata;
};

export async function withVercelContext<T>(fn: (context: TVercelMetadata) => Promise<T> | T, now?: Date): Promise<TVercelContextResult<T>> {
  const context = getVercelMetadata(now);
  const result = await fn(context);
  return { result, context };
}
