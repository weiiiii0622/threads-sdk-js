<p align="center">
  <img src="https://raw.githubusercontent.com/weiiiii0622/threads-sdk-js/main/media/icon.png" alt="threads-sdk-js icon" width="144">
</p>

<h1 align="center">threads-sdk-js</h1>

<p align="center">
  Typed Node.js SDK for the Meta Threads API.
  <br>
  Publish posts, retrieve Threads data, manage replies, read insights, and keep docs aligned from one endpoint registry.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/threads-sdk-js"><img src="https://img.shields.io/npm/v/threads-sdk-js?color=111827" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/threads-sdk-js"><img src="https://img.shields.io/npm/dm/threads-sdk-js?color=2563eb" alt="npm downloads"></a>
  <a href="https://github.com/weiiiii0622/threads-sdk-js/actions/workflows/release.yml"><img src="https://img.shields.io/github/actions/workflow/status/weiiiii0622/threads-sdk-js/release.yml?style=flat-square&logo=githubactions&label=release" alt="release status"></a>
  <img src="https://img.shields.io/node/v/threads-sdk-js?style=flat-square&logo=nodedotjs" alt="Node.js version">
  <img src="https://img.shields.io/badge/Threads_API-typed-111827?style=flat-square" alt="Typed Threads API">
  <a href="https://github.com/weiiiii0622/threads-sdk-js/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/threads-sdk-js?color=0f766e" alt="license"></a>
</p>

```sh
npm install threads-sdk-js
```

`threads-sdk-js` wraps the documented Threads Graph API endpoints with a small TypeScript client, token-safe errors, cursor pagination helpers, and a registry-generated API reference. It is intended for server-side Node.js apps that publish Threads posts, retrieve posts and replies, read insights, use oEmbed, and work with token/debug utilities without hand-building every request.

## Install

```bash
npm install threads-sdk-js
```

Node.js 20 or newer is required. The SDK uses native `fetch` by default and lets you inject a custom fetch implementation for tests or instrumentation.

## Quickstart

```ts
import { ThreadsClient } from "threads-sdk-js";

const client = new ThreadsClient({
  accessToken: process.env.THREADS_ACCESS_TOKEN
});

const container = await client.posts.createContainer(process.env.THREADS_USER_ID!, {
  media_type: "TEXT",
  text: "Hello from the Threads API"
});

const post = await client.posts.publishContainer(process.env.THREADS_USER_ID!, {
  creation_id: container.id
});

console.log(post.id);
```

## Endpoint Status

This table is generated from `src/registry/endpoints.ts`.

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

## Main API

```ts
const client = new ThreadsClient({
  accessToken: process.env.THREADS_ACCESS_TOKEN,
  apiVersion: "v23.0",
  timeoutMs: 30_000
});
```

Available helper groups:

- `client.posts`: create containers, publish containers, retrieve media, list user posts, delete posts, replies, conversations, and mentions.
- `client.replies`: hide or unhide replies, list pending replies, and approve or reject pending replies.
- `client.profiles`: retrieve the authenticated profile or a user profile.
- `client.insights`: retrieve media and user insight metrics.
- `client.search`: keyword and location search helpers where Meta grants access.
- `client.utilities`: long-lived token exchange/refresh, token debug, and Threads oEmbed.
- `client.request`: low-level escape hatch for newly documented fields or endpoints.

## Pagination

List helpers return one page by default and expose cursors explicitly:

```ts
const page = await client.posts.listUserThreads("123", {
  fields: ["id", "text", "timestamp"],
  limit: 25
});

console.log(page.data, page.nextCursor, page.previousCursor);
```

For caller-controlled lazy iteration:

```ts
for await (const page of client.iteratePages({
  path: "/123/threads",
  query: { fields: ["id", "text"], limit: 25 },
  limit: 3
})) {
  console.log(page.data);
}
```

## Errors And Token Safety

The SDK throws `ThreadsApiError` for Graph API and network failures and `ThreadsTimeoutError` for timeout or abort cases. Error details redact `access_token`, `Authorization`, token-like values, and secrets before exposing request or raw payload data.

POST and DELETE calls are never retried automatically. You can opt into retries for safe GET calls:

```ts
const client = new ThreadsClient({
  accessToken: process.env.THREADS_ACCESS_TOKEN,
  retry: ({ status, attempt }) => ({
    retry: status === 429 && attempt < 2,
    delayMs: 500
  })
});
```

## Webhooks

Webhook subscription setup is dashboard-driven in Meta developer tools. This package exports helper types and `verifyWebhookChallenge()` for callback verification, but it does not pretend dashboard setup is a callable Threads Graph endpoint.

## Development

```bash
npm install
npm run docs:generate
npm run test
npm run test:coverage
npm run typecheck
npm run lint
npm run build
npm pack --dry-run
```

Tests use mocked fetch calls and do not require real Threads credentials.

## Publishing

First manual publish:

```bash
npm whoami
npm view threads-sdk-js name version --json
npm run docs:check
npm run typecheck
npm run lint
npm test
npm run build
npm pack --dry-run
npm publish --access public
```

If `npm view threads-sdk-js name version --json` returns `E404`, the name is still available to your npm account. Before publishing, make sure `package.json` has the intended version and that `CHANGELOG.md` describes the release.

Automated releases:

1. Create an npm automation token with publish access.
2. Add it to the GitHub repository as an Actions secret named `NPM_TOKEN`.
3. Merge the release commit to `main`.
4. Create and push a matching version tag, for example `v0.1.0`.
5. Create a GitHub Release from that tag.

When the GitHub Release is published, `.github/workflows/release.yml` runs `npm ci`, `npm run prepack`, and `npm publish --access public --provenance`.

## Version And Support Policy

This package follows the official Meta Threads docs as source of truth. New Meta fields can be used immediately through `client.request()` and then promoted into typed helpers by updating the endpoint registry, generated docs, and tests.
