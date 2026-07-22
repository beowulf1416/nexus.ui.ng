import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OrganizationsService } from '../../../services/organizations-service';
import { OrganizationData } from '../../../models/organization-data';
import { NotificationService } from 'core';

@Component({
  selector: 'lib-organization-selector-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatToolbarModule
  ],
  templateUrl: './organization-selector-dialog.html',
  styleUrl: './organization-selector-dialog.css',
})
export class OrganizationSelectorDialog {
  model = signal({
    filter: '',
    matches: new Array<OrganizationData>(),
    selected: new Array<OrganizationData>()
  });

  private dr = inject(MatDialogRef<OrganizationSelectorDialog>);
  private org_service = inject(OrganizationsService);
  private notification_service = inject(NotificationService);

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

    this.org_service.fetch_organizations(model.filter).subscribe({
      next: (r: OrganizationData[]) => {
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
