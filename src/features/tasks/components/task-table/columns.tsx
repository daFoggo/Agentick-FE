import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { TTask } from "@/features/tasks"
import { useTaskMutations } from "@/features/tasks/queries"
import {
  formatCalendarDate,
  type ITaskListDialogOptions,
} from "@/features/tasks/helpers"
import { generateColumns } from "@/lib/data-table"
import { ChevronDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"
import { DeleteTaskListDialog } from "./delete-task-list-dialog"
import { EditTaskListDialog } from "./edit-task-list-dialog"

function getStatusOption(value: string, options: ITaskListDialogOptions) {
  const normalizedValue = value.toLowerCase().replace(/[^a-z0-9]+/g, "")
  return options.statuses.find((s) => {
    const normalizedCatalogValue = s.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
    const normalizedLabel = s.name.toLowerCase().replace(/[^a-z0-9]+/g, "")
    return (
      normalizedCatalogValue === normalizedValue ||
      normalizedLabel === normalizedValue
    )
  })
}

function getPriorityOption(value: string, options: ITaskListDialogOptions) {
  const normalizedValue = value.toLowerCase().replace(/[^a-z0-9]+/g, "")
  return options.priorities.find((p) => {
    const normalizedCatalogValue = p.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
    const normalizedLabel = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "")
    return (
      normalizedCatalogValue === normalizedValue ||
      normalizedLabel === normalizedValue
    )
  })
}

function getTypeOption(value: string, options: ITaskListDialogOptions) {
  const normalizedValue = value.toLowerCase().replace(/[^a-z0-9]+/g, "")
  return options.types.find((t) => {
    const normalizedCatalogValue = t.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
    const normalizedLabel = t.name.toLowerCase().replace(/[^a-z0-9]+/g, "")
    return (
      normalizedCatalogValue === normalizedValue ||
      normalizedLabel === normalizedValue
    )
  })
}

const TaskListActionCell = ({
  task,
  options,
}: {
  task: TTask
  options: ITaskListDialogOptions
}) => {
  const { remove } = useTaskMutations()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const handleDelete = async (): Promise<boolean> => {
    try {
      await remove.mutateAsync({
        projectId: task.project_id,
        taskId: task.id,
      })
      return true
    } catch (error) {
      console.error("Failed to delete task:", error)
      return false
    }
  }

  return (
    <>
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
          <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
            <Pencil className="size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setIsDeleteOpen(true)}
          >
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditTaskListDialog
        task={task}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        options={options}
      />
      <DeleteTaskListDialog
        task={task}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        isPending={remove.isPending}
        onConfirm={handleDelete}
      />
    </>
  )
}

export const getTaskColumns = (options: ITaskListDialogOptions) =>
  generateColumns<TTask>([
    {
      accessorKey: "title",
      label: "Title",
      size: 250,
      enablePinning: true,
      cell: ({ getValue }) => {
        return (
          <span
            className="block max-w-full truncate text-sm font-medium text-foreground"
            title={getValue() as string}
          >
            {getValue() as string}
          </span>
        )
      },
    },

    {
      accessorKey: "type",
      label: "Type",
      size: 100,
      cell: ({ getValue }) => {
        const type = getTypeOption(getValue() as string, options)
        if (!type) return null
        return (
          <span
            className="inline-flex items-center text-xs font-medium"
            style={{ color: type.color }}
            title={type.name}
          >
            <span className="max-w-20 truncate">{type.name}</span>
          </span>
        )
      },
    },

    {
      accessorKey: "status",
      label: "Status",
      size: 130,
      renderGroupValue: (value: string) => {
        const option = getStatusOption(value, options)
        return (
          <>
            {option && (
              <span
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: option.color }}
              />
            )}
            <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
              {option?.name ?? value}
            </span>
          </>
        )
      },
      cell: ({ getValue }) => {
        const status = getStatusOption(getValue() as string, options)
        if (!status) return null

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Badge
                variant="outline"
                className="cursor-pointer gap-1.5 font-normal transition-colors duration-300 ease-in-out hover:bg-muted/50"
                style={{ borderColor: status.color, color: status.color }}
              >
                <span
                  className="size-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: status.color }}
                />
                {status.name}
                <ChevronDown className="size-3 opacity-50" />
              </Badge>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-37.5">
              {options.statuses.map((opt) => (
                <DropdownMenuItem
                  key={opt.id}
                  className="gap-2"
                  onClick={(event) => event.preventDefault()}
                >
                  <span
                    className="size-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: opt.color }}
                  />
                  {opt.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },

    {
      accessorKey: "priority",
      label: "Priority",
      size: 120,
      renderGroupValue: (value: string) => {
        const option = getPriorityOption(value, options)
        return (
          <>
            {option && (
              <span
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: option.color }}
              />
            )}
            <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
              {option?.name ?? value}
            </span>
          </>
        )
      },
      cell: ({ getValue }) => {
        const priority = getPriorityOption(getValue() as string, options)
        if (!priority) return null

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Badge
                variant="secondary"
                className="cursor-pointer gap-1.5 px-2 font-normal transition-colors duration-300 ease-in-out hover:bg-muted"
              >
                <span
                  className="size-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: priority.color }}
                />
                {priority.name}
                <ChevronDown className="size-3 opacity-50" />
              </Badge>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-32.5">
              {options.priorities.map((opt) => (
                <DropdownMenuItem
                  key={opt.id}
                  className="gap-2"
                  onClick={(event) => event.preventDefault()}
                >
                  <span
                    className="size-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: opt.color }}
                  />
                  {opt.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },

    {
      accessorKey: "assignee",
      label: "Assignee",
      size: 150,
      cell: ({ getValue }) => {
        const assignee = getValue() as TTask["assignee"]
        if (!assignee)
          return (
            <span className="text-xs text-muted-foreground">Unassigned</span>
          )
        return (
          <div className="flex min-w-0 items-center gap-2">
            <Avatar className="size-5 shrink-0">
              <AvatarImage src={assignee.user?.avatar_url} />
              <AvatarFallback className="text-xs">
                {assignee.user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="truncate text-xs">{assignee.user?.name}</span>
          </div>
        )
      },
    },

    {
      accessorKey: "due_date",
      label: "Due Date",
      size: 112,
      cell: ({ getValue }) => {
        const date = getValue() as string
        if (!date) return <span className="text-muted-foreground">—</span>
        const isPast = new Date(date) < new Date()
        return (
          <span className={isPast ? "text-xs text-destructive" : "text-xs"}>
            {formatCalendarDate(new Date(date))}
          </span>
        )
      },
    },

    {
      accessorKey: "estimated_hours",
      label: "Estimated hours",
      header: "Est. (h)",
      size: 80,
      headerClassName: "text-right",
      cellClassName: "text-right tabular-nums",
      cell: ({ getValue }) => {
        const v = getValue()
        return <span className="text-xs">{v != null ? String(v) : "—"}</span>
      },
    },

    {
      accessorKey: "actual_hours",
      label: "Actual hours",
      header: "Act. (h)",
      size: 80,
      headerClassName: "text-right",
      cellClassName: "text-right tabular-nums",
      cell: ({ getValue }) => {
        const v = getValue()
        return <span className="text-xs">{v != null ? String(v) : "—"}</span>
      },
    },

    {
      id: "actions",
      label: "Actions",
      size: 40,
      enablePinning: false,
      enableReorder: false,
      isActionColumn: true,
      cell: ({ row }) => (
        <TaskListActionCell task={row.original} options={options} />
      ),
    },
  ])
