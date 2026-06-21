import type { ThreadsClient } from "../client/client.js";
import type { Fields } from "./shared.js";

export interface ThreadsProfile {
  id: string;
  username?: string;
  name?: string;
  threads_profile_picture_url?: string;
  threads_biography?: string;
  [key: string]: unknown;
}

export interface ProfileParams {
  fields?: Fields;
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
}
