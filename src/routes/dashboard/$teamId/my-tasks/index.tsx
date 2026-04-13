import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/$teamId/my-tasks/")({
  component: RouteComponent,
  staticData: {
    getTitle: () => "My Tasks",
  },
})

function RouteComponent() {
  return <div>Hello "/dashboard/my-tasks/"!</div>
}
