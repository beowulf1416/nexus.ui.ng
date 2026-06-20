import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Uuid, ApiResponse, HTTP_STATUS } from 'core';
import { RoleService } from '../../../services/role-service';
import { TenantsService } from '../../../services/tenants-service';
import { RoleDialogData } from './role-dialog-data';
import { TenantItem } from '../../../models/tenant-item';
import { RoleItem } from '../../../models/role-item';


@Component({
  selector: 'lib-role-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    FormField
  ],
  templateUrl: './role-dialog.html',
  styleUrl: './role-dialog.css',
})
export class RoleDialog implements OnInit {

  model = signal({
    id: '',
    name: '',
    description: ''
  });

  component = {
    tenant: signal(TenantItem.default()),
    role: signal(RoleItem.default()),
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {
      required(f.name, { message: 'Name is required' })
    })
  };

  title = computed(() => {
    return this.component.role()?.name == '' ? 'New Role' : this.component.role()?.name;
  });

  readonly data = inject<{
    tenant_id: string
    role_id?: string
  }>(MAT_DIALOG_DATA);

  constructor(
    private role_service: RoleService,
    private tenant_service: TenantsService,
    private dr: MatDialogRef<RoleDialog>,
  ) {}

  ngOnInit(): void {
    const tenant_id = this.data?.tenant_id;
    const role_id = this.data?.role_id;

    if (tenant_id != '') {
      this.tenant_service.fetch_tenant(new Uuid(tenant_id)).subscribe({
        next: (tenant: TenantItem) => {
          this.component.tenant.set(tenant);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status == HTTP_STATUS.FORBIDDEN) {
            const errors = this.component.errors().concat('You do not have permission to access this resource.');
            this.component.errors.set(errors);
          }
        }
      });
    }

    if (tenant_id != ''&& role_id != '') {
      console.debug(role_id);
      this.role_service.fetch_role(new Uuid(role_id)).subscribe({
        next: (role: RoleItem) => {
          this.component.role.set(role);
          this.model.set({
            id: role.role_id,
            name: role.name,
            description: role.description
          });
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
        }
      });
    }
  }

  on_cancel(event: Event): void {
    console.log('on_cancel');

    event.preventDefault();
    this.dr.close();
  }

  on_submit(event: Event): void {
    console.log('on_submit');

    event.preventDefault();

    submit(this.component.form, async () => {
      const model = this.model();

      const tenant_id = new Uuid(this.component.tenant().id);
      const role_id = new Uuid(model.id);

      this.role_service.save_role(
        tenant_id,
        role_id,
        model.name,
        model.description
      ).subscribe({
        next: (r: ApiResponse) => {
          console.log(r);
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
        }
      });
    });

    this.dr.close();
  }
}
