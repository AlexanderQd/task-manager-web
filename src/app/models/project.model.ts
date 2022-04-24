import { ClientModel } from "./client.model"
import { TaskModel } from "./task.model"
import { UserModel } from "./user.model"

export interface ProjectModel {
  id: number
  title: string
  client_id?: number
  user_ids?: number[]
  users: UserModel[]
  client?: ClientModel
  tasks: TaskModel[]
}
