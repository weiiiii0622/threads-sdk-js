import { readFile } from "node:fs/promises";
import { endpointRegistry } from "../src/registry/index.js";
import { renderApiMarkdown, replaceReadmeStatusTable } from "../src/docs/render.js";

const [api, readme] = await Promise.all([
  readFile("API.md", "utf8"),
  readFile("README.md", "utf8")
]);

const expectedApi = renderApiMarkdown();
const expectedReadme = replaceReadmeStatusTable(readme);

const missing = endpointRegistry.flatMap((endpoint) => {
  const checks = [
    ["API.md", api.includes(endpoint.id)],
    ["README.md", readme.includes(endpoint.id)]
  ] as const;
  return checks.filter(([, ok]) => !ok).map(([file]) => `${endpoint.id} missing from ${file}`);
});

if (api !== expectedApi) {
  missing.push("API.md is not generated from the current registry.");
}

if (readme !== expectedReadme) {
  missing.push("README.md endpoint status table is not generated from the current registry.");
}

if (missing.length > 0) {
  console.error(missing.join("\n"));
  process.exit(1);
}

console.log("Docs are in sync with the endpoint registry.");
