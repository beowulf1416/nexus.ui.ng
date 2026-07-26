import { Component, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LocationData } from '../../../models/location-data';

@Component({
  selector: 'lib-locations',
  imports: [
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  templateUrl: './locations.html',
  styleUrl: './locations.css',
})
export class Locations {
  model = signal({
      filter: '',
      warehouses: new Array<LocationData>()
    });

    component = {
      errors: new Array<string>(),
      form: form(this.model, {

      })
    };

      constructor() { }

      on_new_location(event: Event): void {
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
