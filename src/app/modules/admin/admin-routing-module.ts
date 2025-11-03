import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authorizedGuard } from '../../classes/guards/authorized-guard';
import { PERMISSIONS } from '../../classes/permissions';

import { Layout } from './components/layout/layout';

const routes: Routes = [
  {
    path: 'tenants',
    title: 'Tenants',
    loadChildren: () => import('./modules/tenants/tenants-module').then(m => m.TenantsModule)
  },
  {
    path: 'users',
    title: 'Users',
    loadChildren: () => import('./modules/users/users-module').then(m => m.UsersModule)
  },
  {
    path: 'roles',
    title: 'Roles',
    loadChildren: () => import('./modules/roles/roles-module').then(m => m.RolesModule)
  }
  // {
  //   path: '',
  //   component: Layout,
  //   children: [
  //     // {
  //     //   path: 'tenants',
  //     //   title: 'Tenants',
  //     //   loadComponent: () => import('./components/tenants/tenants').then(c => c.Tenants)
  //     // },
  //     {
  //       path: 'tenants',
  //       title: 'Tenants',
  //       loadChildren: () => import('./modules/tenants/tenants-module').then(m => m.TenantsModule)
  //     },
  //     {
  //       path: 'tenant/new',
  //       title: 'New Tenant',
  //       loadComponent: () => import('./components/tenant/tenant').then(c => c.Tenant)
  //     },
  //     {
  //       path: 'tenant/view/:tenant_id',
  //       title: 'View Tenant',
  //       loadComponent: () => import('./components/tenant/tenant').then(c => c.Tenant)
  //     },
  //     {
  //       path: '',
  //       title: 'Admin Dashboard',
  //       // canActivate: [
  //       //   authorizedGuard
  //       // ],
  //       data: {
  //         permission: PERMISSIONS.admin_dashboard_view
  //       },
  //       loadComponent: () => import('./components/dashboard/dashboard').then(c => c.Dashboard)
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
