import { describe, expect, it, vi } from "vitest";
import { ThreadsApiError, ThreadsClient, ThreadsTimeoutError } from "../../src/index.js";
import { REDACTED } from "../../src/client/redaction.js";
import { createMockFetch, jsonResponse, textResponse } from "../helpers.js";

describe("ThreadsClient transport", () => {
  it("expands paths, encodes query arrays, appends auth, and parses JSON", async () => {
    const mock = createMockFetch([jsonResponse({ id: "post_1" })]);
    const client = new ThreadsClient({ accessToken: "secret.token.value", fetch: mock.fetch });

    const result = await client.request({
      method: "GET",
      path: "/{threads_media_id}",
      pathParams: { threads_media_id: "post 1" },
      query: { fields: ["id", "text"] }
    });

    expect(result).toEqual({ id: "post_1" });
    expect(mock.calls[0]?.url.pathname).toBe("/v23.0/post%201");
    expect(mock.calls[0]?.url.searchParams.get("fields")).toBe("id,text");
    expect(mock.calls[0]?.url.searchParams.get("access_token")).toBe("secret.token.value");
  });

  it("encodes POST bodies as form data", async () => {
    const mock = createMockFetch([jsonResponse({ id: "container_1" })]);
    const client = new ThreadsClient({ accessToken: "token", fetch: mock.fetch });

    await client.request({
      method: "POST",
      path: "/me/threads",
      body: {
        media_type: "CAROUSEL",
        text: "hello",
        children: ["a", "b"],
        poll_attachment: { option_a: "first", option_b: "second" },
        text_entities: [{ entity_type: "SPOILER", offset: 0, length: 4 }]
      }
    });

    expect(mock.calls[0]?.init.method).toBe("POST");
    expect(mock.calls[0]?.body.get("media_type")).toBe("CAROUSEL");
    expect(mock.calls[0]?.body.get("children")).toBe("a,b");
    expect(mock.calls[0]?.body.get("poll_attachment")).toBe(
      '{"option_a":"first","option_b":"second"}'
    );
    expect(mock.calls[0]?.body.get("text_entities")).toBe(
      '[{"entity_type":"SPOILER","offset":0,"length":4}]'
    );
  });

  it("normalizes Graph API errors and redacts token values", async () => {
    const mock = createMockFetch([
      jsonResponse(
        {
          error: {
            message: "Bad token",
            code: 190,
            type: "OAuthException",
            fbtrace_id: "trace"
          }
        },
        { status: 400 }
      )
    ]);
    const client = new ThreadsClient({ accessToken: "secret.token.value", fetch: mock.fetch });

    await expect(client.request({ path: "/me" })).rejects.toMatchObject({
      name: "ThreadsApiError",
      status: 400,
      code: 190,
      type: "OAuthException",
      fbtraceId: "trace"
    });

    try {
      await client.request({ path: "/me" });
    } catch (error) {
      expect(error).toBeInstanceOf(ThreadsApiError);
      expect(JSON.stringify(error)).not.toContain("secret.token.value");
      expect(JSON.stringify(error)).toContain(REDACTED);
    }
  });

  it("wraps non-JSON responses", async () => {
    const mock = createMockFetch([textResponse("ok")]);
    const client = new ThreadsClient({ fetch: mock.fetch });

    await expect(client.request({ path: "/me" })).resolves.toEqual({ raw: "ok" });
  });

  it("does not retry POST requests even when retry callback asks", async () => {
    const mock = createMockFetch([jsonResponse({ error: { message: "rate" } }, { status: 429 })]);
    const retry = vi.fn(() => ({ retry: true }));
    const client = new ThreadsClient({ fetch: mock.fetch, retry });

    await expect(
      client.request({ method: "POST", path: "/me/threads", body: { text: "x" } })
    ).rejects.toThrow(ThreadsApiError);
    expect(retry).not.toHaveBeenCalled();
    expect(mock.calls).toHaveLength(1);
  });

  it("supports opt-in retries for GET failures", async () => {
    const mock = createMockFetch([
      jsonResponse({ error: { message: "rate" } }, { status: 429 }),
      jsonResponse({ id: "ok" })
    ]);
    const retry = vi.fn(({ attempt, status }) => ({ retry: status === 429 && attempt < 1 }));
    const client = new ThreadsClient({ fetch: mock.fetch, retry });

    await expect(client.request({ path: "/me" })).resolves.toEqual({ id: "ok" });
    expect(retry).toHaveBeenCalledOnce();
    expect(mock.calls).toHaveLength(2);
  });

  it("turns aborts into timeout errors", async () => {
    const fetch = vi.fn(async () => {
      throw new DOMException("aborted", "AbortError");
    });
    const client = new ThreadsClient({ fetch });

    await expect(client.request({ path: "/me" })).rejects.toBeInstanceOf(ThreadsTimeoutError);
  });

  it("buildUrlForTest returns a redacted URL", () => {
    const client = new ThreadsClient({ accessToken: "secret.token.value" });

    expect(client.buildUrlForTest({ path: "/me" })).toContain("access_token=[REDACTED]");
  });
});
