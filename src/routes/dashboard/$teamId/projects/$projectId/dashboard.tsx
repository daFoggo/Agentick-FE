import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(
  "/dashboard/$teamId/projects/$projectId/dashboard"
)({
  component: ProjectDashboardView,
})

function ProjectDashboardView() {
  const { projectId } = Route.useParams()
  return <div>Project dashboard: {projectId}</div>
}
