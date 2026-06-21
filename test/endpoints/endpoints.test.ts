import { describe, expect, it } from "vitest";
import { ThreadsClient } from "../../src/index.js";
import { createMockFetch, jsonResponse } from "../helpers.js";

describe("endpoint helpers", () => {
  it("wraps posts and publishing endpoints", async () => {
    const mock = createMockFetch([
      jsonResponse({ id: "container" }),
      jsonResponse({ id: "carousel-parent" }),
      jsonResponse({ id: "post" }),
      jsonResponse({ id: "repost" }),
      jsonResponse({ id: "container", status: "FINISHED" }),
      jsonResponse({ id: "post", text: "hi" }),
      jsonResponse({ data: [], paging: { cursors: { after: "next" } } }),
      jsonResponse({ success: true, deleted_id: "post" })
    ]);
    const client = new ThreadsClient({ accessToken: "token", fetch: mock.fetch });

    await client.posts.createContainer("user", {
      media_type: "TEXT",
      text: "hi",
      link_attachment: "https://developers.facebook.com/",
      poll_attachment: {
        option_a: "first",
        option_b: "second",
        option_c: "third",
        option_d: "fourth"
      },
      topic_tag: "ThreadsAPI",
      location_id: "location",
      allowlisted_country_codes: ["US", "TW"],
      auto_publish_text: true,
      text_entities: [{ entity_type: "SPOILER", offset: 0, length: 4 }],
      text_attachment: {
        plaintext: "attachment",
        link_attachment_url: "https://meta.com"
      },
      gif_attachment: { gif_id: "16185153483944881729", provider: "TENOR" },
      is_ghost_post: true,
      enable_reply_approvals: true,
      crossreshare_to_ig: true,
      crossreshare_to_ig_dark_mode: false,
      reply_control: "followers_only"
    });
    await client.posts.createContainer("user", {
      media_type: "CAROUSEL",
      children: ["child-1", "child-2"],
      text: "carousel caption"
    });
    await client.posts.publishContainer("user", { creation_id: "container" });
    await client.posts.repost("post");
    await client.posts.getContainerStatus("container", { fields: ["id", "status"] });
    await client.posts.get("post", { fields: ["id", "text"] });
    await client.posts.listUserThreads("user", { fields: ["id"], limit: 10 });
    await client.posts.delete("post");

    expect(mock.calls.map((call) => `${call.init.method} ${call.url.pathname}`)).toEqual([
      "POST /v23.0/user/threads",
      "POST /v23.0/user/threads",
      "POST /v23.0/user/threads_publish",
      "POST /v23.0/post/repost",
      "GET /v23.0/container",
      "GET /v23.0/post",
      "GET /v23.0/user/threads",
      "DELETE /v23.0/post"
    ]);
    expect(mock.calls[0]?.body.get("link_attachment")).toBe("https://developers.facebook.com/");
    expect(mock.calls[0]?.body.get("allowlisted_country_codes")).toBe("US,TW");
    expect(mock.calls[0]?.body.get("auto_publish_text")).toBe("true");
    expect(mock.calls[0]?.body.get("reply_control")).toBe("followers_only");
    expect(mock.calls[0]?.body.get("crossreshare_to_ig")).toBe("true");
    expect(mock.calls[0]?.body.get("crossreshare_to_ig_dark_mode")).toBe("false");
    expect(mock.calls[0]?.body.get("poll_attachment")).toBe(
      '{"option_a":"first","option_b":"second","option_c":"third","option_d":"fourth"}'
    );
    expect(mock.calls[0]?.body.get("text_entities")).toBe(
      '[{"entity_type":"SPOILER","offset":0,"length":4}]'
    );
    expect(mock.calls[0]?.body.get("gif_attachment")).toBe(
      '{"gif_id":"16185153483944881729","provider":"TENOR"}'
    );
    expect(mock.calls[1]?.body.get("media_type")).toBe("CAROUSEL");
    expect(mock.calls[1]?.body.get("children")).toBe("child-1,child-2");
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

    await client.posts.getReplies("post", { limit: 5, reverse: false });
    await client.posts.getConversation("post", { fields: ["id"], reverse: true });
    await client.replies.manage("reply", { hide: true });
    await client.replies.getPending("post", {
      limit: 5,
      reverse: true,
      approval_status: "pending"
    });
    await client.replies.managePending("reply", { approve: true });

    expect(mock.calls.map((call) => `${call.init.method} ${call.url.pathname}`)).toEqual([
      "GET /v23.0/post/replies",
      "GET /v23.0/post/conversation",
      "POST /v23.0/reply/manage_reply",
      "GET /v23.0/post/pending_replies",
      "POST /v23.0/reply/manage_pending_reply"
    ]);
    expect(mock.calls[1]?.url.searchParams.get("reverse")).toBe("true");
    expect(mock.calls[3]?.url.searchParams.get("approval_status")).toBe("pending");
    expect(mock.calls[4]?.body.get("approve")).toBe("true");
  });

  it("wraps profile, insights, search, token, debug, and oEmbed endpoints", async () => {
    const mock = createMockFetch([
      jsonResponse({ id: "me" }),
      jsonResponse({ id: "user" }),
      jsonResponse({ id: "public-user" }),
      jsonResponse({ data: [] }),
      jsonResponse({ quota_usage: 1 }),
      jsonResponse({ data: [] }),
      jsonResponse({ data: [] }),
      jsonResponse({ data: [] }),
      jsonResponse({ data: [] }),
      jsonResponse({ data: [] }),
      jsonResponse({ id: "location" }),
      jsonResponse({ access_token: "short", user_id: "user" }),
      jsonResponse({ access_token: "long" }),
      jsonResponse({ access_token: "fresh" }),
      jsonResponse({ access_token: "app", token_type: "bearer" }),
      jsonResponse({ data: { app_id: "app" } }),
      jsonResponse({ html: "<blockquote></blockquote>" }),
      jsonResponse({ data: [] })
    ]);
    const client = new ThreadsClient({ accessToken: "default", fetch: mock.fetch });

    await client.profiles.getMe({ fields: ["id", "username"] });
    await client.profiles.get("user", { fields: ["id"] });
    await client.profiles.lookup({ username: "meta" });
    await client.profiles.listPublicPosts({ username: "meta", fields: ["id"], limit: 10 });
    await client.profiles.getPublishingLimit("user", { fields: ["quota_usage"] });
    await client.profiles.listReplies("user", { fields: ["id"], limit: 5 });
    await client.insights.getMedia("post", { metric: ["views"] });
    await client.insights.getUser("user", { metric: ["followers_count"], breakdown: "age" });
    await client.search.keyword({
      q: "hello",
      fields: ["id"],
      search_type: "RECENT",
      search_mode: "TAG",
      media_type: "TEXT"
    });
    await client.search.location({ q: "Taipei", latitude: 25.03, longitude: 121.56 });
    await client.locations.get("location", { fields: ["id", "name"] });
    await client.utilities.exchangeAuthorizationCode({
      client_id: "app-id",
      client_secret: "secret",
      code: "code",
      redirect_uri: "https://example.com/callback"
    });
    await client.utilities.exchangeLongLivedToken({
      client_secret: "secret",
      access_token: "short"
    });
    await client.utilities.refreshLongLivedToken("long");
    await client.utilities.getAppAccessToken({ client_id: "app-id", client_secret: "secret" });
    await client.utilities.debugToken({ input_token: "debug-me", access_token: "app|token" });
    await client.utilities.oEmbed({ url: "https://www.threads.net/@meta/post/abc" });
    await client.posts.getMentions("user", { limit: 1 });

    expect(mock.calls.map((call) => call.url.pathname)).toEqual([
      "/v23.0/me",
      "/v23.0/user",
      "/v23.0/profile_lookup",
      "/v23.0/profile_posts",
      "/v23.0/user/threads_publishing_limit",
      "/v23.0/user/replies",
      "/v23.0/post/insights",
      "/v23.0/user/threads_insights",
      "/v23.0/keyword_search",
      "/v23.0/location_search",
      "/v23.0/location",
      "/oauth/access_token",
      "/access_token",
      "/refresh_access_token",
      "/oauth/access_token",
      "/v23.0/debug_token",
      "/v23.0/oembed",
      "/v23.0/user/mentions"
    ]);
    expect(mock.calls[8]?.url.searchParams.get("search_type")).toBe("RECENT");
    expect(mock.calls[9]?.url.searchParams.get("q")).toBe("Taipei");
    expect(mock.calls[11]?.init.method).toBe("POST");
    expect(mock.calls[11]?.url.searchParams.get("grant_type")).toBe("authorization_code");
    expect(mock.calls[12]?.url.searchParams.get("access_token")).toBe("short");
    expect(mock.calls[12]?.url.searchParams.getAll("access_token")).toEqual(["short"]);
    expect(mock.calls[14]?.url.searchParams.get("grant_type")).toBe("client_credentials");
  });
});
