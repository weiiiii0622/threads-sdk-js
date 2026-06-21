import { describe, expect, it } from "vitest";
import { verifyWebhookChallenge } from "../../src/index.js";

describe("webhook helpers", () => {
  it("returns the challenge only for matching verification tokens", () => {
    expect(
      verifyWebhookChallenge(
        { "hub.mode": "subscribe", "hub.verify_token": "expected", "hub.challenge": "challenge" },
        "expected"
      )
    ).toBe("challenge");

    expect(
      verifyWebhookChallenge(
        { "hub.mode": "subscribe", "hub.verify_token": "wrong", "hub.challenge": "challenge" },
        "expected"
      )
    ).toBeNull();
  });
});
