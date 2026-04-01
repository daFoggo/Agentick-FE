import { createServerFn } from "@tanstack/react-start"
import { GetProjectSchema, GetProjectsSchema } from "./schemas"
import { fetchProjects, fetchProjectById } from "./server"

export const getProjectsFn = createServerFn({ method: "GET" })
  .inputValidator(GetProjectsSchema)
  .handler(({ data }) => fetchProjects(data))

export const getProjectByIdFn = createServerFn({ method: "GET" })
  .inputValidator(GetProjectSchema)
  .handler(({ data }) => fetchProjectById(data.projectId))
