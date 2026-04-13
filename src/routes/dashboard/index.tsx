import { userQueries } from "@/features/users"
import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/")({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(userQueries.me())

    const teamId = user?.default_team_id

    throw redirect({
      to: "/dashboard/$teamId/overview",
      params: {
        teamId: teamId || "personal", // Fallback if somehow missing
      },
      replace: true,
    })
  },
})
