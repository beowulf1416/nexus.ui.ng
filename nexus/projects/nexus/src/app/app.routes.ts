import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./ui/features/home/home').then((m) => m.Home),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./ui/features/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'user/registration',
    loadChildren: () => import('user-registration').then((m) => m.routes),
  },
  // {
  //   path: 'auth',
  //   loadChildren: () => import('auth').then((m) => m.routes),
  // },
  {
    path: 'session',
    loadChildren: () => import('core').then((m) => m.routes),
  },
  {
    path: 'admin/users',
    title: 'Users',
    loadChildren: () => import('admin-users').then((m) => m.routes),
  },
  {
    path: 'admin/tenants',
    title: 'Tenants',
    loadChildren: () => import('admin-tenants').then((m) => m.routes),
  },
];
