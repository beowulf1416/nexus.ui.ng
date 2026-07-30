import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    loadComponent: () => import('./ui/features/home/home').then((m) => m.Home),
    children: [
      {
        path: '',
        title: 'Dashboard',
        loadComponent: () => import('./ui/features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'warehouses',
        title: 'Warehouses',
        loadComponent: () => import('./ui/features/warehouses/warehouses').then((m) => m.Warehouses),
      },
      {
        path: 'locations',
        title: 'Locations',
        loadComponent: () => import('./ui/features/locations/locations').then((m) => m.Locations),
      },
      {
        path: 'items',
        title: 'Items',
        loadComponent: () => import('./ui/features/items/items').then((m) => m.Items),
      },
      {
        path: 'items/:item_id',
        title: 'Item',
        loadComponent: () => import('./ui/features/item/item').then((m) => m.Item),
      },
      {
        path: 'transactions',
        title: 'Transactions',
        loadComponent: () => import('./ui/features/transactions/transactions').then((m) => m.Transactions),
      },
      {
        path: 'transactions/po',
        title: 'Purchase Orders',
        loadComponent: () => import('./ui/features/transactions/purchase-order/purchase-order').then((m) => m.PurchaseOrder),
      },
    ],
  },
];
