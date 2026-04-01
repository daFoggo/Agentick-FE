import { createServerFn } from "@tanstack/react-start"
import { GetInboxStatsSchema } from "./schemas"
import { fetchInboxStats } from "./server"

export const getInboxStatsFn = createServerFn({ method: "GET" })
  .inputValidator(GetInboxStatsSchema)
  .handler(({ data }) => fetchInboxStats(data))
