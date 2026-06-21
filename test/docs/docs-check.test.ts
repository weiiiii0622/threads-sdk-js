import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { endpointRegistry } from "../../src/index.js";

describe("generated docs", () => {
  it("include every registry entry in API.md and README.md", async () => {
    const [api, readme] = await Promise.all([
      readFile("API.md", "utf8"),
      readFile("README.md", "utf8")
    ]);

    for (const endpoint of endpointRegistry) {
      expect(api).toContain(endpoint.id);
      expect(readme).toContain(endpoint.id);
    }
  });
});
