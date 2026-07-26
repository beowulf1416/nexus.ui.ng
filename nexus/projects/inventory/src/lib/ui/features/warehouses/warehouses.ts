import { Component, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { WarehouseData } from '../../../models/warehouse-data';

@Component({
  selector: 'lib-warehouses',
  imports: [
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
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

  constructor() { }

  on_new_warehouse(event: Event): void {
    event.preventDefault();
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
