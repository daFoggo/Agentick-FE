import { useQuery } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import { userQueries } from "@/features/users"
import { mySchedulesQueryOptions, useScheduleMutations } from "./queries"

export const useSchedulesData = () => {
  const { teamId } = useParams({ from: "/dashboard/$teamId/schedules/" })
  const { data: user } = useQuery(userQueries.me())
  const { data: schedules, isLoading } = useQuery(mySchedulesQueryOptions())
  const { upsert } = useScheduleMutations()

  const userId = user?.id

  const days = Array.from({ length: 7 }).map((_, index) => {
    const existing = schedules?.find((s) => s.day_of_week === index)
    return {
      day_of_week: index,
      start_time: existing?.start_time ?? "09:00",
      end_time: existing?.end_time ?? "18:00",
      is_off: existing?.is_off ?? true,
      team_id: teamId,
      user_id: userId,
    }
  })

  return {
    isLoading,
    schedules: days,
    userId,
    teamId,
    upsert,
  }
}
