export interface ThreadsWebhookVerificationQuery {
  "hub.mode"?: string;
  "hub.verify_token"?: string;
  "hub.challenge"?: string;
}

export interface ThreadsWebhookPayload {
  object: string;
  entry: ThreadsWebhookEntry[];
}

export interface ThreadsWebhookEntry {
  id: string;
  time: number;
  changes?: ThreadsWebhookChange[];
}

export interface ThreadsWebhookChange {
  field: string;
  value: Record<string, unknown>;
}

export function verifyWebhookChallenge(
  query: ThreadsWebhookVerificationQuery,
  expectedVerifyToken: string
): string | null {
  if (query["hub.mode"] === "subscribe" && query["hub.verify_token"] === expectedVerifyToken) {
    return query["hub.challenge"] ?? "";
  }
  return null;
}
