import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Documents',
    loadComponent: () => import('./ui/features/files/files').then((m) => m.Files)
  },
];
