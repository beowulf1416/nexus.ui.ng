import { Component, computed, inject, signal } from '@angular/core';
import { LocationData } from '../../../models/location-data';
import { form, FormField, required, submit, validate } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LocationsService } from '../../../services/locations-service';
import { Uuid } from 'core';
import { WarehouseSelector } from '../../components/warehouse-selector/warehouse-selector';


class LocationRow {
  constructor(
    readonly location: LocationData,
    public selected: boolean = false,
  ) { }
}

@Component({
  selector: 'lib-location-selector-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatToolbarModule,
    FormField,
    WarehouseSelector
  ],
  templateUrl: './location-selector-dialog.html',
  styleUrl: './location-selector-dialog.css',
})
export class LocationSelectorDialog {
  model = signal({
    filter: '',
    warehouse_id: '',
    matches: new Array<LocationRow>(),
    selected: new Array<LocationRow>(),
  });

  component = {
    form: form(this.model, (f) => {
      required(f.warehouse_id, { message: 'Warehouse is required'});
      // validate(f.selected, ({value}) => {
      //   console.debug(value());

      //   return {
      //     kind: 'location-selector',
      //     message: 'Please select a location',
      //   };
      // })
    })
  };

  select_button_disabled = computed(() => {
    return this.model().selected.length == 0;
  })

  private dr = inject(MatDialogRef<LocationSelectorDialog>);
  private ls = inject(LocationsService);

  constructor() { }

  on_submit(event: Event): void {
    event.preventDefault();

    this.dr.close(this.model().selected[0].location);
  }

  on_search(event: Event): void {
    event.preventDefault();

    this.filter();
  }

  on_clear(event: Event): void {
    event.preventDefault();

  }

  on_cancel(event: Event): void {
    event.preventDefault();
    this.dr.close();
  }

  filter(): void {
    console.info('filter');
    // submit(this.component.form, async () => {
      const model = this.model();
      const filter = model.filter;
      const warehouse_id = model.warehouse_id;

      console.info('filter');
      this.ls.locations_fetch(new Uuid(warehouse_id), filter).subscribe({
        next: (locations) => {
          this.model.update((m) => ({ ...m, matches: locations.map((l) => new LocationRow(l, false)) }));
        },
        error: (e: any) => {
          console.error(e);
        },
      });
    // });
  }

  on_select_item(event: Event, i: number): void {
    event.preventDefault();

    const model = this.model();
    const selected = model.matches[i];
    const selected_items = model.selected.concat(selected);
    const matched_items = model.matches.toSpliced(i, 1);

    this.model.update((m) => ({
      ...m,
      selected: selected_items,
      matches: matched_items,
    }));
  }

  on_deselect_item(event: Event, i: number): void {
    event.preventDefault();

    const model = this.model();
    const selected = model.selected[i];
    const selected_items = model.selected.toSpliced(i, 1);
    const matched_items = model.matches.concat(selected);

    this.model.update((m) => ({
      ...m,
      selected: selected_items,
      matches: matched_items,
    }));
  }
}
