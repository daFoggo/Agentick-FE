import { queryOptions } from "@tanstack/react-query"
import { getInboxStatsFn } from "./functions"
import type { GetInboxStatsInput, TInboxStats } from "./schemas"

export const inboxKeys = {
  all: ["inbox"] as const,
  stats: () => [...inboxKeys.all, "stats"] as const,
}

export const inboxStatsQueryOptions = (params: GetInboxStatsInput = {}) =>
  queryOptions({
    queryKey: inboxKeys.stats(),
    queryFn: () => getInboxStatsFn({ data: params }) as Promise<TInboxStats>,
    staleTime: 1000 * 60 * 2,
  })
