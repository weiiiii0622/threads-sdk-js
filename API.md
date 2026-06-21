# Meta Threads API Reference

Generated from the `threads-sdk-js` endpoint registry on 2026-06-21.

Official sources:

- https://developers.facebook.com/social-technologies/threads-api/
- https://developers.facebook.com/docs/threads/reference/publishing/
- https://developers.facebook.com/docs/threads/reference/media-retrieval/
- https://developers.facebook.com/docs/threads/reference/reply-management/
- https://developers.facebook.com/docs/threads/reference/user/
- https://developers.facebook.com/docs/threads/reference/locations/
- https://developers.facebook.com/docs/threads/reference/location-search/
- https://developers.facebook.com/docs/threads/reference/insights/
- https://developers.facebook.com/docs/threads/reference/oembed/
- https://developers.facebook.com/docs/threads/reference/debug/

The registry separates callable Graph endpoints from dashboard-only setup, webhook payload types, and helper-only capabilities. Use `client.request()` when Meta adds a field before this SDK exposes a typed helper.

<!-- endpoint-status:start -->
| ID | Category | Method | Path | Kind | Status | SDK helper |
|---|---|---:|---|---|---|---|
| `posts.createContainer` | Posts and publishing | POST | `/{threads_user_id}/threads` | `graph_endpoint` | `supported` | `client.posts.createContainer()` |
| `posts.publishContainer` | Posts and publishing | POST | `/{threads_user_id}/threads_publish` | `graph_endpoint` | `supported` | `client.posts.publishContainer()` |
| `posts.repost` | Posts and publishing | POST | `/{threads_media_id}/repost` | `graph_endpoint` | `supported` | `client.posts.repost()` |
| `posts.getContainerStatus` | Posts and publishing | GET | `/{threads_container_id}` | `graph_endpoint` | `supported` | `client.posts.getContainerStatus()` |
| `posts.getMedia` | Posts and retrieval | GET | `/{threads_media_id}` | `graph_endpoint` | `supported` | `client.posts.get()` |
| `posts.listUserThreads` | Posts and retrieval | GET | `/{threads_user_id}/threads` | `graph_endpoint` | `supported` | `client.posts.listUserThreads()` |
| `posts.deleteMedia` | Posts and publishing | DELETE | `/{threads_media_id}` | `graph_endpoint` | `supported` | `client.posts.delete()` |
| `posts.getReplies` | Replies | GET | `/{threads_media_id}/replies` | `graph_endpoint` | `supported` | `client.posts.getReplies()` |
| `posts.getConversation` | Replies | GET | `/{threads_media_id}/conversation` | `graph_endpoint` | `supported` | `client.posts.getConversation()` |
| `posts.getMentions` | Posts and retrieval | GET | `/{threads_user_id}/mentions` | `graph_endpoint` | `supported` | `client.posts.getMentions()` |
| `replies.manageReply` | Replies | POST | `/{threads_reply_id}/manage_reply` | `graph_endpoint` | `supported` | `client.replies.manage()` |
| `replies.getPendingReplies` | Replies | GET | `/{threads_media_id}/pending_replies` | `graph_endpoint` | `supported` | `client.replies.getPending()` |
| `replies.managePendingReply` | Replies | POST | `/{threads_reply_id}/manage_pending_reply` | `graph_endpoint` | `supported` | `client.replies.managePending()` |
| `profiles.getMe` | Profiles | GET | `/me` | `graph_endpoint` | `supported` | `client.profiles.getMe()` |
| `profiles.getUser` | Profiles | GET | `/{threads_user_id}` | `graph_endpoint` | `supported` | `client.profiles.get()` |
| `profiles.lookup` | Profiles | GET | `/profile_lookup` | `graph_endpoint` | `supported` | `client.profiles.lookup()` |
| `profiles.listPublicPosts` | Profiles | GET | `/profile_posts` | `graph_endpoint` | `supported` | `client.profiles.listPublicPosts()` |
| `profiles.getPublishingLimit` | Profiles | GET | `/{threads_user_id}/threads_publishing_limit` | `graph_endpoint` | `supported` | `client.profiles.getPublishingLimit()` |
| `profiles.listReplies` | Profiles | GET | `/{threads_user_id}/replies` | `graph_endpoint` | `supported` | `client.profiles.listReplies()` |
| `insights.getMediaInsights` | Insights | GET | `/{threads_media_id}/insights` | `graph_endpoint` | `supported` | `client.insights.getMedia()` |
| `insights.getUserInsights` | Insights | GET | `/{threads_user_id}/threads_insights` | `graph_endpoint` | `supported` | `client.insights.getUser()` |
| `search.keywordSearch` | Search and discovery | GET | `/keyword_search` | `graph_endpoint` | `supported` | `client.search.keyword()` |
| `locations.get` | Locations | GET | `/{location_id}` | `graph_endpoint` | `supported` | `client.locations.get()` |
| `location.search` | Locations | GET | `/location_search` | `graph_endpoint` | `supported` | `client.search.location()` |
| `tokens.exchangeAuthorizationCode` | Auth and debug | POST | `/oauth/access_token` | `graph_endpoint` | `supported` | `client.utilities.exchangeAuthorizationCode()` |
| `tokens.exchangeLongLived` | Auth and debug | GET | `/access_token` | `graph_endpoint` | `supported` | `client.utilities.exchangeLongLivedToken()` |
| `tokens.refreshLongLived` | Auth and debug | GET | `/refresh_access_token` | `graph_endpoint` | `supported` | `client.utilities.refreshLongLivedToken()` |
| `tokens.getAppAccessToken` | Auth and debug | GET | `/oauth/access_token` | `graph_endpoint` | `supported` | `client.utilities.getAppAccessToken()` |
| `debug.debugToken` | Auth and debug | GET | `/debug_token` | `graph_endpoint` | `supported` | `client.utilities.debugToken()` |
| `embed.oEmbed` | Embeds | GET | `/oembed` | `graph_endpoint` | `supported` | `client.utilities.oEmbed()` |
| `webhooks.setup` | Webhooks | - | - | `dashboard_setup` | `dashboard_only` | Documented capability; no Graph helper |
| `webhooks.payload` | Webhooks | - | - | `webhook_payload` | `helper_only` | `verifyWebhookChallenge()` and exported webhook types |
<!-- endpoint-status:end -->

