import type { QueryParams } from "../client/client.js";

export type Fields = string[];

export interface CursorParams extends QueryParams {
  limit?: number;
  before?: string;
  after?: string;
}

export function withFields<T extends QueryParams>(params: T | undefined): QueryParams {
  if (!params) {
    return {};
  }
  return params;
}
