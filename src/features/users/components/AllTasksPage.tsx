import { useQueries, useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "@tanstack/react-router"
import { CheckCircle2, ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

import { myProjectsQueryOptions } from "@/features/projects/queries"
import { taskQueries } from "@/features/tasks"
import { userQueries } from "@/features/users"

export function AllTasksPage() {
  const navigate = useNavigate()
  const { teamId } = useParams({ strict: false })

  // 1. Get User
  const { data: user } = useQuery(userQueries.me())
  const userId = user?.id

  // 2. Get Projects
  const { data: projects = [], isLoading: projectsLoading } = useQuery(
    myProjectsQueryOptions()
  )

  // 3. Fetch Tasks per project
  const tasksQueries = useQueries({
    queries: projects.map((p) =>
      taskQueries.list(p.id, {
        assignee_id__eq: userId,
        is_deleted__eq: false,
        page: 1,
        page_size: "all",
      })
    ),
  })

  const allTasks = tasksQueries.flatMap((q) => q.data?.founds ?? [])
  const isLoading = projectsLoading || tasksQueries.some((q) => q.isLoading)

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl space-y-6 p-8">
        <Skeleton className="h-10 w-48" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate({ to: `/dashboard/${teamId}/profile` })}
            >
              <ChevronLeft className="size-5" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              All My Tasks
            </h1>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            {allTasks.length} Tasks
          </Badge>
        </div>

        {allTasks.length === 0 ? (
          <Card className="flex flex-col items-center justify-center border-dashed p-12 text-center">
            <CheckCircle2 className="mb-4 size-12 text-muted-foreground/50" />
            <CardTitle className="mb-2 text-xl">All caught up!</CardTitle>
            <p className="text-muted-foreground">
              No tasks have been assigned to you across your projects.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {allTasks.map((task) => {
              const project = projects.find((p) => p.id === task.project_id)
              return (
                <Card
                  key={task.id}
                  className="overflow-hidden border-border/50 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {project?.name || "Unknown Project"}
                        </p>
                      </div>
                      <Badge variant="secondary" className="capitalize">
                        {task.status_id}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {task.description || "No description provided."}
                    </p>
                    {task.due_date && (
                      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium">Due Date:</span>
                        {new Date(task.due_date).toLocaleDateString()}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
