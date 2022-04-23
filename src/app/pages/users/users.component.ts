import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from '@app/models';
import { UserService } from '@services';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild(UserFormComponent) userForm!: UserFormComponent
  users: UserModel[] = []
  readonly itemsPerPage: number = 25

  constructor(private userSvc: UserService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  openForm(user?: UserModel): void {
    this.userForm.open(user)
  }

  insertUser(user: UserModel): void {
    const index: number = this.users.findIndex((current: UserModel) => user.id === current.id)
    // if (index === -1 && this.users.length < this.itemsPerPage) { <- para cuando pagine
      if (index === -1) {
      this.users.push(user)
    } else if (index !== -1) {
      this.users[index] = user
    }
  }

  private async getUsers(): Promise<void> {
    try {
      const { users } = await this.userSvc.geUsers()
      this.users = users
    } catch(e) {
      console.error(e)
    }
  }

}