## Posts and publishing

### POST `/{threads_user_id}/threads` - Create Threads media container

Creates a media container for a text, image, video, carousel item, carousel parent, reply, quote, link, or GIF post before publishing.

- ID: `posts.createContainer`
- Category: Posts and publishing
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/reference/publishing/
- Permissions: `threads_basic`, `threads_content_publish`

Parameters:
- `threads_user_id` (string): Threads user ID that owns the post container. Required.
- `media_type` (TEXT | IMAGE | VIDEO | CAROUSEL): Type of Threads container to create. Required. Values: `TEXT`, `IMAGE`, `VIDEO`, `CAROUSEL`.
- `text` (string): Post caption or text body. Required for text-only posts.
- `image_url` (string): Publicly reachable image URL for IMAGE posts or carousel image items.
- `video_url` (string): Publicly reachable video URL for VIDEO posts or carousel video items.
- `is_carousel_item` (boolean): Marks an IMAGE or VIDEO container as a child item for a carousel post.
- `children` (string[]): Container IDs for child carousel items when media_type is CAROUSEL.
- `allowlisted_country_codes` (string[]): ISO 3166-1 alpha-2 country codes where this media should be shown.
- `alt_text` (string): Accessibility description for image or video media.
- `link_attachment` (string): URL to attach as a link preview to a text post.
- `poll_attachment` (object): Poll attachment payload for text posts.
- `topic_tag` (string): Topic tag to add to the created post.
- `location_id` (string): Location ID to tag on the created post.
- `auto_publish_text` (boolean): Automatically publishes a text container when supported by Threads.
- `text_entities` (object[]): Structured text entities such as spoiler ranges.
- `text_attachment` (object): Structured text attachment payload for text posts.
- `gif_attachment` (object): GIF attachment payload supported by Threads publishing.
- `is_ghost_post` (boolean): Creates a ghost post when supported by Threads.
- `is_spoiler_media` (boolean): Marks attached image or video media as spoiler content.
- `enable_reply_approvals` (boolean): Enables reply approvals for the created post when supported by Threads.
- `crossreshare_to_ig` (boolean): Cross-shares a Threads post to a linked Instagram account as a Story when supported.
- `crossreshare_to_ig_dark_mode` (boolean): Cross-shares a Threads post to a linked Instagram account as a dark-mode Story when supported.
- `reply_to_id` (string): Threads media ID to reply to.
- `quote_post_id` (string): Threads media ID to quote.
- `reply_control` (everyone | accounts_you_follow | mentioned_only | parent_post_author_only | followers_only): Controls who can reply to the created thread when supported by the API. Values: `everyone`, `accounts_you_follow`, `mentioned_only`, `parent_post_author_only`, `followers_only`.

