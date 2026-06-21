import { Component, signal, inject, computed } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { form, required, FormField } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Uuid, NotificationService } from 'core';
import { PermissionService } from '../../../services/permission-service';
import { RoleService } from '../../../services/role-service';
import { TenantItem } from '../../../models/tenant-item';
import { RoleItem } from '../../../models/role-item';
import { PermissionItem } from '../../../models/permission-item';


class PermissionItemRow {
  constructor(
    readonly permission: PermissionItem,
    readonly selected: boolean = false,
  ) {}
}


@Component({
  selector: 'lib-assign-permissions-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatToolbarModule,
    FormField
  ],
  templateUrl: './assign-permissions-dialog.html',
  styleUrl: './assign-permissions-dialog.css',
})
export class AssignPermissionsDialog {

  model = signal({
    filter: '',
    selected: new Array<PermissionItemRow>(),
    matches: new Array<PermissionItemRow>()
  });

  component = {
    tenant: signal(TenantItem.default()),
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {
      required(f.filter, { message: 'Filter is required' })
    })
  };

  reset_disabled = computed(() => this.model().selected.length == 0);

  readonly data = inject<{
    tenant: TenantItem,
    roles: Array<RoleItem>,
    multiple: boolean,
  }>(MAT_DIALOG_DATA);


  constructor(
    private permission_service: PermissionService,
    private role_service: RoleService,
    private notification_service: NotificationService,
    private dr: MatDialogRef<AssignPermissionsDialog>
  ) {}

  fetch_permissions() {
    console.info('fetch_permissions');

    const filter = this.model().filter;
    this.permission_service.fetch_permissions(filter).subscribe({
      next: (permissions: Array<PermissionItem>) => {
        const matches = permissions.map((p: PermissionItem) => new PermissionItemRow(p, false));
        this.model.update((m) => ({
          ...m,
          matches: matches,
        }));
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.notification_service.error(err.message);
        this.component.errors.update((errors: Array<string>) => {
          errors.push(err.message);
          return errors;
        });
      },
    });
  }

  on_filter(event: Event): void {
    event.preventDefault();
    this.fetch_permissions();
  }

  on_clear(event: Event): void {
    event.preventDefault();
    this.model.update((m) => ({
      ...m,
      filter: '',
    }));
    this.fetch_permissions();
  }

  on_refresh(event: Event): void {
    event.preventDefault();
    this.fetch_permissions();
  }

  on_cancel(event: Event): void {
    event.preventDefault();
    this.dr.close();
  }

  on_save(event: Event): void {
    event.preventDefault();

    const permission_ids = this.model().selected.map((p) => new Uuid(p.permission.permission_id));
    const role_ids = this.data.roles.map((r) => new Uuid(r.role_id));

    console.debug(permission_ids, role_ids);

    this.role_service.assign_permissions(
      role_ids,
      permission_ids,
    ).subscribe({
      next: () => {
        this.notification_service.info('Permissions assigned successfully');
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.notification_service.error(err.message);
      },
    });

    this.dr.close();
  }

  on_deselect_permission(event: Event, i: number): void {
    console.info('on_deselect_permission', i);
    event.preventDefault();

  }

  on_select_permission(event: Event, i: number): void {
    console.info('on_select_permission', i);
    event.preventDefault();

  }
}
