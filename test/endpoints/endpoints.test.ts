import { describe, expect, it } from "vitest";
import { ThreadsClient } from "../../src/index.js";
import { createMockFetch, jsonResponse } from "../helpers.js";

describe("endpoint helpers", () => {
  it("wraps posts and publishing endpoints", async () => {
    const mock = createMockFetch([
      jsonResponse({ id: "container" }),
      jsonResponse({ id: "post" }),
      jsonResponse({ id: "post", text: "hi" }),
      jsonResponse({ data: [], paging: { cursors: { after: "next" } } }),
      jsonResponse({ success: true })
    ]);
    const client = new ThreadsClient({ accessToken: "token", fetch: mock.fetch });

    await client.posts.createContainer("user", { media_type: "TEXT", text: "hi" });
    await client.posts.publishContainer("user", { creation_id: "container" });
    await client.posts.get("post", { fields: ["id", "text"] });
    await client.posts.listUserThreads("user", { fields: ["id"], limit: 10 });
    await client.posts.delete("post");

    expect(mock.calls.map((call) => `${call.init.method} ${call.url.pathname}`)).toEqual([
      "POST /v23.0/user/threads",
      "POST /v23.0/user/threads_publish",
      "GET /v23.0/post",
      "GET /v23.0/user/threads",
      "DELETE /v23.0/post"
    ]);
  });

  it("wraps reply retrieval and management endpoints", async () => {
    const mock = createMockFetch([
      jsonResponse({ data: [] }),
      jsonResponse({ data: [] }),
      jsonResponse({ success: true }),
      jsonResponse({ data: [] }),
      jsonResponse({ success: true })
    ]);
    const client = new ThreadsClient({ fetch: mock.fetch });

    await client.posts.getReplies("post", { limit: 5 });
    await client.posts.getConversation("post", { fields: ["id"] });
    await client.replies.manage("reply", { hide: true });
    await client.replies.getPending("post", { limit: 5 });
    await client.replies.managePending("reply", { reply_approval_status: "APPROVED" });

    expect(mock.calls.map((call) => `${call.init.method} ${call.url.pathname}`)).toEqual([
      "GET /v23.0/post/replies",
      "GET /v23.0/post/conversation",
      "POST /v23.0/reply/manage_reply",
      "GET /v23.0/post/pending_replies",
      "POST /v23.0/reply/manage_pending_replies"
    ]);
  });

  it("wraps profile, insights, search, token, debug, and oEmbed endpoints", async () => {
    const mock = createMockFetch([
      jsonResponse({ id: "me" }),
      jsonResponse({ id: "user" }),
      jsonResponse({ data: [] }),
      jsonResponse({ data: [] }),
      jsonResponse({ data: [] }),
      jsonResponse({ data: [] }),
      jsonResponse({ access_token: "long" }),
      jsonResponse({ access_token: "fresh" }),
      jsonResponse({ data: { app_id: "app" } }),
      jsonResponse({ html: "<blockquote></blockquote>" }),
      jsonResponse({ data: [] })
    ]);
    const client = new ThreadsClient({ accessToken: "default", fetch: mock.fetch });

    await client.profiles.getMe({ fields: ["id", "username"] });
    await client.profiles.get("user", { fields: ["id"] });
    await client.insights.getMedia("post", { metric: ["views"] });
    await client.insights.getUser("user", { metric: ["followers_count"], breakdown: "age" });
    await client.search.keyword({ q: "hello", fields: ["id"] });
    await client.search.location({ q: "Taipei", latitude: 25.03, longitude: 121.56 });
    await client.utilities.exchangeLongLivedToken({
      client_secret: "secret",
      access_token: "short"
    });
    await client.utilities.refreshLongLivedToken("long");
    await client.utilities.debugToken({ input_token: "debug-me", access_token: "app|token" });
    await client.utilities.oEmbed({ url: "https://www.threads.net/@meta/post/abc" });
    await client.posts.getMentions("user", { limit: 1 });

    expect(mock.calls.map((call) => call.url.pathname)).toEqual([
      "/v23.0/me",
      "/v23.0/user",
      "/v23.0/post/insights",
      "/v23.0/user/threads_insights",
      "/v23.0/keyword_search",
      "/v23.0/location_search",
      "/v23.0/access_token",
      "/v23.0/refresh_access_token",
      "/v23.0/debug_token",
      "/v23.0/oembed_threads",
      "/v23.0/user/mentions"
    ]);
    expect(mock.calls[6]?.url.searchParams.get("access_token")).toBe("short");
    expect(mock.calls[6]?.url.searchParams.getAll("access_token")).toEqual(["short"]);
  });
});
