const SENSITIVE_KEYS = new Set([
  "access_token",
  "authorization",
  "client_secret",
  "input_token",
  "token",
  "appsecret_proof"
]);

const TOKENISH = /([?&](?:access_token|input_token|client_secret|token)=)[^&#\s]+/gi;
const AUTH_HEADER = /(authorization["']?\s*[:=]\s*["']?bearer\s+)[^"',\s}]+/gi;
const LONG_TOKEN = /\b[A-Za-z0-9_-]{24,}\.[A-Za-z0-9._-]{8,}\b/g;

export const REDACTED = "[REDACTED]";

export function isSensitiveKey(key: string): boolean {
  const lower = key.toLowerCase();
  return SENSITIVE_KEYS.has(lower) || lower.endsWith("_token") || lower.includes("secret");
}

export function redactString(value: string): string {
  return value
    .replace(TOKENISH, `$1${REDACTED}`)
    .replace(AUTH_HEADER, `$1${REDACTED}`)
    .replace(LONG_TOKEN, REDACTED);
}

export function redactValue<T>(value: T, keyHint?: string): T {
  if (keyHint && isSensitiveKey(keyHint)) {
    return REDACTED as T;
  }

  if (typeof value === "string") {
    return redactString(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => redactValue(item)) as T;
  }

  if (value && typeof value === "object") {
    const redacted: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      redacted[key] = redactValue(item, key);
    }
    return redacted as T;
  }

  return value;
}
