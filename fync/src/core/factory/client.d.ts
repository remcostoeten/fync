import type { TBaseEntity } from "../types";
import type { TApiClientFactory, TResourceConfig } from "./types";
export declare function createApiClient<T extends TBaseEntity>(
	resourceConfig: TResourceConfig<T>,
): TApiClientFactory<T>;
//# sourceMappingURL=client.d.ts.map
