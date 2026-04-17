import { createFileRoute } from "@tanstack/react-router"
import { ProfilePage, userQueries } from "@/features/users"
import { myProjectsQueryOptions } from "@/features/projects/queries"
import { teamQueries } from "@/features/teams"

export const Route = createFileRoute("/dashboard/$teamId/profile/")({
  loader: async ({ context }) => {
    // Đảm bảo server có đủ dữ liệu trước khi render HTML
    await Promise.all([
      context.queryClient.ensureQueryData(userQueries.me()),
      context.queryClient.ensureQueryData(myProjectsQueryOptions()),
      context.queryClient.ensureQueryData(teamQueries.myTeams()),
    ])
  },
  component: ProfilePage,
  staticData: {
    getTitle: () => "My Profile",
  },    
})
