import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService, RegisterService, TaskService } from '@app/services';
import { intervalToDuration } from 'date-fns'
import { RegisterModel, TaskModel } from '@models';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss']
})
export class TasksTableComponent implements OnInit {
  @ViewChild(TaskFormComponent) taskForm!: TaskFormComponent
  @Output() editTask: EventEmitter<TaskModel> = new EventEmitter<TaskModel>()

  @Input() tasks: TaskModel[] = []

  interval: any
  currentTime!: string

  constructor(private taskSvc: TaskService, private registerSvc: RegisterService, private authSvc: AuthService) { }

  ngOnInit(): void {
  }

  setTask(task: TaskModel): void {
    this.editTask.emit(task)
  }

  startRegister(task: TaskModel): void {
    if (!this.interval && task.id) {
      const register: RegisterModel = {
        task_id: task.id,
        user_id: this.authSvc.currentUser?.id,
        starts_at: new Date().toISOString()
      }

      this.createRegister(register)
      this.createInterval(register)
    } else {
      clearInterval(this.interval)
    }
  }

  private createInterval(register: RegisterModel): void {
    this.interval = setInterval(() => {
      const { hours, minutes, seconds }= intervalToDuration({ start: new Date(register.starts_at), end: new Date()})
      this.currentTime = `${hours}:${minutes}:${seconds}`
    }, 1000)
  }

  private async update(task: TaskModel): Promise<void> {
    try {
      await this.taskSvc.update(task)
    } catch(e) {
      console.error(e)
    }
  }

  private async createRegister(current: RegisterModel): Promise<void> {
    try {
      const { register } = await this.registerSvc.create(current)
    } catch(e) {
      console.error(e)
    }
  }

}
