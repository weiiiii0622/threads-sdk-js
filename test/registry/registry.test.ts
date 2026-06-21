import { describe, expect, it } from "vitest";
import { endpointRegistry, isGraphEndpoint } from "../../src/index.js";

describe("endpoint registry", () => {
  it("has complete metadata for every entry", () => {
    for (const endpoint of endpointRegistry) {
      expect(endpoint.id).toBeTruthy();
      expect(endpoint.name).toBeTruthy();
      expect(endpoint.category).toBeTruthy();
      expect(endpoint.docsUrl).toMatch(/^https:\/\/developers\.facebook\.com\//);
      expect(endpoint.parameters).toBeInstanceOf(Array);
      expect(endpoint.responseFields).toBeInstanceOf(Array);
      expect(endpoint.permissions.length).toBeGreaterThan(0);
    }
  });

  it("gives callable endpoints methods and paths", () => {
    const callable = endpointRegistry.filter(isGraphEndpoint);
    expect(callable.length).toBeGreaterThan(10);

    for (const endpoint of callable) {
      expect(endpoint.method).toMatch(/GET|POST|DELETE/);
      expect(endpoint.path).toMatch(/^\//);
    }
  });

  it("keeps docs-only capabilities out of graph endpoints", () => {
    const docsOnly = endpointRegistry.filter((endpoint) => !isGraphEndpoint(endpoint));
    expect(docsOnly.map((endpoint) => endpoint.kind)).toEqual([
      "dashboard_setup",
      "webhook_payload"
    ]);
    expect(
      docsOnly.every((endpoint) => endpoint.method === undefined && endpoint.path === undefined)
    ).toBe(true);
  });
});
