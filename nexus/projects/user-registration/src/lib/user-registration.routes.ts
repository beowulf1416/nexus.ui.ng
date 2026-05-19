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
  {
    path: 'info-email',
    title: 'Verify Email',
    loadComponent: () => import('./ui/features/info-email/info-email').then((m) => m.InfoEmail)
  },
  {
    path: 'success',
    title: 'Successfully Registered',
    loadComponent: () => import('./ui/features/success-registration/success-registration').then((m) => m.SuccessRegistration)
  }
];
