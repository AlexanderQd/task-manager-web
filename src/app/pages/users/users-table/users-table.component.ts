import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UserService } from '@app/services';
import { UserModel } from '@models';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
  @ViewChild(UserFormComponent) userForm!: UserFormComponent
  @Output() editUser: EventEmitter<UserModel> = new EventEmitter<UserModel>()

  @Input() users: UserModel[] = []

  constructor(private userSvc: UserService) { }

  ngOnInit(): void {
  }


  setUser(user: UserModel): void {
    this.editUser.emit(user)
  }

  toggleActive(user: UserModel): void {
    user.active = !user.active
    this.update(user)
  }

  private async update(user: UserModel): Promise<void> {
    try {
      await this.userSvc.update(user)
    } catch(e) {
      console.error(e)
    }
  }
}
