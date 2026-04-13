import type { ISidebarGroup } from "@/types/sidebar"
import {
  ChartNoAxesGantt,
  Inbox,
  LayoutTemplate,
  Users,
} from "lucide-react"

export const SIDEBAR_PERSONAL: ISidebarGroup = {
  label: "Personal",
  items: [
    {
      title: "Overview",
      to: "/dashboard/$teamId/overview",
      icon: LayoutTemplate,
    },
    {
      title: "My Tasks",
      to: "/dashboard/$teamId/my-tasks",
      icon: ChartNoAxesGantt,
    },
    {
      title: "Inbox",
      to: "/dashboard/$teamId/inbox",
      icon: Inbox,
    },
  ],
}

export const SIDEBAR_TEAM: ISidebarGroup = {
  label: "Team",
  items: [
    {
      title: "Team",
      to: "/dashboard/$teamId/team",
      icon: Users,
    },
  ],
}

export const SIDEBAR_NAVIGATION: ISidebarGroup[] = [SIDEBAR_PERSONAL, SIDEBAR_TEAM]
