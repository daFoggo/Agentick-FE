import { TaskStatusList } from "@/features/task-config"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(
  "/dashboard/$teamId/projects/$projectId/settings/task-statuses"
)({
  component: ProjectTaskStatusesSettingsPage,
})

function ProjectTaskStatusesSettingsPage() {
  const { projectId } = Route.useParams()

  return (
      <TaskStatusList projectId={projectId} />
  )
}
