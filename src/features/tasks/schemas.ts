import { z } from "zod"
import type { TProjectMember } from "../project-members"
import {
  TASK_PRIORITY_CATALOG,
  TASK_STATUS_CATALOG,
  TASK_TYPE_CATALOG,
} from "./constants"

export const TaskTypeSchema = z.enum(
  TASK_TYPE_CATALOG.map((i) => i.value) as [string, ...string[]]
)
export const TaskStatusSchema = z.enum(
  TASK_STATUS_CATALOG.map((i) => i.value) as [string, ...string[]]
)
export const TaskPrioritySchema = z.enum(
  TASK_PRIORITY_CATALOG.map((i) => i.value) as [string, ...string[]]
)

export const TagSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  team_id: z.string(),
  created_at: z.iso.datetime().or(z.date()),
})

export const PhaseSchema = z.object({
  id: z.string(),
  project_id: z.string(),
  name: z.string(),
  order: z.number(),
  start_date: z.iso.datetime().optional().or(z.date()),
  end_date: z.iso.datetime().optional().or(z.date()),
  created_at: z.iso.datetime().or(z.date()),
})

export const TaskSchema = z.object({
  id: z.string(),
  project_id: z.string(),
  title: z.string().min(1, "Tiêu đề không được để trống"),
  description: z.string().optional(),
  type: TaskTypeSchema,
  status: TaskStatusSchema,
  priority: TaskPrioritySchema,
  phase_id: z.string().optional(),
  assignee_id: z.string().optional(),
  start_date: z.iso.datetime().optional().or(z.date()),
  due_date: z.iso.datetime().optional().or(z.date()),
  estimated_hours: z.number().optional(),
  actual_hours: z.number().optional(),
  created_at: z.iso.datetime().or(z.date()),
  updated_at: z.iso.datetime().or(z.date()),
})

export const CreateTaskSchema = TaskSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

export const UpdateTaskSchema = CreateTaskSchema.partial()

export type TTask = z.infer<typeof TaskSchema> & {
  tags?: TTag[]
  phase?: TPhase
  assignee?: TProjectMember
}

export type TTag = z.infer<typeof TagSchema>
export type TPhase = z.infer<typeof PhaseSchema>
