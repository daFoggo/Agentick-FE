import { AppSidebar } from "@/components/layout/app/sidebar"
import { PageHeader } from "@/components/layout/app/page-header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
  staticData: {
    getTitle: () => "Dashboard",
  },
})

function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col gap-4 p-6">
        <PageHeader />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
