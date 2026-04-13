import "@tanstack/react-start/server-only"
import { z } from "zod"
import { api } from "@/lib/ky"
import type { TBaseResponse } from "@/types/api"
import type { TTeam, GetTeamsSchema, TTeamsResponse, CreateTeamSchema, UpdateTeamSchema } from "./schemas"

/**
 * @description Lấy danh sách teams
 */
export async function fetchTeams(params?: z.infer<typeof GetTeamsSchema>): Promise<TTeamsResponse> {
  const response = await api
    .get("teams", { searchParams: params })
    .json<TBaseResponse<TTeamsResponse>>()

  return response.data
}

/**
 * @description Lấy danh sách teams của user hiện tại (bao gồm owner và tham gia)
 */
export async function fetchMyTeams(): Promise<TTeam[]> {
  const response = await api.get("teams/me").json<TBaseResponse<TTeam[]>>()
  return response.data
}

/**
 * @description Lấy chi tiết team theo ID
 */
export async function fetchTeamById(teamId: string): Promise<TTeam | null> {
  try {
    const response = await api.get(`teams/${teamId}`).json<TBaseResponse<TTeam>>()
    return response.data
  } catch (error) {
    console.error("error fetch team detail: ", error)
    return null
  }
}

/**
 * @description Tạo team mới
 */
export async function createTeam(data: z.infer<typeof CreateTeamSchema>): Promise<TTeam> {
  const response = await api.post("teams", { json: data }).json<TBaseResponse<TTeam>>()
  return response.data
}

/**
 * @description Cập nhật thông tin team
 */
export async function updateTeam(
  teamId: string,
  data: z.infer<typeof UpdateTeamSchema>
): Promise<TTeam> {
  const response = await api
    .patch(`teams/${teamId}`, { json: data })
    .json<TBaseResponse<TTeam>>()
  return response.data
}

/**
 * @description Xóa team (Soft Delete)
 */
export async function deleteTeam(teamId: string): Promise<boolean> {
  const response = await api.delete(`teams/${teamId}`).json<TBaseResponse<boolean>>()
  return response.data
}
