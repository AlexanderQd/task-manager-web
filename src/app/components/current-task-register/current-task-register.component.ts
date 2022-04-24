import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '@app/models';
import { AuthService, RegisterService } from '@app/services';

@Component({
  selector: 'app-current-task-register',
  templateUrl: './current-task-register.component.html',
  styleUrls: ['./current-task-register.component.scss']
})
export class CurrentTaskRegisterComponent implements OnInit {
  register!: RegisterModel
  constructor(private registerSvc: RegisterService, private authSvc: AuthService) { }

  ngOnInit(): void {
    this.getCurrentRegister()
  }

  private async getCurrentRegister(): Promise<void> {
    try {
      const { register } = await this.registerSvc.getCurrent(this.authSvc.currentUser?.id)
      this.register = register
    } catch(e) {
      console.error(e)
    }
  }
}
