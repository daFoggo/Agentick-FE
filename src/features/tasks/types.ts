import type { IProjectMember } from "../project-members"
import type { TTaskPriority, TTaskStatus, TTaskType } from "./constants"

export type TDataScope = "system" | "team" | "project"

export interface ITag {
  id: string
  name: string
  color: string
  teamId: string
  createdAt: Date
}

export interface IPhase {
  id: string
  projectId: string
  name: string
  order: number
  startDate?: Date
  endDate?: Date
  createdAt: Date
}

export interface ITask {
  id: string
  projectId: string
  parentTaskId?: string
  subTasks?: ITask[]
  title: string
  description?: string
  type: TTaskType
  status: TTaskStatus
  priority: TTaskPriority
  tags?: ITag[]
  phaseId?: string
  phase?: IPhase
  assigneeId?: string
  assignee?: IProjectMember
  startDate?: Date
  dueDate?: Date
  estimatedHours?: number
  actualHours?: number
  createdAt: Date
  updatedAt: Date
}
