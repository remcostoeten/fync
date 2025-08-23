import type { TBaseEntity, TTimestamps, TDateValue } from "../core/types";

export type TNormalized<T extends { id: any }> = T & {
  id: string | number;
  createdAt?: TDateValue;
  updatedAt?: TDateValue;
};

export function normalizeEntity<T extends { id: any }>(entity: T): TNormalized<T> {
  function coerceDate(input: any): TDateValue | undefined {
    if (input === undefined || input === null) return undefined;
    if (typeof input === "string") return input;
    if (input instanceof Date) return input;
    return undefined;
  }

  return {
    ...entity,
    id: entity.id,
    createdAt: coerceDate((entity as any).createdAt ?? (entity as any).created_at),
    updatedAt: coerceDate((entity as any).updatedAt ?? (entity as any).updated_at),
  } as TNormalized<T>;
}

export function normalizeArray<T extends { id: any }>(items: T[]): Array<TNormalized<T>> {
  return items.map(function (i) { return normalizeEntity(i); });
}

