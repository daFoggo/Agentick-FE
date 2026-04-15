import { TaskConfigListPanel, taskConfigQueries } from "@/features/task-config"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(
  "/dashboard/$teamId/projects/$projectId/settings/task-statuses"
)({
  component: ProjectTaskStatusesSettingsPage,
})

function ProjectTaskStatusesSettingsPage() {
  const { projectId } = Route.useParams()
  const { data, isLoading } = useQuery(
    taskConfigQueries.statuses(projectId, {
      page: 1,
      page_size: "all",
      ordering: "order",
    })
  )

  return (
    <TaskConfigListPanel
      title="Task Status"
      description="Manage statuses used in your project workflow."
      isLoading={isLoading}
      items={(data?.founds ?? []).map((item) => ({
        id: item.id,
        name: item.name,
        color: item.color,
        isDefault: item.is_default,
        meta: item.is_completed ? "Completed" : "In Progress",
      }))}
      emptyMessage="This project does not have any task statuses yet."
    />
  )
}
