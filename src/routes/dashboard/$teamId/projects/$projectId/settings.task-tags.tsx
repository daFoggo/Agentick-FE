import { TaskConfigListPanel, taskConfigQueries } from "@/features/task-config"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(
  "/dashboard/$teamId/projects/$projectId/settings/task-tags"
)({
  component: ProjectTaskTagsSettingsPage,
})

function ProjectTaskTagsSettingsPage() {
  const { projectId } = Route.useParams()
  const { data, isLoading } = useQuery(
    taskConfigQueries.tags(projectId, {
      page: 1,
      page_size: "all",
      ordering: "name",
    })
  )

  return (
    <TaskConfigListPanel
      title="Task Tag"
      description="Manage labels used to classify tasks in this project."
      isLoading={isLoading}
      items={(data?.founds ?? []).map((item) => ({
        id: item.id,
        name: item.name,
        color: item.color,
      }))}
      emptyMessage="This project does not have any task tags yet."
    />
  )
}
