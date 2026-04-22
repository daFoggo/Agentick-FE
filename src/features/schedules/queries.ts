import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import { getMySchedulesFn, upsertMyScheduleFn } from "./functions"
import type { TUpsertScheduleInput } from "./schemas"

export const scheduleKeys = {
  all: ["schedules"] as const,
  mine: () => [...scheduleKeys.all, "me"] as const,
}

export const mySchedulesQueryOptions = () =>
  queryOptions({
    queryKey: scheduleKeys.mine(),
    queryFn: () => getMySchedulesFn(),
  })

export const useScheduleMutations = () => {
  const queryClient = useQueryClient()

  const upsert = useMutation({
    mutationFn: (payload: TUpsertScheduleInput) => upsertMyScheduleFn({ data: payload }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: scheduleKeys.mine() })
    },
  })

  return { upsert }
}
