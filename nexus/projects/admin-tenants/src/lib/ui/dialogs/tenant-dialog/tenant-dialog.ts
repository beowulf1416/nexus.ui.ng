import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Uuid, ApiResponse } from 'core';
import { TenantItem } from '../../../models/tenant-item';
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
export class TenantDialog implements OnInit {

  model = signal({
    id: '',
    name: '',
    domain: ''
  });

  tenant_name = computed(() => {
    if (this.model().name == '') {
      return 'New Tenant';
    }
    return this.model().name;
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {
      required(f.name, { message: 'Email is required' });
      required(f.domain, { message: 'Domain is required' });
    }),
  };

  readonly data = inject<{ id: Uuid } | null>(MAT_DIALOG_DATA);

  constructor(
    private tenant_service: TenantsService,
    private dr: MatDialogRef<TenantDialog>
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.tenant_service.fetch_tenant(this.data.id).subscribe({
        next: (tenant: TenantItem) => {
          this.model.set({
            id: tenant.id.toString(),
            name: tenant.name,
            domain: '' // TODO: need to implement tenant domain
          });
        },
        error: (e: any) => {
          console.error(e);
        }
      });
    }
  }

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
