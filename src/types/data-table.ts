import type { RowData } from "@tanstack/react-table"

// Extend TanStack's ColumnMeta to add custom metadata per column
declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    /** Header display label (optional override) */
    label?: string
    /** Whether this column can be pinned by the user via UI */
    enablePinning?: boolean
    /** Whether this column can be reordered via drag-and-drop */
    enableReorder?: boolean
    /** Custom class for header cell */
    headerClassName?: string
    /** Custom class for data cell */
    cellClassName?: string
  }
}
