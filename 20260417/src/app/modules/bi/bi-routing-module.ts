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
        path: 'sources/new/sql',
        title: 'New SQL Data Source',
        loadComponent: () => import('./components/sources/sql-source/sql-source').then(c => c.SqlSource)
      },
      {
        path: 'sources',
        title: 'Data Sources',
        loadComponent: () => import('./components/sources-list/sources-list').then(c => c.SourcesList)
      },
      {
        path: 'reports/new',
        title: 'New Reports',
        loadComponent: () => import('./components/report/report').then(c => c.Report)
      },
      {
        path: 'reports',
        title: 'Reports',
        loadComponent: () => import('./components/report-list/report-list').then(c => c.ReportList)
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
