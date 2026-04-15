import { z } from "zod"

const ApiDateSchema = z.iso.datetime().or(z.date())

export const PhaseSchema = z.object({
  id: z.string(),
  created_at: ApiDateSchema,
  updated_at: ApiDateSchema,
  project_id: z.string(),
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  order: z.number(),
  start_date: ApiDateSchema.optional().nullable(),
  end_date: ApiDateSchema.optional().nullable(),
})

export const PhaseCreateSchema = z.object({
  project_id: z.string().optional(),
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  order: z.number().int(),
  start_date: ApiDateSchema.optional().nullable(),
  end_date: ApiDateSchema.optional().nullable(),
})

export const PhaseUpdateSchema = PhaseCreateSchema.omit({
  project_id: true,
}).partial()

export const PhaseFindSchema = z
  .object({
    id__eq: z.string().optional(),
    name__ilike: z.string().optional(),
    page: z.number().int().positive().optional(),
    page_size: z.union([z.number().int().positive(), z.literal("all")]).optional(),
    ordering: z.string().optional(),
  })
  .optional()

export interface TPhaseSearchOptions {
  page: number
  page_size: number | "all"
  ordering: string
  total_count: number
}

export interface TPhasesResponse {
  founds: TPhase[]
  search_options: TPhaseSearchOptions
}

export type TPhase = z.infer<typeof PhaseSchema>
export type TPhaseCreateInput = z.infer<typeof PhaseCreateSchema>
export type TPhaseUpdateInput = z.infer<typeof PhaseUpdateSchema>
export type TPhaseFindInput = z.infer<typeof PhaseFindSchema>