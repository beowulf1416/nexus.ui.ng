import { Component, computed, inject, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { WarehouseSelector } from '../../components/warehouse-selector/warehouse-selector';
import { LocationsService } from '../../../services/locations-service';
import { ApiResponse, Uuid } from 'core';

@Component({
  selector: 'lib-location-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    FormField,
    WarehouseSelector
  ],
  templateUrl: './location-dialog.html',
  styleUrl: './location-dialog.css',
})
export class LocationDialog {
  model = signal({
    location_id: '',
    version: 0,
    warehouse_id: '',
    name: '',
    description: '',
    floor: '',
    level: '',
    section: '',
    aisle: '',
    row: '',
    rack: '',
    shelf: '',
    bin: '',
    pallet: '',
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {
      required(f.name, { message: 'Name is required' })
    })
  };

  title = computed(() => {
    const title = this.model().name;
    return title == '' ? 'New Location' : title;
  });

  private ls = inject(LocationsService);
  private dr = inject(MatDialogRef);

  constructor() { }

  on_submit(event: Event): void {
    event.preventDefault();
    console.info('on_submit');

    submit(this.component.form, async () => {
      const model = this.model();

      const warehouse_id = model.warehouse_id == '' ? new Uuid() : new Uuid(model.warehouse_id);
      const location = {
        location_id: model.location_id == '' ? new Uuid() : new Uuid(model.location_id),
        version: model.version,
        name: model.name,
        description: model.description,
        floor: model.floor,
        level: model.level,
        section: model.section,
        aisle: model.aisle,
        row: model.row,
        rack: model.rack,
        shelf: model.shelf,
        bin: model.bin,
        pallet: model.pallet
      };

      this.ls.location_save(warehouse_id, location).subscribe({
        next: (r: ApiResponse) => {
          if (r.success) {
            this.dr.close();
          }
        },
        error: (e) => {
          console.error(e);
        }
      });
    });
  }

  on_cancel(event: Event): void {
    event.preventDefault();

  }
}
