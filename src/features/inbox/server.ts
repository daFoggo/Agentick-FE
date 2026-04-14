import "@tanstack/react-start/server-only"

import type { GetInboxStatsInput, TInboxStats } from "./schemas"

/**
 * Gọi API trả về thông số thống kê của Inbox (active, bookmarks, archive).
 */
export async function fetchInboxStats(
  _params: GetInboxStatsInput
): Promise<TInboxStats> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  return {
    activeCount: 12,
    bookmarksCount: 5,
    archiveCount: 3,
  }
}
