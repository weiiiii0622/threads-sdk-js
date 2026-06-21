import { ThreadsClient as BaseThreadsClient } from "./client/client.js";
import type { ThreadsClientOptions } from "./client/types.js";
import { InsightsEndpoint } from "./endpoints/insights.js";
import { PostsEndpoint } from "./endpoints/posts.js";
import { ProfilesEndpoint } from "./endpoints/profiles.js";
import { RepliesEndpoint } from "./endpoints/replies.js";
import { SearchEndpoint } from "./endpoints/search.js";
import { UtilitiesEndpoint } from "./endpoints/utilities.js";

export class ThreadsClient extends BaseThreadsClient {
  readonly posts: PostsEndpoint;
  readonly replies: RepliesEndpoint;
  readonly profiles: ProfilesEndpoint;
  readonly insights: InsightsEndpoint;
  readonly search: SearchEndpoint;
  readonly utilities: UtilitiesEndpoint;

  constructor(options: ThreadsClientOptions = {}) {
    super(options);
    this.posts = new PostsEndpoint(this);
    this.replies = new RepliesEndpoint(this);
    this.profiles = new ProfilesEndpoint(this);
    this.insights = new InsightsEndpoint(this);
    this.search = new SearchEndpoint(this);
    this.utilities = new UtilitiesEndpoint(this);
  }
}

export { ThreadsApiError, ThreadsTimeoutError } from "./client/errors.js";
export { REDACTED, redactString, redactValue } from "./client/redaction.js";
export type {
  FetchLike,
  NormalizedPage,
  Page,
  Paging,
  QueryParams,
  QueryValue,
  RequestOptions,
  RetryCallback,
  ThreadsClientOptions
} from "./client/types.js";
export * from "./endpoints/index.js";
export { DEFAULT_API_VERSION, endpointRegistry, isGraphEndpoint } from "./registry/index.js";
export type { EndpointDefinition, EndpointStatus, FieldDefinition } from "./registry/index.js";
