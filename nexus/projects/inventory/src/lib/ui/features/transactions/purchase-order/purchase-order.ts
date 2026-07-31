import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
// import { LocationSelector } from '../../../components/location-selector/location-selector';
import { MatInputModule } from '@angular/material/input';
import { UomSelector } from 'core';
import { form, FormField, required } from '@angular/forms/signals';
import { ItemSelector } from '../../../components/item-selector/item-selector';
import { ItemData } from '../../../../models/item-data';


class ItemOrderRow {
  constructor(
    readonly item: ItemData,
    public quantity: number,
    public dimension_id: number,
    public uom_id: number
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
    // LocationSelector,
    UomSelector,
    ItemSelector
  ],
  templateUrl: './purchase-order.html',
  styleUrl: './purchase-order.css',
})
export class PurchaseOrder {
  model = signal({
    description: '',
    items: new Array<ItemOrderRow>(),
    new_item: {
      item_id: '',
      quantity: 0,
      uom_id: '',
    },
  });

  component = {
    form: form(this.model, (f) => {
      required(f.description, { message: 'Description is required' });
    })
  };

  new_item_invalid = computed(() => {
    const new_item = this.model().new_item;
    return new_item.item_id == '' || new_item.quantity == 0 || new_item.uom_id == '';
  });

  constructor() { }

  on_submit(event: Event): void {
    event.preventDefault();

  }

  on_items_selected(items: Array<ItemData>): void {
    const new_items = this.model().items.concat(items.map((r) => new ItemOrderRow(r, 0, 0, 0)));
    this.model.update((m) => ({
      ...m,
      items: new_items
    }));
  }
}
