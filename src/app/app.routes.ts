import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'calendar',
        loadComponent: () =>
          import('./pages/calendar.component').then(m => m.CalendarComponent),
      },
      // weitere Child-Routen hier
      { path: '', redirectTo: 'calendar', pathMatch: 'full' }
    ]
  },
];
