import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/home/home').then(c => c.Home)
    },
    {
        path: 'user/sign-up',
        loadChildren: () => import('./modules/user-registration/user-registration-module').then(m => m.UserRegistrationModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/authentication/authentication-module').then(m => m.AuthenticationModule)
    }
];