Response fields:
- `id` (string): Creation container ID used for publishing.

Notes:
- The container creation call does not publish the post by itself.
- Use createContainer for replies by passing reply_to_id.

### POST `/{threads_user_id}/threads_publish` - Publish Threads media container

Publishes a previously created Threads media container.

- ID: `posts.publishContainer`
- Category: Posts and publishing
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/reference/publishing/
- Permissions: `threads_basic`, `threads_content_publish`

Parameters:
- `threads_user_id` (string): Threads user ID that owns the media container. Required.
- `creation_id` (string): Media container ID returned by createContainer. Required.

Response fields:
- `id` (string): Published Threads media ID.

### POST `/{threads_media_id}/repost` - Repost a Threads post

Reposts a Threads post.

- ID: `posts.repost`
- Category: Posts and publishing
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/reference/publishing/
- Permissions: `threads_basic`, `threads_content_publish`

Parameters:
- `threads_media_id` (string): Threads media ID to repost. Required.

Response fields:
- `id` (string): Published repost media ID.

### GET `/{threads_container_id}` - Check a media container's publishing status

Retrieves status fields for a Threads media container before or after publishing.

- ID: `posts.getContainerStatus`
- Category: Posts and publishing
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/reference/publishing/
- Permissions: `threads_basic`, `threads_content_publish`

Parameters:
- `threads_container_id` (string): Threads media container ID. Required.
- `fields` (string[]): Container status fields to request, such as id, status, and error_message.

Response fields:
- `id` (string): Threads media container ID.
- `status` (string): Container publishing status.
- `error_message` (string): Publishing error message when the container failed.

### DELETE `/{threads_media_id}` - Delete a Threads post

Deletes a published Threads post owned by the authenticated user.

- ID: `posts.deleteMedia`
- Category: Posts and publishing
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/documentation/threads/create-posts
- Permissions: `threads_delete`

Parameters:
- `threads_media_id` (string): Threads media ID to delete. Required.

Response fields:
- `success` (boolean): Whether deletion succeeded.

## Posts and retrieval

### GET `/{threads_media_id}` - Retrieve a Threads post

Retrieves fields for one Threads media object.

- ID: `posts.getMedia`
- Category: Posts and retrieval
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/reference/media-retrieval/
- Permissions: `threads_basic`, `threads_content_publish or applicable read permission`

Parameters:
- `threads_media_id` (string): Threads media ID to retrieve. Required.
- `fields` (string[]): Fields to request from the media object.

