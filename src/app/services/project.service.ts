import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectModel } from '@app/models';
import { ROUTES } from '@env/routes';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly base: string = ROUTES.base + ROUTES.projects

  constructor(private http: HttpClient) { }

  getProject(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.base}/${id}`)
        .subscribe({
          next: (res: any)  => res.success ? resolve(res) : reject(res),
          error: err => reject(err)
        })
    })
  }

  getProjects(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.base}`)
        .subscribe({
          next: (res: any)  => res.success ? resolve(res) : reject(res),
          error: err => reject(err)
        })
    })
  }

  create(project: ProjectModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.base, { project })
        .subscribe({
          next: (res: any)  => res.success ? resolve(res) : reject(res),
          error: err => reject(err)
        })
    })
  }

  update(project: ProjectModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.base}/${project.id}`, { project })
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
