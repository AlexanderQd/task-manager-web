import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ROUTES } from '@env/routes';
import { UserModel } from '@models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly base: string = ROUTES.base + ROUTES.users

  constructor(private http: HttpClient) { }

  getUser(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.base}/${id}`)
        .subscribe({
          next: (res: any)  => res.success ? resolve(res) : reject(res),
          error: err => reject(err)
        })
    })
  }

  geUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.base}`)
        .subscribe({
          next: (res: any)  => res.success ? resolve(res) : reject(res),
          error: err => reject(err)
        })
    })
  }

  create(user: UserModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.base, { user })
        .subscribe({
          next: (res: any)  => res.success ? resolve(res) : reject(res),
          error: err => reject(err)
        })
    })
  }

  update(user: UserModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.base}/${user.id}`, { user })
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
