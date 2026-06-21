import type { ThreadsClient } from "../client/client.js";

export interface LongLivedTokenResponse {
  access_token: string;
  token_type?: string;
  expires_in?: number;
}

export interface ShortLivedTokenResponse {
  access_token: string;
  user_id?: string;
}

export interface AppAccessTokenResponse {
  access_token: string;
  token_type?: string;
}

export interface DebugTokenResponse {
  data: Record<string, unknown>;
}

export interface OEmbedParams {
  url: string;
  maxwidth?: number;
}

export interface OEmbedResponse {
  html: string;
  provider_name?: string;
  provider_url?: string;
  type?: string;
  version?: string;
  width?: number;
  [key: string]: unknown;
}

export class UtilitiesEndpoint {
  constructor(private readonly client: ThreadsClient) {}

  exchangeAuthorizationCode(params: {
    client_id: string;
    client_secret: string;
    code: string;
    redirect_uri: string;
  }): Promise<ShortLivedTokenResponse> {
    return this.client.request({
      method: "POST",
      path: "/oauth/access_token",
      apiVersion: null,
      query: {
        client_id: params.client_id,
        client_secret: params.client_secret,
        code: params.code,
        grant_type: "authorization_code",
        redirect_uri: params.redirect_uri
      },
      accessToken: null
    });
  }

  exchangeLongLivedToken(params: {
    client_secret: string;
    access_token: string;
  }): Promise<LongLivedTokenResponse> {
    return this.client.request({
      method: "GET",
      path: "/access_token",
      apiVersion: null,
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
      apiVersion: null,
      query: {
        grant_type: "th_refresh_token",
        access_token: accessToken
      },
      accessToken: null
    });
  }

  getAppAccessToken(params: {
    client_id: string;
    client_secret: string;
  }): Promise<AppAccessTokenResponse> {
    return this.client.request({
      method: "GET",
      path: "/oauth/access_token",
      apiVersion: null,
      query: {
        grant_type: "client_credentials",
        client_id: params.client_id,
        client_secret: params.client_secret
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
      path: "/oembed",
      query: params
    });
  }
}
