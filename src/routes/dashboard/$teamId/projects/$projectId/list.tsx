import { SAMPLE_TASKS, TaskTable } from "@/features/tasks"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/$teamId/projects/$projectId/list")({
  component: ProjectListView,
})

function ProjectListView() {
  return <TaskTable data={SAMPLE_TASKS} groupBy="status" />
}
