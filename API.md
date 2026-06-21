# Meta Threads API Reference

Generated from the `threads-sdk-js` endpoint registry on 2026-06-21.

Official sources:

- https://developers.facebook.com/docs/threads/
- https://developers.facebook.com/social-technologies/threads-api/
- https://developers.facebook.com/documentation/threads/create-posts
- https://developers.facebook.com/documentation/threads/retrieve-and-discover-posts
- https://developers.facebook.com/documentation/threads/retrieve-and-manage-replies
- https://developers.facebook.com/docs/threads/insights/

The registry separates callable Graph endpoints from dashboard-only setup, webhook payload types, and helper-only capabilities. Use `client.request()` when Meta adds a field before this SDK exposes a typed helper.

<!-- endpoint-status:start -->
| ID | Category | Method | Path | Kind | Status | SDK helper |
|---|---|---:|---|---|---|---|
| `posts.createContainer` | Posts and publishing | POST | `/{threads_user_id}/threads` | `graph_endpoint` | `supported` | `client.posts.createContainer()` |
| `posts.publishContainer` | Posts and publishing | POST | `/{threads_user_id}/threads_publish` | `graph_endpoint` | `supported` | `client.posts.publishContainer()` |
| `posts.getMedia` | Posts and retrieval | GET | `/{threads_media_id}` | `graph_endpoint` | `supported` | `client.posts.get()` |
| `posts.listUserThreads` | Posts and retrieval | GET | `/{threads_user_id}/threads` | `graph_endpoint` | `supported` | `client.posts.listUserThreads()` |
| `posts.deleteMedia` | Posts and publishing | DELETE | `/{threads_media_id}` | `graph_endpoint` | `supported` | `client.posts.delete()` |
| `posts.getReplies` | Replies | GET | `/{threads_media_id}/replies` | `graph_endpoint` | `supported` | `client.posts.getReplies()` |
| `posts.getConversation` | Replies | GET | `/{threads_media_id}/conversation` | `graph_endpoint` | `supported` | `client.posts.getConversation()` |
| `posts.getMentions` | Posts and retrieval | GET | `/{threads_user_id}/mentions` | `graph_endpoint` | `supported` | `client.posts.getMentions()` |
| `replies.manageReply` | Replies | POST | `/{threads_reply_id}/manage_reply` | `graph_endpoint` | `supported` | `client.replies.manage()` |
| `replies.getPendingReplies` | Replies | GET | `/{threads_media_id}/pending_replies` | `graph_endpoint` | `supported` | `client.replies.getPending()` |
| `replies.managePendingReply` | Replies | POST | `/{threads_reply_id}/manage_pending_replies` | `graph_endpoint` | `supported` | `client.replies.managePending()` |
| `profiles.getMe` | Profiles | GET | `/me` | `graph_endpoint` | `supported` | `client.profiles.getMe()` |
| `profiles.getUser` | Profiles | GET | `/{threads_user_id}` | `graph_endpoint` | `supported` | `client.profiles.get()` |
| `insights.getMediaInsights` | Insights | GET | `/{threads_media_id}/insights` | `graph_endpoint` | `supported` | `client.insights.getMedia()` |
| `insights.getUserInsights` | Insights | GET | `/{threads_user_id}/threads_insights` | `graph_endpoint` | `supported` | `client.insights.getUser()` |
| `search.keywordSearch` | Search and discovery | GET | `/keyword_search` | `graph_endpoint` | `beta` | `client.search.keyword()` |
| `location.search` | Search and discovery | GET | `/location_search` | `graph_endpoint` | `beta` | `client.search.location()` |
| `tokens.exchangeLongLived` | Auth and debug | GET | `/access_token` | `graph_endpoint` | `supported` | `client.utilities.exchangeLongLivedToken()` |
| `tokens.refreshLongLived` | Auth and debug | GET | `/refresh_access_token` | `graph_endpoint` | `supported` | `client.utilities.refreshLongLivedToken()` |
| `debug.debugToken` | Auth and debug | GET | `/debug_token` | `graph_endpoint` | `supported` | `client.utilities.debugToken()` |
| `embed.oEmbed` | Embeds | GET | `/oembed_threads` | `graph_endpoint` | `supported` | `client.utilities.oEmbed()` |
| `webhooks.setup` | Webhooks | - | - | `dashboard_setup` | `dashboard_only` | Documented capability; no Graph helper |
| `webhooks.payload` | Webhooks | - | - | `webhook_payload` | `helper_only` | `verifyWebhookChallenge()` and exported webhook types |
<!-- endpoint-status:end -->

