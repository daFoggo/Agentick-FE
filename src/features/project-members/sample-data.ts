import { SAMPLE_USER_1, SAMPLE_USER_2 } from "../users/sample-data"
import type { IProjectMember } from "./types"

export const SAMPLE_PROJECT_MEMBERS: IProjectMember[] = [
  {
    id: "project-member-1",
    projectId: "project-1",
    userId: SAMPLE_USER_1.id,
    user: SAMPLE_USER_1,
    role: "member",
  },
  {
    id: "project-member-2",
    projectId: "project-1",
    userId: SAMPLE_USER_2.id,
    user: SAMPLE_USER_2,
    role: "member",
  },
]
