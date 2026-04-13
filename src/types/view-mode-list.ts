import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

export interface IViewModeCatalogItem {
  value: string
  label: string
  icon: LucideIcon
  to?: string
  isDefault?: boolean
  isVisibleByDefault?: boolean
  badge?: string | number | ReactNode
  badgeVariant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link"
}