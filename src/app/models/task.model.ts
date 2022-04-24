import { ProjectModel } from "./project.model"
import { RegisterModel } from "./register.model"

export interface TaskModel {
  id: number
  name: string
  finished: boolean
  project_id: number
  starts_at: Date,
  ends_at: Date,
  status_cd: number
  registers: RegisterModel[]
  project: Pick<ProjectModel, 'id' | 'title'>
}
