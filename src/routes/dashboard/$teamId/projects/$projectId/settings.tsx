import { ProjectSettings } from "@/features/projects"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(
  "/dashboard/$teamId/projects/$projectId/settings"
)({
  component: ProjectSettingsPage,
})

function ProjectSettingsPage() {
  const { teamId, projectId } = Route.useParams()

  return <ProjectSettings teamId={teamId} projectId={projectId} />
}
