import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Sign Up',
    loadComponent: () => import('./ui/features/sign-up/sign-up').then((m) => m.SignUp),
  },
  {
    path: 'sign-up',
    title: 'Sign Up',
    loadComponent: () => import('./ui/features/sign-up/sign-up').then((m) => m.SignUp),
  },
  {
    path: 'sign-up/pw',
    title: 'Sign Up',
    loadComponent: () => import('./ui/features/sign-up-pw/sign-up-pw').then((m) => m.SignUpPw),
  },
];
