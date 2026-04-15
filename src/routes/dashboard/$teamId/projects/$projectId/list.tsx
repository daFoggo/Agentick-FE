import { TaskTable, taskQueries } from "@/features/tasks"
import { taskConfigQueries } from "@/features/task-config"
import { projectQueryOptions } from "@/features/projects/queries"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import type { TTask } from "@/features/tasks"
import type { TProjectMember } from "@/features/project-members"

function mapTaskData(
  task: {
    id: string
    project_id: string
    title: string
    description?: string | null
    status_id: string
    type_id: string
    priority_id: string
    assignee_id?: string | null
    phase_id?: string | null
    start_date?: string | Date | null
    due_date?: string | Date | null
    created_at?: string | Date
    updated_at?: string | Date
    order?: number
    is_archived?: boolean
    is_deleted?: boolean
  },
  members: TProjectMember[],
  options: {
    statuses: Array<{ id: string; name: string }>
    types: Array<{ id: string; name: string }>
    priorities: Array<{ id: string; name: string }>
  }
): TTask {
  const member = task.assignee_id
    ? members.find((item) => item.id === task.assignee_id) ?? null
    : null

  const display = (id: string, catalog: Array<{ id: string; name: string }>) =>
    catalog.find((item) => item.id === id)?.name ?? id

  return {
    id: task.id,
    project_id: task.project_id,
    title: task.title,
    description: task.description ?? undefined,
    type: display(task.type_id, options.types),
    status: display(task.status_id, options.statuses),
    priority: display(task.priority_id, options.priorities),
    phase_id: task.phase_id ?? undefined,
    assignee_id: task.assignee_id ?? undefined,
    assignee: member ?? undefined,
    start_date: task.start_date ? new Date(task.start_date) : undefined,
    due_date: task.due_date ? new Date(task.due_date) : undefined,
    created_at: new Date(task.created_at ?? Date.now()),
    updated_at: new Date(task.updated_at ?? Date.now()),
    estimated_hours: undefined,
    actual_hours: undefined,
  }
}

export const Route = createFileRoute("/dashboard/$teamId/projects/$projectId/list")({
  component: ProjectListView,
})

function ProjectListView() {
  const { projectId } = Route.useParams()

  const { data: project } = useQuery(projectQueryOptions(projectId))
  const { data: tasksResponse } = useQuery(
    taskQueries.list(projectId, {
      ordering: "-id",
      page: 1,
      page_size: "all",
      is_deleted__eq: false,
    })
  )
  const { data: statusesResponse } = useQuery(
    taskConfigQueries.statuses(projectId, {
      page: 1,
      page_size: "all",
      ordering: "order",
    })
  )
  const { data: typesResponse } = useQuery(
    taskConfigQueries.types(projectId, {
      page: 1,
      page_size: "all",
      ordering: "order",
    })
  )
  const { data: prioritiesResponse } = useQuery(
    taskConfigQueries.priorities(projectId, {
      page: 1,
      page_size: "all",
      ordering: "order",
    })
  )

  const taskOptions = {
    statuses: statusesResponse?.founds ?? [],
    types: typesResponse?.founds ?? [],
    priorities: prioritiesResponse?.founds ?? [],
  }

  const tasks = (tasksResponse?.founds ?? []).map((task) =>
    mapTaskData(task, project?.members ?? [], taskOptions)
  )

  return <TaskTable data={tasks} groupBy="status" />
}
