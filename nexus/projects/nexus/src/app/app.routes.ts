import { Routes } from '@angular/router';

import { authenticatedGuard } from 'core';


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
    canActivate: [
      authenticatedGuard
    ],
    loadChildren: () => import('admin-tenants').then((m) => m.routes),
  },
  {
    path: 'documents',
    title: 'Documents',
    loadChildren: () => import('documents').then((m) => m.routes),
  },
  {
    path: 'inventory',
    title: 'Inventory',
    loadChildren: () => import('inventory').then((m) => m.routes),
  },
  {
    path: 'projects',
    title: 'Projects',
    loadChildren: () => import('projects').then((m) => m.routes),
  },
  {
    path: 'payables',
    title: 'Payables',
    loadChildren: () => import('payables').then((m) => m.routes)
  },
  {
    path: 'accounting',
    title: 'Accounting',
    loadChildren: () => import('accounting').then((m) => m.routes)
  },
  {
    path: 'crm',
    title: 'Customer Relations',
    loadChildren: () => import('crm').then((m) => m.routes)
  }
];
