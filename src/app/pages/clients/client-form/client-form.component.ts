import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientModel } from '@app/models';
import { ModalService, ClientService } from '@app/services';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
  @ViewChild('clientModal') private modal!: TemplateRef<any>
  @Output() clientResult: EventEmitter<ClientModel> = new EventEmitter<ClientModel>()
  form!: FormGroup
  submitted: boolean = false

  constructor(private formBuilder: FormBuilder, private clientSvc: ClientService, private modalSvc: ModalService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return;
    }

    const client: ClientModel = this.form.getRawValue()
    client.id ? this.update(client) : this.create(client)
  }

  open(client?: ClientModel): void {
    this.submitted = false
    this.modalSvc.openModal(this.modal)
    this.buildForm(client)
  }

  get id(): number | undefined {
    return this.form.get('id')?.value
  }

  private buildForm(client?: ClientModel): void {
    this.form = this.formBuilder.group({
      id: [client?.id],
      name: [client?.name, Validators.required]
    })
  }

  private async create(current: ClientModel): Promise<void> {
    try {
      const { client } = await this.clientSvc.create(current)
      this.clientResult.emit(client)
      this.modalSvc.closeModal()
    } catch(e) {
      console.error(e)
    }
  }

  private async update(current: ClientModel): Promise<void> {
    try {
      const { client } = await this.clientSvc.update(current)
      this.clientResult.emit(client)
      this.modalSvc.closeModal()
    } catch(e) {
      console.error(e)
    }
  }

}
