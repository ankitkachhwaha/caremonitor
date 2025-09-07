import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './core/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, AsyncPipe, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  onLogout() {
    this.auth.logout();
  }

  showLogout = this.router.events.pipe(
    filter(ev => ev instanceof NavigationEnd),
    map(() => this.auth.isAuthenticated())
  );
}
