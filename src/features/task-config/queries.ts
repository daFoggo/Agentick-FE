import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  createTaskPriorityFn,
  createTaskStatusFn,
  createTaskTagFn,
  createTaskTypeFn,
  deleteTaskPriorityFn,
  deleteTaskStatusFn,
  deleteTaskTagFn,
  deleteTaskTypeFn,
  getTaskPrioritiesFn,
  getTaskPriorityByIdFn,
  getTaskStatusesFn,
  getTaskStatusByIdFn,
  getTaskTagsFn,
  getTaskTagByIdFn,
  getTaskTypesFn,
  getTaskTypeByIdFn,
  updateTaskPriorityFn,
  updateTaskStatusFn,
  updateTaskTagFn,
  updateTaskTypeFn,
} from "./functions"
import type {
  TTaskPriorityFindInput,
  TTaskStatusFindInput,
  TTaskTagFindInput,
  TTaskTypeFindInput,
} from "./schemas"

export const taskConfigKeys = {
  all: (projectId: string) => ["task-config", projectId] as const,
  statuses: (projectId: string, params?: TTaskStatusFindInput) =>
    [...taskConfigKeys.all(projectId), "statuses", params] as const,
  statusDetail: (projectId: string, statusId: string) =>
    [...taskConfigKeys.all(projectId), "statuses", statusId] as const,
  types: (projectId: string, params?: TTaskTypeFindInput) =>
    [...taskConfigKeys.all(projectId), "types", params] as const,
  typeDetail: (projectId: string, typeId: string) =>
    [...taskConfigKeys.all(projectId), "types", typeId] as const,
  priorities: (projectId: string, params?: TTaskPriorityFindInput) =>
    [...taskConfigKeys.all(projectId), "priorities", params] as const,
  priorityDetail: (projectId: string, priorityId: string) =>
    [...taskConfigKeys.all(projectId), "priorities", priorityId] as const,
  tags: (projectId: string, params?: TTaskTagFindInput) =>
    [...taskConfigKeys.all(projectId), "tags", params] as const,
  tagDetail: (projectId: string, tagId: string) =>
    [...taskConfigKeys.all(projectId), "tags", tagId] as const,
}

export const taskConfigQueries = {
  statuses: (projectId: string, params?: TTaskStatusFindInput) =>
    queryOptions({
      queryKey: taskConfigKeys.statuses(projectId, params),
      queryFn: () => getTaskStatusesFn({ data: { projectId, params } }),
    }),
  statusDetail: (projectId: string, statusId: string) =>
    queryOptions({
      queryKey: taskConfigKeys.statusDetail(projectId, statusId),
      queryFn: () => getTaskStatusByIdFn({ data: { projectId, statusId } }),
    }),
  types: (projectId: string, params?: TTaskTypeFindInput) =>
    queryOptions({
      queryKey: taskConfigKeys.types(projectId, params),
      queryFn: () => getTaskTypesFn({ data: { projectId, params } }),
    }),
  typeDetail: (projectId: string, typeId: string) =>
    queryOptions({
      queryKey: taskConfigKeys.typeDetail(projectId, typeId),
      queryFn: () => getTaskTypeByIdFn({ data: { projectId, typeId } }),
    }),
  priorities: (projectId: string, params?: TTaskPriorityFindInput) =>
    queryOptions({
      queryKey: taskConfigKeys.priorities(projectId, params),
      queryFn: () => getTaskPrioritiesFn({ data: { projectId, params } }),
    }),
  priorityDetail: (projectId: string, priorityId: string) =>
    queryOptions({
      queryKey: taskConfigKeys.priorityDetail(projectId, priorityId),
      queryFn: () =>
        getTaskPriorityByIdFn({ data: { projectId, priorityId } }),
    }),
  tags: (projectId: string, params?: TTaskTagFindInput) =>
    queryOptions({
      queryKey: taskConfigKeys.tags(projectId, params),
      queryFn: () => getTaskTagsFn({ data: { projectId, params } }),
    }),
  tagDetail: (projectId: string, tagId: string) =>
    queryOptions({
      queryKey: taskConfigKeys.tagDetail(projectId, tagId),
      queryFn: () => getTaskTagByIdFn({ data: { projectId, tagId } }),
    }),
}

export const useTaskConfigMutations = () => {
  const queryClient = useQueryClient()

  const createStatus = useMutation({
    mutationFn: (data: { projectId: string; payload: any }) =>
      createTaskStatusFn({ data }),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: taskConfigKeys.all(variables.projectId),
      })
    },
  })

  const updateStatus = useMutation({
    mutationFn: (data: { projectId: string; statusId: string; payload: any }) =>
      updateTaskStatusFn({ data }),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: taskConfigKeys.all(variables.projectId),
      })
    },
  })

  const removeStatus = useMutation({
    mutationFn: (data: { projectId: string; statusId: string }) =>
      deleteTaskStatusFn({ data }),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: taskConfigKeys.all(variables.projectId),
      })
    },
  })

  const createType = useMutation({
    mutationFn: (data: { projectId: string; payload: any }) =>
      createTaskTypeFn({ data }),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: taskConfigKeys.all(variables.projectId),
      })
    },
  })

  const updateType = useMutation({
    mutationFn: (data: { projectId: string; typeId: string; payload: any }) =>
      updateTaskTypeFn({ data }),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: taskConfigKeys.all(variables.projectId),
      })
    },
  })

  const removeType = useMutation({
    mutationFn: (data: { projectId: string; typeId: string }) =>
      deleteTaskTypeFn({ data }),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: taskConfigKeys.all(variables.projectId),
      })
    },
  })

  const createPriority = useMutation({
    mutationFn: (data: { projectId: string; payload: any }) =>
      createTaskPriorityFn({ data }),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: taskConfigKeys.all(variables.projectId),
      })
    },
  })

  const updatePriority = useMutation({
    mutationFn: (data: { projectId: string; priorityId: string; payload: any }) =>
      updateTaskPriorityFn({ data }),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: taskConfigKeys.all(variables.projectId),
      })
    },
  })

  const removePriority = useMutation({
    mutationFn: (data: { projectId: string; priorityId: string }) =>
      deleteTaskPriorityFn({ data }),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: taskConfigKeys.all(variables.projectId),
      })
    },
  })

  const createTag = useMutation({
    mutationFn: (data: { projectId: string; payload: any }) =>
      createTaskTagFn({ data }),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: taskConfigKeys.all(variables.projectId),
      })
    },
  })

  const updateTag = useMutation({
    mutationFn: (data: { projectId: string; tagId: string; payload: any }) =>
      updateTaskTagFn({ data }),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: taskConfigKeys.all(variables.projectId),
      })
    },
  })

  const removeTag = useMutation({
    mutationFn: (data: { projectId: string; tagId: string }) =>
      deleteTaskTagFn({ data }),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: taskConfigKeys.all(variables.projectId),
      })
    },
  })

  return {
    createStatus,
    updateStatus,
    removeStatus,
    createType,
    updateType,
    removeType,
    createPriority,
    updatePriority,
    removePriority,
    createTag,
    updateTag,
    removeTag,
  }
}