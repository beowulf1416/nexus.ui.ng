import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    loadComponent: () => import('./ui/features/home/home').then((m) => m.Home),
    children: [
      {
        path: '',
        title: 'Dashboard',
        loadComponent: () => import('./ui/features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'users',
        title: 'Users',
        loadComponent: () => import('./ui/features/tenants/tenants').then((m) => m.Tenants),
      },
    ],
  },
];
