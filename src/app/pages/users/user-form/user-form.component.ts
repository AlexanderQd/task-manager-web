import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '@app/models';
import { ModalService, UserService } from '@app/services';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @ViewChild('userModal') private modal!: TemplateRef<any>
  @Output() userResult: EventEmitter<UserModel> = new EventEmitter<UserModel>()
  form!: FormGroup
  submitted: boolean = false

  constructor(private formBuilder: FormBuilder, private userSvc: UserService, private modalSvc: ModalService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return;
    }

    const user: UserModel = this.form.getRawValue()
    user.id ? this.update(user) : this.create(user)
  }

  open(user?: UserModel): void {
    this.submitted = false
    this.modalSvc.openModal(this.modal)
    this.buildForm(user)
  }

  get id(): number | undefined {
    return this.form.get('id')?.value
  }

  private buildForm(user?: UserModel): void {
    this.form = this.formBuilder.group({
      id: [user?.id],
      name: [user?.name, Validators.required],
      email: [user?.email, [Validators.required, Validators.email]],
      password: [undefined, !user && Validators.required],
      active: [user ? user.active : true]
    })
  }

  private async create(current: UserModel): Promise<void> {
    try {
      const { user } = await this.userSvc.create(current)
      this.userResult.emit(user)
      this.modalSvc.closeModal()
    } catch(e) {
      console.error(e)
    }
  }

  private async update(current: UserModel): Promise<void> {
    try {
      const { user } = await this.userSvc.update(current)
      this.userResult.emit(user)
      this.modalSvc.closeModal()
    } catch(e) {
      console.error(e)
    }
  }
}
