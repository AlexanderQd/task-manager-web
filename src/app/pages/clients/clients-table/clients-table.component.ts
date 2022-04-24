import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UserService } from '@app/services';
import { ClientModel } from '@models';
import { ClientFormComponent } from '../client-form/client-form.component';


@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss']
})
export class ClientsTableComponent implements OnInit {
  @ViewChild(ClientFormComponent) clientForm!: ClientFormComponent
  @Output() editClient: EventEmitter<ClientModel> = new EventEmitter<ClientModel>()

  @Input() clients: ClientModel[] = []

  constructor(private userSvc: UserService) { }

  ngOnInit(): void {
  }

  setClient(client: ClientModel): void {
    this.editClient.emit(client)
  }

  // toggleActive(client: ClientModel): void {
  //   client.active = !client.active
  //   this.update(client)
  // }

  // private async update(client: ClientModel): Promise<void> {
  //   try {
  //     await this.clientSvc.update(client)
  //   } catch(e) {
  //     console.error(e)
  //   }
  // }
}
