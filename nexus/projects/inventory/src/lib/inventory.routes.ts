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
        path: 'warehouses',
        title: 'Warehouses',
        loadComponent: () => import('./ui/features/warehouses/warehouses').then((m) => m.Warehouses),
      },
      {
        path: 'locations',
        title: 'Locations',
        loadComponent: () => import('./ui/features/locations/locations').then((m) => m.Locations),
      },
    ],
  },
];
