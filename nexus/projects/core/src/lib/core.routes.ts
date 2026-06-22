import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./ui/features/sign-in/sign-in').then((m) => m.SignIn),
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./ui/features/sign-in/sign-in').then((m) => m.SignIn),
  },
  {
    path: 'sign-out',
    loadComponent: () => import('./ui/features/sign-out/sign-out').then((m) => m.SignOut),
  },
  {
    path: 'tenant/:tenant_id',
    loadComponent: () => import('./ui/features/tenant-select/tenant-select').then((m) => m.TenantSelect),
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./ui/features/unauthorized/unauthorized').then((m) => m.Unauthorized),
  },

];
