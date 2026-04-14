import { z } from "zod"
import { UserSchema } from "../users"

export const ProjectRoleSchema = z.enum([
  "owner",
  "manager",
  "member",
  "viewer",
])

export const ProjectMemberSchema = z.object({
  id: z.string(),
  project_id: z.string(),
  user_id: z.string(),
  role: ProjectRoleSchema,
  joined_at: z.string().datetime(),
  user: UserSchema.optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional().nullable(),
})

export const AddProjectMemberSchema = z.object({
  user_id: z.string(),
  role: ProjectRoleSchema.default("member"),
})

export const UpdateProjectMemberRoleSchema = z.object({
  role: ProjectRoleSchema,
})

export const AddProjectMemberInputSchema = z.object({
  projectId: z.string(),
  payload: AddProjectMemberSchema,
})

export const UpdateProjectMemberRoleInputSchema = z.object({
  projectId: z.string(),
  user_id: z.string(),
  payload: UpdateProjectMemberRoleSchema,
})

export const RemoveProjectMemberSchema = z.object({
  projectId: z.string(),
  user_id: z.string(),
})

export interface TProjectMemberSearchOptions {
  page: number
  page_size: number
  ordering: string
  total_count: number
}

export interface TProjectMembersResponse {
  founds: TProjectMember[]
  search_options: TProjectMemberSearchOptions
}

export type TProjectRole = z.infer<typeof ProjectRoleSchema>
export type TProjectMember = z.infer<typeof ProjectMemberSchema>
export type TAddProjectMemberPayload = z.infer<typeof AddProjectMemberSchema>
export type TUpdateProjectMemberRolePayload = z.infer<
  typeof UpdateProjectMemberRoleSchema
>
export type TAddProjectMemberInput = z.infer<typeof AddProjectMemberInputSchema>
export type TUpdateProjectMemberRoleInput = z.infer<
  typeof UpdateProjectMemberRoleInputSchema
>
