import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { TASK_STATUS_CATALOG } from "@/features/tasks/constants"
import type { ITask } from "@/features/tasks/types"
import type { Row } from "@tanstack/react-table"
import { ChevronDown, ChevronRight } from "lucide-react"

interface ITaskTableGroupRowProps {
  row: Row<ITask>
  totalCols: number
}

/**
 * TaskTableGroupRow — Renders a grouped row spanning the entire table width.
 */
export function TaskTableGroupRow({ row, totalCols }: ITaskTableGroupRowProps) {
  const isExpanded = row.getIsExpanded()
  const groupColumnId = row.groupingColumnId
  const groupValue = String(row.groupingValue ?? "")
  const subRowCount = row.subRows.length

  const statusOption =
    groupColumnId === "status"
      ? TASK_STATUS_CATALOG.find((s) => s.value === groupValue)
      : undefined

  const label = statusOption?.label ?? groupValue

  return (
    <TableRow
      className="group/row border-b bg-muted/40 transition-colors hover:bg-transparent"
      key={row.id}
    >
      <TableCell
        colSpan={totalCols}
        className="h-10 overflow-visible p-0 align-middle whitespace-nowrap transition-colors hover:bg-muted/60"
      >
        {/* 
          Sticky container: ensures the label stays visible on the left 
          even when the table is scrolled horizontally.
        */}
        <div className="sticky left-0 z-10 flex w-fit items-center gap-1 px-1">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 rounded-md px-1 py-1 text-left transition-colors hover:bg-accent"
            onClick={(e) => {
              e.stopPropagation()
              row.getToggleExpandedHandler()()
            }}
          >
            <span className="text-muted-foreground/60">
              {isExpanded ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </span>
            {statusOption && (
              <span
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: statusOption.color }}
              />
            )}
            <span className="text-xs font-semibold tracking-wider text-foreground/80 uppercase">
              {label}
            </span>
            <span className="text-xs font-medium text-muted-foreground/50 tabular-nums">
              ({subRowCount})
            </span>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
