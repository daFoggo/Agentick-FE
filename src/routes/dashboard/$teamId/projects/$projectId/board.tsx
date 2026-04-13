import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/$teamId/projects/$projectId/board")({
  component: ProjectBoardView,
})

function ProjectBoardView() {
  const { projectId } = Route.useParams()
  return <div>Project board: {projectId}</div>
}
