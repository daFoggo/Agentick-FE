import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Link, useParams } from "@tanstack/react-router"
import { FolderClosed, FolderOpen } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { projectsQueryOptions } from "../queries"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * Hiển thị danh sách các Project của Team trên thanh Sidebar.
 * Tự động đồng bộ trạng thái Active và các hiệu ứng Icon khi người dùng điều hướng.
 */
export const SidebarProjectList = () => {
  const { teamId } = useParams({ strict: false }) as { teamId: string }

  const { data: projectsData, isLoading } = useQuery(
    projectsQueryOptions({ team_id__eq: teamId })
  )

  const projects = projectsData?.founds ?? []

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu className="gap-0.5">
        {isLoading &&
          Array.from({ length: 2 }).map((_, i) => (
            <SidebarMenuItem key={i}>
              <SidebarMenuButton disabled>
                <Skeleton className="size-4 shrink-0" />
                <Skeleton className="h-3.5 flex-1" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

        {!isLoading && projects.length === 0 && (
          <div className="px-2 py-1 text-xs text-muted-foreground">
            No projects found
          </div>
        )}

        {!isLoading &&
          projects.map((project) => (
            <SidebarMenuItem key={project.id}>
              <Link
                to="/dashboard/$teamId/projects/$projectId"
                params={{ teamId: teamId!, projectId: project.id }}
              >
                {({ isActive }) => {
                  const Icon = isActive ? FolderOpen : FolderClosed
                  return (
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={project.name}
                    >
                      <Icon
                        className={cn(
                          "size-4 transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground"
                        )}
                      />
                      <span
                        className={cn(
                          "truncate transition-colors",
                          isActive ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {project.name}
                      </span>
                    </SidebarMenuButton>
                  )
                }}
              </Link>
            </SidebarMenuItem>
          ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
