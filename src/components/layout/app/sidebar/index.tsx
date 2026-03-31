import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar"
import { SidebarGroupSection } from "./sidebar-navigation"
import { HeaderContent } from "./header-content"
import { SidebarProjectList } from "@/features/projects"
import { ThemeToggleWrapper } from "./theme-toggle-wrapper"
import { TimezoneViewer } from "./timezone-viewer"
import { UserProfile } from "./user-profile"
import { SIDEBAR_PERSONAL, SIDEBAR_TEAM } from "@/constants/sidebar-navigation"

export const AppSidebar = () => {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <HeaderContent />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroupSection group={SIDEBAR_PERSONAL} />

        <SidebarProjectList />

        <SidebarGroupSection group={SIDEBAR_TEAM} />

        <SidebarGroup className="mt-auto">
          <SidebarMenu>
            <TimezoneViewer />
            <ThemeToggleWrapper />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <UserProfile />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
