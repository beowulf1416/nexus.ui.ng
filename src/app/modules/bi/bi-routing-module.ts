import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './components/layout/layout';

const routes: Routes = [
  {
    path: '',
    title: 'Business Intelligence',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        title: 'BI Dashboard',
        loadComponent: () => import('./components/dashboard/dashboard').then(c => c.Dashboard)
      },
      {
        path: 'sources',
        title: 'Data Sources',
        loadComponent: () => import('./components/sources-list/sources-list').then(c => c.SourcesList)
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
export class BiRoutingModule { }
