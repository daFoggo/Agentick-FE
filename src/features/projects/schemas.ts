import { z } from "zod"

export const GetProjectSchema = z.object({
  projectId: z.string(),
})

export const GetProjectsSchema = z.object({})

export type GetProjectsInput = z.infer<typeof GetProjectsSchema>