Response fields:
- `id` (string): Threads media ID.
- `media_product_type` (string): Media product surface.
- `media_type` (string): Media type such as TEXT, IMAGE, VIDEO, or CAROUSEL_ALBUM.
- `media_url` (string): URL for image or video media when available.
- `permalink` (string): Canonical public Threads URL.
- `owner` (object): Owner object for the media.
- `username` (string): Owner username.
- `text` (string): Text body or caption.
- `timestamp` (string): ISO timestamp for media creation.
- `shortcode` (string): Shortcode identifier for the post.
- `thumbnail_url` (string): Thumbnail URL for video media.
- `children` (object): Carousel child media collection.
- `is_quote_post` (boolean): Whether the media is a quote post.
- `alt_text` (string): Accessibility description for image media.
- `link_attachment_url` (string): Attached link URL.
- `has_replies` (boolean): Whether the media has replies.
- `is_reply` (boolean): Whether the media is a reply.
- `is_reply_owned_by_me` (boolean): Whether the reply is owned by the authenticated user.
- `root_post` (object): Root post for reply media.
- `replied_to` (object): Media object this media replies to.
- `hide_status` (string): Reply hide status.
- `reply_audience` (string): Reply audience setting.
- `quoted_post` (object): Quoted post object.
- `reposted_post` (object): Reposted post object.
- `gif_url` (string): GIF media URL.
- `poll_attachment` (object): Poll attachment.
- `topic_tag` (string): Topic tag on the media.
- `is_spoiler_media` (boolean): Whether media is spoiler-marked.
- `text_entities` (object[]): Structured text entities.
- `text_attachment` (object): Structured text attachment.
- `location_id` (string): Tagged location ID.

### GET `/{threads_user_id}/threads` - Retrieve a user's Threads posts

Lists Threads posts for a Threads user with cursor pagination.

- ID: `posts.listUserThreads`
- Category: Posts and retrieval
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/reference/user/
- Permissions: `threads_basic`, `threads_content_publish or applicable read permission`

Parameters:
- `threads_user_id` (string): Threads user ID. Required.
- `fields` (string[]): Media fields to return.
- `limit` (number): Maximum number of items to return in one page.
- `before` (string): Cursor for the previous page.
- `after` (string): Cursor for the next page.
- `since` (string | number): Lower time bound accepted by Graph API.
- `until` (string | number): Upper time bound accepted by Graph API.

Response fields:
- `data` (ThreadsMedia[]): Page of Threads media objects.
- `paging` (object): Cursor pagination metadata.

### GET `/{threads_user_id}/mentions` - Retrieve posts mentioning a user

Lists Threads posts that mention the Threads user.

- ID: `posts.getMentions`
- Category: Posts and retrieval
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/reference/user/
- Permissions: `threads_basic`, `threads_manage_mentions`

Parameters:
- `threads_user_id` (string): Threads user ID whose mentions should be retrieved. Required.
- `fields` (string[]): Mention media fields to return.
- `limit` (number): Maximum number of items to return in one page.
- `before` (string): Cursor for the previous page.
- `after` (string): Cursor for the next page.

Response fields:
- `data` (ThreadsMedia[]): Page of mentioned posts.
- `paging` (object): Cursor pagination metadata.

Notes:
- If the app lacks mentions access, Meta may return a permission error.

## Replies

### GET `/{threads_media_id}/replies` - Retrieve replies for a Threads post

Lists replies for a Threads media object with cursor pagination.

- ID: `posts.getReplies`
- Category: Replies
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/reference/reply-management/
- Permissions: `threads_basic`, `threads_manage_replies`

Parameters:
- `threads_media_id` (string): Threads media ID whose replies should be listed. Required.
- `fields` (string[]): Reply fields to return.
- `limit` (number): Maximum number of replies to return in one page.
- `reverse` (boolean): Whether replies should be sorted in reverse chronological order.
- `approval_status` (string): Pending reply approval status filter.
- `before` (string): Cursor for the previous page.
- `after` (string): Cursor for the next page.

