import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  InviteProjectMemberDialog,
  type TProjectMember,
} from "@/features/project-members"
import type { TProject } from "@/features/projects"
import { useNavigate } from "@tanstack/react-router"
import { FolderOpen, Settings, Share2 } from "lucide-react"
import { useState } from "react"

export interface IProjectDetailsHeaderProps {
  teamId: string
  project: TProject | null
}

export function ProjectDetailsHeader({
  teamId,
  project,
}: IProjectDetailsHeaderProps) {
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const navigate = useNavigate()

  if (!project) {
    return (
      <div className="flex w-full items-center justify-between gap-4 py-2 text-destructive font-medium">
        Error loading project details
      </div>
    )
  }

  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="rounded-md border bg-muted p-2">
          <FolderOpen className="size-4" />
        </div>

        <div className="flex items-center gap-2">
          <p className="text-xl font-semibold text-foreground">
            {project.name ?? "Unknown project"}
          </p>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={() =>
                  navigate({
                    to: "/dashboard/$teamId/projects/$projectId/settings",
                    params: { teamId, projectId: project.id },
                  })
                }
              >
                <Settings className="size-4 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Settings</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {project.members && project.members.length > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <AvatarGroup
                className="cursor-pointer transition-all hover:opacity-80 active:scale-95"
                onClick={() =>
                  navigate({
                    to: "/dashboard/$teamId/projects/$projectId/members",
                    params: { teamId, projectId: project.id },
                  })
                }
              >
                {project.members.slice(0, 4).map((member: TProjectMember) => (
                  <Avatar
                    key={member.id}
                    className="border-2 border-background"
                  >
                    <AvatarImage src={member.user?.avatar_url ?? undefined} />
                    <AvatarFallback className="bg-primary/10 text-[10px] font-medium text-primary">
                      {member.user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {project.members.length > 4 && (
                  <AvatarGroupCount className="border-2 border-background bg-muted text-[10px]">
                    +{project.members.length - 4}
                  </AvatarGroupCount>
                )}
              </AvatarGroup>
            </TooltipTrigger>
            <TooltipContent>View all members</TooltipContent>
          </Tooltip>
        )}

        <Button onClick={() => setIsInviteOpen(true)} className="gap-2">
          Share
          <Share2 className="size-4" />
        </Button>
      </div>

      <InviteProjectMemberDialog
        open={isInviteOpen}
        onOpenChange={setIsInviteOpen}
        projectId={project.id}
      />
    </div>
  )
}
