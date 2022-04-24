import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientModel, ProjectModel, UserModel } from '@app/models';
import { ProjectService } from '@services';
import { ProjectFormComponent } from './project-form/project-form.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  @ViewChild(ProjectFormComponent) projectForm!: ProjectFormComponent
  projects: ProjectModel[] = []
  clients: ClientModel[] = []
  users: UserModel[] = []
  readonly itemsPerPage: number = 25

  constructor(private projectSvc: ProjectService) { }

  ngOnInit(): void {
    this.getProjects()
  }

  openForm(project?: ProjectModel): void {
    this.projectForm.open(project)
  }

  insertProject(project: ProjectModel): void {
    const index: number = this.projects.findIndex((current: ProjectModel) => project.id === current.id)
    // if (index === -1 && this.projects.length < this.itemsPerPage) { <- para cuando pagine
      if (index === -1) {
      this.projects.push(project)
    } else if (index !== -1) {
      this.projects[index] = project
    }
  }

  private async getProjects(): Promise<void> {
    try {
      const { projects, clients, users } = await this.projectSvc.getProjects()
      this.projects = projects
      this.clients = clients
      this.users = users
    } catch(e) {
      console.error(e)
    }
  }


}
