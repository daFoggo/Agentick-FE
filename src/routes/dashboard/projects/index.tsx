import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/projects/")({
  component: ProjectList,
})

function ProjectList() {
  return <div>Hello "/dashboard/projects/"!</div>
}
