import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './components/layout/layout';
import { Dashboard } from './components/dashboard/dashboard';

const routes: Routes = [
  {
    path: '',
    title: 'Roles',
    component: Layout,
    children: [
      {
        path: 'role/new',
        title: 'New Role',
        loadComponent: () => import('./components/role/role').then(c => c.Role)
      },
      {
        path: 'role/:id',
        title: 'Role',
        loadComponent: () => import('./components/role/role').then(c => c.Role)
      },
      {
        path: '',
        title: 'Roles',
        loadComponent: () => import('./components/dashboard/dashboard').then(c => c.Dashboard)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
