import type { IProjectMember } from "../project-members"

export type TDataScope = "system" | "team" | "project"

export interface ITask {
  id: string
  projectId: string
  parentTaskId?: string
  subTasks?: ITask[]

  title: string
  description?: string

  type: ITaskType
  status: ITaskStatus
  priority: ITaskPriority
  tags?: ITag[]

  phaseId?: string
  phase?: IPhase

  assigneeId?: string
  assignee?: IProjectMember

  startDate?: Date
  dueDate?: Date
  estimatedHours?: number
  actualHours?: number

  timeLogs?: ITimeLog[]

  createdAt: Date
  updatedAt: Date
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

export interface ITimeLog {
  id: string
  taskId: string
  userId: string
  member?: IProjectMember

  startTime: Date
  endTime?: Date
  durationMinutes: number
  note?: string

  createdAt: Date
}

export interface ITaskType {
  id: string
  name: string
  color: string
  icon?: string

  scope: TDataScope
  teamId?: string
  projectId?: string

  isMilestone: boolean
  isApproval: boolean
  isDefault: boolean

  createdAt: Date
}

export interface ITaskStatus {
  id: string
  name: string
  color: string
  icon?: string

  scope: TDataScope
  teamId?: string
  projectId?: string

  isDefault: boolean
  isCompleted: boolean
  order: number

  createdAt: Date
}

export interface ITaskPriority {
  id: string
  name: string
  color: string
  icon?: string
  level: number

  scope: TDataScope
  teamId?: string
  projectId?: string

  isDefault: boolean

  createdAt: Date
}

export interface ITag {
  id: string
  name: string
  color: string
  teamId: string
  createdAt: Date
}
