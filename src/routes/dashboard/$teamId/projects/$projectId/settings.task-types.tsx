import { TaskConfigListPanel, taskConfigQueries } from "@/features/task-config"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(
  "/dashboard/$teamId/projects/$projectId/settings/task-types"
)({
  component: ProjectTaskTypesSettingsPage,
})

function ProjectTaskTypesSettingsPage() {
  const { projectId } = Route.useParams()
  const { data, isLoading } = useQuery(
    taskConfigQueries.types(projectId, {
      page: 1,
      page_size: "all",
      ordering: "order",
    })
  )

  return (
    <TaskConfigListPanel
      title="Task Type"
      description="Manage task type definitions for this project."
      isLoading={isLoading}
      items={(data?.founds ?? []).map((item) => ({
        id: item.id,
        name: item.name,
        color: item.color,
        isDefault: item.is_default,
      }))}
      emptyMessage="This project does not have any task types yet."
    />
  )
}
