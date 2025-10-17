import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authorizedGuard } from '../../classes/guards/authorized-guard';
import { PERMISSIONS } from '../../classes/permissions';

import { Layout } from './components/layout/layout';

const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'tenants',
        title: 'Tenants',
        loadComponent: () => import('./components/tenants/tenants').then(c => c.Tenants)
      },
      {
        path: '',
        title: 'Admin Dashboard',
        canActivate: [
          authorizedGuard
        ],
        data: {
          permission: PERMISSIONS.admin_dashboard_view
        },
        loadComponent: () => import('./components/dashboard/dashboard').then(c => c.Dashboard)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
