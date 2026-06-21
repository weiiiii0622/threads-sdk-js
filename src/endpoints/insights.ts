import type { ThreadsClient } from "../client/client.js";
import type { Fields } from "./shared.js";

export interface InsightMetric {
  name: string;
  period?: string;
  values?: Array<{ value: unknown; end_time?: string }>;
  title?: string;
  description?: string;
  id?: string;
  [key: string]: unknown;
}

export interface InsightsResponse {
  data: InsightMetric[];
}

export interface MediaInsightsParams {
  metric: Fields;
  since?: string | number;
  until?: string | number;
}

export interface UserInsightsParams extends MediaInsightsParams {
  breakdown?: string;
}

export class InsightsEndpoint {
  constructor(private readonly client: ThreadsClient) {}

  getMedia(mediaId: string, params: MediaInsightsParams): Promise<InsightsResponse> {
    return this.client.request({
      method: "GET",
      path: "/{threads_media_id}/insights",
      pathParams: { threads_media_id: mediaId },
      query: params
    });
  }

  getUser(userId: string, params: UserInsightsParams): Promise<InsightsResponse> {
    return this.client.request({
      method: "GET",
      path: "/{threads_user_id}/threads_insights",
      pathParams: { threads_user_id: userId },
      query: params
    });
  }
}
