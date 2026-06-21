import type { ThreadsClient } from "../client/client.js";
import type { NormalizedPage } from "../client/types.js";
import type { ThreadsMedia } from "./posts.js";
import type { CursorParams, Fields } from "./shared.js";

export interface ThreadsProfile {
  id: string;
  username?: string;
  name?: string;
  threads_profile_picture_url?: string;
  threads_biography?: string;
  is_verified?: boolean;
  recently_searched_keywords?: string[];
  [key: string]: unknown;
}

export interface ProfileParams {
  fields?: Fields;
}

export interface ProfileLookupParams {
  username: string;
}

export interface PublicProfilePostsParams extends CursorParams {
  username: string;
  fields?: Fields;
  since?: string | number;
  until?: string | number;
}

export interface PublishingLimitParams {
  fields?: Fields;
}

export interface ThreadsPublishingLimit {
  quota_usage?: number;
  config?: Record<string, unknown>;
  reply_quota_usage?: number;
  reply_config?: Record<string, unknown>;
  delete_quota_usage?: number;
  delete_config?: Record<string, unknown>;
  location_search_quota_usage?: number;
  location_search_config?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface UserRepliesParams extends CursorParams {
  fields?: Fields;
  since?: string | number;
  until?: string | number;
}

export class ProfilesEndpoint {
  constructor(private readonly client: ThreadsClient) {}

  getMe(params: ProfileParams = {}): Promise<ThreadsProfile> {
    return this.client.request({
      method: "GET",
      path: "/me",
      query: params
    });
  }

  get(userId: string, params: ProfileParams = {}): Promise<ThreadsProfile> {
    return this.client.request({
      method: "GET",
      path: "/{threads_user_id}",
      pathParams: { threads_user_id: userId },
      query: params
    });
  }

  lookup(params: ProfileLookupParams): Promise<ThreadsProfile> {
    return this.client.request({
      method: "GET",
      path: "/profile_lookup",
      query: params
    });
  }

  listPublicPosts(params: PublicProfilePostsParams): Promise<NormalizedPage<ThreadsMedia>> {
    return this.client.page({
      method: "GET",
      path: "/profile_posts",
      query: params
    });
  }

  getPublishingLimit(
    userId: string,
    params: PublishingLimitParams = {}
  ): Promise<ThreadsPublishingLimit> {
    return this.client.request({
      method: "GET",
      path: "/{threads_user_id}/threads_publishing_limit",
      pathParams: { threads_user_id: userId },
      query: params
    });
  }

  listReplies(
    userId: string,
    params: UserRepliesParams = {}
  ): Promise<NormalizedPage<ThreadsMedia>> {
    return this.client.page({
      method: "GET",
      path: "/{threads_user_id}/replies",
      pathParams: { threads_user_id: userId },
      query: params
    });
  }
}
