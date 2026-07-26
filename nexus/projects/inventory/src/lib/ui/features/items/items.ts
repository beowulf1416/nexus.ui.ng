import { Component, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ItemData } from '../../../models/item-data';


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

      constructor() { }

      on_new_item(event: Event): void {
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