## Posts and publishing

### POST `/{threads_user_id}/threads` - Create Threads media container

Creates a media container for a text, image, video, carousel item, carousel album, reply, quote, link, or GIF post before publishing.

- ID: `posts.createContainer`
- Category: Posts and publishing
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/documentation/threads/create-posts
- Permissions: `threads_basic`, `threads_content_publish`

Parameters:
- `threads_user_id` (string): Threads user ID that owns the post container. Required.
- `media_type` (TEXT | IMAGE | VIDEO | CAROUSEL_ALBUM): Type of Threads container to create. Required. Values: `TEXT`, `IMAGE`, `VIDEO`, `CAROUSEL_ALBUM`.
- `text` (string): Post caption or text body. Required for text-only posts.
- `image_url` (string): Publicly reachable image URL for IMAGE posts or carousel image items.
- `video_url` (string): Publicly reachable video URL for VIDEO posts or carousel video items.
- `is_carousel_item` (boolean): Marks an IMAGE or VIDEO container as a child item for a carousel album.
- `carousel_media_ids` (string[]): Container IDs for child carousel items when media_type is CAROUSEL_ALBUM.
- `alt_text` (string): Accessibility description for image media.
- `link_attachment_url` (string): URL to attach as a link preview to a text post.
- `gif_attachment` (string): GIF attachment URL or ID supported by Threads publishing.
- `reply_to_id` (string): Threads media ID to reply to.
- `quote_post_id` (string): Threads media ID to quote.
- `reply_control` (everyone | accounts_you_follow | mentioned_only): Controls who can reply to the created thread when supported by the API. Values: `everyone`, `accounts_you_follow`, `mentioned_only`.

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
- Source: https://developers.facebook.com/documentation/threads/create-posts
- Permissions: `threads_basic`, `threads_content_publish`

Parameters:
- `threads_user_id` (string): Threads user ID that owns the media container. Required.
- `creation_id` (string): Media container ID returned by createContainer. Required.

Response fields:
- `id` (string): Published Threads media ID.

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
- Source: https://developers.facebook.com/documentation/threads/retrieve-and-discover-posts
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

### GET `/{threads_user_id}/threads` - Retrieve a user's Threads posts

Lists Threads posts for a Threads user with cursor pagination.

- ID: `posts.listUserThreads`
- Category: Posts and retrieval
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/documentation/threads/retrieve-and-discover-posts
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
- Source: https://developers.facebook.com/documentation/threads/retrieve-and-discover-posts
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
- Source: https://developers.facebook.com/documentation/threads/retrieve-and-manage-replies
- Permissions: `threads_basic`, `threads_manage_replies`

Parameters:
- `threads_media_id` (string): Threads media ID whose replies should be listed. Required.
- `fields` (string[]): Reply fields to return.
- `limit` (number): Maximum number of replies to return in one page.
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
- Source: https://developers.facebook.com/documentation/threads/retrieve-and-manage-replies
- Permissions: `threads_basic`, `threads_manage_replies`

Parameters:
- `threads_media_id` (string): Threads media ID in the conversation. Required.
- `fields` (string[]): Conversation media fields to return.

Response fields:
- `data` (ThreadsMedia[]): Conversation media objects.

### POST `/{threads_reply_id}/manage_reply` - Manage or hide a reply

Hides or unhides a reply on Threads when the authenticated user can manage it.

- ID: `replies.manageReply`
- Category: Replies
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/documentation/threads/retrieve-and-manage-replies
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
- Source: https://developers.facebook.com/documentation/threads/retrieve-and-manage-replies
- Permissions: `threads_manage_replies`

Parameters:
- `threads_media_id` (string): Threads media ID whose pending replies should be listed. Required.
- `fields` (string[]): Pending reply fields to return.
- `limit` (number): Maximum number of pending replies in one page.
- `before` (string): Cursor for the previous page.
- `after` (string): Cursor for the next page.

