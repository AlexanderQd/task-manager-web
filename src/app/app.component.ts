import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authSvc: AuthService, private userSvc: UserService, private route: Router) {
    this.getUser()
  }

  get currentUser(): any {
    return this.authSvc.currentUser
  }

  private async getUser(): Promise<void> {
    try {
      const userId: string | null = localStorage.getItem('currentUserId')
      if (userId) {
        const { user } = await this.userSvc.getUser(userId)
        this.authSvc.currentUser = user
      } else {
        localStorage.clear()
        this.route.navigate(['/home'])
      }
    } catch (e) {
      console.error(e)
    }
  }
}
