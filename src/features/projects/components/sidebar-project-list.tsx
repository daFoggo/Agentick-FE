import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Link } from "@tanstack/react-router"
import { FolderClosed, FolderOpen } from "lucide-react"
import { SAMPLE_PROJECTS } from "../sample-data"

export const SidebarProjectList = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu className="gap-0.5">
        {SAMPLE_PROJECTS.map((project) => (
          <SidebarMenuItem key={project.id}>
            <Link
              to="/dashboard/projects/$projectId"
              params={{ projectId: project.id }}
            >
              {({ isActive }) => {
                const Icon = isActive ? FolderOpen : FolderClosed
                return (
                  <SidebarMenuButton isActive={isActive} tooltip={project.name}>
                    <Icon
                      className={cn(
                        "size- transition-colors",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                    <span
                      className={cn(
                        "transition-colors",
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
