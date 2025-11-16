import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './components/layout/layout';

const routes: Routes = [
  {
    path: '',
    title: 'Tenants',
    component: Layout,
    children: [
      {
        path: 'tenant/new',
        title: 'Tenant',
        loadComponent: () => import('./components/tenant/tenant').then(c => c.Tenant)
      },
      {
        path: 'tenant/edit/:tenant_id',
        title: 'Tenant',
        loadComponent: () => import('./components/tenant/tenant').then(c => c.Tenant)
      },
      {
        path: 'tenants',
        title: 'Tenants',
        loadComponent: () => import('./components/tenants/tenants').then(c => c.Tenants)
      },
      {
        path: 'users',
        title: 'Users',
        loadComponent: () => import('./components/users/users').then(c => c.Users)
      },
      {
        path: 'roles',
        title: 'Roles',
        loadComponent: () => import('./components/roles/roles').then(c => c.Roles)
      },
      {
        path: '',
        title: 'Dashboard',
        loadComponent: () => import('./components/dashboard/dashboard').then(c => c.Dashboard)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantsRoutingModule { }
