import { teamQueries } from "@/features/teams"
import { userQueries } from "@/features/users"
import { useDashboardStore } from "@/stores/use-dashboard-store"
import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/")({
  beforeLoad: async ({ context }) => {
    // Ensure user is loaded
    await context.queryClient.ensureQueryData(userQueries.me())

    // Fetch teams the user belongs to
    const teams = await context.queryClient.ensureQueryData(
      teamQueries.myTeams()
    )

    // Lấy team cuối cùng từ store (persistent)
    const lastTeamId = useDashboardStore.getState().last_team_id

    // Kiểm tra xem team cuối cùng có còn hợp lệ trong danh sách không
    const hasLastTeam = teams?.some((t) => t.id === lastTeamId)

    // Ưu tiên team cuối cùng, sau đó đến team đầu tiên, cuối cùng là personal
    const defaultTeamId = hasLastTeam
      ? lastTeamId
      : teams && teams.length > 0
        ? teams[0].id
        : "personal"

    throw redirect({
      to: "/dashboard/$teamId/overview",
      params: {
        teamId: defaultTeamId as string,
      },
      replace: true,
    })
  },
})
