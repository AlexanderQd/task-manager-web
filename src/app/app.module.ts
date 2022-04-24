import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsComponent } from './pages/projects/projects.component';
import { UsersComponent } from './pages/users/users.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { NoCacheHeadersInterceptor } from './interceptors/not-cache-headers.interceptor';
import { UsersTableComponent } from './pages/users/users-table/users-table.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectComponent } from './components/select/select.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientsTableComponent } from './pages/clients/clients-table/clients-table.component';
import { ClientFormComponent } from './pages/clients/client-form/client-form.component';
import { ProjectFormComponent } from './pages/projects/project-form/project-form.component';
import { ProjectsTableComponent } from './pages/projects/projects-table/projects-table.component';
import { MyTasksComponent } from './pages/my-tasks/my-tasks.component';
import { TasksTableComponent } from './components/tasks-table/tasks-table.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { CurrentTaskRegisterComponent } from './components/current-task-register/current-task-register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    InputComponent,
    ProjectsComponent,
    UsersComponent,
    ReportsComponent,
    UsersTableComponent,
    UserFormComponent,
    SelectComponent,
    ClientsComponent,
    ClientsTableComponent,
    ClientFormComponent,
    ProjectFormComponent,
    ProjectsTableComponent,
    MyTasksComponent,
    TasksTableComponent,
    TaskFormComponent,
    CurrentTaskRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoCacheHeadersInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
