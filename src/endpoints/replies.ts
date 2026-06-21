import type { ThreadsClient } from "../client/client.js";
import type { NormalizedPage } from "../client/types.js";
import type { ThreadsMedia } from "./posts.js";
import type { CursorParams, Fields } from "./shared.js";

export interface ManageReplyParams {
  hide: boolean;
}

export interface PendingRepliesParams extends CursorParams {
  fields?: Fields;
}

export interface ManagePendingReplyParams {
  reply_approval_status: "APPROVED" | "REJECTED";
}

export class RepliesEndpoint {
  constructor(private readonly client: ThreadsClient) {}

  manage(replyId: string, params: ManageReplyParams): Promise<{ success: boolean }> {
    return this.client.request({
      method: "POST",
      path: "/{threads_reply_id}/manage_reply",
      pathParams: { threads_reply_id: replyId },
      body: params
    });
  }

  getPending(
    mediaId: string,
    params: PendingRepliesParams = {}
  ): Promise<NormalizedPage<ThreadsMedia>> {
    return this.client.page({
      method: "GET",
      path: "/{threads_media_id}/pending_replies",
      pathParams: { threads_media_id: mediaId },
      query: params
    });
  }

  managePending(replyId: string, params: ManagePendingReplyParams): Promise<{ success: boolean }> {
    return this.client.request({
      method: "POST",
      path: "/{threads_reply_id}/manage_pending_replies",
      pathParams: { threads_reply_id: replyId },
      body: params
    });
  }
}
