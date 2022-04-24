import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientModel, ProjectModel, UserModel } from '@app/models';
import { ModalService, ProjectService } from '@app/services';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  @ViewChild('projectModal') private modal!: TemplateRef<any>
  @Output() projectResult: EventEmitter<ProjectModel> = new EventEmitter<ProjectModel>()
  @Input() clients: ClientModel[] = []
  @Input() users: UserModel[] = []

  form!: FormGroup
  submitted: boolean = false

  constructor(private formBuilder: FormBuilder, private projectSvc: ProjectService, private modalSvc: ModalService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return;
    }

    const project: ProjectModel = this.form.getRawValue()
    project.id ? this.update(project) : this.create(project)
  }

  open(project?: ProjectModel): void {
    this.submitted = false
    this.modalSvc.openModal(this.modal)
    this.buildForm(project)
  }

  get id(): number | undefined {
    return this.form.get('id')?.value
  }

  private buildForm(project?: ProjectModel): void {
    this.form = this.formBuilder.group({
      id: [project?.id],
      title: [project?.title, Validators.required],
      client_id: [project?.client_id],
      user_ids: [project?.user_ids]
    })
  }

  private async create(current: ProjectModel): Promise<void> {
    try {
      const { project } = await this.projectSvc.create(current)
      this.projectResult.emit(project)
      this.modalSvc.closeModal()
    } catch(e) {
      console.error(e)
    }
  }

  private async update(current: ProjectModel): Promise<void> {
    try {
      const { project } = await this.projectSvc.update(current)
      this.projectResult.emit(project)
      this.modalSvc.closeModal()
    } catch(e) {
      console.error(e)
    }
  }

}
