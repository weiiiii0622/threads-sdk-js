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

  it("keeps README branding aligned with package assets", async () => {
    const [readme, packageJson] = await Promise.all([
      readFile("README.md", "utf8"),
      readFile("package.json", "utf8")
    ]);
    const pkg = JSON.parse(packageJson) as { files: string[] };

    expect(readme).toContain(
      "raw.githubusercontent.com/weiiiii0622/threads-sdk/main/media/icon.png"
    );
    expect(readme).toContain("img.shields.io/npm/v/threads-sdk-js");
    expect(readme).toContain("img.shields.io/npm/dm/threads-sdk-js");
    expect(readme).toContain("actions/workflows/release.yml");
    expect(readme).toContain("img.shields.io/node/v/threads-sdk-js");
    expect(pkg.files).toContain("media");
  });
});
