import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RegisterModel, TaskModel } from '@app/models';
import { RegisterService, TaskService } from '@app/services';
import { intervalToDuration } from 'date-fns';

@Component({
  selector: 'app-current-task-register',
  templateUrl: './current-task-register.component.html',
  styleUrls: ['./current-task-register.component.scss']
})
export class CurrentTaskRegisterComponent implements OnInit {
  @Output() taskResult: EventEmitter<TaskModel> = new EventEmitter<TaskModel>()

  register!: RegisterModel | undefined
  task: TaskModel = { name: '' }
  interval!: any
  currentTime!: string | undefined

  constructor(private registerSvc: RegisterService, private taskSvc: TaskService) { }

  ngOnInit(): void {
    setTimeout(() => this.getCurrentRegister(), 200) // <- rails se peta si le envia varios gets a la vez
  }

  stopRegister(): void {
    if (!this.register) {
      return;
    }

    this.register.ends_at = new Date().toISOString()
    this.updateRegister(this.register)
    this.register = undefined
    this.task = { name: '' }
    clearInterval(this.interval)
    this.currentTime = undefined
  }

  async createOrUpdateTask(): Promise<void> {
    if (!this.register) {
      const userId: string | null = localStorage.getItem('currentUserId')
      const register =  {
        starts_at: new Date().toISOString(),
        user_id: Number(userId)
      }

      this.task.tasks_registers_attributes = register
      this.register = register as RegisterModel

      await this.createTask(this.task)
      this.getCurrentRegister()
    } else {

    }
  }

  private createInterval(register: RegisterModel): void {
    this.interval = setInterval(() => {
      const { hours, minutes, seconds }= intervalToDuration({ start: new Date(register.starts_at), end: new Date()})
      this.currentTime = `${hours}:${minutes}:${seconds}`
    }, 1000)
  }

  private async getCurrentRegister(): Promise<void> {
    try {
      const userId: string | null = localStorage.getItem('currentUserId')
      if (!userId) {
        return;
      }
      const { register, task } = await this.registerSvc.getCurrent(userId)
      this.register = register
      this.task = task ? task : { name: '' }
      if (register) {
        this.createInterval(register)
      }
    } catch(e) {
      console.error(e)
    }
  }

  private async updateRegister(register: RegisterModel): Promise<void> {
    try {
      await this.registerSvc.update(register)
    } catch(e) {
      console.error(e)
    }
  }

  private async createTask(current: any): Promise<void> {
    try {
      const { task } = await this.taskSvc.create(current)
      this.taskResult.emit(task)
    } catch(e) {
      console.error(e)
    }
  }
}
