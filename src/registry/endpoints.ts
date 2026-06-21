import type { EndpointDefinition } from "./types.js";

const DOCS_ROOT = "https://developers.facebook.com/docs/threads";
const CANONICAL_ROOT = "https://developers.facebook.com/documentation/threads";

export const DEFAULT_API_VERSION = "v23.0";

const endpoints = [
  {
    id: "posts.createContainer",
    name: "Create Threads media container",
    category: "Posts and publishing",
    kind: "graph_endpoint",
    status: "supported",
    method: "POST",
    path: "/{threads_user_id}/threads",
    summary:
      "Creates a media container for a text, image, video, carousel item, carousel album, reply, quote, link, or GIF post before publishing.",
    docsUrl: `${CANONICAL_ROOT}/create-posts`,
    permissions: ["threads_basic", "threads_content_publish"],
    parameters: [
      {
        name: "threads_user_id",
        type: "string",
        required: true,
        description: "Threads user ID that owns the post container."
      },
      {
        name: "media_type",
        type: "TEXT | IMAGE | VIDEO | CAROUSEL_ALBUM",
        required: true,
        enum: ["TEXT", "IMAGE", "VIDEO", "CAROUSEL_ALBUM"],
        description: "Type of Threads container to create."
      },
      {
        name: "text",
        type: "string",
        description: "Post caption or text body. Required for text-only posts."
      },
      {
        name: "image_url",
        type: "string",
        description: "Publicly reachable image URL for IMAGE posts or carousel image items."
      },
      {
        name: "video_url",
        type: "string",
        description: "Publicly reachable video URL for VIDEO posts or carousel video items."
      },
      {
        name: "is_carousel_item",
        type: "boolean",
        description: "Marks an IMAGE or VIDEO container as a child item for a carousel album."
      },
      {
        name: "carousel_media_ids",
        type: "string[]",
        description: "Container IDs for child carousel items when media_type is CAROUSEL_ALBUM."
      },
      {
        name: "alt_text",
        type: "string",
        description: "Accessibility description for image media."
      },
      {
        name: "link_attachment_url",
        type: "string",
        description: "URL to attach as a link preview to a text post."
      },
      {
        name: "gif_attachment",
        type: "string",
        description: "GIF attachment URL or ID supported by Threads publishing."
      },
      {
        name: "reply_to_id",
        type: "string",
        description: "Threads media ID to reply to."
      },
      {
        name: "quote_post_id",
        type: "string",
        description: "Threads media ID to quote."
      },
      {
        name: "reply_control",
        type: "everyone | accounts_you_follow | mentioned_only",
        enum: ["everyone", "accounts_you_follow", "mentioned_only"],
        description: "Controls who can reply to the created thread when supported by the API."
      }
    ],
    responseFields: [
      { name: "id", type: "string", description: "Creation container ID used for publishing." }
    ],
    notes: [
      "The container creation call does not publish the post by itself.",
      "Use createContainer for replies by passing reply_to_id."
    ]
  },
  {
    id: "posts.publishContainer",
    name: "Publish Threads media container",
    category: "Posts and publishing",
    kind: "graph_endpoint",
    status: "supported",
    method: "POST",
    path: "/{threads_user_id}/threads_publish",
    summary: "Publishes a previously created Threads media container.",
    docsUrl: `${CANONICAL_ROOT}/create-posts`,
    permissions: ["threads_basic", "threads_content_publish"],
    parameters: [
      {
        name: "threads_user_id",
        type: "string",
        required: true,
        description: "Threads user ID that owns the media container."
      },
      {
        name: "creation_id",
        type: "string",
        required: true,
        description: "Media container ID returned by createContainer."
      }
    ],
    responseFields: [{ name: "id", type: "string", description: "Published Threads media ID." }]
  },
  {
    id: "posts.getMedia",
    name: "Retrieve a Threads post",
    category: "Posts and retrieval",
    kind: "graph_endpoint",
    status: "supported",
    method: "GET",
    path: "/{threads_media_id}",
    summary: "Retrieves fields for one Threads media object.",
    docsUrl: `${CANONICAL_ROOT}/retrieve-and-discover-posts`,
    permissions: ["threads_basic", "threads_content_publish or applicable read permission"],
    parameters: [
      {
        name: "threads_media_id",
        type: "string",
        required: true,
        description: "Threads media ID to retrieve."
      },
      {
        name: "fields",
        type: "string[]",
        description: "Fields to request from the media object."
      }
    ],
    responseFields: [
      { name: "id", type: "string", description: "Threads media ID." },
      { name: "media_product_type", type: "string", description: "Media product surface." },
      {
        name: "media_type",
        type: "string",
        description: "Media type such as TEXT, IMAGE, VIDEO, or CAROUSEL_ALBUM."
      },
      {
        name: "media_url",
        type: "string",
        description: "URL for image or video media when available."
      },
      { name: "permalink", type: "string", description: "Canonical public Threads URL." },
      { name: "owner", type: "object", description: "Owner object for the media." },
      { name: "username", type: "string", description: "Owner username." },
      { name: "text", type: "string", description: "Text body or caption." },
      { name: "timestamp", type: "string", description: "ISO timestamp for media creation." },
      { name: "shortcode", type: "string", description: "Shortcode identifier for the post." },
      { name: "thumbnail_url", type: "string", description: "Thumbnail URL for video media." },
      { name: "children", type: "object", description: "Carousel child media collection." },
      { name: "is_quote_post", type: "boolean", description: "Whether the media is a quote post." }
    ]
  },
  {
    id: "posts.listUserThreads",
    name: "Retrieve a user's Threads posts",
    category: "Posts and retrieval",
    kind: "graph_endpoint",
    status: "supported",
    method: "GET",
    path: "/{threads_user_id}/threads",
    summary: "Lists Threads posts for a Threads user with cursor pagination.",
    docsUrl: `${CANONICAL_ROOT}/retrieve-and-discover-posts`,
    permissions: ["threads_basic", "threads_content_publish or applicable read permission"],
    parameters: [
      { name: "threads_user_id", type: "string", required: true, description: "Threads user ID." },
      { name: "fields", type: "string[]", description: "Media fields to return." },
      {
        name: "limit",
        type: "number",
        description: "Maximum number of items to return in one page."
      },
      { name: "before", type: "string", description: "Cursor for the previous page." },
      { name: "after", type: "string", description: "Cursor for the next page." },
      {
        name: "since",
        type: "string | number",
        description: "Lower time bound accepted by Graph API."
      },
      {
        name: "until",
        type: "string | number",
        description: "Upper time bound accepted by Graph API."
      }
    ],
    responseFields: [
      { name: "data", type: "ThreadsMedia[]", description: "Page of Threads media objects." },
      { name: "paging", type: "object", description: "Cursor pagination metadata." }
    ]
  },
  {
    id: "posts.deleteMedia",
    name: "Delete a Threads post",
    category: "Posts and publishing",
    kind: "graph_endpoint",
    status: "supported",
    method: "DELETE",
    path: "/{threads_media_id}",
    summary: "Deletes a published Threads post owned by the authenticated user.",
    docsUrl: `${CANONICAL_ROOT}/create-posts`,
    permissions: ["threads_delete"],
    parameters: [
      {
        name: "threads_media_id",
        type: "string",
        required: true,
        description: "Threads media ID to delete."
      }
    ],
    responseFields: [
      { name: "success", type: "boolean", description: "Whether deletion succeeded." }
    ]
  },
  {
    id: "posts.getReplies",
    name: "Retrieve replies for a Threads post",
    category: "Replies",
    kind: "graph_endpoint",
    status: "supported",
    method: "GET",
    path: "/{threads_media_id}/replies",
    summary: "Lists replies for a Threads media object with cursor pagination.",
    docsUrl: `${CANONICAL_ROOT}/retrieve-and-manage-replies`,
    permissions: ["threads_basic", "threads_manage_replies"],
    parameters: [
      {
        name: "threads_media_id",
        type: "string",
        required: true,
        description: "Threads media ID whose replies should be listed."
      },
      { name: "fields", type: "string[]", description: "Reply fields to return." },
      {
        name: "limit",
        type: "number",
        description: "Maximum number of replies to return in one page."
      },
      { name: "before", type: "string", description: "Cursor for the previous page." },
      { name: "after", type: "string", description: "Cursor for the next page." }
    ],
    responseFields: [
      { name: "data", type: "ThreadsReply[]", description: "Page of reply media objects." },
      { name: "paging", type: "object", description: "Cursor pagination metadata." }
    ]
  },
  {
    id: "posts.getConversation",
    name: "Retrieve a Threads conversation",
    category: "Replies",
    kind: "graph_endpoint",
    status: "supported",
    method: "GET",
    path: "/{threads_media_id}/conversation",
    summary: "Retrieves the conversation context for a Threads media object.",
    docsUrl: `${CANONICAL_ROOT}/retrieve-and-manage-replies`,
    permissions: ["threads_basic", "threads_manage_replies"],
    parameters: [
      {
        name: "threads_media_id",
        type: "string",
        required: true,
        description: "Threads media ID in the conversation."
      },
      { name: "fields", type: "string[]", description: "Conversation media fields to return." }
    ],
    responseFields: [
      { name: "data", type: "ThreadsMedia[]", description: "Conversation media objects." }
    ]
  },
  {
    id: "posts.getMentions",
    name: "Retrieve posts mentioning a user",
    category: "Posts and retrieval",
    kind: "graph_endpoint",
    status: "supported",
    method: "GET",
    path: "/{threads_user_id}/mentions",
    summary: "Lists Threads posts that mention the Threads user.",
    docsUrl: `${CANONICAL_ROOT}/retrieve-and-discover-posts`,
    permissions: ["threads_basic", "threads_manage_mentions"],
    parameters: [
      {
        name: "threads_user_id",
        type: "string",
        required: true,
        description: "Threads user ID whose mentions should be retrieved."
      },
      { name: "fields", type: "string[]", description: "Mention media fields to return." },
      {
        name: "limit",
        type: "number",
        description: "Maximum number of items to return in one page."
      },
      { name: "before", type: "string", description: "Cursor for the previous page." },
      { name: "after", type: "string", description: "Cursor for the next page." }
    ],
    responseFields: [
      { name: "data", type: "ThreadsMedia[]", description: "Page of mentioned posts." },
      { name: "paging", type: "object", description: "Cursor pagination metadata." }
    ],
    notes: ["If the app lacks mentions access, Meta may return a permission error."]
  },
  {
    id: "replies.manageReply",
    name: "Manage or hide a reply",
    category: "Replies",
    kind: "graph_endpoint",
    status: "supported",
    method: "POST",
    path: "/{threads_reply_id}/manage_reply",
    summary: "Hides or unhides a reply on Threads when the authenticated user can manage it.",
    docsUrl: `${CANONICAL_ROOT}/retrieve-and-manage-replies`,
    permissions: ["threads_manage_replies"],
    parameters: [
      {
        name: "threads_reply_id",
        type: "string",
        required: true,
        description: "Threads reply media ID."
      },
      {
        name: "hide",
        type: "boolean",
        required: true,
        description: "True to hide the reply, false to unhide it."
      }
    ],
    responseFields: [
      { name: "success", type: "boolean", description: "Whether the management action succeeded." }
    ]
  },
  {
    id: "replies.getPendingReplies",
    name: "Retrieve pending replies",
    category: "Replies",
    kind: "graph_endpoint",
    status: "supported",
    method: "GET",
    path: "/{threads_media_id}/pending_replies",
    summary: "Lists pending replies that require approval for a Threads media object.",
    docsUrl: `${CANONICAL_ROOT}/retrieve-and-manage-replies`,
    permissions: ["threads_manage_replies"],
    parameters: [
      {
        name: "threads_media_id",
        type: "string",
        required: true,
        description: "Threads media ID whose pending replies should be listed."
      },
      { name: "fields", type: "string[]", description: "Pending reply fields to return." },
      {
        name: "limit",
        type: "number",
        description: "Maximum number of pending replies in one page."
      },
      { name: "before", type: "string", description: "Cursor for the previous page." },
      { name: "after", type: "string", description: "Cursor for the next page." }
    ],
    responseFields: [
      { name: "data", type: "ThreadsReply[]", description: "Page of pending replies." },
      { name: "paging", type: "object", description: "Cursor pagination metadata." }
    ]
  },
  {
    id: "replies.managePendingReply",
    name: "Approve or reject a pending reply",
    category: "Replies",
    kind: "graph_endpoint",
    status: "supported",
    method: "POST",
    path: "/{threads_reply_id}/manage_pending_replies",
    summary: "Approves or rejects a pending reply.",
    docsUrl: `${CANONICAL_ROOT}/retrieve-and-manage-replies`,
    permissions: ["threads_manage_replies"],
    parameters: [
      {
        name: "threads_reply_id",
        type: "string",
        required: true,
        description: "Pending Threads reply media ID."
      },
      {
        name: "reply_approval_status",
        type: "APPROVED | REJECTED",
        required: true,
        enum: ["APPROVED", "REJECTED"],
        description: "Approval decision for the pending reply."
      }
    ],
    responseFields: [
      { name: "success", type: "boolean", description: "Whether the approval action succeeded." }
    ]
  },
  {
    id: "profiles.getMe",
    name: "Retrieve the authenticated Threads profile",
    category: "Profiles",
    kind: "graph_endpoint",
    status: "supported",
    method: "GET",
    path: "/me",
    summary: "Retrieves profile fields for the authenticated Threads user.",
    docsUrl: `${DOCS_ROOT}/profile-discovery/`,
    permissions: ["threads_basic"],
    parameters: [{ name: "fields", type: "string[]", description: "Profile fields to return." }],
    responseFields: [
      { name: "id", type: "string", description: "Threads user ID." },
      { name: "username", type: "string", description: "Threads username." },
      { name: "name", type: "string", description: "Display name." },
      { name: "threads_profile_picture_url", type: "string", description: "Profile picture URL." },
      { name: "threads_biography", type: "string", description: "Profile biography." }
    ]
  },
  {
    id: "profiles.getUser",
    name: "Retrieve a Threads user profile",
    category: "Profiles",
    kind: "graph_endpoint",
    status: "supported",
    method: "GET",
    path: "/{threads_user_id}",
    summary: "Retrieves profile fields for a Threads user ID.",
    docsUrl: `${DOCS_ROOT}/profile-discovery/`,
    permissions: ["threads_basic"],
    parameters: [
      { name: "threads_user_id", type: "string", required: true, description: "Threads user ID." },
      { name: "fields", type: "string[]", description: "Profile fields to return." }
    ],
    responseFields: [
      { name: "id", type: "string", description: "Threads user ID." },
      { name: "username", type: "string", description: "Threads username." },
      { name: "name", type: "string", description: "Display name." },
      { name: "threads_profile_picture_url", type: "string", description: "Profile picture URL." },
      { name: "threads_biography", type: "string", description: "Profile biography." }
    ]
  },
  {
    id: "insights.getMediaInsights",
    name: "Retrieve Threads media insights",
    category: "Insights",
    kind: "graph_endpoint",
    status: "supported",
    method: "GET",
    path: "/{threads_media_id}/insights",
    summary: "Retrieves metrics for a Threads media object.",
    docsUrl: `${DOCS_ROOT}/insights/`,
    permissions: ["threads_read_insights"],
    parameters: [
      {
        name: "threads_media_id",
        type: "string",
        required: true,
        description: "Threads media ID."
      },
      {
        name: "metric",
        type: "string[]",
        required: true,
        description:
          "Metrics to request, such as views, likes, replies, reposts, quotes, and shares."
      },
      {
        name: "since",
        type: "string | number",
        description: "Lower time bound accepted by Graph API."
      },
      {
        name: "until",
        type: "string | number",
        description: "Upper time bound accepted by Graph API."
      }
    ],
    responseFields: [
      { name: "data", type: "InsightMetric[]", description: "Metric values returned by Graph API." }
    ]
  },
  {
    id: "insights.getUserInsights",
    name: "Retrieve Threads user insights",
    category: "Insights",
    kind: "graph_endpoint",
    status: "supported",
    method: "GET",
    path: "/{threads_user_id}/threads_insights",
    summary: "Retrieves account-level metrics for a Threads user.",
    docsUrl: `${DOCS_ROOT}/insights/`,
    permissions: ["threads_read_insights"],
    parameters: [
      { name: "threads_user_id", type: "string", required: true, description: "Threads user ID." },
      {
        name: "metric",
        type: "string[]",
        required: true,
        description:
          "Account metrics such as views, likes, replies, reposts, quotes, and followers_count."
      },
      {
        name: "breakdown",
        type: "string",
        description: "Breakdown dimension for supported demographic metrics."
      },
      {
        name: "since",
        type: "string | number",
        description: "Lower time bound accepted by Graph API."
      },
      {
        name: "until",
        type: "string | number",
        description: "Upper time bound accepted by Graph API."
      }
    ],
    responseFields: [
      { name: "data", type: "InsightMetric[]", description: "Metric values returned by Graph API." }
    ]
  },
  {
    id: "search.keywordSearch",
    name: "Keyword search",
    category: "Search and discovery",
    kind: "graph_endpoint",
    status: "beta",
    method: "GET",
    path: "/keyword_search",
    summary: "Searches recent public Threads posts by keyword when the app has access.",
    docsUrl: `${DOCS_ROOT}/keyword-search/`,
    permissions: ["threads_keyword_search"],
    parameters: [
      { name: "q", type: "string", required: true, description: "Keyword query." },
      { name: "fields", type: "string[]", description: "Media fields to return." },
      { name: "limit", type: "number", description: "Maximum number of results in one page." },
      { name: "before", type: "string", description: "Cursor for the previous page." },
      { name: "after", type: "string", description: "Cursor for the next page." }
    ],
    responseFields: [
      {
        name: "data",
        type: "ThreadsMedia[]",
        description: "Page of matching Threads media objects."
      },
      { name: "paging", type: "object", description: "Cursor pagination metadata." }
    ],
    notes: ["Access and behavior can depend on Meta availability and app review."]
  },
  {
    id: "location.search",
    name: "Location search",
    category: "Search and discovery",
    kind: "graph_endpoint",
    status: "beta",
    method: "GET",
    path: "/location_search",
    summary:
      "Searches location references usable by Threads publishing or discovery features when available.",
    docsUrl: `${DOCS_ROOT}/location-search/`,
    permissions: ["threads_basic"],
    parameters: [
      { name: "q", type: "string", required: true, description: "Location query." },
      { name: "latitude", type: "number", description: "Latitude bias for the search." },
      { name: "longitude", type: "number", description: "Longitude bias for the search." },
      { name: "limit", type: "number", description: "Maximum number of locations in one page." }
    ],
    responseFields: [
      { name: "data", type: "Location[]", description: "Matching location references." }
    ],
    notes: ["Access and behavior can depend on Meta availability and app review."]
  },
  {
    id: "tokens.exchangeLongLived",
    name: "Exchange for long-lived Threads token",
    category: "Auth and debug",
    kind: "graph_endpoint",
    status: "supported",
    method: "GET",
    path: "/access_token",
    summary: "Exchanges a short-lived Threads access token for a long-lived token.",
    docsUrl: `${DOCS_ROOT}/get-started/long-lived-tokens/`,
    permissions: ["OAuth app credentials"],
    parameters: [
      {
        name: "grant_type",
        type: "th_exchange_token",
        required: true,
        description: "Token exchange grant type."
      },
      { name: "client_secret", type: "string", required: true, description: "App client secret." },
      {
        name: "access_token",
        type: "string",
        required: true,
        description: "Short-lived Threads access token."
      }
    ],
    responseFields: [
      { name: "access_token", type: "string", description: "Long-lived Threads access token." },
      { name: "token_type", type: "string", description: "Token type." },
      { name: "expires_in", type: "number", description: "Token lifetime in seconds." }
    ]
  },
  {
    id: "tokens.refreshLongLived",
    name: "Refresh long-lived Threads token",
    category: "Auth and debug",
    kind: "graph_endpoint",
    status: "supported",
    method: "GET",
    path: "/refresh_access_token",
    summary: "Refreshes a long-lived Threads access token before expiration.",
    docsUrl: `${DOCS_ROOT}/get-started/long-lived-tokens/`,
    permissions: ["OAuth app credentials"],
    parameters: [
      {
        name: "grant_type",
        type: "th_refresh_token",
        required: true,
        description: "Token refresh grant type."
      },
      {
        name: "access_token",
        type: "string",
        required: true,
        description: "Long-lived Threads access token."
      }
    ],
    responseFields: [
      {
        name: "access_token",
        type: "string",
        description: "Refreshed long-lived Threads access token."
      },
      { name: "token_type", type: "string", description: "Token type." },
      { name: "expires_in", type: "number", description: "Token lifetime in seconds." }
    ]
  },
  {
    id: "debug.debugToken",
    name: "Debug a Threads access token",
    category: "Auth and debug",
    kind: "graph_endpoint",
    status: "supported",
    method: "GET",
    path: "/debug_token",
    summary: "Inspects a token with an app access token.",
    docsUrl: `${DOCS_ROOT}/troubleshooting/`,
    permissions: ["App access token"],
    parameters: [
      { name: "input_token", type: "string", required: true, description: "Token to inspect." },
      {
        name: "access_token",
        type: "string",
        required: true,
        description: "App access token used for inspection."
      }
    ],
    responseFields: [
      { name: "data", type: "object", description: "Graph API token inspection payload." }
    ]
  },
  {
    id: "embed.oEmbed",
    name: "Threads oEmbed",
    category: "Embeds",
    kind: "graph_endpoint",
    status: "supported",
    method: "GET",
    path: "/oembed_threads",
    summary: "Retrieves oEmbed metadata for a public Threads URL.",
    docsUrl: `${DOCS_ROOT}/oembed/`,
    permissions: ["App access token or documented oEmbed access"],
    parameters: [
      { name: "url", type: "string", required: true, description: "Public Threads post URL." },
      { name: "maxwidth", type: "number", description: "Maximum embed width." },
      { name: "omitscript", type: "boolean", description: "Whether to omit the embed script." },
      {
        name: "hidecaption",
        type: "boolean",
        description: "Whether to hide caption text when supported."
      }
    ],
    responseFields: [
      { name: "html", type: "string", description: "Embed HTML." },
      { name: "author_name", type: "string", description: "Author display name." },
      { name: "author_url", type: "string", description: "Author profile URL." },
      { name: "provider_name", type: "string", description: "Provider name." },
      { name: "provider_url", type: "string", description: "Provider URL." },
      { name: "type", type: "string", description: "oEmbed type." },
      { name: "version", type: "string", description: "oEmbed version." }
    ]
  },
  {
    id: "webhooks.setup",
    name: "Threads webhooks setup",
    category: "Webhooks",
    kind: "dashboard_setup",
    status: "dashboard_only",
    summary:
      "Webhook subscription setup is performed through Meta app dashboard and callback verification rather than a Threads SDK Graph helper.",
    docsUrl: `${DOCS_ROOT}/webhooks/`,
    permissions: ["Meta app dashboard access"],
    parameters: [
      {
        name: "callback_url",
        type: "string",
        description: "HTTPS endpoint configured in Meta app dashboard."
      },
      {
        name: "verify_token",
        type: "string",
        description: "Developer-defined challenge verification token."
      },
      { name: "fields", type: "string[]", description: "Subscribed Threads webhook fields." }
    ],
    responseFields: [
      {
        name: "hub.challenge",
        type: "string",
        description: "Challenge string to echo during webhook verification."
      }
    ]
  },
  {
    id: "webhooks.payload",
    name: "Threads webhook payload",
    category: "Webhooks",
    kind: "webhook_payload",
    status: "helper_only",
    summary: "Types for Threads webhook payloads delivered by Meta to the configured callback URL.",
    docsUrl: `${DOCS_ROOT}/webhooks/`,
    permissions: ["Webhook subscription"],
    parameters: [
      { name: "object", type: "string", description: "Webhook object name." },
      { name: "entry", type: "WebhookEntry[]", description: "Webhook entries." },
      { name: "changes", type: "WebhookChange[]", description: "Field changes in an entry." }
    ],
    responseFields: [
      { name: "field", type: "string", description: "Changed field." },
      { name: "value", type: "object", description: "Field-specific payload value." }
    ]
  }
] as const satisfies readonly EndpointDefinition[];

export const endpointRegistry: readonly EndpointDefinition[] = endpoints;

export type EndpointId = (typeof endpoints)[number]["id"];
