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
        path: 'accounts',
        title: 'Chart Of Accounts',
        loadComponent: () => import('./ui/features/accounts/accounts').then((m) => m.Accounts),
      },
      {
        path: 'invoices',
        title: 'Invoices',
        loadComponent: () => import('./ui/features/invoices/invoices').then((m) => m.Invoices),
      },
    ],
  },
];
