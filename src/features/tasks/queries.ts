import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  createTaskFn,
  deleteTaskFn,
  getTaskByIdFn,
  getTasksFn,
  updateTaskFn,
} from "./functions"
import type { TProjectTaskFindInput } from "./schemas"

export const taskKeys = {
  all: ["tasks"] as const,
  lists: () => [...taskKeys.all, "list"] as const,
  list: (projectId: string, params?: TProjectTaskFindInput) =>
    [...taskKeys.lists(), projectId, params] as const,
  details: () => [...taskKeys.all, "detail"] as const,
  detail: (projectId: string, taskId: string) =>
    [...taskKeys.details(), projectId, taskId] as const,
}

export const taskQueries = {
  list: (projectId: string, params?: TProjectTaskFindInput) =>
    queryOptions({
      queryKey: taskKeys.list(projectId, params),
      queryFn: () => getTasksFn({ data: { projectId, params } }),
    }),
  detail: (projectId: string, taskId: string) =>
    queryOptions({
      queryKey: taskKeys.detail(projectId, taskId),
      queryFn: () => getTaskByIdFn({ data: { projectId, taskId } }),
    }),
}

export const useTaskMutations = () => {
  const queryClient = useQueryClient()

  const create = useMutation({
    mutationFn: (data: { projectId: string; payload: any }) =>
      createTaskFn({ data }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: taskKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: taskKeys.details() }),
      ])
    },
  })

  const update = useMutation({
    mutationFn: (data: { projectId: string; taskId: string; payload: any }) =>
      updateTaskFn({ data }),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: taskKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: taskKeys.detail(variables.projectId, variables.taskId) }),
      ])
    },
  })

  const remove = useMutation({
    mutationFn: (data: { projectId: string; taskId: string }) =>
      deleteTaskFn({ data }),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: taskKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: taskKeys.detail(variables.projectId, variables.taskId) }),
      ])
    },
  })

  return { create, update, remove }
}