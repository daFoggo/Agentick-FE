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

/** Whether a row is a TanStack grouped/aggregator row (not a real data row) */
export function isGroupRow<TData>(row: Row<TData>): boolean {
  return row.getIsGrouped()
}
