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
      to: "/dashboard/overview",
      icon: LayoutTemplate,
    },
    {
      title: "My Tasks",
      to: "/dashboard/my-tasks",
      icon: ChartNoAxesGantt,
    },
    {
      title: "Inbox",
      to: "/dashboard/inbox",
      icon: Inbox,
    },
  ],
}

export const SIDEBAR_TEAM: ISidebarGroup = {
  label: "Team",
  items: [
    {
      title: "Team",
      to: "/dashboard/team",
      icon: Users,
    },
  ],
}

export const SIDEBAR_NAVIGATION: ISidebarGroup[] = [SIDEBAR_PERSONAL, SIDEBAR_TEAM]
