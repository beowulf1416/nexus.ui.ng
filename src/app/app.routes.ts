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
        loadComponent: () => import('./components/dashboard/dashboard').then(c => c.Dashboard)
    },
    {
        path: 'tenant-admin',
        loadChildren: () => import('./modules/tenant-admin/tenant-admin-module').then(m => m.TenantAdminModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('./modules/admin/admin-module').then(m => m.AdminModule)
    },
    {
        path: '',
        loadComponent: () => import('./components/home/home').then(c => c.Home)
    }
];
