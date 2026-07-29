import { Component, inject, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ItemData } from '../../../models/item-data';
import { MatDialog } from '@angular/material/dialog';

import { WarehouseDialog } from '../../dialogs/warehouse-dialog/warehouse-dialog';
import { LocationDialog } from '../../dialogs/location-dialog/location-dialog';
import { ItemDialog } from '../../dialogs/item-dialog/item-dialog';


@Component({
  selector: 'lib-items',
  imports: [
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,],
  templateUrl: './items.html',
  styleUrl: './items.css',
})
export class Items {

  model = signal({
    filter: '',
    warehouses: new Array<ItemData>()
  });

  component = {
    errors: new Array<string>(),
    form: form(this.model, {

    })
  };

  private md = inject(MatDialog);

  constructor() { }

  on_new_item(event: Event): void {
    event.preventDefault();

    let dr = this.md.open(ItemDialog, {
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
      }
    });
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
      }
    });
  }

  on_search(event: Event): void {
    event.preventDefault();
    this.items_fetch();
  }

  on_refresh(event: Event): void {
    event.preventDefault();
  }

  on_clear(event: Event): void {
    event.preventDefault();
    this.model.update((m) => ({
      ...m,
      filter: ''
    }));
  }

  items_fetch(): void {
    console.info('items_fetch');
  }
}
