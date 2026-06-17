import { Component, inject, signal, computed } from '@angular/core';
// import { json } from '@angular/common';
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
        const matches = tenants.map((m) => new TenantItemRow(m, false));
        console.debug(matches);
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
    console.debug('index: ', i);

    event.preventDefault();

    const filter = this.model().filter;

    const match: TenantItemRow = this.model().matches[i];
    console.debug('match: ', match);

    // add to selected tenants
    const selected: Array<TenantItemRow> = this.model().selected;
    selected.push(match);
    console.debug('selected: ', selected);

    // remove from matched tenants
    const matches: Array<TenantItemRow> = this.model().matches;
    const removed = matches.splice(i, 1);
    console.debug('removed: ', removed);
    console.debug('remaining: ', matches);

    // this.model.update((m) => ({
    //   ...m,
    //   selected: selected,
    //   matches: matches,
    // }));
    this.model.set({
      filter: filter,
      selected: selected,
      matches: matches,
    });

    console.debug('updated: ', this.model());
  }

  on_cancel(event: Event) {
    console.log('on_cancel');
    event.preventDefault();
    this.dr.close();
  }

  on_ok(event: Event) {
    console.log('on_ok');
    event.preventDefault();

    const model = this.model();
    const selected = model.selected;

    this.dr.close(selected);
  }
}