Response fields:
- `data` (ThreadsReply[]): Page of pending replies.
- `paging` (object): Cursor pagination metadata.

### POST `/{threads_reply_id}/manage_pending_replies` - Approve or reject a pending reply

Approves or rejects a pending reply.

- ID: `replies.managePendingReply`
- Category: Replies
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/documentation/threads/retrieve-and-manage-replies
- Permissions: `threads_manage_replies`

Parameters:
- `threads_reply_id` (string): Pending Threads reply media ID. Required.
- `reply_approval_status` (APPROVED | REJECTED): Approval decision for the pending reply. Required. Values: `APPROVED`, `REJECTED`.

Response fields:
- `success` (boolean): Whether the approval action succeeded.

## Profiles

### GET `/me` - Retrieve the authenticated Threads profile

Retrieves profile fields for the authenticated Threads user.

- ID: `profiles.getMe`
- Category: Profiles
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/profile-discovery/
- Permissions: `threads_basic`

Parameters:
- `fields` (string[]): Profile fields to return.

Response fields:
- `id` (string): Threads user ID.
- `username` (string): Threads username.
- `name` (string): Display name.
- `threads_profile_picture_url` (string): Profile picture URL.
- `threads_biography` (string): Profile biography.

### GET `/{threads_user_id}` - Retrieve a Threads user profile

Retrieves profile fields for a Threads user ID.

- ID: `profiles.getUser`
- Category: Profiles
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/profile-discovery/
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

## Insights

### GET `/{threads_media_id}/insights` - Retrieve Threads media insights

Retrieves metrics for a Threads media object.

- ID: `insights.getMediaInsights`
- Category: Insights
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/insights/
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
- Source: https://developers.facebook.com/docs/threads/insights/
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
- Status: `beta`
- Source: https://developers.facebook.com/docs/threads/keyword-search/
- Permissions: `threads_keyword_search`

Parameters:
- `q` (string): Keyword query. Required.
- `fields` (string[]): Media fields to return.
- `limit` (number): Maximum number of results in one page.
- `before` (string): Cursor for the previous page.
- `after` (string): Cursor for the next page.

Response fields:
- `data` (ThreadsMedia[]): Page of matching Threads media objects.
- `paging` (object): Cursor pagination metadata.

Notes:
- Access and behavior can depend on Meta availability and app review.

### GET `/location_search` - Location search

Searches location references usable by Threads publishing or discovery features when available.

- ID: `location.search`
- Category: Search and discovery
- Capability kind: `graph_endpoint`
- Status: `beta`
- Source: https://developers.facebook.com/docs/threads/location-search/
- Permissions: `threads_basic`

Parameters:
- `q` (string): Location query. Required.
- `latitude` (number): Latitude bias for the search.
- `longitude` (number): Longitude bias for the search.
- `limit` (number): Maximum number of locations in one page.

Response fields:
- `data` (Location[]): Matching location references.

Notes:
- Access and behavior can depend on Meta availability and app review.

## Auth and debug

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

### GET `/debug_token` - Debug a Threads access token

Inspects a token with an app access token.

- ID: `debug.debugToken`
- Category: Auth and debug
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/troubleshooting/
- Permissions: `App access token`

Parameters:
- `input_token` (string): Token to inspect. Required.
- `access_token` (string): App access token used for inspection. Required.

Response fields:
- `data` (object): Graph API token inspection payload.

## Embeds

### GET `/oembed_threads` - Threads oEmbed

Retrieves oEmbed metadata for a public Threads URL.

- ID: `embed.oEmbed`
- Category: Embeds
- Capability kind: `graph_endpoint`
- Status: `supported`
- Source: https://developers.facebook.com/docs/threads/oembed/
- Permissions: `App access token or documented oEmbed access`

Parameters:
- `url` (string): Public Threads post URL. Required.
- `maxwidth` (number): Maximum embed width.
- `omitscript` (boolean): Whether to omit the embed script.
- `hidecaption` (boolean): Whether to hide caption text when supported.

Response fields:
- `html` (string): Embed HTML.
- `author_name` (string): Author display name.
- `author_url` (string): Author profile URL.
- `provider_name` (string): Provider name.
- `provider_url` (string): Provider URL.
- `type` (string): oEmbed type.
- `version` (string): oEmbed version.

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
