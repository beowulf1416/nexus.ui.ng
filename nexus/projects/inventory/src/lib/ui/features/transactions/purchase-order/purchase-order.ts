import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { LocationSelector } from '../../../components/location-selector/location-selector';
import { MatInputModule } from '@angular/material/input';
import { UomSelector } from 'core';
import { form, FormField, required } from '@angular/forms/signals';


class ItemOrder {
  constructor(
    readonly item_id: string,
    readonly quantity: number,
    readonly dimension_id: number,
    readonly uom_id: number
  ) { }
}

@Component({
  selector: 'lib-purchase-order',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormField,
    LocationSelector,
    UomSelector
  ],
  templateUrl: './purchase-order.html',
  styleUrl: './purchase-order.css',
})
export class PurchaseOrder {
  model = signal({
    description: '',
    items: new Array<string>(),
    new_item: {
      item_id: '',
      quantity: 0,
      uom_id: 0,
    },
  });

  component = {
    form: form(this.model, (f) => {
      required(f.description, { message: 'Description is required' });
    })
  };

  new_item_invalid = computed(() => {
    const new_item = this.model().new_item;
    return new_item.item_id == '' || new_item.quantity == 0 || new_item.uom_id == 0;
  });

  constructor() { }

  on_submit(event: Event): void {
    event.preventDefault();

  }
}