Response fields:
- `data` (ThreadsReply[]): Page of reply media objects.
- `paging` (object): Cursor pagination metadata.

### GET `/{threads_media_id}/conversation` - Retrieve a Threads conversation

Retrieves the conversation context for a Threads media object.

- ID: `posts.getConversation`
- Category: Replies
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/reference/reply-management/
- Permissions: `threads_basic`, `threads_manage_replies`

Parameters:
- `threads_media_id` (string): Threads media ID in the conversation. Required.
- `fields` (string[]): Conversation media fields to return.
- `reverse` (boolean): Whether replies should be sorted in reverse chronological order.
- `before` (string): Cursor for the previous page.
- `after` (string): Cursor for the next page.

Response fields:
- `data` (ThreadsMedia[]): Conversation media objects.

### POST `/{threads_reply_id}/manage_reply` - Manage or hide a reply

Hides or unhides a reply on Threads when the authenticated user can manage it.

- ID: `replies.manageReply`
- Category: Replies
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/reference/reply-management/
- Permissions: `threads_manage_replies`

Parameters:
- `threads_reply_id` (string): Threads reply media ID. Required.
- `hide` (boolean): True to hide the reply, false to unhide it. Required.

Response fields:
- `success` (boolean): Whether the management action succeeded.

### GET `/{threads_media_id}/pending_replies` - Retrieve pending replies

Lists pending replies that require approval for a Threads media object.

- ID: `replies.getPendingReplies`
- Category: Replies
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/reference/reply-management/
- Permissions: `threads_manage_replies`

Parameters:
- `threads_media_id` (string): Threads media ID whose pending replies should be listed. Required.
- `fields` (string[]): Pending reply fields to return.
- `limit` (number): Maximum number of pending replies in one page.
- `reverse` (boolean): Whether replies should be sorted in reverse chronological order.
- `before` (string): Cursor for the previous page.
- `after` (string): Cursor for the next page.

Response fields:
- `data` (ThreadsReply[]): Page of pending replies.
- `paging` (object): Cursor pagination metadata.

### POST `/{threads_reply_id}/manage_pending_reply` - Approve or ignore a pending reply

Approves or ignores a pending reply.

- ID: `replies.managePendingReply`
- Category: Replies
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/reference/reply-management/
- Permissions: `threads_manage_replies`

Parameters:
- `threads_reply_id` (string): Pending Threads reply media ID. Required.
- `approve` (boolean): True to approve the reply, false to ignore it. Required.

Response fields:
- `success` (boolean): Whether the approval action succeeded.

## Profiles

### GET `/me` - Retrieve the authenticated Threads profile

Retrieves profile fields for the authenticated Threads user.

- ID: `profiles.getMe`
- Category: Profiles
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/reference/user/
- Permissions: `threads_basic`

Parameters:
- `fields` (string[]): Profile fields to return.

Response fields:
- `id` (string): Threads user ID.
- `username` (string): Threads username.
- `name` (string): Display name.
- `threads_profile_picture_url` (string): Profile picture URL.
- `threads_biography` (string): Profile biography.
- `is_verified` (boolean): Whether the profile is verified.
- `recently_searched_keywords` (string[]): Recently searched keywords when returned by the API.

### GET `/{threads_user_id}` - Retrieve a Threads user profile

Retrieves profile fields for a Threads user ID.

- ID: `profiles.getUser`
- Category: Profiles
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/reference/user/
- Permissions: `threads_basic`

Parameters:
- `threads_user_id` (string): Threads user ID. Required.
- `fields` (string[]): Profile fields to return.

Response fields:
- `id` (string): Threads user ID.
- `username` (string): Threads username.
- `name` (string): Display name.
- `threads_profile_picture_url` (string): Profile picture URL.
- `threads_biography` (string): Profile biography.
- `is_verified` (boolean): Whether the profile is verified.
- `recently_searched_keywords` (string[]): Recently searched keywords when returned by the API.

