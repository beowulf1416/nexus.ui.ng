import { Component, signal, inject } from '@angular/core';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Uuid, ApiResponse } from 'core';
import { TenantsService } from '../../../services/tenants-service';
import { TenantDialogData } from './tenant-dialog-data';


@Component({
  selector: 'lib-tenant-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    FormField
  ],
  templateUrl: './tenant-dialog.html',
  styleUrl: './tenant-dialog.css',
})
export class TenantDialog {

  model = signal({
    id: '',
    name: '',
    domain: ''
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {
      required(f.name, { message: 'Email is required' });
      required(f.domain, { message: 'Domain is required' });
    }),
  };

  readonly data = inject<TenantDialogData | null>(MAT_DIALOG_DATA);

  constructor(
    private tenant_service: TenantsService,
    private dr: MatDialogRef<TenantDialog>
  ) {}

  on_cancel(event: Event) {
    event.preventDefault();
    this.dr.close();
  }

  on_submit(event: Event) {
    event.preventDefault();

    submit(this.component.form, async() => {
      const model = this.model();

      const tenant_id = new Uuid(model.id);

      this.tenant_service.save_tenant(
        tenant_id,
        model.name,
        model.domain
      ).subscribe({
        next: (r: ApiResponse) => {
          console.log(r)
          this.dr.close();
        },
        error: (e: any) => {
          console.error(e);
        }
      });
    });

    this.dr.close();
  }
}
