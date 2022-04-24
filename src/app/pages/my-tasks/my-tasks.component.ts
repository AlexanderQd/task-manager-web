import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskFormComponent } from '@app/components/task-form/task-form.component';
import { ProjectModel, TaskModel } from '@app/models';
import { TaskService } from '@services';


@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent implements OnInit {
  @ViewChild(TaskFormComponent) taskForm!: TaskFormComponent
  tasks: TaskModel[] = []
  projects: ProjectModel[] = []
  taskStatus: any[] = [{ name: 'To do', id: 0}, { name: 'Doing', id: 1}, { name: 'Done', id: 2}] // TODO: Pasar esto a backend y que lo envie el
  filters: any = {}

  readonly itemsPerPage: number = 25

  constructor(private taskSvc: TaskService) { }

  ngOnInit(): void {
    this.filters['q[]'] // TODO: asignar tareas a usuarios de alguna forma al crearlas
    this.getTasks()
  }

  openForm(task?: TaskModel): void {
    this.taskForm.open(task)
  }

  insertTask(task: TaskModel): void {
    const index: number = this.tasks.findIndex((current: TaskModel) => task.id === current.id)
    // if (index === -1 && this.tasks.length < this.itemsPerPage) { <- para cuando pagine
      if (index === -1) {
      this.tasks.push(task)
    } else if (index !== -1) {
      this.tasks[index] = task
    }
  }

  private async getTasks(): Promise<void> {
    try {
      const { tasks, projects } = await this.taskSvc.getTasks()
      this.projects = projects
      this.tasks = tasks
    } catch(e) {
      console.error(e)
    }
  }
}
