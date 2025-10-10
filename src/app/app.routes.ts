import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/home/home').then(c => c.Home)
    },
    {
        path: 'sign-up',
        loadComponent: () => import('./components/sign-up/sign-up').then(c => c.SignUp)
    }
];
