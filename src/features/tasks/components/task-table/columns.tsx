import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  TASK_PRIORITY_CATALOG,
  TASK_STATUS_CATALOG,
  TASK_TYPE_CATALOG,
} from "@/features/tasks/constants"
import type { ITask } from "@/features/tasks/types"
import type { ColumnDef } from "@tanstack/react-table"
import { createColumnHelper } from "@tanstack/react-table"
import {
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react"

const helper = createColumnHelper<ITask>()

function formatDate(date?: Date) {
  if (!date) return "—"
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(date))
}

function getStatusOption(value: string) {
  return TASK_STATUS_CATALOG.find((s) => s.value === value)
}

function getPriorityOption(value: string) {
  return TASK_PRIORITY_CATALOG.find((p) => p.value === value)
}

function getTypeOption(value: string) {
  return TASK_TYPE_CATALOG.find((t) => t.value === value)
}

// ── Column definitions ─────────────────────────────────────────────────────
export const taskColumns: ColumnDef<ITask, any>[] = [
  // 1. Select
  helper.display({
    id: "select",
    size: 40,
    meta: {
      label: "Select",
      enablePinning: false,
      enableReorder: false,
    },
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        onClick={(e) => e.stopPropagation()}
        aria-label="Select row"
      />
    ),
  }),

  // 2. Title (with expand for sub-tasks)
  helper.accessor("title", {
    id: "title",
    header: "Title",
    size: 250,
    meta: {
      label: "Title",
      enablePinning: true,
    },
    cell: ({ row, getValue }) => {
      const canExpand = row.getCanExpand()
      const depth = row.depth

      return (
        <div
          className="flex min-w-0 items-center gap-1.5"
          style={{ paddingLeft: depth > 0 ? `${depth * 24}px` : undefined }}
        >
          {/* Expand / collapse sub-tasks */}
          {canExpand ? (
            <Button
              variant="ghost"
              size="icon"
              className="size-5 shrink-0"
              onClick={(e) => {
                e.stopPropagation()
                row.getToggleExpandedHandler()()
              }}
              title={
                row.getIsExpanded() ? "Collapse sub-tasks" : "Expand sub-tasks"
              }
            >
              {row.getIsExpanded() ? (
                <ChevronDown className="size-3.5" />
              ) : (
                <ChevronRight className="size-3.5" />
              )}
            </Button>
          ) : depth > 0 ? (
            // Alignment spacer for sub-tasks without children
            <span className="size-5 shrink-0" />
          ) : null}

          <span className="truncate text-sm font-medium text-foreground">
            {getValue()}
          </span>

          {/* Sub-task count badge */}
          {canExpand &&
            row.original.subTasks &&
            row.original.subTasks.length > 0 && (
              <Badge variant="secondary" className="ml-1 shrink-0 text-xs">
                {row.original.subTasks.length}
              </Badge>
            )}
        </div>
      )
    },
  }),

  // 3. Type icon
  helper.accessor("type", {
    id: "type",
    header: "Type",
    size: 100,
    meta: {
      label: "Type",
    },
    cell: ({ getValue }) => {
      const type = getTypeOption(getValue())
      if (!type) return null
      return (
        <span
          className="inline-flex items-center text-xs font-medium"
          style={{ color: type.color }}
          title={type.label}
        >
          <span className="max-w-[80px] truncate">{type.label}</span>
        </span>
      )
    },
  }),

  // 4. Status
  helper.accessor("status", {
    id: "status",
    header: "Status",
    size: 130,
    meta: { label: "Status" },
    cell: ({ getValue, row }) => {
      const status = getStatusOption(getValue())
      if (!status) return null

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Badge
              variant="outline"
              className="cursor-pointer gap-1.5 font-normal transition-colors hover:bg-muted/50"
              style={{ borderColor: status.color, color: status.color }}
            >
              <span
                className="size-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: status.color }}
              />
              {status.label}
              <ChevronDown className="size-3 opacity-50" />
            </Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-[150px]">
            {TASK_STATUS_CATALOG.map((opt) => (
              <DropdownMenuItem
                key={opt.value}
                className="gap-2"
                onClick={() => {
                  // In a real app, we would call an update function here
                  console.log(
                    "Update status to",
                    opt.value,
                    "for task",
                    row.original.id
                  )
                }}
              >
                <span
                  className="size-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: opt.color }}
                />
                {opt.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }),

  // 5. Priority
  helper.accessor("priority", {
    id: "priority",
    header: "Priority",
    size: 120,
    meta: { label: "Priority" },
    cell: ({ getValue, row }) => {
      const priority = getPriorityOption(getValue())
      if (!priority) return null

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Badge
              variant="secondary"
              className="cursor-pointer gap-1.5 px-2 font-normal transition-colors hover:bg-muted"
            >
              <span
                className="size-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: priority.color }}
              />
              {priority.label}
              <ChevronDown className="size-3 opacity-50" />
            </Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-[130px]">
            {TASK_PRIORITY_CATALOG.map((opt) => (
              <DropdownMenuItem
                key={opt.value}
                className="gap-2"
                onClick={() => {
                  console.log(
                    "Update priority to",
                    opt.value,
                    "for task",
                    row.original.id
                  )
                }}
              >
                <span
                  className="size-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: opt.color }}
                />
                {opt.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }),

  // 6. Assignee
  helper.accessor("assignee", {
    id: "assignee",
    header: "Assignee",
    size: 150,
    meta: { label: "Assignee" },
    cell: ({ getValue }) => {
      const assignee = getValue()
      if (!assignee)
        return <span className="text-xs text-muted-foreground">Unassigned</span>
      return (
        <div className="flex min-w-0 items-center gap-2">
          <Avatar className="size-5 shrink-0">
            <AvatarImage src={assignee.user?.avatarUrl} />
            <AvatarFallback className="text-[10px]">
              {assignee.user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="truncate text-xs">{assignee.user?.name}</span>
        </div>
      )
    },
  }),

  // 7. Due date
  helper.accessor("dueDate", {
    id: "dueDate",
    header: "Due Date",
    size: 112,
    meta: { label: "Due Date" },
    cell: ({ getValue }) => {
      const date = getValue()
      if (!date) return <span className="text-muted-foreground">—</span>
      const isPast = new Date(date) < new Date()
      return (
        <span className={isPast ? "text-xs text-destructive" : "text-xs"}>
          {formatDate(date)}
        </span>
      )
    },
  }),

  // 8. Estimated hours
  helper.accessor("estimatedHours", {
    id: "estimatedHours",
    header: "Est. (h)",
    size: 80,
    meta: {
      label: "Estimated hours",
      headerClassName: "text-right",
      cellClassName: "text-right tabular-nums",
    },
    cell: ({ getValue }) => {
      const v = getValue()
      return <span className="text-xs">{v != null ? v : "—"}</span>
    },
  }),

  // 9. Actual hours
  helper.accessor("actualHours", {
    id: "actualHours",
    header: "Act. (h)",
    size: 80,
    meta: {
      label: "Actual hours",
      headerClassName: "text-right",
      cellClassName: "text-right tabular-nums",
    },
    cell: ({ getValue }) => {
      const v = getValue()
      return <span className="text-xs">{v != null ? v : "—"}</span>
    },
  }),

  // 10. Actions (pinned right)
  helper.display({
    id: "actions",
    size: 40,
    meta: {
      label: "Actions",
      enablePinning: false,
      enableReorder: false,
    },
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Open actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => console.log("Edit", row.original.id)}
          >
            <Pencil className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => console.log("Delete", row.original.id)}
          >
            <Trash2 className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }),
]
