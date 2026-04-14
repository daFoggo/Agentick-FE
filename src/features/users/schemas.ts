import { z } from "zod"

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  avatar_url: z.url().optional().or(z.literal("")),
  created_at: z.iso.datetime(),
})

export type TUser = z.infer<typeof UserSchema>

export const UserSearchResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  avatar_url: z.string().nullable().optional(),
})

export const SearchUsersInputSchema = z.object({
  q: z.string().min(1).max(100),
  limit: z.number().min(1).max(50).optional(),
  teamId: z.string().optional(),
  excludeTeamId: z.string().optional(),
  excludeProjectId: z.string().optional(),
})

export type TUserSearchResult = z.infer<typeof UserSearchResultSchema>
