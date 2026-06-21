import type { ThreadsClient } from "../client/client.js";
import type { NormalizedPage } from "../client/types.js";
import type { ThreadsMedia } from "./posts.js";
import type { CursorParams, Fields } from "./shared.js";

export interface KeywordSearchParams extends CursorParams {
  q: string;
  fields?: Fields;
}

export interface LocationSearchParams {
  q: string;
  latitude?: number;
  longitude?: number;
  limit?: number;
}

export interface LocationResult {
  id?: string;
  name?: string;
  latitude?: number;
  longitude?: number;
  [key: string]: unknown;
}

export class SearchEndpoint {
  constructor(private readonly client: ThreadsClient) {}

  keyword(params: KeywordSearchParams): Promise<NormalizedPage<ThreadsMedia>> {
    return this.client.page({
      method: "GET",
      path: "/keyword_search",
      query: params
    });
  }

  location(params: LocationSearchParams): Promise<{ data: LocationResult[] }> {
    return this.client.request({
      method: "GET",
      path: "/location_search",
      query: params
    });
  }
}
