import { Coffee, Focus, ListTodo, Video, type LucideIcon } from "lucide-react"
import type { TEventType } from "./schemas"

export interface IEventTypeOption {
  value: TEventType
  label: string
  icon: LucideIcon
  color: string
}

export const EVENT_TYPE_OPTIONS: IEventTypeOption[] = [
  {
    value: "task_block",
    label: "Task",
    icon: ListTodo,
    color: "text-blue-500",
  },
  {
    value: "meeting",
    label: "Meeting",
    icon: Video,
    color: "text-green-500",
  },
  {
    value: "focus_time",
    label: "Focus Time",
    icon: Focus,
    color: "text-amber-500",
  },
  {
    value: "leave",
    label: "Leave",
    icon: Coffee,
    color: "text-rose-500",
  },
]
