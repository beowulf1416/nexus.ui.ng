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
        path: '',
        title: 'Chart Of Accounts',
        loadComponent: () => import('./ui/features/accounts/accounts').then((m) => m.Accounts),
      },
    ],
  },
];
