import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'user/sign-up',
        loadChildren: () => import('./modules/user-registration/user-registration-module').then(m => m.UserRegistrationModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/authentication/authentication-module').then(m => m.AuthenticationModule)
    },
    {
        path: 'dashboard',
        title: 'Dashboard',
        loadComponent: () => import('./components/dashboard/dashboard').then(c => c.Dashboard)
    },
    {
        path: 'tenant/admin',
        loadChildren: () => import('./modules/tenant-admin/tenant-admin-module').then(m => m.TenantAdminModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('./modules/admin/admin-module').then(m => m.AdminModule)
    },
    {
        path: 'anonymous',
        title: 'Anonymous',
        loadComponent: () => import('./components/anonymous/anonymous').then(c => c.Anonymous)
    },
    {
        path: 'unauthorized',
        title: 'Unauthorized',
        loadComponent: () => import('./components/unauthorized/unauthorized').then(c => c.Unauthorized)
    },
    {
        path: '',
        title: 'Home',
        loadComponent: () => import('./components/home/home').then(c => c.Home)
    },
    {
        path: '**',
        title: 'Not Found',
        loadComponent: () => import('./components/not-found/not-found').then(c => c.NotFound)
    }
];
