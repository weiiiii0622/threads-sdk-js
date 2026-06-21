import { redactValue } from "./redaction.js";

export interface ThreadsApiErrorDetails {
  status?: number | undefined;
  code?: number | undefined;
  type?: string | undefined;
  fbtraceId?: string | undefined;
  raw?: unknown;
  request?: {
    method: string;
    url: string;
    body?: unknown | undefined;
  };
}

export class ThreadsApiError extends Error {
  readonly name: string = "ThreadsApiError";
  readonly status: number | undefined;
  readonly code: number | undefined;
  readonly type: string | undefined;
  readonly fbtraceId: string | undefined;
  readonly raw?: unknown;
  readonly request: ThreadsApiErrorDetails["request"] | undefined;

  constructor(message: string, details: ThreadsApiErrorDetails = {}) {
    super(message);
    this.status = details.status;
    this.code = details.code;
    this.type = details.type;
    this.fbtraceId = details.fbtraceId;
    this.raw = redactValue(details.raw);
    this.request = redactValue(details.request);
  }
}

export class ThreadsTimeoutError extends ThreadsApiError {
  readonly name: string = "ThreadsTimeoutError";
}

export function normalizeGraphError(payload: unknown): {
  message: string;
  code?: number | undefined;
  type?: string | undefined;
  fbtraceId?: string | undefined;
} {
  if (!payload || typeof payload !== "object" || !("error" in payload)) {
    return { message: "Threads API request failed" };
  }

  const error = (payload as { error?: Record<string, unknown> }).error;
  return {
    message: typeof error?.message === "string" ? error.message : "Threads API request failed",
    code: typeof error?.code === "number" ? error.code : undefined,
    type: typeof error?.type === "string" ? error.type : undefined,
    fbtraceId: typeof error?.fbtrace_id === "string" ? error.fbtrace_id : undefined
  };
}
