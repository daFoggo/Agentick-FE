import { createServerFn } from "@tanstack/react-start"
import { requestLoggerMiddleware } from "@/lib/middleware"
import { z } from "zod"
import {
  ProjectTaskCreateSchema,
  ProjectTaskFindSchema,
  ProjectTaskUpdateSchema,
} from "./schemas"
import {
  createTask,
  deleteTask,
  fetchTaskById,
  fetchTasks,
  updateTask,
} from "./server"

export const getTasksFn = createServerFn({ method: "GET" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(
    z.object({
      projectId: z.string(),
      params: ProjectTaskFindSchema,
    })
  )
  .handler(async ({ data }) => fetchTasks(data.projectId, data.params))

export const getTaskByIdFn = createServerFn({ method: "GET" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(
    z.object({
      projectId: z.string(),
      taskId: z.string(),
    })
  )
  .handler(async ({ data }) => fetchTaskById(data.projectId, data.taskId))

export const createTaskFn = createServerFn({ method: "POST" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(
    z.object({
      projectId: z.string(),
      payload: ProjectTaskCreateSchema,
    })
  )
  .handler(async ({ data }) => createTask(data.projectId, data.payload))

export const updateTaskFn = createServerFn({ method: "POST" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(
    z.object({
      projectId: z.string(),
      taskId: z.string(),
      payload: ProjectTaskUpdateSchema,
    })
  )
  .handler(async ({ data }) => updateTask(data.projectId, data.taskId, data.payload))

export const deleteTaskFn = createServerFn({ method: "POST" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(
    z.object({
      projectId: z.string(),
      taskId: z.string(),
    })
  )
  .handler(async ({ data }) => deleteTask(data.projectId, data.taskId))