import { TAILWIND_500_COLORS } from "@/constants/color-options"

export const TASK_CONFIG_SECTIONS = ["statuses", "types", "priorities", "tags"] as const

export const TASK_CONFIG_ROUTE = "projects/{project_id}/task-config"

export const DEFAULT_TASK_STATUS_COLORS = [
  TAILWIND_500_COLORS.gray,
  TAILWIND_500_COLORS.sky,
  TAILWIND_500_COLORS.amber,
  TAILWIND_500_COLORS.green,
  TAILWIND_500_COLORS.red,
  TAILWIND_500_COLORS.purple,
] as const

export const DEFAULT_TASK_TYPE_COLORS = [
  TAILWIND_500_COLORS.slate,
  TAILWIND_500_COLORS.blue,
  TAILWIND_500_COLORS.red,
  TAILWIND_500_COLORS.violet,
  TAILWIND_500_COLORS.emerald,
] as const

export const DEFAULT_TASK_PRIORITY_COLORS = [
  TAILWIND_500_COLORS.stone,
  TAILWIND_500_COLORS.gray,
  TAILWIND_500_COLORS.blue,
  TAILWIND_500_COLORS.orange,
  TAILWIND_500_COLORS.red,
] as const