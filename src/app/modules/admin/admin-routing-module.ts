import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authorizedGuard } from '../../classes/guards/authorized-guard';

const routes: Routes = [
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
    loadComponent: () => import('./components/dashboard/dashboard').then(c => c.Dashboard)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
