import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './auth/login/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component'),
  },
  {
    path: 'home',
    canActivate: [isAuthenticatedGuard()],
    loadComponent: () => import('./home/home.component'),
  },
  {
    path: 'recados',
    canActivate: [isAuthenticatedGuard()],
    loadComponent: () => import('./recados/recados.component'),
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { 
    path: '**', 
    redirectTo: '/login' 
  }
];
