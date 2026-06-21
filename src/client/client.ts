import { DEFAULT_API_VERSION } from "../registry/index.js";
import { ThreadsApiError, ThreadsTimeoutError, normalizeGraphError } from "./errors.js";
import { normalizePage } from "./pagination.js";
import { redactString, redactValue } from "./redaction.js";
import type {
  BodyParams,
  FetchLike,
  IteratePagesOptions,
  NormalizedPage,
  Page,
  QueryParams,
  QueryValue,
  RequestOptions,
  RetryCallback,
  RetryDecision,
  ThreadsClientOptions
} from "./types.js";

const DEFAULT_TIMEOUT_MS = 30_000;

function appendQuery(url: URL, query: QueryParams = {}): void {
  for (const [key, value] of Object.entries(query) as Array<[string, QueryValue | unknown]>) {
    if (value === undefined || value === null) {
      continue;
    }

    if (Array.isArray(value)) {
      url.searchParams.set(key, value.join(","));
      continue;
    }

    url.searchParams.set(key, String(value));
  }
}

function encodeFormBody(body: BodyParams = {}): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(body)) {
    if (value === undefined || value === null) {
      continue;
    }

    if (Array.isArray(value)) {
      params.set(key, value.join(","));
    } else if (typeof value === "object") {
      params.set(key, JSON.stringify(value));
    } else {
      params.set(key, String(value));
    }
  }
  return params;
}

function expandPath(path: string, pathParams: Record<string, string | number> = {}): string {
  return path.replace(/\{([^}]+)\}/g, (_, key: string) => {
    const value = pathParams[key];
    if (value === undefined) {
      throw new ThreadsApiError(`Missing path parameter: ${key}`);
    }
    return encodeURIComponent(String(value));
  });
}

function buildUrl(baseUrl: string, defaultApiVersion: string, options: RequestOptions): URL {
  const expandedPath = expandPath(options.path, options.pathParams);
  const apiVersion = options.apiVersion === undefined ? defaultApiVersion : options.apiVersion;
  const versionPrefix = apiVersion === null ? "" : `/${apiVersion}`;
  const url = new URL(`${baseUrl}${versionPrefix}${expandedPath}`);
  appendQuery(url, options.query);
  return url;
}

function mergeSignals(timeoutMs: number, callerSignal?: AbortSignal): AbortSignal {
  const timeoutSignal = AbortSignal.timeout(timeoutMs);
  if (!callerSignal) {
    return timeoutSignal;
  }

  return AbortSignal.any([timeoutSignal, callerSignal]);
}

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class ThreadsClient {
  readonly accessToken: string | undefined;
  readonly apiVersion: string;
  readonly baseUrl: string;
  readonly timeoutMs: number;
  readonly fetch: FetchLike;
  readonly retry: RetryCallback | undefined;

  constructor(options: ThreadsClientOptions = {}) {
    this.accessToken = options.accessToken ?? undefined;
    this.apiVersion = options.apiVersion ?? DEFAULT_API_VERSION;
    this.baseUrl = options.baseUrl ?? "https://graph.threads.net";
    this.timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    this.fetch = options.fetch ?? fetch;
    this.retry = options.retry;
  }

  async request<T = unknown>(options: RequestOptions): Promise<T> {
    const method = options.method ?? "GET";
    const url = buildUrl(this.baseUrl, this.apiVersion, options);
    const token =
      options.accessToken === null ? undefined : (options.accessToken ?? this.accessToken);

    if (token) {
      url.searchParams.set("access_token", token);
    }

    const init: RequestInit = {
      method,
      headers: {
        Accept: "application/json",
        ...options.headers
      },
      signal: mergeSignals(this.timeoutMs, options.signal)
    };

    if (method !== "GET" && options.body) {
      init.body = encodeFormBody(options.body);
      init.headers = {
        ...init.headers,
        "Content-Type": "application/x-www-form-urlencoded"
      };
    }

    let attempt = 0;
    while (true) {
      try {
        const response = await this.fetch(url, init);
        const payload = await this.parseResponse(response);

        if (!response.ok) {
          const graph = normalizeGraphError(payload);
          const error = new ThreadsApiError(graph.message, {
            status: response.status,
            code: graph.code,
            type: graph.type,
            fbtraceId: graph.fbtraceId,
            raw: payload,
            request: { method, url: url.toString(), body: options.body }
          });

          const decision = await this.getRetryDecision({
            retryable: method === "GET",
            attempt,
            status: response.status,
            url: url.toString(),
            error
          });
          if (decision.retry) {
            attempt += 1;
            await sleep(decision.delayMs ?? 0);
            continue;
          }
          throw error;
        }

        return payload as T;
      } catch (error) {
        if (error instanceof ThreadsApiError) {
          throw error;
        }

        if (isAbortError(error)) {
          throw new ThreadsTimeoutError("Threads API request timed out or was aborted", {
            request: { method, url: url.toString(), body: options.body },
            raw: error
          });
        }

        const decision = await this.getRetryDecision({
          retryable: method === "GET",
          attempt,
          url: url.toString(),
          error
        });
        if (decision.retry) {
          attempt += 1;
          await sleep(decision.delayMs ?? 0);
          continue;
        }

        throw new ThreadsApiError(
          error instanceof Error ? error.message : "Threads API request failed",
          {
            request: { method, url: url.toString(), body: options.body },
            raw: error
          }
        );
      }
    }
  }

  async page<T = unknown>(options: RequestOptions): Promise<NormalizedPage<T>> {
    const page = await this.request<Page<T>>(options);
    return normalizePage(page);
  }

  async *iteratePages<T = unknown, TQuery extends QueryParams = QueryParams>(
    options: IteratePagesOptions<TQuery>
  ): AsyncGenerator<NormalizedPage<T>, void, unknown> {
    const initialQuery = options.query as Record<string, unknown> | undefined;
    let after = typeof initialQuery?.after === "string" ? initialQuery.after : undefined;
    let count = 0;

    while (options.limit === undefined || count < options.limit) {
      const query = { ...(options.query as Record<string, unknown> | undefined), after };
      const page = await this.page<T>({
        method: "GET",
        path: options.path,
        query,
        signal: options.signal
      });
      yield page;
      count += 1;

      if (!page.nextCursor) {
        return;
      }
      after = page.nextCursor;
    }
  }

  buildUrlForTest(options: RequestOptions): string {
    const url = buildUrl(this.baseUrl, this.apiVersion, options);
    const token =
      options.accessToken === null ? undefined : (options.accessToken ?? this.accessToken);
    if (token) {
      url.searchParams.set("access_token", token);
    }
    return redactString(url.toString());
  }

  redactForTest<T>(value: T): T {
    return redactValue(value);
  }

  private async parseResponse(response: Response): Promise<unknown> {
    const text = await response.text();
    if (!text) {
      return {};
    }

    try {
      return JSON.parse(text);
    } catch {
      return { raw: text };
    }
  }

  private async getRetryDecision(input: {
    retryable: boolean;
    attempt: number;
    url: string;
    status?: number;
    error?: unknown;
  }): Promise<RetryDecision> {
    if (!input.retryable || !this.retry) {
      return { retry: false };
    }

    const decision = await this.retry({
      attempt: input.attempt,
      method: "GET",
      url: redactString(input.url),
      status: input.status,
      error: redactValue(input.error)
    });
    return decision;
  }
}

export type { QueryParams, QueryValue };
