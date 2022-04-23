import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any
  constructor() { }

  async login(email: string, password: string): Promise<any> {
    this.currentUser = { name: 'Alexander Quintana Diaz', email }
    return true
  }

  async logout(): Promise<any> {
    
  }
}
