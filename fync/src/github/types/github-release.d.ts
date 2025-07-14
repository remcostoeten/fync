import type { TBaseEntity } from "./base-entity";
import type { TGitHubUser } from "./github-user";
type TGitHubReleaseAsset = TBaseEntity & {
	name: string;
	label: string | null;
	uploader: TGitHubUser;
	content_type: string;
	state: "uploaded" | "open";
	size: number;
	download_count: number;
	browser_download_url: string;
	url: string;
	node_id: string;
};
type TGitHubRelease = TBaseEntity & {
	tag_name: string;
	target_commitish: string;
	name: string | null;
	draft: boolean;
	author: TGitHubUser;
	prerelease: boolean;
	published_at: string | null;
	assets: TGitHubReleaseAsset[];
	tarball_url: string;
	zipball_url: string;
	body: string | null;
	body_html: string | null;
	body_text: string | null;
	mentions_count: number;
	discussion_url: string | null;
	reactions: {
		total_count: number;
		"+1": number;
		"-1": number;
		laugh: number;
		confused: number;
		heart: number;
		hooray: number;
		eyes: number;
		rocket: number;
	} | null;
	html_url: string;
	assets_url: string;
	upload_url: string;
	node_id: string;
	make_latest: "true" | "false" | "legacy";
};
type TGitHubTag = {
	name: string;
	commit: {
		sha: string;
		url: string;
	};
	zipball_url: string;
	tarball_url: string;
	node_id: string;
};
export type { TGitHubRelease, TGitHubReleaseAsset, TGitHubTag };
//# sourceMappingURL=github-release.d.ts.map
