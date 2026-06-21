import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";

describe("package source exports", () => {
  it("exports the public TypeScript API from source", async () => {
    const mod = await import("../../src/index.js");
    expect(mod.ThreadsClient).toBeTypeOf("function");
    expect(mod.endpointRegistry.length).toBeGreaterThan(0);
  });

  it("has package metadata for dual module output", () => {
    const require = createRequire(import.meta.url);
    const pkg = require("../../package.json");

    expect(pkg.exports["."].import).toBe("./dist/index.js");
    expect(pkg.exports["."].require).toBe("./dist/index.cjs");
    expect(pkg.exports["."].types).toBe("./dist/index.d.ts");
    expect(pkg.files).toEqual(expect.arrayContaining(["dist", "README.md", "API.md", "LICENSE"]));
  });
});
