import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppService } from '../../service/app.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserStore } from '../../core/user.store';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private app = inject(AppService)
  private cookies = inject(CookieService);
  private router = inject(Router);
  private userStore = inject(UserStore);

  loading = signal(false);
  error = signal<string | null>(null);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

submit() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.loading.set(true);
  this.error.set(null);

  this.app.login(this.form.getRawValue() as any).subscribe({
    next: (res) => {
      console.log(res,'res')
      if (res.success) {
        this.cookies.set('auth_token', res.token, { path: '/' });
        this.userStore.setUser({ email: res.user.email, token: res.token });
        this.router.navigateByUrl('/dashboard');
      }
      this.loading.set(false);
    },
    error: (err) => {
      this.loading.set(false);
      this.error.set(err?.error?.message || 'Login failed');
    }
  });
}

}
