import { Component, inject, signal } from '@angular/core';
import { ItemData } from '../../../models/item-data';
import { form, FormField, minLength, validate } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ItemService } from '../../../services/item-service';


class ItemRow {
  constructor(
    readonly item: ItemData,
    public selected: boolean = false,
  ) { }
}

@Component({
  selector: 'lib-item-selector-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    FormField
  ],
  templateUrl: './item-selector-dialog.html',
  styleUrl: './item-selector-dialog.css',
})
export class ItemSelectorDialog {
  model = signal({
    filter: '',
    selected: new Array<ItemRow>(),
    matches: new Array<ItemRow>()
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {
      // validate(f.selected, ({ value }) => {
      //   if (value().length == 0) {
      //     return 'You must select at least one item';
      //   }
      //   return null;
      // });
      minLength(f.selected, 1, { message: 'You must select at least one item' });
    })
  };

  private dr = inject(MatDialogRef<ItemSelectorDialog>);
  private is = inject(ItemService);

  constructor() { }

  filter(): void {
    console.info('filter');

    const filter = this.model().filter;
    this.is.items_fetch(filter).subscribe({
      next: (items: ItemData[]) => {
        this.model.update((m) => ({
          ...m,
          matches: items.map((r) => new ItemRow(r, false))
        }));
      },
      error: (e: any) => {
        console.error(e);
      }
    });
  }

  on_submit(event: Event): void {
    event.preventDefault();

    const selected_items = this.model().selected.map((r) => r.item);
    this.dr.close(selected_items);
  }

  on_search(event: Event): void {
    event.preventDefault();
    this.filter();
  }

  on_clear(event: Event): void {
    event.preventDefault();
    this.filter();
  }

  on_select_item(event: Event, i: number): void {
    event.preventDefault();
    const matched_item = this.model().matches[i];
    const selected = this.model().selected.concat(matched_item);
    const matches = this.model().matches.toSpliced(i, 1);
    this.model.update((m) => ({
      ...m,
      selected: selected,
      matches: matches
    }));
  }

  on_remove_item(event: Event, i: number): void {
    event.preventDefault();
    const selected_item = this.model().selected[i];
    const selected = this.model().selected.toSpliced(i, 1);
    const matches = this.model().matches.concat(selected_item);
    this.model.update((m) => ({
      ...m,
      selected: selected,
      matches: matches
    }));
  }

  on_cancel(event: Event): void {
    event.preventDefault();
    this.dr.close();
  }
}
