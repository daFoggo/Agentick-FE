import type { Row } from "@tanstack/react-table"
import type { CSSProperties } from "react"

/** Returns sticky CSS for a pinned column given its getStart/getAfter values */
export function getPinnedCellStyle(
  isPinned: "left" | "right" | false,
  start: number,
  after: number
): CSSProperties {
  if (!isPinned) return {}
  return {
    position: "sticky",
    left: isPinned === "left" ? `${start}px` : undefined,
    right: isPinned === "right" ? `${after}px` : undefined,
    zIndex: 2,
  }
}

export function isGroupRow<TData>(row: Row<TData>): boolean {
  return row.getIsGrouped()
}

import type { ColumnDef } from "@tanstack/react-table"
import type { IDataTableColumnDef } from "@/types/data-table"

/**
 * generateColumns abstracts away the repetitive boilerplate of defining
 * TanStack Table columns, consolidating id, header, and meta configuration.
 */
export function generateColumns<TData>(
  definitions: IDataTableColumnDef<TData>[]
): ColumnDef<TData, any>[] {
  return definitions.map((def) => {
    return {
      id: def.id ?? def.accessorKey,
      accessorKey: def.accessorKey,
      header: def.header ?? def.label,
      size: def.size,
      cell: def.cell,
      meta: {
        label: def.label,
        enablePinning: def.enablePinning,
        enableReorder: def.enableReorder,
        renderGroupValue: def.renderGroupValue,
        headerClassName: def.headerClassName,
        cellClassName: def.cellClassName,
        isSelectColumn: def.isSelectColumn,
        isActionColumn: def.isActionColumn,
      },
    } as ColumnDef<TData, any>
  })
}
