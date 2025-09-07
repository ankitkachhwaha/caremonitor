import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private cookies = inject(CookieService);
  private router = inject(Router);
  private userStore = inject(UserStore);

  logout() {
    this.cookies.delete('auth_token', '/');
    this.userStore.clear();
    this.router.navigateByUrl('/login');
  }

  isAuthenticated(): boolean {
    return this.cookies.check('auth_token');
  }

  getToken(): string | null {
    return this.cookies.get('auth_token') || null;
  }
}
