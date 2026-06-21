import { describe, expect, it } from "vitest";
import { ThreadsClient } from "../../src/index.js";
import { createMockFetch, jsonResponse } from "../helpers.js";

describe("pagination", () => {
  it("normalizes cursor pages", async () => {
    const mock = createMockFetch([
      jsonResponse({
        data: [{ id: "1" }],
        paging: { cursors: { before: "prev", after: "next" } }
      })
    ]);
    const client = new ThreadsClient({ fetch: mock.fetch });

    const page = await client.posts.listUserThreads("user_1", { limit: 1 });

    expect(page.data).toEqual([{ id: "1" }]);
    expect(page.previousCursor).toBe("prev");
    expect(page.nextCursor).toBe("next");
  });

  it("iterates pages with caller-controlled limit", async () => {
    const mock = createMockFetch([
      jsonResponse({ data: [{ id: "1" }], paging: { cursors: { after: "a" } } }),
      jsonResponse({ data: [{ id: "2" }], paging: { cursors: { after: "b" } } })
    ]);
    const client = new ThreadsClient({ fetch: mock.fetch });

    const pages = [];
    for await (const page of client.iteratePages<{ id: string }>({
      path: "/me/threads",
      limit: 2
    })) {
      pages.push(page.data[0]?.id);
    }

    expect(pages).toEqual(["1", "2"]);
    expect(mock.calls[1]?.url.searchParams.get("after")).toBe("a");
  });

  it("stops when no next cursor exists", async () => {
    const mock = createMockFetch([jsonResponse({ data: [] })]);
    const client = new ThreadsClient({ fetch: mock.fetch });

    const pages = [];
    for await (const page of client.iteratePages({ path: "/me/threads", limit: 5 })) {
      pages.push(page);
    }

    expect(pages).toHaveLength(1);
  });
});
