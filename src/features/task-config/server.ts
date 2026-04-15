import "@tanstack/react-start/server-only"
import { api } from "@/lib/ky"
import type { TBaseResponse } from "@/types/api"
import {
  TaskPriorityCreateSchema,
  TaskPriorityUpdateSchema,
  TaskStatusCreateSchema,
  TaskStatusUpdateSchema,
  TaskTagCreateSchema,
  TaskTagUpdateSchema,
  TaskTypeCreateSchema,
  TaskTypeUpdateSchema,
  type TTaskPrioritiesResponse,
  type TTaskPriority,
  type TTaskPriorityCreateInput,
  type TTaskPriorityFindInput,
  type TTaskPriorityUpdateInput,
  type TTaskStatusesResponse,
  type TTaskStatus,
  type TTaskStatusCreateInput,
  type TTaskStatusFindInput,
  type TTaskStatusUpdateInput,
  type TTaskTagsResponse,
  type TTaskTag,
  type TTaskTagCreateInput,
  type TTaskTagFindInput,
  type TTaskTagUpdateInput,
  type TTaskTypesResponse,
  type TTaskType,
  type TTaskTypeCreateInput,
  type TTaskTypeFindInput,
  type TTaskTypeUpdateInput,
} from "./schemas"

const buildConfigPath = (projectId: string) => `projects/${projectId}/task-config`

const buildSectionPath = (projectId: string, section: string) =>
  `${buildConfigPath(projectId)}/${section}`

export async function fetchTaskStatuses(
  projectId: string,
  params?: TTaskStatusFindInput
): Promise<TTaskStatusesResponse> {
  const response = await api
    .get(buildSectionPath(projectId, "statuses"), {
      searchParams: params as Record<string, string | number | boolean> | undefined,
    })
    .json<TBaseResponse<TTaskStatusesResponse>>()

  return response.data
}

export async function fetchTaskStatusById(
  projectId: string,
  statusId: string
): Promise<TTaskStatus | null> {
  try {
    const response = await api
      .get(`${buildSectionPath(projectId, "statuses")}/${statusId}`)
      .json<TBaseResponse<TTaskStatus>>()
    return response.data
  } catch (error) {
    console.error("error fetch task status detail:", error)
    return null
  }
}

export async function createTaskStatus(
  projectId: string,
  payload: TTaskStatusCreateInput
): Promise<TTaskStatus> {
  const response = await api
    .post(buildSectionPath(projectId, "statuses"), {
      json: TaskStatusCreateSchema.parse(payload),
    })
    .json<TBaseResponse<TTaskStatus>>()

  return response.data
}

export async function updateTaskStatus(
  projectId: string,
  statusId: string,
  payload: TTaskStatusUpdateInput
): Promise<TTaskStatus> {
  const response = await api
    .patch(`${buildSectionPath(projectId, "statuses")}/${statusId}`, {
      json: TaskStatusUpdateSchema.parse(payload),
    })
    .json<TBaseResponse<TTaskStatus>>()

  return response.data
}

export async function deleteTaskStatus(
  projectId: string,
  statusId: string
): Promise<boolean> {
  const response = await api
    .delete(`${buildSectionPath(projectId, "statuses")}/${statusId}`)
    .json<TBaseResponse<boolean>>()

  return response.data
}

export async function fetchTaskTypes(
  projectId: string,
  params?: TTaskTypeFindInput
): Promise<TTaskTypesResponse> {
  const response = await api
    .get(buildSectionPath(projectId, "types"), {
      searchParams: params as Record<string, string | number | boolean> | undefined,
    })
    .json<TBaseResponse<TTaskTypesResponse>>()

  return response.data
}

export async function fetchTaskTypeById(
  projectId: string,
  typeId: string
): Promise<TTaskType | null> {
  try {
    const response = await api
      .get(`${buildSectionPath(projectId, "types")}/${typeId}`)
      .json<TBaseResponse<TTaskType>>()
    return response.data
  } catch (error) {
    console.error("error fetch task type detail:", error)
    return null
  }
}

export async function createTaskType(
  projectId: string,
  payload: TTaskTypeCreateInput
): Promise<TTaskType> {
  const response = await api
    .post(buildSectionPath(projectId, "types"), {
      json: TaskTypeCreateSchema.parse(payload),
    })
    .json<TBaseResponse<TTaskType>>()

  return response.data
}

