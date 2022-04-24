import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskModel } from '@app/models';
import { ROUTES } from '@env/routes';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly base: string = ROUTES.base + ROUTES.tasks

  constructor(private http: HttpClient) { }

  getTask(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.base}/${id}`)
        .subscribe({
          next: (res: any)  => res.success ? resolve(res) : reject(res),
          error: err => reject(err)
        })
    })
  }

  getTasks(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.base}`)
        .subscribe({
          next: (res: any)  => res.success ? resolve(res) : reject(res),
          error: err => reject(err)
        })
    })
  }

  create(task: TaskModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.base, { task })
        .subscribe({
          next: (res: any)  => res.success ? resolve(res) : reject(res),
          error: err => reject(err)
        })
    })
  }

  update(task: TaskModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.base}/${task.id}`, { task })
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
