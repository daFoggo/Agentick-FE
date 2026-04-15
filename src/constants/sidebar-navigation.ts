import type { ISidebarGroup } from "@/types/sidebar"
import {
  ChevronLeft,
  ChartNoAxesGantt,
  CircleDashed,
  Flag,
  Inbox,
  ListChecks,
  LayoutTemplate,
  Tags,
  Users,
  Form,
} from "lucide-react"
import type { ISidebarContextMatch } from "@/types/sidebar"

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

export const SIDEBAR_PROJECT_SETTINGS: ISidebarGroup = {
  items: [
    {
      title: "Project Settings",
      to: "/dashboard/$teamId/projects/$projectId/dashboard",
      icon: ChevronLeft,
    },
    {
      title: "General",
      to: "/dashboard/$teamId/projects/$projectId/settings",
      icon: Form,
      exactActive: true,
    },
    {
      title: "Members",
      to: "/dashboard/$teamId/projects/$projectId/settings/members",
      icon: Users,
      exactActive: true,
    },
    {
      title: "Task Status",
      to: "/dashboard/$teamId/projects/$projectId/settings/task-statuses",
      icon: CircleDashed,
      exactActive: true,
    },
    {
      title: "Task Type",
      to: "/dashboard/$teamId/projects/$projectId/settings/task-types",
      icon: ListChecks,
      exactActive: true,
    },
    {
      title: "Task Priority",
      to: "/dashboard/$teamId/projects/$projectId/settings/task-priorities",
      icon: Flag,
      exactActive: true,
    },
    {
      title: "Task Tag",
      to: "/dashboard/$teamId/projects/$projectId/settings/task-tags",
      icon: Tags,
      exactActive: true,
    },
  ],
}

const PROJECT_SETTINGS_PATH_REGEX =
  /^\/dashboard\/([^/]+)\/projects\/([^/]+)\/settings(?:\/.*)?\/?$/

export const resolveSidebarContextFromPathname = (
  pathname: string
): ISidebarContextMatch => {
  const normalizedPathname = pathname.replace(/\/+$/, "") || "/"
  const projectSettingsMatch = normalizedPathname.match(
    PROJECT_SETTINGS_PATH_REGEX
  )

  if (projectSettingsMatch) {
    return {
      contextId: "project-settings",
      params: {
        teamId: projectSettingsMatch[1],
        projectId: projectSettingsMatch[2],
      },
    }
  }

  return {
    contextId: "default",
  }
}
