import { Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { ItemService } from '../../../services/item-service';
import { ApiResponse, Uuid } from 'core';

@Component({
  selector: 'lib-item-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    FormField
  ],
  templateUrl: './item-dialog.html',
  styleUrl: './item-dialog.css',
})
export class ItemDialog {
  model = signal({
    version: 0,
    name: '',
    description: '',
    sku: '',
    upc: '',
    perishable: false,
    flammable: false,
    hazardous: false,
    esd_sensitive: false,
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {
      required(f.name, { message: 'Name is required' });
    })
  };

  title = computed(() => {
    const name = this.model().name;
    return name == '' ? 'New Item' : name;
  });

  private dr = inject(MatDialogRef<ItemDialog>);
  private is = inject(ItemService);

  constructor() { }



  on_cancel(event: Event): void {
    event.preventDefault();
    this.dr.close();
  }

  on_submit(event: Event): void {
    event.preventDefault();

    submit(this.component.form, async () => {
      const model = this.model();

      const item = {
        item_id: new Uuid(),
        active: true,
        version: model.version,
        name: model.name,
        description: model.description,
        sku: model.sku,
        upc: model.upc,
        perishable: model.perishable,
        flammable: model.flammable,
        hazardous: model.hazardous,
        esd_sensitive: model.esd_sensitive,
      };

      this.is.item_save(item).subscribe({
        next: (r: ApiResponse) => {
          if (r.success) {
            this.dr.close();
          }
        },
        error: (e: any) => {
          console.error(e);
        }
      });
    });
  }
}
