import { Component, inject, signal, computed } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { form, required, FormField } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ApiResponse, Uuid } from 'core';
import { TenantsService } from '../../../services/tenants-service';
import { TenantItem } from '../../../models/tenant-item';
import { TenantSelectionDialogData } from './tenant-selection-dialog-data';
import { CommonModule } from '@angular/common';

class TenantItemRow {

  constructor(
    readonly tenant: TenantItem,
    // readonly tenant_id: string,
    // readonly name: string,
    // readonly active: boolean,
    readonly selected: boolean,
  ) {}
}

@Component({
  selector: 'lib-tenant-selection-dialog',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatToolbarModule,
    FormField
  ],
  templateUrl: './tenant-selection-dialog.html',
  styleUrl: './tenant-selection-dialog.css',
})
export class TenantSelectionDialog {

  model = signal({
    filter: '',
    matches: new Array<TenantItemRow>(),
    selected: new Array<TenantItemRow>(),
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {
      required(f.filter, { message: 'Filter is required' });
    }),
  };

  readonly data = inject<TenantSelectionDialogData>(MAT_DIALOG_DATA);

  select_multiple = computed(() => {
    return this.data.multiple;
  });

  constructor(
    private tenant_service: TenantsService,
    private dr: MatDialogRef<TenantSelectionDialog>
  ) {}

  on_search(event: Event): void {
    console.info('on_search');

    const filter = this.model().filter;
    this.tenant_service.fetch_tenants(filter).subscribe({
      next: (tenants: Array<TenantItem>) => {
        const matches = tenants.map((m: TenantItem) => new TenantItemRow(m, false));
        this.model.update((m) => ({
          ...m,
          matches: matches,
        }));
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.component.errors.update((errors: Array<string>) => {
          errors.push(err.message);
          return errors;
        });
      },
    });
  }

  on_select_tenant(event: Event, i: number): void {
    console.info('on_select_tenant');

    event.preventDefault();
    const filter = this.model().filter;
    const match: TenantItemRow = this.model().matches[i];
    let selected = this.model().selected.slice();

    // add to selected tenants
    if (this.select_multiple()) {
      selected.push(match);
    } else {
      selected = new Array<TenantItemRow>(match);
    }

    // remove from matched tenants
    const matches: Array<TenantItemRow> = this.model().matches.toSpliced(i, 1);

    this.model.set({
      filter: filter,
      selected: selected,
      matches: matches,
    });
  }

  on_deselect_tenant(event: Event, i: number): void {
    console.info('on_deselect_tenant');

    event.preventDefault();
    const filter = this.model().filter;
    const match: TenantItemRow = this.model().selected[i];

    // remove from selected tenants
    const selected: Array<TenantItemRow> = this.model().selected.toSpliced(i, 1);
    // add to matched tenants
    const matches: Array<TenantItemRow> = this.model().matches.concat(match);

    this.model.set({
      filter: filter,
      selected: selected,
      matches: matches,
    });
  }

  on_cancel(event: Event) {
    console.log('on_cancel');
    event.preventDefault();
    this.dr.close();
  }

  on_ok(event: Event) {
    console.log('on_ok');
    event.preventDefault();

    const selected = this.model().selected.map(s => s.tenant);

    this.dr.close(selected);
  }
}
