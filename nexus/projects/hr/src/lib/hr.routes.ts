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
        path: 'employees',
        title: 'Employees',
        loadComponent: () => import('./ui/features/employees/employees').then((m) => m.Employees),
      },
      {
        path: 'organizations',
        title: 'Organizations',
        loadComponent: () => import('./ui/features/organizations/organizations').then((m) => m.Organizations),
      },
      {
        path: 'leaves',
        title: 'Leaves',
        loadComponent: () => import('./ui/features/leaves/leaves').then((m) => m.Leaves),
      },
    ],
  },
];
