import { api } from "@/lib/ky"
import type { TBaseResponse } from "@/types/api"
import "@tanstack/react-start/server-only"
import { z } from "zod"
import type {
  AddTeamMemberSchema,
  TTeamMember,
  TTeamMembersResponse,
  UpdateTeamMemberRoleSchema,
} from "./schemas"

/**
 * @description Lấy danh sách thành viên của team
 */
export async function fetchTeamMembers(
  teamId: string
): Promise<TTeamMembersResponse> {
  const response = await api
    .get(`teams/${teamId}/members`)
    .json<TBaseResponse<TTeamMembersResponse>>()
  return response.data
}

/**
 * @description Thêm thành viên vào team
 */
export async function addTeamMember(
  teamId: string,
  payload: z.infer<typeof AddTeamMemberSchema>
): Promise<TTeamMember> {
  const response = await api
    .post(`teams/${teamId}/members`, { json: payload })
    .json<TBaseResponse<TTeamMember>>()
  return response.data
}

/**
 * @description Cập nhật Role của thành viên
 */
export async function updateTeamMemberRole(
  teamId: string,
  userId: string,
  payload: z.infer<typeof UpdateTeamMemberRoleSchema>
): Promise<TTeamMember> {
  const response = await api
    .patch(`teams/${teamId}/members/${userId}`, { json: payload })
    .json<TBaseResponse<TTeamMember>>()
  return response.data
}

/**
 * @description Xóa thành viên khỏi team
 */
export async function removeTeamMember(
  teamId: string,
  userId: string
): Promise<boolean> {
  const response = await api
    .delete(`teams/${teamId}/members/${userId}`)
    .json<TBaseResponse<boolean>>()
  return response.data
}
