import { z } from "zod"
import type { TProjectMember } from "../project-members"
import type { TTask } from "../tasks"

/**
 * @description Project Schema & Type
 */
export const ProjectSchema = z.object({
  id: z.string(),
  team_id: z.string(),
  name: z.string().min(3, "Tên dự án tối thiểu 3 ký tự"),
  description: z.string().optional(),
  avatar_url: z.url().optional().or(z.literal("")),
  created_at: z.iso.datetime().optional(),
})

export type TProject = z.infer<typeof ProjectSchema> & {
  members?: TProjectMember[]
  tasks?: TTask[]
}

/**
 * @description Inputs for Project operations
 */
export const GetProjectSchema = z.object({
  projectId: z.string(),
})

export const GetProjectsSchema = z.object({
  team_id: z.string().optional(),
})

export const CreateProjectSchema = ProjectSchema.omit({
  id: true,
  created_at: true,
})

export const UpdateProjectSchema = CreateProjectSchema.partial()

export type TGetProjectInput = z.infer<typeof GetProjectSchema>
export type TGetProjectsInput = z.infer<typeof GetProjectsSchema>
export type TCreateProjectInput = z.infer<typeof CreateProjectSchema>
export type TUpdateProjectInput = z.infer<typeof UpdateProjectSchema>
