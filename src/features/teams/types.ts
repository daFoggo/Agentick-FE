import type { IProject } from "../projects"
import type { ITeamMember } from "../team-members"

export interface ITeam {
  id: string
  name: string
  avatarUrl?: string
  members?: ITeamMember[]
  projects?: IProject[]
  createdAt?: string
}
