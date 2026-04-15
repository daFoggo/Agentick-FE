import { ViewModeList } from "@/components/layout/app/view-mode-list"
import { PROJECT_VIEW_MODE_CATALOG } from "@/constants/view-mode-list"
import { projectQueryOptions } from "@/features/projects/queries"
import { Outlet, createFileRoute, useLocation } from "@tanstack/react-router"
import { ProjectDetailsHeader } from "@/features/projects/components/project-details-header"

export const Route = createFileRoute("/dashboard/$teamId/projects/$projectId")({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(projectQueryOptions(params.projectId)),
  component: RouteComponent,
  staticData: {
    header: {
      render: () => <ProjectHeaderWrapper />,
    },
  },
})

const ProjectHeaderWrapper = () => {
  const { teamId } = Route.useParams()
  const project = Route.useLoaderData()
  return <ProjectDetailsHeader teamId={teamId} project={project} />
}

function RouteComponent() {
  const { teamId, projectId } = Route.useParams()
  const { pathname } = useLocation()
  const normalizedPathname = pathname.replace(/\/+$/, "")
  const hideViewModeList = /\/settings(?:\/.*)?$/.test(normalizedPathname)

  return (
    <div className="flex flex-col gap-4">
      <ViewModeList
        catalog={PROJECT_VIEW_MODE_CATALOG}
        scope="project"
        params={{ teamId, projectId }}
        hide={hideViewModeList}
      />
      <Outlet />
    </div>
  )
}
