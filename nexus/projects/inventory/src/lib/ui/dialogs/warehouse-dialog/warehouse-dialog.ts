import { Component, computed, inject, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApiResponse, CountrySelector, NotificationService, Uuid } from 'core';
import { WarehouseService } from '../../../services/warehouse-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'lib-warehouse-dialog',
  imports: [
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    FormField,
    CountrySelector,
  ],
  templateUrl: './warehouse-dialog.html',
  styleUrl: './warehouse-dialog.css',
})
export class WarehouseDialog {
  model = signal({
    name: '',
    description: '',
    address: {
      country_id: 0,
      state: '',
      city: '',
      street: '',
      zip: '',
    }
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {
      required(f.name, { message: 'Name is required' });
      required(f.address.country_id, { message: 'Country is required' });
      required(f.address.state, { message: 'State is required' });
      required(f.address.city, { message: 'City is required' });
      required(f.address.street, { message: 'Street is required' });
    })
  };

  title = computed(() => {
    const name = this.model().name;
    return name == '' ? 'New Warehouse' : name;
  });


  private dr = inject(MatDialogRef<WarehouseDialog>);
  private ws = inject(WarehouseService);
  private ns = inject(NotificationService);

  constructor() { }

  on_submit(event: Event): void {
    event.preventDefault();
    console.info('//todo');

    submit(this.component.form, async () => {
      const model = this.model();
      const wh = {
        warehouse_id: new Uuid(),
        name: model.name,
        description: model.description,
        active: true,
        version: 0,
        address: model.address,
      };
      this.ws.warehouse_save(wh).subscribe({
        next: (r: ApiResponse) => {
          if (r.success) {
            this.dr.close();
          } else {
            this.ns.error(r.message);
          }
        },
        error: (e: HttpErrorResponse) => {
          console.error(e);
          this.ns.error(e.message);
        }
      })
    });
  }

  on_cancel(event: Event): void {
    event.preventDefault();

    this.dr.close();
  }
}
