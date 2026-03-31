import type { IUser } from "../users"

export interface IProjectMember {
  id: string
  user: IUser
  userId: string
  projectId: string
  role: string // "manager" | "member" | "viewer"
  joinedAt?: Date
}
