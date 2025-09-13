import type { TBaseEntity } from "../../core/types";
import type { TGitLabUser } from "./gitlab-user";

export type TGitLabPipeline = {
	/** Pipeline ID */
	id: number;
	/** Pipeline IID */
	iid: number;
	/** Project ID */
	project_id: number;
	/** Pipeline SHA */
	sha: string;
	/** Pipeline ref */
	ref: string;
	/** Pipeline status */
	status: "created" | "waiting_for_resource" | "preparing" | "pending" | "running" | "success" | "failed" | "canceled" | "skipped" | "manual" | "scheduled";
	/** Pipeline source */
	source: "push" | "web" | "schedule" | "api" | "external" | "pipeline" | "chat" | "webide" | "merge_request_event" | "external_pull_request_event" | "parent_pipeline" | "ondemand_dast_scan" | "ondemand_dast_validation";
	/** Tag */
	tag: boolean;
	/** YAML errors */
	yaml_errors: string | null;
	/** Pipeline user */
	user: TGitLabUser;
	/** Started at */
	started_at: string | null;
	/** Finished at */
	finished_at: string | null;
	/** Committed at */
	committed_at: string | null;
	/** Duration */
	duration: number | null;
	/** Queued duration */
	queued_duration: number | null;
	/** Coverage */
	coverage: string | null;
	/** Web URL */
	web_url: string;
	/** Name */
	name: string | null;
	/** Before SHA */
	before_sha: string;
	/** Detailed status */
	detailed_status: {
		/** Icon */
		icon: string;
		/** Text */
		text: string;
		/** Label */
		label: string;
		/** Group */
		group: string;
		/** Tooltip */
		tooltip: string;
		/** Has details */
		has_details: boolean;
		/** Details path */
		details_path: string;
		/** Illustration */
		illustration: string | null;
		/** Favicon */
		favicon: string;
	};
} & TBaseEntity;

export type TGitLabJob = {
	/** Job ID */
	id: number;
	/** Job status */
	status: "created" | "pending" | "running" | "success" | "failed" | "canceled" | "skipped" | "manual" | "scheduled";
	/** Job stage */
	stage: string;
	/** Job name */
	name: string;
	/** Job ref */
	ref: string;
	/** Job tag */
	tag: boolean;
	/** Coverage */
	coverage: string | null;
	/** Allow failure */
	allow_failure: boolean;
	/** Duration */
	duration: number | null;
	/** Queued duration */
	queued_duration: number | null;
	/** Started at */
	started_at: string | null;
	/** Finished at */
	finished_at: string | null;
	/** Erased at */
	erased_at: string | null;
	/** Job user */
	user: TGitLabUser | null;
	/** Runner */
	runner: {
		/** Runner ID */
		id: number;
		/** Runner description */
		description: string;
		/** Runner IP address */
		ip_address: string;
		/** Runner active */
		active: boolean;
		/** Runner is shared */
		is_shared: boolean;
		/** Runner runner type */
		runner_type: "instance_type" | "group_type" | "project_type";
		/** Runner name */
		name: string;
		/** Runner online */
		online: boolean;
		/** Runner status */
		status: "active" | "paused" | "online" | "offline" | "not_connected" | "never_contacted";
	} | null;
	/** Pipeline */
	pipeline: {
		/** Pipeline ID */
		id: number;
		/** Pipeline project ID */
		project_id: number;
		/** Pipeline ref */
		ref: string;
		/** Pipeline SHA */
		sha: string;
		/** Pipeline status */
		status: string;
	};
	/** Commit */
	commit: {
		/** Commit ID */
		id: string;
		/** Short ID */
		short_id: string;
		/** Title */
		title: string;
		/** Author name */
		author_name: string;
		/** Author email */
		author_email: string;
		/** Message */
		message: string;
		/** Authored date */
		authored_date: string;
		/** Committer name */
		committer_name: string;
		/** Committer email */
		committer_email: string;
		/** Committed date */
		committed_date: string;
		/** Trailers */
		trailers: Record<string, string>;
		/** Web URL */
		web_url: string;
	};
	/** Artifacts */
	artifacts: Array<{
		/** File type */
		file_type: string;
		/** File size */
		size: number;
		/** Filename */
		filename: string;
		/** File format */
		file_format: string;
	}>;
	/** Artifacts file */
	artifacts_file: {
		/** Filename */
		filename: string;
		/** File size */
		size: number;
	} | null;
	/** Archived */
	archived: boolean;
	/** Failure reason */
	failure_reason: string | null;
	/** Tag list */
	tag_list: string[];
	/** Web URL */
	web_url: string;
	/** Environment */
	environment: {
		/** Environment name */
		name: string;
		/** Environment action */
		action: "start" | "prepare" | "stop" | "verify" | "access";
		/** Environment deployment tier */
		deployment_tier: "production" | "staging" | "testing" | "development" | "other";
	} | null;
	/** When */
	when: "on_success" | "on_failure" | "always" | "manual" | "delayed";
} & TBaseEntity;

export type TGitLabPipelineVariable = {
	/** Variable key */
	key: string;
	/** Variable value */
	value: string;
	/** Variable type */
	variable_type: "env_var" | "file";
};

export type TGitLabEnvironment = {
	/** Environment ID */
	id: number;
	/** Environment name */
	name: string;
	/** Environment slug */
	slug: string;
	/** Environment external URL */
	external_url: string | null;
	/** Environment state */
	state: "available" | "stopped";
	/** Environment tier */
	tier: "production" | "staging" | "testing" | "development" | "other";
	/** Last deployment */
	last_deployment: {
		/** Deployment ID */
		id: number;
		/** Deployment IID */
		iid: number;
		/** Deployment ref */
		ref: string;
		/** Deployment SHA */
		sha: string;
		/** Deployment status */
		status: "created" | "running" | "success" | "failed" | "canceled" | "skipped" | "blocked";
		/** Deployment tag */
		tag: boolean;
		/** Deployable */
		deployable: {
			/** Job ID */
			id: number;
			/** Job status */
			status: string;
			/** Job stage */
			stage: string;
			/** Job name */
			name: string;
			/** Job ref */
			ref: string;
			/** Job tag */
			tag: boolean;
			/** Coverage */
			coverage: string | null;
			/** Pipeline */
			pipeline: {
				/** Pipeline ID */
				id: number;
				/** Pipeline SHA */
				sha: string;
				/** Pipeline ref */
				ref: string;
				/** Pipeline status */
				status: string;
				/** Pipeline web URL */
				web_url: string;
			};
			/** Job user */
			user: TGitLabUser;
		};
		/** Environment */
		environment: {
			/** Environment ID */
			id: number;
			/** Environment name */
			name: string;
			/** Environment external URL */
			external_url: string | null;
		};
	} | null;
} & TBaseEntity;
