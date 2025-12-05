import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly ADMIN_USERNAME = 'admin';
  private readonly ADMIN_PASSWORD = 'admin';

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === this.ADMIN_USERNAME && password === this.ADMIN_PASSWORD) {
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  checkAuthStatus(): void {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}
