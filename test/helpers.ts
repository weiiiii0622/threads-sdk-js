import { vi } from "vitest";
import type { FetchLike } from "../src/index.js";

export interface FetchCall {
  url: URL;
  init: RequestInit;
  body: URLSearchParams;
}

export function jsonResponse(payload: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(payload), {
    status: init.status ?? 200,
    headers: { "Content-Type": "application/json", ...init.headers }
  });
}

export function textResponse(payload: string, init: ResponseInit = {}): Response {
  return new Response(payload, {
    status: init.status ?? 200,
    headers: { "Content-Type": "text/plain", ...init.headers }
  });
}

export function createMockFetch(responses: Response[] | (() => Response | Promise<Response>)): {
  fetch: FetchLike;
  calls: FetchCall[];
} {
  const calls: FetchCall[] = [];
  const queue = Array.isArray(responses) ? [...responses] : undefined;

  const fetch = vi.fn(async (input: URL | RequestInfo, init?: RequestInit) => {
    const url = input instanceof URL ? input : new URL(String(input));
    calls.push({
      url,
      init: init ?? {},
      body: new URLSearchParams(String(init?.body ?? ""))
    });

    if (queue) {
      const response = queue.shift();
      if (!response) {
        throw new Error("No mock response queued");
      }
      return response;
    }

    const responder = responses as () => Response | Promise<Response>;
    return responder();
  }) as FetchLike;

  return { fetch, calls };
}
