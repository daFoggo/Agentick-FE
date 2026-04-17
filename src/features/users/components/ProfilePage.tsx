import { useQuery, useQueries } from "@tanstack/react-query"
import { useNavigate, useParams } from "@tanstack/react-router"
import { useState } from "react"
import { format } from "date-fns"
import {
  CheckCircle2,
  Clock,
  Layout,
  Settings,
  Users,
  Briefcase,
  ChevronRight,
  Plus,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { userQueries } from "@/features/users"
import { myProjectsQueryOptions } from "@/features/projects/queries"
import { teamQueries } from "@/features/teams"
import { taskQueries } from "@/features/tasks"
import { CreateProjectDialog } from "@/features/projects/components/create-project-dialog"

// Utility to get initials from name
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function ProfilePage() {
  const navigate = useNavigate()
  const { teamId } = useParams({ strict: false })
  const [isCreateProjectDialogOpen, setIsCreateProjectDialogOpen] = useState(false)

  // 1. Fetch User Profile
  const { data: user, isLoading: userLoading } = useQuery(userQueries.me())
  const userId = user?.id

  // 2. Fetch Projects
  const { data: projects = [], isLoading: projectsLoading } = useQuery(
    myProjectsQueryOptions()
  )

  // 3. Fetch Teams
  const { data: teams = [], isLoading: teamsLoading } = useQuery(
    teamQueries.myTeams()
  )

  // 4. Fetch Tasks per project (assigned to me)
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
  const tasksLoading = tasksQueries.some((q) => q.isLoading)

  // Statistics
  const stats = [
    {
      label: "Active Projects",
      value: projects.length,
      icon: Layout,
      color: "text-blue-500",
    },
    {
      label: "My Tasks",
      value: allTasks.length,
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      label: "Teams",
      value: teams.length,
      icon: Users,
      color: "text-purple-500",
    },
  ]

  const handleProjectCreated = (project: any) => {
    navigate({
      to: "/dashboard/$teamId/projects/$projectId/dashboard",
      params: { teamId: teamId || "personal", projectId: project.id },
    })
  }

  if (userLoading) {
    return (
      <div className="container mx-auto max-w-6xl space-y-8 p-8">
        <div className="flex items-center gap-6">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header Section */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border-2 border-border ring-2 ring-primary/10">
              <AvatarImage src={user?.avatar_url ?? undefined} />
              <AvatarFallback className="text-2xl font-bold bg-primary/5 text-primary">
                {user?.name ? getInitials(user.name) : "?"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {user?.name}
              </h1>
              <p className="text-muted-foreground">{user?.email}</p>
              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="size-3" /> Joined{" "}
                  {user?.created_at
                    ? format(new Date(user.created_at), "MMM d, yyyy")
                    : "recently"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="size-4" /> Edit Profile
            </Button>
            <Button 
              size="sm" 
              className="gap-2 shadow-lg shadow-primary/20"
              onClick={() => setIsCreateProjectDialogOpen(true)}
            >
              <Plus className="size-4" /> Create Project
            </Button>
          </div>
        </div>

        <Separator />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="overflow-hidden border-none bg-muted/30 shadow-none transition-all hover:bg-muted/50">
              <CardContent className="flex items-center gap-4 p-6">
                <div className={`rounded-xl bg-background p-3 shadow-sm ${stat.color}`}>
                  <stat.icon className="size-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="mb-6 h-12 w-full justify-start bg-transparent p-0 border-b rounded-none gap-8">
            <TabsTrigger
              value="projects"
              className="rounded-none border-b-2 border-transparent px-2 pb-3 pt-2 text-sm font-medium transition-all data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              className="rounded-none border-b-2 border-transparent px-2 pb-3 pt-2 text-sm font-medium transition-all data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary"
            >
              My Tasks
            </TabsTrigger>
            <TabsTrigger
              value="teams"
              className="rounded-none border-b-2 border-transparent px-2 pb-3 pt-2 text-sm font-medium transition-all data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary"
            >
              Teams
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            {projectsLoading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-48 rounded-xl" />
                ))}
              </div>
            ) : projects.length === 0 ? (
              <Card className="flex flex-col items-center justify-center border-dashed p-12 text-center">
                <Briefcase className="mb-4 size-12 text-muted-foreground/50" />
                <CardTitle className="mb-2 text-xl">No projects found</CardTitle>
                <p className="mb-6 text-muted-foreground">
                  You haven't joined any projects yet.
                </p>
                <Button variant="outline" onClick={() => setIsCreateProjectDialogOpen(true)}>Create your first project</Button>
              </Card>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {projects.slice(0, 6).map((project) => (
                    <Card
                      key={project.id}
                      className="group relative overflow-hidden cursor-pointer border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
                      onClick={() =>
                        navigate({
                          to: "/dashboard/$teamId/projects/$projectId/list",
                          params: {
                            teamId: teamId || teams[0]?.id || "personal",
                            projectId: project.id,
                          },
                        })
                      }
                    >
                      <div className="absolute -right-4 -top-4 size-24 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10" />
                      
                      <CardHeader className="pb-3 relative">
                        <div className="rounded-xl bg-primary/5 p-2.5 text-primary w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                          <Layout className="size-5" />
                        </div>
                        <CardTitle className="pt-4 text-xl font-bold tracking-tight">{project.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="relative">
                        <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed min-h-10">
                          {project.description || "Building something amazing with Agentick."}
                        </p>
                        
                        <div className="mt-8 flex items-center justify-between border-t border-border/40 pt-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
                          <div className="flex items-center gap-1.5">
                            <Clock className="size-3" />
                            <span>Updated {project.updated_at ? format(new Date(project.updated_at), 'MMM d') : 'recently'}</span>
                          </div>
                          <div className="flex items-center gap-1 text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                            <span>Open</span>
                            <ChevronRight className="size-3.5" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {projects.length > 6 && (
                  <div className="flex justify-center pt-4">
                    <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-primary transition-colors">
                      View all {projects.length} projects <ChevronRight className="size-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            {tasksLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 rounded-lg" />
                ))}
              </div>
            ) : allTasks.length === 0 ? (
              <Card className="flex flex-col items-center justify-center border-dashed p-12 text-center">
                <CheckCircle2 className="mb-4 size-12 text-muted-foreground/50" />
                <CardTitle className="mb-2 text-xl">Peace of mind!</CardTitle>
                <p className="text-muted-foreground">
                  You don't have any tasks assigned to you right now.
                </p>
              </Card>
            ) : (
              <div className="rounded-xl border bg-card">
                {allTasks.map((task, index) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-4 transition-colors hover:bg-muted/30 ${
                      index !== allTasks.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-green-500/10 p-1.5 text-green-600">
                        <CheckCircle2 className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {task.title}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {task.description || "No description"}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="font-normal capitalize">
                      {task.status_id}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="teams" className="space-y-6">
            {teamsLoading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-24 rounded-xl" />
                ))}
              </div>
            ) : teams.length === 0 ? (
              <Card className="flex flex-col items-center justify-center border-dashed p-12 text-center">
                <Users className="mb-4 size-12 text-muted-foreground/50" />
                <CardTitle className="mb-2 text-xl">Join a Team</CardTitle>
                <p className="text-muted-foreground">
                  Collaboration is better! Join or create a team to get started.
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {teams.map((team) => (
                  <Card key={team.id} className="overflow-hidden border-border/50 transition-all hover:border-primary/30">
                    <CardContent className="flex items-center gap-4 p-6">
                      <Avatar className="h-12 w-12 rounded-lg">
                        <AvatarImage src={team.avatar_url ?? undefined} />
                        <AvatarFallback className="rounded-lg bg-violet-100 text-violet-600">
                          {getInitials(team.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{team.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {team.description || "Team collaboration space"}
                        </p>
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <CreateProjectDialog
          open={isCreateProjectDialogOpen}
          teamId={teamId || teams[0]?.id}
          onOpenChange={setIsCreateProjectDialogOpen}
          onCreated={handleProjectCreated}
        />
      </div>
    </div>
  )
}
