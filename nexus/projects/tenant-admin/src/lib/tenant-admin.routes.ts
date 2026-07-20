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
        path: 'users',
        title: 'Users',
        data: {
          permission: 'tenant.users.list'
        },
        loadComponent: () => import('./ui/features/users/users').then((m) => m.Users),
      },
      {
        path: 'roles',
        title: 'Roles',
        data: {
          permission: 'tenant.roles.list'
        },
        canActivate: [
          authenticatedGuard,
          authorizedGuard
        ],
        loadComponent: () => import('./ui/features/roles/roles').then((m) => m.Roles),
      },
      {
        path: 'organizations',
        title: 'Organizations',
        data: {
          permission: 'tenant.organizations.list'
        },
        loadComponent: () => import('./ui/features/organizations/organizations').then((m) => m.Organizations),
      },
    ],
  },
];
