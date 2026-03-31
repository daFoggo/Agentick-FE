import type { IUser } from "../users"

export interface ITeamMember {
  id: string
  user: IUser
  userId: string
  teamId: string
  role: string // "owner" | "manager" | "member" | "viewer"
  joinedAt?: Date
}
