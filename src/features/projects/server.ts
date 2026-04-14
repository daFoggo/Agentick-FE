import { api } from "@/lib/ky"
import type { TBaseResponse } from "@/types/api"
import "@tanstack/react-start/server-only"
import type {
  TGetProjectsInput,
  TProject,
  TProjectsResponse,
} from "./schemas"
import { z } from "zod"
import { CreateProjectSchema, UpdateProjectSchema } from "./schemas"

/**
 * Lấy danh sách các Project hiện có, hỗ trợ filter và pagination.
 */
export async function fetchProjects(
  params?: TGetProjectsInput
): Promise<TProjectsResponse> {
  const response = await api
    .get("projects", { searchParams: params as Record<string, string | number | boolean> | undefined })
    .json<TBaseResponse<TProjectsResponse>>()

  return response.data
}

/**
 * Lấy danh sách các Project mà người dùng hiện tại đang tham gia.
 */
export async function fetchMyProjects(): Promise<TProject[]> {
  const response = await api.get("projects/me").json<TBaseResponse<TProject[]>>()
  return response.data
}

/**
 * Lấy thông tin chi tiết của một Project theo ID.
 */
export async function fetchProjectById(
  projectId: string
): Promise<TProject | null> {
  try {
    const response = await api.get(`projects/${projectId}`).json<TBaseResponse<TProject>>()
    return response.data
  } catch (error) {
    console.error("error fetch project detail: ", error)
    return null
  }
}

/**
 * Tạo một Project mới.
 */
export async function createProject(
  payload: z.infer<typeof CreateProjectSchema>
): Promise<TProject> {
  const response = await api
    .post("projects", { json: payload })
    .json<TBaseResponse<TProject>>()
  
  return response.data
}

/**
 * Cập nhật thông tin (name, description, etc.) của một Project.
 */
export async function updateProject(
  projectId: string,
  payload: z.infer<typeof UpdateProjectSchema>
): Promise<TProject> {
  const response = await api
    .patch(`projects/${projectId}`, { json: payload })
    .json<TBaseResponse<TProject>>()

  return response.data
}

/**
 * Thực hiện xóa Project (thường là Soft Delete).
 */
export async function deleteProject(projectId: string): Promise<boolean> {
  const response = await api.delete(`projects/${projectId}`).json<TBaseResponse<boolean>>()
  return response.data
}

