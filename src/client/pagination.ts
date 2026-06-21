import type { NormalizedPage, Page } from "./types.js";

export function normalizePage<T>(page: Page<T>): NormalizedPage<T> {
  return {
    data: Array.isArray(page.data) ? page.data : [],
    paging: page.paging,
    nextCursor: page.paging?.cursors?.after,
    previousCursor: page.paging?.cursors?.before
  };
}
