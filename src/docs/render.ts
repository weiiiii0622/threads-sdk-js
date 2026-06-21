import { endpointRegistry, isGraphEndpoint } from "../registry/index.js";
import type { EndpointDefinition, FieldDefinition } from "../registry/index.js";

const GENERATED_START = "<!-- endpoint-status:start -->";
const GENERATED_END = "<!-- endpoint-status:end -->";

function fieldList(fields: readonly FieldDefinition[]): string {
  if (fields.length === 0) {
    return "- None documented.";
  }

  return fields
    .map((field) => {
      const required = field.required ? " Required." : "";
      const values = field.enum?.length
        ? ` Values: ${field.enum.map((item) => `\`${item}\``).join(", ")}.`
        : "";
      return `- \`${field.name}\` (${field.type}): ${field.description}${required}${values}`;
    })
    .join("\n");
}

function endpointTitle(endpoint: EndpointDefinition): string {
  if (endpoint.method && endpoint.path) {
    return `### ${endpoint.method} \`${endpoint.path}\` - ${endpoint.name}`;
  }
  return `### ${endpoint.name}`;
}

function renderEndpoint(endpoint: EndpointDefinition): string {
  const permissions = endpoint.permissions.length
    ? endpoint.permissions.map((permission) => `\`${permission}\``).join(", ")
    : "Not documented";
  const notes = endpoint.notes?.length
    ? `\n\nNotes:\n${endpoint.notes.map((note) => `- ${note}`).join("\n")}`
    : "";

  return `${endpointTitle(endpoint)}

${endpoint.summary}

- ID: \`${endpoint.id}\`
- Category: ${endpoint.category}
- Capability kind: \`${endpoint.kind}\`
- Status: \`${endpoint.status}\`
- Source: ${endpoint.docsUrl}
- Permissions: ${permissions}

Parameters:
${fieldList(endpoint.parameters)}

Response fields:
${fieldList(endpoint.responseFields)}${notes}`;
}

export function renderEndpointStatusTable(): string {
  const rows = endpointRegistry
    .map((endpoint) => {
      const method = endpoint.method ?? "-";
      const path = endpoint.path ? `\`${endpoint.path}\`` : "-";
      const helper = helperName(endpoint);
      return `| \`${endpoint.id}\` | ${endpoint.category} | ${method} | ${path} | \`${endpoint.kind}\` | \`${endpoint.status}\` | ${helper} |`;
    })
    .join("\n");

  return `| ID | Category | Method | Path | Kind | Status | SDK helper |
|---|---|---:|---|---|---|---|
${rows}`;
}

export function helperName(endpoint: EndpointDefinition): string {
  if (!isGraphEndpoint(endpoint)) {
    if (endpoint.kind === "webhook_payload") {
      return "`verifyWebhookChallenge()` and exported webhook types";
    }
    return "Documented capability; no Graph helper";
  }

  const map: Record<string, string> = {
    "posts.createContainer": "`client.posts.createContainer()`",
    "posts.publishContainer": "`client.posts.publishContainer()`",
    "posts.getMedia": "`client.posts.get()`",
    "posts.listUserThreads": "`client.posts.listUserThreads()`",
    "posts.deleteMedia": "`client.posts.delete()`",
    "posts.getReplies": "`client.posts.getReplies()`",
    "posts.getConversation": "`client.posts.getConversation()`",
    "posts.getMentions": "`client.posts.getMentions()`",
    "replies.manageReply": "`client.replies.manage()`",
    "replies.getPendingReplies": "`client.replies.getPending()`",
    "replies.managePendingReply": "`client.replies.managePending()`",
    "profiles.getMe": "`client.profiles.getMe()`",
    "profiles.getUser": "`client.profiles.get()`",
    "insights.getMediaInsights": "`client.insights.getMedia()`",
    "insights.getUserInsights": "`client.insights.getUser()`",
    "search.keywordSearch": "`client.search.keyword()`",
    "location.search": "`client.search.location()`",
    "tokens.exchangeLongLived": "`client.utilities.exchangeLongLivedToken()`",
    "tokens.refreshLongLived": "`client.utilities.refreshLongLivedToken()`",
    "debug.debugToken": "`client.utilities.debugToken()`",
    "embed.oEmbed": "`client.utilities.oEmbed()`"
  };
  return map[endpoint.id] ?? "`client.request()`";
}

export function renderApiMarkdown(): string {
  const generatedAt = new Date().toISOString().slice(0, 10);
  const categories = [...new Set(endpointRegistry.map((endpoint) => endpoint.category))];
  const body = categories
    .map((category) => {
      const endpoints = endpointRegistry.filter((endpoint) => endpoint.category === category);
      return `## ${category}\n\n${endpoints.map(renderEndpoint).join("\n\n")}`;
    })
    .join("\n\n");

  return `# Meta Threads API Reference

Generated from the \`threads-sdk-js\` endpoint registry on ${generatedAt}.

Official sources:

- https://developers.facebook.com/docs/threads/
- https://developers.facebook.com/social-technologies/threads-api/
- https://developers.facebook.com/documentation/threads/create-posts
- https://developers.facebook.com/documentation/threads/retrieve-and-discover-posts
- https://developers.facebook.com/documentation/threads/retrieve-and-manage-replies
- https://developers.facebook.com/docs/threads/insights/

The registry separates callable Graph endpoints from dashboard-only setup, webhook payload types, and helper-only capabilities. Use \`client.request()\` when Meta adds a field before this SDK exposes a typed helper.

${GENERATED_START}
${renderEndpointStatusTable()}
${GENERATED_END}

${body}
`;
}

export function replaceReadmeStatusTable(readme: string): string {
  const replacement = `${GENERATED_START}\n${renderEndpointStatusTable()}\n${GENERATED_END}`;
  const pattern = new RegExp(`${GENERATED_START}[\\s\\S]*?${GENERATED_END}`);
  if (!pattern.test(readme)) {
    throw new Error("README.md is missing endpoint status markers.");
  }
  return readme.replace(pattern, replacement);
}

export const docsMarkers = {
  GENERATED_START,
  GENERATED_END
};
