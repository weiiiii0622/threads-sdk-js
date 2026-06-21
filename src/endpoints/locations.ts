import type { ThreadsClient } from "../client/client.js";
import type { Fields } from "./shared.js";

export interface LocationParams {
  fields?: Fields;
}

export interface ThreadsLocation {
  id: string;
  name?: string;
  address?: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  postal_code?: string;
  [key: string]: unknown;
}

export class LocationsEndpoint {
  constructor(private readonly client: ThreadsClient) {}

  get(locationId: string, params: LocationParams = {}): Promise<ThreadsLocation> {
    return this.client.request({
      method: "GET",
      path: "/{location_id}",
      pathParams: { location_id: locationId },
      query: params
    });
  }
}
