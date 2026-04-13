import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/$teamId/overview/")({
  component: RouteComponent,
  staticData: {
    getTitle: () => "Overview",
  },
})

function RouteComponent() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div>Hello "/dashboard/overview/"!</div>
    </div>
  )
}
