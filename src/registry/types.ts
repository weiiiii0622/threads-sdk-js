export type HttpMethod = "GET" | "POST" | "DELETE";

export type CapabilityKind =
  | "graph_endpoint"
  | "dashboard_setup"
  | "webhook_payload"
  | "helper_type"
  | "unsupported_or_pending";

export type EndpointStatus =
  | "supported"
  | "beta"
  | "helper_only"
  | "dashboard_only"
  | "unsupported";

export type ParamLocation = "path" | "query" | "body";

export interface FieldDefinition {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  enum?: string[];
}

export interface EndpointDefinition {
  id: string;
  name: string;
  category: string;
  kind: CapabilityKind;
  status: EndpointStatus;
  method?: HttpMethod;
  path?: string;
  summary: string;
  docsUrl: string;
  permissions: string[];
  parameters: FieldDefinition[];
  responseFields: FieldDefinition[];
  notes?: string[];
}

export function isGraphEndpoint(
  endpoint: EndpointDefinition
): endpoint is EndpointDefinition & { kind: "graph_endpoint"; method: HttpMethod; path: string } {
  return endpoint.kind === "graph_endpoint";
}
