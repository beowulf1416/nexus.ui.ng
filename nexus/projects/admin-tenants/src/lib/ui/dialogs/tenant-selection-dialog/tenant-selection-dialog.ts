import { Component, inject, signal } from '@angular/core';
import { form, required, FormField } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ApiResponse, Uuid } from 'core';
import { TenantsService } from '../../../services/tenants-service';
import { TenantItem } from '../../../models/tenant-item';


class TenantItemRow {

  constructor(
    readonly tenant: TenantItem,
    readonly selected: boolean,
  ) {}
}

@Component({
  selector: 'lib-tenant-selection-dialog',
  imports: [
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

  readonly data = inject<{}>(MAT_DIALOG_DATA);

  constructor(
    private tenant_service: TenantsService,
    private dr: MatDialogRef<TenantSelectionDialog>
  ) {}

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
