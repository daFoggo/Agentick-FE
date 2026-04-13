import { TeamSettings } from "@/features/teams"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/$teamId/team/settings")({
  component: TeamSettingsView,
})

function TeamSettingsView() {
  const { teamId } = Route.useParams()
  return <TeamSettings teamId={teamId} />
}
