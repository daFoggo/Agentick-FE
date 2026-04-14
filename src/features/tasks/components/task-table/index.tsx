import { DataTable } from "@/components/common/data-table"
import type { TTask } from "@/features/tasks"
import { taskColumns } from "./columns"

interface ITaskTableProps {
  data: TTask[]
  groupBy?: string
  defaultPageSize?: number
}

/**
 * Bảng hiển thị danh sách công việc (Task).
 * Hỗ trợ các tính năng cao cấp như nhóm dữ liệu (Grouping), ghim cột (Pinning) và phân trang.
 */
export const TaskTable = ({
  data,
  groupBy,
  defaultPageSize = 20,
}: ITaskTableProps) => {
  return (
    <DataTable<TTask>
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
