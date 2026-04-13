import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { TTeamMember } from "@/features/team-members"
import { SAMPLE_TEAM } from "@/features/teams/sample-data"
import { UserPlus, Users } from "lucide-react"

export interface TeamDetailsHeaderProps {
  teamId: string
}

export function TeamDetailsHeader({ teamId: _teamId }: TeamDetailsHeaderProps) {
  const team = SAMPLE_TEAM

  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="rounded-md border bg-muted p-2">
          <Users className="size-4" />
        </div>

        <p className="text-xl font-semibold text-foreground">
          {team?.name ?? "Unknown team"}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <AvatarGroup>
          {team?.members?.slice(0, 2).map((member: TTeamMember) => (
            <Avatar key={member.id}>
              <AvatarImage src={member?.user?.avatar_url} />
              <AvatarFallback>{member.user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          ))}
          {team?.members && team.members.length > 2 && (
            <AvatarGroupCount>+{team.members.length - 2}</AvatarGroupCount>
          )}
        </AvatarGroup>

        <Button>
          Invite
          <UserPlus />
        </Button>
      </div>
    </div>
  )
}
