import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ProjectService } from '@app/services';
import { ProjectModel } from '@models';
import { ProjectFormComponent } from '../project-form/project-form.component';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.scss']
})
export class ProjectsTableComponent implements OnInit {

  @ViewChild(ProjectFormComponent) projectForm!: ProjectFormComponent
  @Output() editProject: EventEmitter<ProjectModel> = new EventEmitter<ProjectModel>()

  @Input() projects: ProjectModel[] = []

  constructor(private projectSvc: ProjectService) { }

  ngOnInit(): void {
  }

  setProject(project: ProjectModel): void {
    this.editProject.emit(project)
  }

  // private async update(project: ProjectModel): Promise<void> {
  //   try {
  //     await this.projectSvc.update(project)
  //   } catch(e) {
  //     console.error(e)
  //   }
  // }

}
