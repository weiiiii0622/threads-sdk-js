import { readFile, writeFile } from "node:fs/promises";
import { renderApiMarkdown, replaceReadmeStatusTable } from "../src/docs/render.js";

await writeFile("API.md", renderApiMarkdown());

const readme = await readFile("README.md", "utf8");
await writeFile("README.md", replaceReadmeStatusTable(readme));

console.log("Generated API.md and README endpoint status table.");