### GET `/profile_lookup` - Look up a public Threads profile

Looks up a public Threads profile by exact username.

- ID: `profiles.lookup`
- Category: Profiles
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/reference/user/
- Permissions: `threads_basic`

Parameters:
- `username` (string): Exact Threads handle or unique username. Required.

Response fields:
- `id` (string): Threads user ID.
- `username` (string): Threads username.
- `name` (string): Display name.
- `threads_profile_picture_url` (string): Profile picture URL.
- `threads_biography` (string): Profile biography.
- `is_verified` (boolean): Whether the profile is verified.

### GET `/profile_posts` - Retrieve a public profile's Threads posts

Lists Threads posts for a public profile by exact username.

- ID: `profiles.listPublicPosts`
- Category: Profiles
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/reference/user/
- Permissions: `threads_basic`

Parameters:
- `username` (string): Exact Threads handle or unique username. Required.
- `fields` (string[]): Media fields to return.
- `since` (string | number): Start date or Unix timestamp.
- `until` (string | number): End date or Unix timestamp.
- `limit` (number): Maximum number of posts to return.
- `before` (string): Cursor for the previous page.
- `after` (string): Cursor for the next page.

Response fields:
- `data` (ThreadsMedia[]): Page of public profile posts.
- `paging` (object): Cursor pagination metadata.

### GET `/{threads_user_id}/threads_publishing_limit` - Retrieve Threads publishing limit usage

Checks the app user's current publishing rate limit usage.

- ID: `profiles.getPublishingLimit`
- Category: Profiles
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/reference/user/
- Permissions: `threads_basic`

Parameters:
- `threads_user_id` (string): Threads user ID. Required.
- `fields` (string[]): Publishing limit fields to return.

Response fields:
- `quota_usage` (number): Create-post quota usage.
- `config` (object): Create-post quota config.
- `reply_quota_usage` (number): Reply quota usage.
- `reply_config` (object): Reply quota config.
- `delete_quota_usage` (number): Delete quota usage.
- `delete_config` (object): Delete quota config.
- `location_search_quota_usage` (number): Location search quota usage.
- `location_search_config` (object): Location search quota config.

### GET `/{threads_user_id}/replies` - Retrieve a user's Threads replies

Lists replies created by a Threads user with cursor pagination.

- ID: `profiles.listReplies`
- Category: Profiles
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/reference/user/
- Permissions: `threads_basic`

Parameters:
- `threads_user_id` (string): Threads user ID. Required.
- `fields` (string[]): Reply fields to return.
- `since` (string | number): Start date or Unix timestamp.
- `until` (string | number): End date or Unix timestamp.
- `limit` (number): Maximum number of replies to return.
- `before` (string): Cursor for the previous page.
- `after` (string): Cursor for the next page.

Response fields:
- `data` (ThreadsMedia[]): Page of reply media objects.
- `paging` (object): Cursor pagination metadata.

## Insights

### GET `/{threads_media_id}/insights` - Retrieve Threads media insights

Retrieves metrics for a Threads media object.

- ID: `insights.getMediaInsights`
- Category: Insights
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/reference/insights/
- Permissions: `threads_read_insights`

Parameters:
- `threads_media_id` (string): Threads media ID. Required.
- `metric` (string[]): Metrics to request, such as views, likes, replies, reposts, quotes, and shares. Required.
- `since` (string | number): Lower time bound accepted by Graph API.
- `until` (string | number): Upper time bound accepted by Graph API.

Response fields:
- `data` (InsightMetric[]): Metric values returned by Graph API.

### GET `/{threads_user_id}/threads_insights` - Retrieve Threads user insights

Retrieves account-level metrics for a Threads user.

- ID: `insights.getUserInsights`
- Category: Insights
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/reference/insights/
- Permissions: `threads_read_insights`

