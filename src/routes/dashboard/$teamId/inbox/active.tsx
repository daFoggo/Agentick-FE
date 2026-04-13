import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/$teamId/inbox/active")({
  component: ActiveInboxView,
})

function ActiveInboxView() {
  return <div>Inbox active items</div>
}
