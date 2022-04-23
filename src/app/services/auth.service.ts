import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ROUTES } from '@env/routes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any
  constructor(private http: HttpClient) { }

  async login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(ROUTES.base + ROUTES.login, { authentication: { email, password } })
        .subscribe({
          next: (res: any) => {
            const { user, token } = res
            if (token) {
              localStorage.setItem('token', token)
              localStorage.setItem('currentUserId', user.id)
              this.currentUser = user
              resolve(token)
            } else {
              reject(res)
            }
          },
          error: (err) => reject(err)
        })
    })
  }

  async logout(): Promise<any> {

  }
}
