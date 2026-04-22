import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./ui/features/sign-up/sign-up').then((m) => m.SignUp),
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./ui/features/sign-up/sign-up').then((m) => m.SignUp),
  },
  {
    path: 'sign-up/2',
    loadComponent: () =>
      import('./ui/features/sign-up-step-2/sign-up-step-2').then((m) => m.SignUpStep2),
  },
];
