import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/$teamId")({
  component: () => <Outlet />,
})
