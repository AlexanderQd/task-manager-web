import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientModel } from '@app/models';
import { ClientService } from '@services';
import { ClientFormComponent } from './client-form/client-form.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})

export class ClientsComponent implements OnInit {
  @ViewChild(ClientFormComponent) clientForm!: ClientFormComponent
  clients: ClientModel[] = []
  readonly itemsPerPage: number = 25

  constructor(private clientSvc: ClientService) { }

  ngOnInit(): void {
    this.getClients()
  }

  openForm(client?: ClientModel): void {
    this.clientForm.open(client)
  }

  insertClient(client: ClientModel): void {
    const index: number = this.clients.findIndex((current: ClientModel) => client.id === current.id)
    // if (index === -1 && this.clients.length < this.itemsPerPage) { <- para cuando pagine
      if (index === -1) {
      this.clients.push(client)
    } else if (index !== -1) {
      this.clients[index] = client
    }
  }

  private async getClients(): Promise<void> {
    try {
      const { clients } = await this.clientSvc.geClients()
      this.clients = clients
    } catch(e) {
      console.error(e)
    }
  }

}
