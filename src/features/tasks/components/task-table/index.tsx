import { DataTable } from "@/components/common/data-table"
import type { ITask } from "@/features/tasks/types"
import { taskColumns } from "./columns"

interface ITaskTableProps {
  data: ITask[]
  groupBy?: string
  defaultPageSize?: number
}

export const TaskTable = ({
  data,
  groupBy,
  defaultPageSize = 20,
}: ITaskTableProps) => {
  return (
    <DataTable<ITask>
      data={data}
      columns={taskColumns}
      getRowId={(row) => row.id}
      defaultGrouping={groupBy ? [groupBy] : []}
      defaultColumnPinning={{
        left: ["select", "title"],
        right: ["actions"],
      }}
      enableRowSelection={true}
      defaultPageSize={defaultPageSize}
      enablePagination={false}
    />
  )
}
