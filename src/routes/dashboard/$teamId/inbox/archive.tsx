import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/$teamId/inbox/archive")({
  component: ArchiveInboxView,
})

function ArchiveInboxView() {
  return <div>Inbox archived items</div>
}
