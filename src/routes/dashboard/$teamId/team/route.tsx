import { ViewModeList } from "@/components/layout/app/view-mode-list"
import { TEAM_VIEW_MODE_CATALOG } from "@/constants/view-mode-list"
import { TeamDetailsHeader } from "@/features/teams"
import { Outlet, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/$teamId/team")({
  component: RouteComponent,
  staticData: {
    getTitle: () => "Team Details",
    header: {
      render: () => <HeaderWrapper />,
    },
  },
})

function HeaderWrapper() {
  const { teamId } = Route.useParams()
  return <TeamDetailsHeader teamId={teamId} />
}

function RouteComponent() {
  const { teamId } = Route.useParams()

  return (
    <div className="flex flex-col gap-4">
      <ViewModeList
        catalog={TEAM_VIEW_MODE_CATALOG}
        scope="team"
        params={{ teamId }}
        allowCustomization={false}
      />
      <Outlet />
    </div>
  )
}
