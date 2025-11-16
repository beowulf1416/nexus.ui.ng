import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/layout/layout').then(c => c.Layout),
    children: [
      {
        path: 'roles',
        title: 'Roles',
        loadComponent: () => import('./components/roles/roles').then(c => c.Roles)
      },
      {
        path: 'role/new',
        title: 'New Role',
        loadComponent: () => import('./components/role/role').then(c => c.Role)
      },
      {
        path: 'users',
        title: 'Users',
        loadComponent: () => import('./components/users/users').then(c => c.Users)
      },
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadComponent: () => import('./components/dashboard/dashboard').then(c => c.Dashboard)
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
export class TenantAdminRoutingModule { }
