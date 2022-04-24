import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectModel, TaskModel } from '@app/models';
import { ModalService, TaskService } from '@app/services';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  @ViewChild('taskModal') private modal!: TemplateRef<any>
  @Output() taskResult: EventEmitter<TaskModel> = new EventEmitter<TaskModel>()
  @Input() projects: ProjectModel[] = []
  @Input() tasksStatus: any[] = []

  form!: FormGroup
  submitted: boolean = false

  constructor(private formBuilder: FormBuilder, private taskSvc: TaskService, private modalSvc: ModalService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return;
    }

    const user: TaskModel = this.form.getRawValue()
    user.id ? this.update(user) : this.create(user)
  }

  open(task?: TaskModel): void {
    this.submitted = false
    this.modalSvc.openModal(this.modal)
    this.buildForm(task)
  }

  get id(): number | undefined {
    return this.form.get('id')?.value
  }

  private buildForm(task?: TaskModel): void {
    this.form = this.formBuilder.group({
      id: [task?.id],
      name: [task?.name, Validators.required],
      status_cd: [task?.status_cd, Validators.required],
      project_id: [task?.project_id],
      finished: [task?.finished]
    })
  }

  private async create(current: TaskModel): Promise<void> {
    try {
      const { task } = await this.taskSvc.create(current)
      this.taskResult.emit(task)
      this.modalSvc.closeModal()
    } catch(e) {
      console.error(e)
    }
  }

  private async update(current: TaskModel): Promise<void> {
    try {
      const { task } = await this.taskSvc.update(current)
      this.taskResult.emit(task)
      this.modalSvc.closeModal()
    } catch(e) {
      console.error(e)
    }
  }

}
