import { DataTable } from "@/components/common/data-table"
import type { ITask } from "@/features/tasks/types"
import type { Row } from "@tanstack/react-table"
import { taskColumns } from "./columns"
import { TaskTableGroupRow } from "./task-table-group-row"

interface ITaskTableProps {
  data: ITask[]
  /** Column id to group rows by. Common values: "status" | "priority" | "assignee" */
  groupBy?: string
  /** Initial page size (default 20) */
  defaultPageSize?: number
}

/**
 * TaskTable — List view table for tasks.
 *
 * Wraps DataTable with task-specific column definitions, default pinning,
 * task group row rendering, and sub-task expansion.
 */
export function TaskTable({
  data,
  groupBy,
  defaultPageSize = 20,
}: ITaskTableProps) {
  function renderGroupRow(row: Row<ITask>, totalCols: number) {
    return <TaskTableGroupRow key={row.id} row={row} totalCols={totalCols} />
  }

  return (
    <DataTable<ITask>
      data={data}
      columns={taskColumns}
      getRowId={(row) => row.id}
      getSubRows={(row) => row.subTasks}
      renderGroupRow={renderGroupRow}
      defaultGrouping={groupBy ? [groupBy] : []}
      defaultColumnPinning={{
        left: ["select", "title"],
        right: ["actions"],
      }}
      defaultPageSize={defaultPageSize}
      enablePagination={false}
    />
  )
}
