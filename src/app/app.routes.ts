import { Routes } from '@angular/router';
import { canActivateAuth } from './core/auth.guard';
import { canActivateLogin } from './core/login.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', 
    pathMatch: 'full',
     redirectTo: 'login'
  },
  
  { path: 'login', 
    component: LoginComponent, 
    canActivate: [canActivateLogin] 
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [canActivateAuth],
  },
  {
    path: 'list',
    canActivate: [canActivateAuth],
    loadChildren: () =>
      import('./pages/list-view/list-view.router').then(m => m.LIST_VIEW_ROUTES),
  },
  { path: '**', redirectTo: 'login' },
];