Parameters:
- `threads_user_id` (string): Threads user ID. Required.
- `metric` (string[]): Account metrics such as views, likes, replies, reposts, quotes, and followers_count. Required.
- `breakdown` (string): Breakdown dimension for supported demographic metrics.
- `since` (string | number): Lower time bound accepted by Graph API.
- `until` (string | number): Upper time bound accepted by Graph API.

Response fields:
- `data` (InsightMetric[]): Metric values returned by Graph API.

## Search and discovery

### GET `/keyword_search` - Keyword search

Searches recent public Threads posts by keyword when the app has access.

- ID: `search.keywordSearch`
- Category: Search and discovery
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/reference/media-retrieval/
- Permissions: `threads_keyword_search`

Parameters:
- `q` (string): Keyword query. Required.
- `search_type` (TOP | RECENT): Search behavior: popular results or recent results. Values: `TOP`, `RECENT`.
- `search_mode` (KEYWORD | TAG): Search mode: treat q as a keyword or a topic tag. Values: `KEYWORD`, `TAG`.
- `media_type` (TEXT | IMAGE | VIDEO): Restricts search to a supported media type. Values: `TEXT`, `IMAGE`, `VIDEO`.
- `fields` (string[]): Media fields to return.
- `limit` (number): Maximum number of results in one page.
- `before` (string): Cursor for the previous page.
- `after` (string): Cursor for the next page.

Response fields:
- `data` (ThreadsMedia[]): Page of matching Threads media objects.
- `paging` (object): Cursor pagination metadata.

Notes:
- Access and behavior can depend on Meta availability and app review.

## Locations

### GET `/{location_id}` - Retrieve a Threads location

Retrieves a Threads location object by ID.

- ID: `locations.get`
- Category: Locations
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/reference/locations/
- Permissions: `threads_basic`

Parameters:
- `location_id` (string): Threads location ID. Required.
- `fields` (string[]): Location fields to return.

Response fields:
- `id` (string): Threads location ID.
- `name` (string): Location name.
- `address` (string): Location address.
- `city` (string): Location city.
- `country` (string): Location country.
- `latitude` (number): Location latitude.
- `longitude` (number): Location longitude.
- `postal_code` (string): Location postal code.

### GET `/location_search` - Location search

Searches location references usable by Threads publishing or discovery features when available.

- ID: `location.search`
- Category: Locations
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/reference/location-search/
- Permissions: `threads_basic`

Parameters:
- `query` (string): Location query string.
- `q` (string): Postman collection alias for the location query string.
- `latitude` (number): Latitude coordinate. Must be used with longitude.
- `longitude` (number): Longitude coordinate. Must be used with latitude.
- `fields` (string[]): Location fields to return.

Response fields:
- `id` (string): Threads location ID.
- `name` (string): Location name.
- `address` (string): Location address.
- `city` (string): Location city.
- `country` (string): Location country.
- `latitude` (number): Location latitude.
- `longitude` (number): Location longitude.
- `postal_code` (string): Location postal code.

Notes:
- Search by query or by latitude/longitude coordinates.

## Auth and debug

### POST `/oauth/access_token` - Exchange authorization code for Threads token

Exchanges an OAuth authorization code for a short-lived Threads access token.

- ID: `tokens.exchangeAuthorizationCode`
- Category: Auth and debug
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/get-started/authentication/
- Permissions: `OAuth app credentials`

Parameters:
- `client_id` (string): Threads app ID. Required.
- `client_secret` (string): App client secret. Required.
- `code` (string): Authorization code returned to the redirect URI. Required.
- `grant_type` (authorization_code): Authorization code grant type. Required.
- `redirect_uri` (string): Redirect URI used during authorization. Required.

Response fields:
- `access_token` (string): Short-lived Threads access token.
- `user_id` (string): Threads user ID.

### GET `/access_token` - Exchange for long-lived Threads token

Exchanges a short-lived Threads access token for a long-lived token.

- ID: `tokens.exchangeLongLived`
- Category: Auth and debug
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/get-started/long-lived-tokens/
- Permissions: `OAuth app credentials`

