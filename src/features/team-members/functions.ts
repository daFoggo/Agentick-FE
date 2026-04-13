import { createServerFn } from "@tanstack/react-start"
import { requestLoggerMiddleware } from "@/lib/middleware"
import {
  fetchTeamMembers,
  addTeamMember,
  updateTeamMemberRole,
  removeTeamMember,
} from "./server"
import {
  FetchTeamMembersSchema,
  AddTeamMemberInputSchema,
  UpdateTeamMemberRoleInputSchema,
  RemoveTeamMemberSchema,
} from "./schemas"

export const fetchTeamMembersFn = createServerFn({ method: "GET" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(FetchTeamMembersSchema)
  .handler(({ data: team_id }) => fetchTeamMembers(team_id))

export const addTeamMemberFn = createServerFn({ method: "POST" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(AddTeamMemberInputSchema)
  .handler(({ data }) => addTeamMember(data.team_id, data.payload))

export const updateTeamMemberRoleFn = createServerFn({ method: "POST" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(UpdateTeamMemberRoleInputSchema)
  .handler(({ data }) =>
    updateTeamMemberRole(data.team_id, data.user_id, data.payload)
  )

export const removeTeamMemberFn = createServerFn({ method: "POST" })
  .middleware([requestLoggerMiddleware])
  .inputValidator(RemoveTeamMemberSchema)
  .handler(({ data }) => removeTeamMember(data.team_id, data.user_id))
