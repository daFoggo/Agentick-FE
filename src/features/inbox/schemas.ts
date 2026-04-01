import { z } from "zod"

export const GetInboxStatsSchema = z.object({})

export type GetInboxStatsInput = z.infer<typeof GetInboxStatsSchema>

export interface IInboxStats {
  activeCount: number
  bookmarksCount: number
  archiveCount: number
}