Parameters:
- `grant_type` (th_exchange_token): Token exchange grant type. Required.
- `client_secret` (string): App client secret. Required.
- `access_token` (string): Short-lived Threads access token. Required.

Response fields:
- `access_token` (string): Long-lived Threads access token.
- `token_type` (string): Token type.
- `expires_in` (number): Token lifetime in seconds.

### GET `/refresh_access_token` - Refresh long-lived Threads token

Refreshes a long-lived Threads access token before expiration.

- ID: `tokens.refreshLongLived`
- Category: Auth and debug
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/get-started/long-lived-tokens/
- Permissions: `OAuth app credentials`

Parameters:
- `grant_type` (th_refresh_token): Token refresh grant type. Required.
- `access_token` (string): Long-lived Threads access token. Required.

Response fields:
- `access_token` (string): Refreshed long-lived Threads access token.
- `token_type` (string): Token type.
- `expires_in` (number): Token lifetime in seconds.

### GET `/oauth/access_token` - Get Threads app access token

Gets an app access token using Threads app credentials.

- ID: `tokens.getAppAccessToken`
- Category: Auth and debug
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/get-started/authentication/
- Permissions: `OAuth app credentials`

Parameters:
- `grant_type` (client_credentials): Client credentials grant type. Required.
- `client_id` (string): Threads app ID. Required.
- `client_secret` (string): App client secret. Required.

Response fields:
- `access_token` (string): Threads app access token.
- `token_type` (string): Token type.

### GET `/debug_token` - Debug a Threads access token

Inspects a token with an app access token.

- ID: `debug.debugToken`
- Category: Auth and debug
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/reference/debug/
- Permissions: `App access token`

Parameters:
- `input_token` (string): Token to inspect. Required.
- `access_token` (string): App access token used for inspection. Required.

Response fields:
- `data` (object): Graph API token inspection payload.

## Embeds

### GET `/oembed` - Threads oEmbed

Retrieves oEmbed metadata for a public Threads URL.

- ID: `embed.oEmbed`
- Category: Embeds
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/reference/oembed/
- Permissions: `App access token or documented oEmbed access`

Parameters:
- `url` (string): Public Threads post URL. Required.
- `maxwidth` (number): Maximum embed width, from 320 to 658 pixels.

Response fields:
- `html` (string): Embed HTML.
- `provider_name` (string): Provider name.
- `provider_url` (string): Provider URL.
- `type` (string): oEmbed type.
- `version` (string): oEmbed version.
- `width` (number): Width in pixels required to display HTML.

## Webhooks

### Threads webhooks setup

Webhook subscription setup is performed through Meta app dashboard and callback verification rather than a Threads SDK Graph helper.

- ID: `webhooks.setup`
- Category: Webhooks
- Capability kind: `dashboard_setup`
- Status: `dashboard_only`
- Source: https://developers.facebook.com/docs/threads/webhooks/
- Permissions: `Meta app dashboard access`

Parameters:
- `callback_url` (string): HTTPS endpoint configured in Meta app dashboard.
- `verify_token` (string): Developer-defined challenge verification token.
- `fields` (string[]): Subscribed Threads webhook fields.

Response fields:
- `hub.challenge` (string): Challenge string to echo during webhook verification.

### Threads webhook payload

Types for Threads webhook payloads delivered by Meta to the configured callback URL.

- ID: `webhooks.payload`
- Category: Webhooks
- Capability kind: `webhook_payload`
- Status: `helper_only`
- Source: https://developers.facebook.com/docs/threads/webhooks/
- Permissions: `Webhook subscription`

Parameters:
- `object` (string): Webhook object name.
- `entry` (WebhookEntry[]): Webhook entries.
- `changes` (WebhookChange[]): Field changes in an entry.

Response fields:
- `field` (string): Changed field.
- `value` (object): Field-specific payload value.
