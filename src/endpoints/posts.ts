import type { ThreadsClient } from "../client/client.js";
import type { NormalizedPage, Page } from "../client/types.js";
import type { CursorParams, Fields } from "./shared.js";

export type ThreadsMediaType = "TEXT" | "IMAGE" | "VIDEO" | "CAROUSEL";
export type ReplyControl =
  | "everyone"
  | "accounts_you_follow"
  | "mentioned_only"
  | "parent_post_author_only"
  | "followers_only";

export interface CreateMediaContainerParams {
  media_type: ThreadsMediaType;
  text?: string;
  image_url?: string;
  video_url?: string;
  is_carousel_item?: boolean;
  children?: string[];
  allowlisted_country_codes?: string[];
  alt_text?: string;
  link_attachment?: string;
  poll_attachment?: Record<string, string>;
  topic_tag?: string;
  location_id?: string;
  auto_publish_text?: boolean;
  text_entities?: Array<Record<string, unknown>>;
  text_attachment?: Record<string, unknown>;
  gif_attachment?: Record<string, unknown>;
  is_ghost_post?: boolean;
  is_spoiler_media?: boolean;
  enable_reply_approvals?: boolean;
  crossreshare_to_ig?: boolean;
  crossreshare_to_ig_dark_mode?: boolean;
  reply_to_id?: string;
  quote_post_id?: string;
  reply_control?: ReplyControl;
}

export interface PublishMediaContainerParams {
  creation_id: string;
}

export interface MediaContainerStatus {
  id: string;
  status?: string;
  error_message?: string;
  [key: string]: unknown;
}

export interface ThreadsMedia {
  id: string;
  media_product_type?: string;
  media_type?: string;
  media_url?: string;
  permalink?: string;
  owner?: Record<string, unknown>;
  username?: string;
  text?: string;
  timestamp?: string;
  shortcode?: string;
  thumbnail_url?: string;
  children?: Page<ThreadsMedia>;
  is_quote_post?: boolean;
  alt_text?: string;
  link_attachment_url?: string;
  has_replies?: boolean;
  is_reply?: boolean;
  is_reply_owned_by_me?: boolean;
  root_post?: Record<string, unknown>;
  replied_to?: Record<string, unknown>;
  hide_status?: string;
  reply_audience?: string;
  quoted_post?: Record<string, unknown>;
  reposted_post?: Record<string, unknown>;
  gif_url?: string;
  poll_attachment?: Record<string, unknown>;
  topic_tag?: string;
  is_spoiler_media?: boolean;
  text_entities?: Array<Record<string, unknown>>;
  text_attachment?: Record<string, unknown>;
  location_id?: string;
  is_verified?: boolean;
  profile_picture_url?: string;
  reply_approval_status?: string;
  [key: string]: unknown;
}

export interface GetMediaParams {
  fields?: Fields;
}

export interface ListThreadsParams extends CursorParams {
  fields?: Fields;
  since?: string | number;
  until?: string | number;
}

export interface ListRepliesParams extends CursorParams {
  fields?: Fields;
  reverse?: boolean;
}

export class PostsEndpoint {
  constructor(private readonly client: ThreadsClient) {}

  createContainer(
    threadsUserId: string,
    params: CreateMediaContainerParams
  ): Promise<{ id: string }> {
    return this.client.request({
      method: "POST",
      path: "/{threads_user_id}/threads",
      pathParams: { threads_user_id: threadsUserId },
      body: params
    });
  }

  publishContainer(
    threadsUserId: string,
    params: PublishMediaContainerParams
  ): Promise<{ id: string }> {
    return this.client.request({
      method: "POST",
      path: "/{threads_user_id}/threads_publish",
      pathParams: { threads_user_id: threadsUserId },
      body: params
    });
  }

  repost(mediaId: string): Promise<{ id: string }> {
    return this.client.request({
      method: "POST",
      path: "/{threads_media_id}/repost",
      pathParams: { threads_media_id: mediaId }
    });
  }

  getContainerStatus(
    containerId: string,
    params: GetMediaParams = {}
  ): Promise<MediaContainerStatus> {
    return this.client.request({
      method: "GET",
      path: "/{threads_container_id}",
      pathParams: { threads_container_id: containerId },
      query: params
    });
  }

  get(mediaId: string, params: GetMediaParams = {}): Promise<ThreadsMedia> {
    return this.client.request({
      method: "GET",
      path: "/{threads_media_id}",
      pathParams: { threads_media_id: mediaId },
      query: params
    });
  }

  listUserThreads(
    userId: string,
    params: ListThreadsParams = {}
  ): Promise<NormalizedPage<ThreadsMedia>> {
    return this.client.page({
      method: "GET",
      path: "/{threads_user_id}/threads",
      pathParams: { threads_user_id: userId },
      query: params
    });
  }

  delete(mediaId: string): Promise<{ success: boolean; deleted_id?: string }> {
    return this.client.request({
      method: "DELETE",
      path: "/{threads_media_id}",
      pathParams: { threads_media_id: mediaId }
    });
  }

  getReplies(
    mediaId: string,
    params: ListRepliesParams = {}
  ): Promise<NormalizedPage<ThreadsMedia>> {
    return this.client.page({
      method: "GET",
      path: "/{threads_media_id}/replies",
      pathParams: { threads_media_id: mediaId },
      query: params
    });
  }

  getConversation(
    mediaId: string,
    params: ListRepliesParams = {}
  ): Promise<Page<ThreadsMedia>> {
    return this.client.request({
      method: "GET",
      path: "/{threads_media_id}/conversation",
      pathParams: { threads_media_id: mediaId },
      query: params
    });
  }

  getMentions(
    userId: string,
    params: ListThreadsParams = {}
  ): Promise<NormalizedPage<ThreadsMedia>> {
    return this.client.page({
      method: "GET",
      path: "/{threads_user_id}/mentions",
      pathParams: { threads_user_id: userId },
      query: params
    });
  }
}
