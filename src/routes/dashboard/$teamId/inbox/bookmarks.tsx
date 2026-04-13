import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/$teamId/inbox/bookmarks")({
  component: BookmarksInboxView,
})

function BookmarksInboxView() {
  return <div>Inbox bookmarked items</div>
}
