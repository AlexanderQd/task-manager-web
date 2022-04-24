import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterModel } from '@app/models';
import { ROUTES } from '@env/routes';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly base: string = ROUTES.base + ROUTES.tasks_registers

  constructor(private http: HttpClient) { }

  getCurrent(userId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.base}/current_register_of_user/${userId}`)
        .subscribe({
          next: (res: any) => res.success ? resolve(res) : reject(res),
          error: err => reject(err)
        })
    })
  }

  create(register: RegisterModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.base, { register })
        .subscribe({
          next: (res: any)  => res.success ? resolve(res) : reject(res),
          error: err => reject(err)
        })
    })
  }

  update(register: RegisterModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.base}/${register.id}`, { register })
        .subscribe({
          next: (res: any)  => res.success ? resolve(res) : reject(res),
          error: err => reject(err)
        })
    })
  }
}
