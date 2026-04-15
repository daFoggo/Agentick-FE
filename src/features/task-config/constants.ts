export const TASK_CONFIG_SECTIONS = ["statuses", "types", "priorities", "tags"] as const

export const TASK_CONFIG_ROUTE = "projects/{project_id}/task-config"

export const DEFAULT_TASK_STATUS_COLORS = [
  "#94a3b8",
  "#64748b",
  "#0ea5e9",
  "#f59e0b",
  "#ef4444",
  "#22c55e",
] as const

export const DEFAULT_TASK_TYPE_COLORS = [
  "#64748b",
  "#3b82f6",
  "#ef4444",
  "#8b5cf6",
  "#10b981",
] as const

export const DEFAULT_TASK_PRIORITY_COLORS = [
  "#cbd5e1",
  "#94a3b8",
  "#3b82f6",
  "#f97316",
  "#ef4444",
] as const