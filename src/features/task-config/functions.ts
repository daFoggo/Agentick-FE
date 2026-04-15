import { createServerFn } from "@tanstack/react-start"
import { requestLoggerMiddleware } from "@/lib/middleware"
import { z } from "zod"
import {
  TaskPriorityCreateSchema,
  TaskPriorityFindSchema,
  TaskPriorityUpdateSchema,
  TaskStatusCreateSchema,
  TaskStatusFindSchema,
  TaskStatusUpdateSchema,
  TaskTagCreateSchema,
  TaskTagFindSchema,
  TaskTagUpdateSchema,
  TaskTypeCreateSchema,
  TaskTypeFindSchema,
  TaskTypeUpdateSchema,
} from "./schemas"
import {
  createTaskPriority,
  createTaskStatus,
  createTaskTag,
  createTaskType,
  deleteTaskPriority,
  deleteTaskStatus,
  deleteTaskTag,
  deleteTaskType,
  fetchTaskPriorities,
  fetchTaskPriorityById,
  fetchTaskStatusById,
  fetchTaskStatuses,
  fetchTaskTagById,
  fetchTaskTags,
  fetchTaskTypeById,
  fetchTaskTypes,
  updateTaskPriority,
  updateTaskStatus,
  updateTaskTag,
  updateTaskType,
} from "./server"

const withProjectId = <T extends z.ZodTypeAny>(payloadSchema: T) =>
  z.object({
    projectId: z.string(),
    payload: payloadSchema,
  })

export const getTaskStatusesFn = createServerFn({ method: "GET" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(
    z.object({
      projectId: z.string(),
      params: TaskStatusFindSchema,
    })
  )
  .handler(async ({ data }) => fetchTaskStatuses(data.projectId, data.params))

export const getTaskStatusByIdFn = createServerFn({ method: "GET" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(
    z.object({
      projectId: z.string(),
      statusId: z.string(),
    })
  )
  .handler(async ({ data }) => fetchTaskStatusById(data.projectId, data.statusId))

export const createTaskStatusFn = createServerFn({ method: "POST" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(withProjectId(TaskStatusCreateSchema))
  .handler(async ({ data }) => createTaskStatus(data.projectId, data.payload))

export const updateTaskStatusFn = createServerFn({ method: "POST" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(
    z.object({
      projectId: z.string(),
      statusId: z.string(),
      payload: TaskStatusUpdateSchema,
    })
  )
  .handler(async ({ data }) =>
    updateTaskStatus(data.projectId, data.statusId, data.payload)
  )

export const deleteTaskStatusFn = createServerFn({ method: "POST" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(
    z.object({
      projectId: z.string(),
      statusId: z.string(),
    })
  )
  .handler(async ({ data }) => deleteTaskStatus(data.projectId, data.statusId))

export const getTaskTypesFn = createServerFn({ method: "GET" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(
    z.object({
      projectId: z.string(),
      params: TaskTypeFindSchema,
    })
  )
  .handler(async ({ data }) => fetchTaskTypes(data.projectId, data.params))

export const getTaskTypeByIdFn = createServerFn({ method: "GET" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(
    z.object({
      projectId: z.string(),
      typeId: z.string(),
    })
  )
  .handler(async ({ data }) => fetchTaskTypeById(data.projectId, data.typeId))

export const createTaskTypeFn = createServerFn({ method: "POST" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(withProjectId(TaskTypeCreateSchema))
  .handler(async ({ data }) => createTaskType(data.projectId, data.payload))

export const updateTaskTypeFn = createServerFn({ method: "POST" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(
    z.object({
      projectId: z.string(),
      typeId: z.string(),
      payload: TaskTypeUpdateSchema,
    })
  )
  .handler(async ({ data }) =>
    updateTaskType(data.projectId, data.typeId, data.payload)
  )

export const deleteTaskTypeFn = createServerFn({ method: "POST" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(
    z.object({
      projectId: z.string(),
      typeId: z.string(),
    })
  )
  .handler(async ({ data }) => deleteTaskType(data.projectId, data.typeId))

export const getTaskPrioritiesFn = createServerFn({ method: "GET" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(
    z.object({
      projectId: z.string(),
      params: TaskPriorityFindSchema,
    })
  )
  .handler(async ({ data }) => fetchTaskPriorities(data.projectId, data.params))

export const getTaskPriorityByIdFn = createServerFn({ method: "GET" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(
    z.object({
      projectId: z.string(),
      priorityId: z.string(),
    })
  )
  .handler(async ({ data }) =>
    fetchTaskPriorityById(data.projectId, data.priorityId)
  )

export const createTaskPriorityFn = createServerFn({ method: "POST" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(withProjectId(TaskPriorityCreateSchema))
  .handler(async ({ data }) => createTaskPriority(data.projectId, data.payload))

export const updateTaskPriorityFn = createServerFn({ method: "POST" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(
    z.object({
      projectId: z.string(),
      priorityId: z.string(),
      payload: TaskPriorityUpdateSchema,
    })
  )
  .handler(async ({ data }) =>
    updateTaskPriority(data.projectId, data.priorityId, data.payload)
  )

export const deleteTaskPriorityFn = createServerFn({ method: "POST" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(
    z.object({
      projectId: z.string(),
      priorityId: z.string(),
    })
  )
  .handler(async ({ data }) => deleteTaskPriority(data.projectId, data.priorityId))

export const getTaskTagsFn = createServerFn({ method: "GET" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(
    z.object({
      projectId: z.string(),
      params: TaskTagFindSchema,
    })
  )
  .handler(async ({ data }) => fetchTaskTags(data.projectId, data.params))

export const getTaskTagByIdFn = createServerFn({ method: "GET" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(
    z.object({
      projectId: z.string(),
      tagId: z.string(),
    })
  )
  .handler(async ({ data }) => fetchTaskTagById(data.projectId, data.tagId))

export const createTaskTagFn = createServerFn({ method: "POST" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(withProjectId(TaskTagCreateSchema))
  .handler(async ({ data }) => createTaskTag(data.projectId, data.payload))

export const updateTaskTagFn = createServerFn({ method: "POST" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(
    z.object({
      projectId: z.string(),
      tagId: z.string(),
      payload: TaskTagUpdateSchema,
    })
  )
  .handler(async ({ data }) => updateTaskTag(data.projectId, data.tagId, data.payload))

export const deleteTaskTagFn = createServerFn({ method: "POST" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(
    z.object({
      projectId: z.string(),
      tagId: z.string(),
    })
  )
  .handler(async ({ data }) => deleteTaskTag(data.projectId, data.tagId))