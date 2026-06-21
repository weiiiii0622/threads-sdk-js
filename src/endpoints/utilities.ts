import type { ThreadsClient } from "../client/client.js";

export interface LongLivedTokenResponse {
  access_token: string;
  token_type?: string;
  expires_in?: number;
}

export interface DebugTokenResponse {
  data: Record<string, unknown>;
}

export interface OEmbedParams {
  url: string;
  maxwidth?: number;
  omitscript?: boolean;
  hidecaption?: boolean;
}

export interface OEmbedResponse {
  html: string;
  author_name?: string;
  author_url?: string;
  provider_name?: string;
  provider_url?: string;
  type?: string;
  version?: string;
  [key: string]: unknown;
}

export class UtilitiesEndpoint {
  constructor(private readonly client: ThreadsClient) {}

  exchangeLongLivedToken(params: {
    client_secret: string;
    access_token: string;
  }): Promise<LongLivedTokenResponse> {
    return this.client.request({
      method: "GET",
      path: "/access_token",
      query: {
        grant_type: "th_exchange_token",
        client_secret: params.client_secret,
        access_token: params.access_token
      },
      accessToken: null
    });
  }

  refreshLongLivedToken(accessToken: string): Promise<LongLivedTokenResponse> {
    return this.client.request({
      method: "GET",
      path: "/refresh_access_token",
      query: {
        grant_type: "th_refresh_token",
        access_token: accessToken
      },
      accessToken: null
    });
  }

  debugToken(params: { input_token: string; access_token: string }): Promise<DebugTokenResponse> {
    return this.client.request({
      method: "GET",
      path: "/debug_token",
      query: params,
      accessToken: null
    });
  }

  oEmbed(params: OEmbedParams): Promise<OEmbedResponse> {
    return this.client.request({
      method: "GET",
      path: "/oembed_threads",
      query: params
    });
  }
}
