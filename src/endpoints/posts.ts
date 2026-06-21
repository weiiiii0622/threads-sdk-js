import type { ThreadsClient } from "../client/client.js";
import type { NormalizedPage, Page } from "../client/types.js";
import type { CursorParams, Fields } from "./shared.js";

export type ThreadsMediaType = "TEXT" | "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
export type ReplyControl = "everyone" | "accounts_you_follow" | "mentioned_only";

export interface CreateMediaContainerParams {
  media_type: ThreadsMediaType;
  text?: string;
  image_url?: string;
  video_url?: string;
  is_carousel_item?: boolean;
  carousel_media_ids?: string[];
  alt_text?: string;
  link_attachment_url?: string;
  gif_attachment?: string;
  reply_to_id?: string;
  quote_post_id?: string;
  reply_control?: ReplyControl;
}

export interface PublishMediaContainerParams {
  creation_id: string;
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

  delete(mediaId: string): Promise<{ success: boolean }> {
    return this.client.request({
      method: "DELETE",
      path: "/{threads_media_id}",
      pathParams: { threads_media_id: mediaId }
    });
  }

  getReplies(
    mediaId: string,
    params: ListThreadsParams = {}
  ): Promise<NormalizedPage<ThreadsMedia>> {
    return this.client.page({
      method: "GET",
      path: "/{threads_media_id}/replies",
      pathParams: { threads_media_id: mediaId },
      query: params
    });
  }

  getConversation(mediaId: string, params: GetMediaParams = {}): Promise<Page<ThreadsMedia>> {
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
