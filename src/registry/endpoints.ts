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
      "Creates a media container for a text, image, video, carousel item, carousel parent, reply, quote, link, or GIF post before publishing.",
    docsUrl: `${DOCS_ROOT}/reference/publishing/`,
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
        type: "TEXT | IMAGE | VIDEO | CAROUSEL",
        required: true,
        enum: ["TEXT", "IMAGE", "VIDEO", "CAROUSEL"],
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
        description: "Marks an IMAGE or VIDEO container as a child item for a carousel post."
      },
      {
        name: "children",
        type: "string[]",
        description: "Container IDs for child carousel items when media_type is CAROUSEL."
      },
      {
        name: "allowlisted_country_codes",
        type: "string[]",
        description:
          "ISO 3166-1 alpha-2 country codes where this media should be shown."
      },
      {
        name: "alt_text",
        type: "string",
        description: "Accessibility description for image or video media."
      },
      {
        name: "link_attachment",
        type: "string",
        description: "URL to attach as a link preview to a text post."
      },
      {
        name: "poll_attachment",
        type: "object",
        description: "Poll attachment payload for text posts."
      },
      {
        name: "topic_tag",
        type: "string",
        description: "Topic tag to add to the created post."
      },
      {
        name: "location_id",
        type: "string",
        description: "Location ID to tag on the created post."
      },
      {
        name: "auto_publish_text",
        type: "boolean",
        description: "Automatically publishes a text container when supported by Threads."
      },
      {
        name: "text_entities",
        type: "object[]",
        description: "Structured text entities such as spoiler ranges."
      },
      {
        name: "text_attachment",
        type: "object",
        description: "Structured text attachment payload for text posts."
      },
      {
        name: "gif_attachment",
        type: "object",
        description: "GIF attachment payload supported by Threads publishing."
      },
      {
        name: "is_ghost_post",
        type: "boolean",
        description: "Creates a ghost post when supported by Threads."
      },
      {
        name: "is_spoiler_media",
        type: "boolean",
        description: "Marks attached image or video media as spoiler content."
      },
      {
        name: "enable_reply_approvals",
        type: "boolean",
        description: "Enables reply approvals for the created post when supported by Threads."
      },
      {
        name: "crossreshare_to_ig",
        type: "boolean",
        description:
          "Cross-shares a Threads post to a linked Instagram account as a Story when supported."
      },
      {
        name: "crossreshare_to_ig_dark_mode",
        type: "boolean",
        description:
          "Cross-shares a Threads post to a linked Instagram account as a dark-mode Story when supported."
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
        type:
          "everyone | accounts_you_follow | mentioned_only | parent_post_author_only | followers_only",
        enum: [
          "everyone",
          "accounts_you_follow",
          "mentioned_only",
          "parent_post_author_only",
          "followers_only"
        ],
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
    docsUrl: `${DOCS_ROOT}/reference/publishing/`,
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
    id: "posts.repost",
    name: "Repost a Threads post",
    category: "Posts and publishing",
    kind: "graph_endpoint",
    status: "supported",
    method: "POST",
    path: "/{threads_media_id}/repost",
    summary: "Reposts a Threads post.",
    docsUrl: `${DOCS_ROOT}/reference/publishing/`,
    permissions: ["threads_basic", "threads_content_publish"],
    parameters: [
      {
        name: "threads_media_id",
        type: "string",
        required: true,
        description: "Threads media ID to repost."
      }
    ],
    responseFields: [{ name: "id", type: "string", description: "Published repost media ID." }]
  },
  {
    id: "posts.getContainerStatus",
    name: "Check a media container's publishing status",
    category: "Posts and publishing",
    kind: "graph_endpoint",
    status: "supported",
    method: "GET",
    path: "/{threads_container_id}",
    summary: "Retrieves status fields for a Threads media container before or after publishing.",
    docsUrl: `${DOCS_ROOT}/reference/publishing/`,
    permissions: ["threads_basic", "threads_content_publish"],
    parameters: [
      {
        name: "threads_container_id",
        type: "string",
        required: true,
        description: "Threads media container ID."
      },
      {
        name: "fields",
        type: "string[]",
        description: "Container status fields to request, such as id, status, and error_message."
      }
    ],
    responseFields: [
      { name: "id", type: "string", description: "Threads media container ID." },
      { name: "status", type: "string", description: "Container publishing status." },
      {
        name: "error_message",
        type: "string",
        description: "Publishing error message when the container failed."
      }
    ]
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
    docsUrl: `${DOCS_ROOT}/reference/media-retrieval/`,
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
      { name: "is_quote_post", type: "boolean", description: "Whether the media is a quote post." },
      { name: "alt_text", type: "string", description: "Accessibility description for image media." },
      { name: "link_attachment_url", type: "string", description: "Attached link URL." },
      { name: "has_replies", type: "boolean", description: "Whether the media has replies." },
      { name: "is_reply", type: "boolean", description: "Whether the media is a reply." },
      {
        name: "is_reply_owned_by_me",
        type: "boolean",
        description: "Whether the reply is owned by the authenticated user."
      },
      { name: "root_post", type: "object", description: "Root post for reply media." },
      { name: "replied_to", type: "object", description: "Media object this media replies to." },
      { name: "hide_status", type: "string", description: "Reply hide status." },
      { name: "reply_audience", type: "string", description: "Reply audience setting." },
      { name: "quoted_post", type: "object", description: "Quoted post object." },
      { name: "reposted_post", type: "object", description: "Reposted post object." },
      { name: "gif_url", type: "string", description: "GIF media URL." },
      { name: "poll_attachment", type: "object", description: "Poll attachment." },
      { name: "topic_tag", type: "string", description: "Topic tag on the media." },
      { name: "is_spoiler_media", type: "boolean", description: "Whether media is spoiler-marked." },
      { name: "text_entities", type: "object[]", description: "Structured text entities." },
      { name: "text_attachment", type: "object", description: "Structured text attachment." },
      { name: "location_id", type: "string", description: "Tagged location ID." }
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
    docsUrl: `${DOCS_ROOT}/reference/user/`,
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
    docsUrl: `${DOCS_ROOT}/reference/reply-management/`,
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
      {
        name: "reverse",
        type: "boolean",
        description: "Whether replies should be sorted in reverse chronological order."
      },
      {
        name: "approval_status",
        type: "string",
        description: "Pending reply approval status filter."
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
    docsUrl: `${DOCS_ROOT}/reference/reply-management/`,
    permissions: ["threads_basic", "threads_manage_replies"],
    parameters: [
      {
        name: "threads_media_id",
        type: "string",
        required: true,
        description: "Threads media ID in the conversation."
      },
      { name: "fields", type: "string[]", description: "Conversation media fields to return." },
      {
        name: "reverse",
        type: "boolean",
        description: "Whether replies should be sorted in reverse chronological order."
      },
      { name: "before", type: "string", description: "Cursor for the previous page." },
      { name: "after", type: "string", description: "Cursor for the next page." }
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
    docsUrl: `${DOCS_ROOT}/reference/user/`,
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
    docsUrl: `${DOCS_ROOT}/reference/reply-management/`,
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
    docsUrl: `${DOCS_ROOT}/reference/reply-management/`,
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
      {
        name: "reverse",
        type: "boolean",
        description: "Whether replies should be sorted in reverse chronological order."
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
    name: "Approve or ignore a pending reply",
    category: "Replies",
    kind: "graph_endpoint",
    status: "supported",
    method: "POST",
    path: "/{threads_reply_id}/manage_pending_reply",
    summary: "Approves or ignores a pending reply.",
    docsUrl: `${DOCS_ROOT}/reference/reply-management/`,
    permissions: ["threads_manage_replies"],
    parameters: [
      {
        name: "threads_reply_id",
        type: "string",
        required: true,
        description: "Pending Threads reply media ID."
      },
      {
        name: "approve",
        type: "boolean",
        required: true,
        description: "True to approve the reply, false to ignore it."
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
    docsUrl: `${DOCS_ROOT}/reference/user/`,
    permissions: ["threads_basic"],
    parameters: [{ name: "fields", type: "string[]", description: "Profile fields to return." }],
    responseFields: [
      { name: "id", type: "string", description: "Threads user ID." },
      { name: "username", type: "string", description: "Threads username." },
      { name: "name", type: "string", description: "Display name." },
      { name: "threads_profile_picture_url", type: "string", description: "Profile picture URL." },
      { name: "threads_biography", type: "string", description: "Profile biography." },
      { name: "is_verified", type: "boolean", description: "Whether the profile is verified." },
      {
        name: "recently_searched_keywords",
        type: "string[]",
        description: "Recently searched keywords when returned by the API."
      }
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
    docsUrl: `${DOCS_ROOT}/reference/user/`,
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
      { name: "threads_biography", type: "string", description: "Profile biography." },
      { name: "is_verified", type: "boolean", description: "Whether the profile is verified." },
      {
        name: "recently_searched_keywords",
        type: "string[]",
        description: "Recently searched keywords when returned by the API."
      }
    ]
  },
  {
    id: "profiles.lookup",
    name: "Look up a public Threads profile",
    category: "Profiles",
    kind: "graph_endpoint",
    status: "supported",
    method: "GET",
    path: "/profile_lookup",
    summary: "Looks up a public Threads profile by exact username.",
    docsUrl: `${DOCS_ROOT}/reference/user/`,
    permissions: ["threads_basic"],
    parameters: [
      {
        name: "username",
        type: "string",
        required: true,
        description: "Exact Threads handle or unique username."
      }
    ],
    responseFields: [
      { name: "id", type: "string", description: "Threads user ID." },
      { name: "username", type: "string", description: "Threads username." },
      { name: "name", type: "string", description: "Display name." },
      { name: "threads_profile_picture_url", type: "string", description: "Profile picture URL." },
      { name: "threads_biography", type: "string", description: "Profile biography." },
      { name: "is_verified", type: "boolean", description: "Whether the profile is verified." }
    ]
  },
  {
    id: "profiles.listPublicPosts",
    name: "Retrieve a public profile's Threads posts",
    category: "Profiles",
    kind: "graph_endpoint",
    status: "supported",
    method: "GET",
    path: "/profile_posts",
    summary: "Lists Threads posts for a public profile by exact username.",
    docsUrl: `${DOCS_ROOT}/reference/user/`,
    permissions: ["threads_basic"],
    parameters: [
      {
        name: "username",
        type: "string",
        required: true,
        description: "Exact Threads handle or unique username."
      },
      { name: "fields", type: "string[]", description: "Media fields to return." },
      { name: "since", type: "string | number", description: "Start date or Unix timestamp." },
      { name: "until", type: "string | number", description: "End date or Unix timestamp." },
      { name: "limit", type: "number", description: "Maximum number of posts to return." },
      { name: "before", type: "string", description: "Cursor for the previous page." },
      { name: "after", type: "string", description: "Cursor for the next page." }
    ],
    responseFields: [
      { name: "data", type: "ThreadsMedia[]", description: "Page of public profile posts." },
      { name: "paging", type: "object", description: "Cursor pagination metadata." }
    ]
  },
  {
    id: "profiles.getPublishingLimit",
    name: "Retrieve Threads publishing limit usage",
    category: "Profiles",
    kind: "graph_endpoint",
    status: "supported",
    method: "GET",
    path: "/{threads_user_id}/threads_publishing_limit",
    summary: "Checks the app user's current publishing rate limit usage.",
    docsUrl: `${DOCS_ROOT}/reference/user/`,
    permissions: ["threads_basic"],
    parameters: [
      { name: "threads_user_id", type: "string", required: true, description: "Threads user ID." },
      { name: "fields", type: "string[]", description: "Publishing limit fields to return." }
    ],
    responseFields: [
      { name: "quota_usage", type: "number", description: "Create-post quota usage." },
      { name: "config", type: "object", description: "Create-post quota config." },
      { name: "reply_quota_usage", type: "number", description: "Reply quota usage." },
      { name: "reply_config", type: "object", description: "Reply quota config." },
      { name: "delete_quota_usage", type: "number", description: "Delete quota usage." },
      { name: "delete_config", type: "object", description: "Delete quota config." },
      {
        name: "location_search_quota_usage",
        type: "number",
        description: "Location search quota usage."
      },
      {
        name: "location_search_config",
        type: "object",
        description: "Location search quota config."
      }
    ]
  },
  {
    id: "profiles.listReplies",
    name: "Retrieve a user's Threads replies",
    category: "Profiles",
    kind: "graph_endpoint",
    status: "supported",
    method: "GET",
    path: "/{threads_user_id}/replies",
    summary: "Lists replies created by a Threads user with cursor pagination.",
    docsUrl: `${DOCS_ROOT}/reference/user/`,
    permissions: ["threads_basic"],
    parameters: [
      { name: "threads_user_id", type: "string", required: true, description: "Threads user ID." },
      { name: "fields", type: "string[]", description: "Reply fields to return." },
      { name: "since", type: "string | number", description: "Start date or Unix timestamp." },
      { name: "until", type: "string | number", description: "End date or Unix timestamp." },
      { name: "limit", type: "number", description: "Maximum number of replies to return." },
      { name: "before", type: "string", description: "Cursor for the previous page." },
      { name: "after", type: "string", description: "Cursor for the next page." }
    ],
    responseFields: [
      { name: "data", type: "ThreadsMedia[]", description: "Page of reply media objects." },
      { name: "paging", type: "object", description: "Cursor pagination metadata." }
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
    docsUrl: `${DOCS_ROOT}/reference/insights/`,
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
    docsUrl: `${DOCS_ROOT}/reference/insights/`,
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
    status: "supported",
    method: "GET",
    path: "/keyword_search",
    summary: "Searches recent public Threads posts by keyword when the app has access.",
    docsUrl: `${DOCS_ROOT}/reference/media-retrieval/`,
    permissions: ["threads_keyword_search"],
    parameters: [
      { name: "q", type: "string", required: true, description: "Keyword query." },
      {
        name: "search_type",
        type: "TOP | RECENT",
        enum: ["TOP", "RECENT"],
        description: "Search behavior: popular results or recent results."
      },
      {
        name: "search_mode",
        type: "KEYWORD | TAG",
        enum: ["KEYWORD", "TAG"],
        description: "Search mode: treat q as a keyword or a topic tag."
      },
      {
        name: "media_type",
        type: "TEXT | IMAGE | VIDEO",
        enum: ["TEXT", "IMAGE", "VIDEO"],
        description: "Restricts search to a supported media type."
      },
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
    id: "locations.get",
    name: "Retrieve a Threads location",
    category: "Locations",
    kind: "graph_endpoint",
    status: "supported",
    method: "GET",
    path: "/{location_id}",
    summary: "Retrieves a Threads location object by ID.",
    docsUrl: `${DOCS_ROOT}/reference/locations/`,
    permissions: ["threads_basic"],
    parameters: [
      {
        name: "location_id",
        type: "string",
        required: true,
        description: "Threads location ID."
      },
      { name: "fields", type: "string[]", description: "Location fields to return." }
    ],
    responseFields: [
      { name: "id", type: "string", description: "Threads location ID." },
      { name: "name", type: "string", description: "Location name." },
      { name: "address", type: "string", description: "Location address." },
      { name: "city", type: "string", description: "Location city." },
      { name: "country", type: "string", description: "Location country." },
      { name: "latitude", type: "number", description: "Location latitude." },
      { name: "longitude", type: "number", description: "Location longitude." },
      { name: "postal_code", type: "string", description: "Location postal code." }
    ]
  },
  {
    id: "location.search",
    name: "Location search",
    category: "Locations",
    kind: "graph_endpoint",
    status: "supported",
    method: "GET",
    path: "/location_search",
    summary:
      "Searches location references usable by Threads publishing or discovery features when available.",
    docsUrl: `${DOCS_ROOT}/reference/location-search/`,
    permissions: ["threads_basic"],
    parameters: [
      { name: "query", type: "string", description: "Location query string." },
      {
        name: "q",
        type: "string",
        description: "Postman collection alias for the location query string."
      },
      {
        name: "latitude",
        type: "number",
        description: "Latitude coordinate. Must be used with longitude."
      },
      {
        name: "longitude",
        type: "number",
        description: "Longitude coordinate. Must be used with latitude."
      },
      { name: "fields", type: "string[]", description: "Location fields to return." }
    ],
    responseFields: [
      { name: "id", type: "string", description: "Threads location ID." },
      { name: "name", type: "string", description: "Location name." },
      { name: "address", type: "string", description: "Location address." },
      { name: "city", type: "string", description: "Location city." },
      { name: "country", type: "string", description: "Location country." },
      { name: "latitude", type: "number", description: "Location latitude." },
      { name: "longitude", type: "number", description: "Location longitude." },
      { name: "postal_code", type: "string", description: "Location postal code." }
    ],
    notes: ["Search by query or by latitude/longitude coordinates."]
  },
  {
    id: "tokens.exchangeAuthorizationCode",
    name: "Exchange authorization code for Threads token",
    category: "Auth and debug",
    kind: "graph_endpoint",
    status: "supported",
    method: "POST",
    path: "/oauth/access_token",
    summary: "Exchanges an OAuth authorization code for a short-lived Threads access token.",
    docsUrl: `${DOCS_ROOT}/get-started/authentication/`,
    permissions: ["OAuth app credentials"],
    parameters: [
      { name: "client_id", type: "string", required: true, description: "Threads app ID." },
      { name: "client_secret", type: "string", required: true, description: "App client secret." },
      {
        name: "code",
        type: "string",
        required: true,
        description: "Authorization code returned to the redirect URI."
      },
      {
        name: "grant_type",
        type: "authorization_code",
        required: true,
        description: "Authorization code grant type."
      },
      {
        name: "redirect_uri",
        type: "string",
        required: true,
        description: "Redirect URI used during authorization."
      }
    ],
    responseFields: [
      { name: "access_token", type: "string", description: "Short-lived Threads access token." },
      { name: "user_id", type: "string", description: "Threads user ID." }
    ]
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
    id: "tokens.getAppAccessToken",
    name: "Get Threads app access token",
    category: "Auth and debug",
    kind: "graph_endpoint",
    status: "supported",
    method: "GET",
    path: "/oauth/access_token",
    summary: "Gets an app access token using Threads app credentials.",
    docsUrl: `${DOCS_ROOT}/get-started/authentication/`,
    permissions: ["OAuth app credentials"],
    parameters: [
      {
        name: "grant_type",
        type: "client_credentials",
        required: true,
        description: "Client credentials grant type."
      },
      { name: "client_id", type: "string", required: true, description: "Threads app ID." },
      { name: "client_secret", type: "string", required: true, description: "App client secret." }
    ],
    responseFields: [
      { name: "access_token", type: "string", description: "Threads app access token." },
      { name: "token_type", type: "string", description: "Token type." }
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
    docsUrl: `${DOCS_ROOT}/reference/debug/`,
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
    path: "/oembed",
    summary: "Retrieves oEmbed metadata for a public Threads URL.",
    docsUrl: `${DOCS_ROOT}/reference/oembed/`,
    permissions: ["App access token or documented oEmbed access"],
    parameters: [
      { name: "url", type: "string", required: true, description: "Public Threads post URL." },
      {
        name: "maxwidth",
        type: "number",
        description: "Maximum embed width, from 320 to 658 pixels."
      }
    ],
    responseFields: [
      { name: "html", type: "string", description: "Embed HTML." },
      { name: "provider_name", type: "string", description: "Provider name." },
      { name: "provider_url", type: "string", description: "Provider URL." },
      { name: "type", type: "string", description: "oEmbed type." },
      { name: "version", type: "string", description: "oEmbed version." },
      { name: "width", type: "number", description: "Width in pixels required to display HTML." }
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
