import { z } from "zod"

const ApiDateSchema = z.iso.datetime().or(z.date())

const FindOptionsSchema = z
  .object({
    id__eq: z.string().optional(),
    name__ilike: z.string().optional(),
    is_default__eq: z.boolean().optional(),
    is_completed__eq: z.boolean().optional(),
    level__eq: z.number().int().optional(),
    page: z.number().int().positive().optional(),
    page_size: z.union([z.number().int().positive(), z.literal("all")]).optional(),
    ordering: z.string().optional(),
  })
  .optional()

interface IFindResult<T> {
  founds: T[]
  search_options: {
    page: number
    page_size: number | "all"
    ordering: string
    total_count: number
  }
}

export const TaskStatusSchema = z.object({
  id: z.string(),
  created_at: ApiDateSchema,
  updated_at: ApiDateSchema,
  project_id: z.string(),
  name: z.string().min(1),
  color: z.string(),
  order: z.number(),
  is_default: z.boolean(),
  is_completed: z.boolean(),
})

export const TaskStatusCreateSchema = z.object({
  project_id: z.string().optional(),
  name: z.string().min(1),
  color: z.string(),
  order: z.number().int(),
  is_default: z.boolean().optional(),
  is_completed: z.boolean().optional(),
})

export const TaskStatusUpdateSchema = TaskStatusCreateSchema.omit({
  project_id: true,
})
  .partial()
  .extend({
    is_default: z.boolean().optional(),
    is_completed: z.boolean().optional(),
  })

export const TaskStatusFindSchema = FindOptionsSchema

export interface TTaskStatusSearchOptions {
  page: number
  page_size: number | "all"
  ordering: string
  total_count: number
}

export interface TTaskStatusesResponse extends IFindResult<TTaskStatus> {
  search_options: TTaskStatusSearchOptions
}

export type TTaskStatus = z.infer<typeof TaskStatusSchema>
export type TTaskStatusCreateInput = z.infer<typeof TaskStatusCreateSchema>
export type TTaskStatusUpdateInput = z.infer<typeof TaskStatusUpdateSchema>
export type TTaskStatusFindInput = z.infer<typeof TaskStatusFindSchema>

export const TaskTypeSchema = z.object({
  id: z.string(),
  created_at: ApiDateSchema,
  updated_at: ApiDateSchema,
  project_id: z.string(),
  name: z.string().min(1),
  color: z.string(),
  icon: z.string(),
  order: z.number(),
  is_default: z.boolean(),
})

export const TaskTypeCreateSchema = z.object({
  project_id: z.string().optional(),
  name: z.string().min(1),
  color: z.string(),
  icon: z.string(),
  order: z.number().int(),
  is_default: z.boolean().optional(),
})

export const TaskTypeUpdateSchema = TaskTypeCreateSchema.omit({
  project_id: true,
}).partial()

export const TaskTypeFindSchema = z
  .object({
    id__eq: z.string().optional(),
    name__ilike: z.string().optional(),
    is_default__eq: z.boolean().optional(),
    page: z.number().int().positive().optional(),
    page_size: z.union([z.number().int().positive(), z.literal("all")]).optional(),
    ordering: z.string().optional(),
  })
  .optional()

export interface TTaskTypeSearchOptions {
  page: number
  page_size: number | "all"
  ordering: string
  total_count: number
}

export interface TTaskTypesResponse extends IFindResult<TTaskType> {
  search_options: TTaskTypeSearchOptions
}

export type TTaskType = z.infer<typeof TaskTypeSchema>
export type TTaskTypeCreateInput = z.infer<typeof TaskTypeCreateSchema>
export type TTaskTypeUpdateInput = z.infer<typeof TaskTypeUpdateSchema>
export type TTaskTypeFindInput = z.infer<typeof TaskTypeFindSchema>

export const TaskPrioritySchema = z.object({
  id: z.string(),
  created_at: ApiDateSchema,
  updated_at: ApiDateSchema,
  project_id: z.string(),
  name: z.string().min(1),
  color: z.string(),
  level: z.number().int().min(0).max(3),
  order: z.number(),
  is_default: z.boolean(),
})

export const TaskPriorityCreateSchema = z.object({
  project_id: z.string().optional(),
  name: z.string().min(1),
  color: z.string(),
  level: z.number().int().min(0).max(3),
  order: z.number().int(),
  is_default: z.boolean().optional(),
})

export const TaskPriorityUpdateSchema = TaskPriorityCreateSchema.omit({
  project_id: true,
}).partial()

export const TaskPriorityFindSchema = z
  .object({
    id__eq: z.string().optional(),
    name__ilike: z.string().optional(),
    level__eq: z.number().int().optional(),
    is_default__eq: z.boolean().optional(),
    page: z.number().int().positive().optional(),
    page_size: z.union([z.number().int().positive(), z.literal("all")]).optional(),
    ordering: z.string().optional(),
  })
  .optional()

export interface TTaskPrioritySearchOptions {
  page: number
  page_size: number | "all"
  ordering: string
  total_count: number
}

export interface TTaskPrioritiesResponse extends IFindResult<TTaskPriority> {
  search_options: TTaskPrioritySearchOptions
}

export type TTaskPriority = z.infer<typeof TaskPrioritySchema>
export type TTaskPriorityCreateInput = z.infer<typeof TaskPriorityCreateSchema>
export type TTaskPriorityUpdateInput = z.infer<typeof TaskPriorityUpdateSchema>
export type TTaskPriorityFindInput = z.infer<typeof TaskPriorityFindSchema>

export const TaskTagSchema = z.object({
  id: z.string(),
  created_at: ApiDateSchema,
  updated_at: ApiDateSchema,
  project_id: z.string(),
  name: z.string().min(1),
  color: z.string(),
})

export const TaskTagCreateSchema = z.object({
  project_id: z.string().optional(),
  name: z.string().min(1),
  color: z.string(),
})

export const TaskTagUpdateSchema = TaskTagCreateSchema.omit({
  project_id: true,
}).partial()

export const TaskTagFindSchema = z
  .object({
    id__eq: z.string().optional(),
    name__ilike: z.string().optional(),
    page: z.number().int().positive().optional(),
    page_size: z.union([z.number().int().positive(), z.literal("all")]).optional(),
    ordering: z.string().optional(),
  })
  .optional()

export interface TTaskTagSearchOptions {
  page: number
  page_size: number | "all"
  ordering: string
  total_count: number
}

export interface TTaskTagsResponse extends IFindResult<TTaskTag> {
  search_options: TTaskTagSearchOptions
}

export type TTaskTag = z.infer<typeof TaskTagSchema>
export type TTaskTagCreateInput = z.infer<typeof TaskTagCreateSchema>
export type TTaskTagUpdateInput = z.infer<typeof TaskTagUpdateSchema>
export type TTaskTagFindInput = z.infer<typeof TaskTagFindSchema>