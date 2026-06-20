import { Routes } from '@angular/router';

import { authenticatedGuard, authorizedGuard } from 'core';


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
        path: 'tenants',
        title: 'Tenants',
        data: {
          permission: 'tenant.list'
        },
        loadComponent: () => import('./ui/features/tenants/tenants').then((m) => m.Tenants),
      },
      {
        path: 'users',
        title: 'Users',
        data: {
          permission: 'tenant.users.list'
        },
        canActivate: [
          authenticatedGuard,
          authorizedGuard
        ],
        loadComponent: () => import('./ui/features/users/users').then((m) => m.Users),
      },
      {
        path: 'roles',
        title: 'Roles',
        data: {
          permission: 'tenant.roles.list'
        },
        loadComponent: () => import('./ui/features/roles/roles').then((m) => m.Roles),
      },
    ],
  },
];
