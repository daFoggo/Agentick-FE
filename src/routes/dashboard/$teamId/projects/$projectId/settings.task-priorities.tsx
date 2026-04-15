import { TaskConfigListPanel, taskConfigQueries } from "@/features/task-config"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(
  "/dashboard/$teamId/projects/$projectId/settings/task-priorities"
)({
  component: ProjectTaskPrioritiesSettingsPage,
})

function ProjectTaskPrioritiesSettingsPage() {
  const { projectId } = Route.useParams()
  const { data, isLoading } = useQuery(
    taskConfigQueries.priorities(projectId, {
      page: 1,
      page_size: "all",
      ordering: "order",
    })
  )

  return (
    <TaskConfigListPanel
      title="Task Priority"
      description="Manage priority levels used for planning and triage."
      isLoading={isLoading}
      items={(data?.founds ?? []).map((item) => ({
        id: item.id,
        name: item.name,
        color: item.color,
        isDefault: item.is_default,
        meta: `Level ${item.level}`,
      }))}
      emptyMessage="This project does not have any task priorities yet."
    />
  )
}
