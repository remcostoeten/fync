import type { TBaseEntity } from "./base-entity";
import type { TGitHubUser } from "./github-user";
export type TGitHubGist = {
    /** URL to the gist */
    url: string;
    /** Forks URL */
    forks_url: string;
    /** Commits URL */
    commits_url: string;
    /** Gist ID */
    id: string;
    /** Node ID */
    node_id: string;
    /** Git pull URL */
    git_pull_url: string;
    /** Git push URL */
    git_push_url: string;
    /** HTML URL */
    html_url: string;
    /** Files in the gist */
    files: Record<string, {
        filename: string;
        type: string;
        language: string | null;
        raw_url: string;
        size: number;
        truncated?: boolean;
        content?: string;
    }>;
    /** Whether the gist is public */
    public: boolean;
    /** Timestamp when the gist was created */
    created_at: string;
    /** Timestamp when the gist was last updated */
    updated_at: string;
    /** Gist description */
    description: string | null;
    /** Number of comments */
    comments: number;
    /** User who created the gist */
    user: TGitHubUser | null;
    /** Comments URL */
    comments_url: string;
    /** Owner of the gist */
    owner: TGitHubUser | null;
    /** Whether the gist is truncated */
    truncated?: boolean;
    /** Forks of the gist */
    forks?: readonly {
        user: TGitHubUser;
        url: string;
        id: string;
        created_at: string;
        updated_at: string;
    }[];
    /** History of the gist */
    history?: readonly {
        user: TGitHubUser;
        version: string;
        committed_at: string;
        change_status: {
            total: number;
            additions: number;
            deletions: number;
        };
        url: string;
    }[];
} & TBaseEntity;
//# sourceMappingURL=github-gist.d.ts.map