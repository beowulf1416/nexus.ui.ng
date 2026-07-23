import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PartnerData } from '../../../models/partner-data';
import { PartnerService } from '../../../services/partner-service';
import { NotificationService } from 'core';

@Component({
  selector: 'lib-partner-selector-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatToolbarModule
  ],
  templateUrl: './partner-selector-dialog.html',
  styleUrl: './partner-selector-dialog.css',
})
export class PartnerSelectorDialog {
  model = signal({
    filter: '',
    matches: new Array<PartnerData>(),
    selected: new Array<PartnerData>()
  });

  private dr = inject(MatDialogRef<PartnerSelectorDialog>);
  private partner_service = inject(PartnerService);
  private notification_service = inject(NotificationService);

  constructor() { }


    on_select(event: Event): void {
      event.preventDefault();

      const selected_items = this.model().selected;
      this.dr.close(selected_items);
    }

    on_cancel(event: Event): void {
      event.preventDefault();
      this.dr.close();
    }

    on_filter(event: Event): void {
      const model = this.model();

      this.partner_service.fetch_partners(model.filter).subscribe({
        next: (r: PartnerData[]) => {
          this.model.update((m) => ({
            ...m,
            matches: r
          }));
        },
        error: (e) => {
          console.error(e);
          this.notification_service.error(e);
        }
      });
    }

    on_select_item(event: Event, i: number): void {
      console.info('on_select_item');
      event.preventDefault();

      const model = this.model();
      const selected_item = model.matches[i];

      const selected_items = model.selected.concat(selected_item);
      const matched_items = model.matches.toSpliced(i, 1);

      this.model.update((m) => ({ ...m, selected: selected_items, matches: matched_items }));
    }

    on_deselect_item(event: Event, i: number): void {
      console.info('on_deselect_id');
      event.preventDefault();

      const model = this.model();
      const selected_item = model.selected[i];

      const selected_items = model.selected.toSpliced(i, 1);
      const matched_items = model.matches.concat(selected_item);

      this.model.update((m) => ({ ...m, selected: selected_items, matches: matched_items }));
    }
}
