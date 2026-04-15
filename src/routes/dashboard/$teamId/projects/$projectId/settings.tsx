import { Outlet, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(
  "/dashboard/$teamId/projects/$projectId/settings"
)({
  component: ProjectSettingsLayoutPage,
})

function ProjectSettingsLayoutPage() {
  return <Outlet />
}
