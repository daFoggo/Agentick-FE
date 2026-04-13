import { SAMPLE_TEAM_MEMBERS } from "../team-members/sample-data"
import type { TTeam } from "./schemas"

export const SAMPLE_TEAM: TTeam = {
  id: "team-1",
  name: "RIPT",
  description: "Research Institute of Post and Telecommunications",
  avatar_url: "",
  owner_id: "user-1",
  members: SAMPLE_TEAM_MEMBERS,
  projects: [],
  is_deleted: false,
  created_at: "2026-03-31T10:01:00.000Z",
}

export const SAMPLE_TEAMS: TTeam[] = [
  SAMPLE_TEAM,
  {
    ...SAMPLE_TEAM,
    id: "team-2",
    name: "Agentick Core",
    description: "Core AI development team",
  },
  {
    ...SAMPLE_TEAM,
    id: "team-3",
    name: "Frontend UI",
    description: "Design and frontend implementation",
  }
]
