import type { HttpMethod } from "../registry/index.js";

export type FetchLike = (input: URL | RequestInfo, init?: RequestInit) => Promise<Response>;

export type QueryValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Array<string | number | boolean>;

export type QueryParams = object;
export type BodyParams = object;

export interface RetryContext {
  attempt: number;
  method: HttpMethod;
  url: string;
  status?: number | undefined;
  error?: unknown;
}

export interface RetryDecision {
  retry: boolean;
  delayMs?: number;
}

export type RetryCallback = (context: RetryContext) => RetryDecision | Promise<RetryDecision>;

export interface ThreadsClientOptions {
  accessToken?: string | null;
  apiVersion?: string;
  baseUrl?: string;
  fetch?: FetchLike;
  timeoutMs?: number;
  retry?: RetryCallback;
}

export interface RequestOptions {
  method?: HttpMethod;
  path: string;
  pathParams?: Record<string, string | number>;
  query?: QueryParams;
  body?: BodyParams;
  accessToken?: string | null;
  signal?: AbortSignal | undefined;
  headers?: HeadersInit;
}

export interface PageInfo {
  before?: string;
  after?: string;
}

export interface Paging {
  cursors?: PageInfo;
  next?: string;
  previous?: string;
}

export interface Page<T> {
  data: T[];
  paging?: Paging;
}

export interface NormalizedPage<T> {
  data: T[];
  paging?: Paging | undefined;
  nextCursor?: string | undefined;
  previousCursor?: string | undefined;
}

export interface IteratePagesOptions<TQuery extends QueryParams> {
  path: string;
  query?: TQuery;
  limit?: number;
  signal?: AbortSignal | undefined;
}
