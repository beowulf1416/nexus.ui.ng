import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './components/layout/layout';

const routes: Routes = [
  {
    path: '',
    title: 'Inventory',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        title: 'Inventory Dashboard',
        loadComponent: () => import('./components/dashboard/dashboard').then(c => c.Dashboard)
      },
      {
        path: 'warehouses/new',
        title: 'New Warehouse',
        loadComponent: () => import('./components/warehouse/warehouse').then(c => c.Warehouse)
      },
      {
        path: 'warehouses/list',
        title: 'Warehouses',
        loadComponent: () => import('./components/warehouses/warehouses').then(c => c.Warehouses)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
