import { Component, signal, inject } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { WarehouseData } from '../../../models/warehouse-data';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WarehouseDialog } from '../../dialogs/warehouse-dialog/warehouse-dialog';
import { NotificationService } from 'core';
import { WarehouseService } from '../../../services/warehouse-service';
import { LocationDialog } from '../../dialogs/location-dialog/location-dialog';


class WarehouseDataItem {
  constructor(
    readonly warehouse: WarehouseData,
    readonly selected: boolean = false
  ) { }
}

@Component({
  selector: 'lib-warehouses',
  imports: [
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    FormField
  ],
  templateUrl: './warehouses.html',
  styleUrl: './warehouses.css',
})
export class Warehouses {

  model = signal({
    filter: '',
    warehouses: new Array<WarehouseDataItem>()
  });

  component = {
    errors: new Array<string>(),
    form: form(this.model, {

    })
  };

  private md = inject(MatDialog);
  private notification = inject(NotificationService);
  private ws = inject(WarehouseService);

  constructor() { }

  warehouses_fetch(): void {
    console.info('warehouses_fetch');

    const model = this.model();
    this.ws.warehouses_fetch(model.filter).subscribe({
      next: (warehouses) => {
        const w = warehouses.map((w) => new WarehouseDataItem(w, false));
        this.model.update((m) => ({
          ...m,
          warehouses: w
        }));
      },
      error: (e: any) => {
        console.error(e);
        this.notification.error(e);
      }
    });
  }

  on_new_warehouse(event: Event): void {
    event.preventDefault();

    let dr = this.md.open(WarehouseDialog, {
      position: {
        top: '1em',
        right: '1em'
      }
    });
    dr.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          console.debug(result);
        }
      },
      error: (e: any) => {
        console.error(e);
        this.notification.error(e);
      }
    })
  }

  on_new_location(event: Event): void {
    event.preventDefault();
    let dr = this.md.open(LocationDialog, {
      position: {
        top: '1em',
        right: '1em'
      }
    });
    dr.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          console.debug(result);
        }
      },
      error: (e: any) => {
        console.error(e);
        this.notification.error(e);
      }
    });
  }

  on_search(event: Event): void {
    event.preventDefault();
    this.warehouses_fetch();
  }

  on_clear(event: Event): void {
    event.preventDefault();
    this.model.update((m) => ({
      ...m,
      filter: ''
    }));
  }

  on_refresh(event: Event): void {
    event.preventDefault();
    this.warehouses_fetch();
  }
}
