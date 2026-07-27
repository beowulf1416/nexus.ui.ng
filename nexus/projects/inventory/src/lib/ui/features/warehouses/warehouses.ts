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

@Component({
  selector: 'lib-warehouses',
  imports: [
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule
  ],
  templateUrl: './warehouses.html',
  styleUrl: './warehouses.css',
})
export class Warehouses {

  model = signal({
    filter: '',
    warehouses: new Array<WarehouseData>()
  });

  component = {
    errors: new Array<string>(),
    form: form(this.model, {

    })
  };

  private md = inject(MatDialog);
  private notification = inject(NotificationService);

  constructor() { }

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

  on_search(event: Event): void {
    event.preventDefault();

  }

  on_clear(event: Event): void {
    event.preventDefault();

  }

  on_refresh(event: Event): void {
    event.preventDefault();

  }
}