export async function updateTaskType(
  projectId: string,
  typeId: string,
  payload: TTaskTypeUpdateInput
): Promise<TTaskType> {
  const response = await api
    .patch(`${buildSectionPath(projectId, "types")}/${typeId}`, {
      json: TaskTypeUpdateSchema.parse(payload),
    })
    .json<TBaseResponse<TTaskType>>()

  return response.data
}

export async function deleteTaskType(
  projectId: string,
  typeId: string
): Promise<boolean> {
  const response = await api
    .delete(`${buildSectionPath(projectId, "types")}/${typeId}`)
    .json<TBaseResponse<boolean>>()

  return response.data
}

export async function fetchTaskPriorities(
  projectId: string,
  params?: TTaskPriorityFindInput
): Promise<TTaskPrioritiesResponse> {
  const response = await api
    .get(buildSectionPath(projectId, "priorities"), {
      searchParams: params as Record<string, string | number | boolean> | undefined,
    })
    .json<TBaseResponse<TTaskPrioritiesResponse>>()

  return response.data
}

export async function fetchTaskPriorityById(
  projectId: string,
  priorityId: string
): Promise<TTaskPriority | null> {
  try {
    const response = await api
      .get(`${buildSectionPath(projectId, "priorities")}/${priorityId}`)
      .json<TBaseResponse<TTaskPriority>>()
    return response.data
  } catch (error) {
    console.error("error fetch task priority detail:", error)
    return null
  }
}

export async function createTaskPriority(
  projectId: string,
  payload: TTaskPriorityCreateInput
): Promise<TTaskPriority> {
  const response = await api
    .post(buildSectionPath(projectId, "priorities"), {
      json: TaskPriorityCreateSchema.parse(payload),
    })
    .json<TBaseResponse<TTaskPriority>>()

  return response.data
}

export async function updateTaskPriority(
  projectId: string,
  priorityId: string,
  payload: TTaskPriorityUpdateInput
): Promise<TTaskPriority> {
  const response = await api
    .patch(`${buildSectionPath(projectId, "priorities")}/${priorityId}`, {
      json: TaskPriorityUpdateSchema.parse(payload),
    })
    .json<TBaseResponse<TTaskPriority>>()

  return response.data
}

export async function deleteTaskPriority(
  projectId: string,
  priorityId: string
): Promise<boolean> {
  const response = await api
    .delete(`${buildSectionPath(projectId, "priorities")}/${priorityId}`)
    .json<TBaseResponse<boolean>>()

  return response.data
}

export async function fetchTaskTags(
  projectId: string,
  params?: TTaskTagFindInput
): Promise<TTaskTagsResponse> {
  const response = await api
    .get(buildSectionPath(projectId, "tags"), {
      searchParams: params as Record<string, string | number | boolean> | undefined,
    })
    .json<TBaseResponse<TTaskTagsResponse>>()

  return response.data
}

export async function fetchTaskTagById(
  projectId: string,
  tagId: string
): Promise<TTaskTag | null> {
  try {
    const response = await api
      .get(`${buildSectionPath(projectId, "tags")}/${tagId}`)
      .json<TBaseResponse<TTaskTag>>()
    return response.data
  } catch (error) {
    console.error("error fetch task tag detail:", error)
    return null
  }
}

export async function createTaskTag(
  projectId: string,
  payload: TTaskTagCreateInput
): Promise<TTaskTag> {
  const response = await api
    .post(buildSectionPath(projectId, "tags"), {
      json: TaskTagCreateSchema.parse(payload),
    })
    .json<TBaseResponse<TTaskTag>>()

  return response.data
}

export async function updateTaskTag(
  projectId: string,
  tagId: string,
  payload: TTaskTagUpdateInput
): Promise<TTaskTag> {
  const response = await api
    .patch(`${buildSectionPath(projectId, "tags")}/${tagId}`, {
      json: TaskTagUpdateSchema.parse(payload),
    })
    .json<TBaseResponse<TTaskTag>>()

  return response.data
}

export async function deleteTaskTag(
  projectId: string,
  tagId: string
): Promise<boolean> {
  const response = await api
    .delete(`${buildSectionPath(projectId, "tags")}/${tagId}`)
    .json<TBaseResponse<boolean>>()

  return response.data
}