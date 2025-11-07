import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './components/layout/layout';

const routes: Routes = [
  {
    path: '',
    title: 'Admin Users',
    component: Layout,
    children: [
      {
        path: 'users',
        title: 'Users',
        loadComponent: () => import('./components/users/users').then(c => c.Users)
      },
      {
        path: 'dashboard',
        redirectTo: ''
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
export class UsersRoutingModule { }
