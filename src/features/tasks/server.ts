import "@tanstack/react-start/server-only"
import { api } from "@/lib/ky"
import type { TBaseResponse } from "@/types/api"
import {
  ProjectTaskCreateSchema,
  ProjectTaskUpdateSchema,
  type TProjectTask,
  type TProjectTaskCreateInput,
  type TProjectTaskFindInput,
  type TProjectTaskUpdateInput,
  type TProjectTasksResponse,
} from "./schemas"

const buildTaskPath = (projectId: string) => `projects/${projectId}/tasks`

export async function fetchTasks(
  projectId: string,
  params?: TProjectTaskFindInput
): Promise<TProjectTasksResponse> {
  const response = await api
    .get(buildTaskPath(projectId), {
      searchParams: params as Record<string, string | number | boolean> | undefined,
    })
    .json<TBaseResponse<TProjectTasksResponse>>()

  return response.data
}

export async function fetchTaskById(
  projectId: string,
  taskId: string
): Promise<TProjectTask | null> {
  try {
    const response = await api
      .get(`${buildTaskPath(projectId)}/${taskId}`)
      .json<TBaseResponse<TProjectTask>>()
    return response.data
  } catch (error) {
    console.error("error fetch task detail:", error)
    return null
  }
}

export async function createTask(
  projectId: string,
  payload: TProjectTaskCreateInput
): Promise<TProjectTask> {
  const response = await api
    .post(buildTaskPath(projectId), {
      json: ProjectTaskCreateSchema.parse(payload),
    })
    .json<TBaseResponse<TProjectTask>>()

  return response.data
}

export async function updateTask(
  projectId: string,
  taskId: string,
  payload: TProjectTaskUpdateInput
): Promise<TProjectTask> {
  const response = await api
    .patch(`${buildTaskPath(projectId)}/${taskId}`, {
      json: ProjectTaskUpdateSchema.parse(payload),
    })
    .json<TBaseResponse<TProjectTask>>()

  return response.data
}

export async function deleteTask(
  projectId: string,
  taskId: string
): Promise<boolean> {
  const response = await api
    .delete(`${buildTaskPath(projectId)}/${taskId}`)
    .json<TBaseResponse<boolean>>()

  return response.data
}