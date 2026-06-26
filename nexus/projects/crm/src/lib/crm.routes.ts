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
        path: 'people',
        title: 'People',
        loadComponent: () => import('./ui/features/people/people').then((m) => m.People),
      },
      {
        path: 'businesses',
        title: 'Businesses',
        loadComponent: () => import('./ui/features/businesses/businesses').then((m) => m.Businesses),
      },
      {
        path: 'partners',
        title: 'Partners',
        loadComponent: () => import('./ui/features/partners/partners').then((m) => m.Partners),
      },
    ],
  },
];
