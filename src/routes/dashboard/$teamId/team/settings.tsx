import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/$teamId/team/settings")({
  component: TeamSettingsView,
})

function TeamSettingsView() {
  return (
    <div className="flex flex-col gap-4 py-8 text-center">
      <h3 className="text-lg font-medium">Team Settings</h3>
      <p className="text-muted-foreground">
        Configuration and team management options will appear here.
      </p>
    </div>
  )
}
