import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientModel } from '@app/models';
import { ROUTES } from '@env/routes';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private readonly base: string = ROUTES.base + ROUTES.clients

  constructor(private http: HttpClient) { }

  getClient(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.base}/${id}`)
        .subscribe({
          next: (res: any)  => res.success ? resolve(res) : reject(res),
          error: err => reject(err)
        })
    })
  }

  geClients(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.base}`)
        .subscribe({
          next: (res: any)  => res.success ? resolve(res) : reject(res),
          error: err => reject(err)
        })
    })
  }

  create(client: ClientModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.base, { client })
        .subscribe({
          next: (res: any)  => res.success ? resolve(res) : reject(res),
          error: err => reject(err)
        })
    })
  }

  update(client: ClientModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.base}/${client.id}`, { client })
        .subscribe({
          next: (res: any)  => res.success ? resolve(res) : reject(res),
          error: err => reject(err)
        })
    })
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.base}/${id}`)
        .subscribe({
          next: (res: any)  => res.success ? resolve(res) : reject(res),
          error: err => reject(err)
        })
    })
  }
}
