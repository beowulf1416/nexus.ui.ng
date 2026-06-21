import { Component, signal, model, computed } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { form, required, FormField } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ApiResponse, Uuid, NotificationService, HTTP_STATUS } from 'core';
import { RoleService } from '../../../services/role-service';
import { RoleDialog } from '../../../ui/dialogs/role-dialog/role-dialog';
import { TenantSelectionDialog } from '../../../ui/dialogs/tenant-selection-dialog/tenant-selection-dialog';
import { PermissionSelectionDialog } from '../../../ui/dialogs/permission-selection-dialog/permission-selection-dialog';

import { TenantItem } from '../../../models/tenant-item';
import { RoleItem } from '../../../models/role-item';
import { TenantSelector } from '../../../ui/components/tenant-selector/tenant-selector';


class RoleItemRow {
  constructor(
    readonly role: RoleItem,
    readonly selected: boolean = false,
  ) {}
}


@Component({
  selector: 'lib-roles',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    FormField,
    TenantSelector
  ],
  templateUrl: './roles.html',
  styleUrl: './roles.css',
})
export class Roles {

  model = signal({
    filter: '',
    tenant: TenantItem.default(),
    roles: new Array<RoleItemRow>()
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) =>{
    })
  };

  tenant_selected = computed(() => {
    return this.model().tenant.id != '';
  });

  roles_selected = computed(() => {
    return this.model().roles.some((r) => r.selected);
  });
  is_filter_empty = computed(() => {
    return this.model().filter == '';
  });

  constructor(
    private role_service: RoleService,
    private notification_service: NotificationService,
    private md: MatDialog
  ) {

  }

  show_role_dialog(event: Event): void {
    console.log('show_role_dialog');

    event.preventDefault();
    let dr = this.md.open(RoleDialog, {
      position: {
        right: '10px'
      },
      data: {
        tenant_id: this.model().tenant.id
      }
    })
    dr.afterClosed().subscribe((result: any) => {
      console.debug(result);
    });
  }

  on_search(event: Event): void {
    event.preventDefault();
    this.fetch_roles();
  }

  fetch_roles(): void {
    console.log('fetch_roles');

    const tenant_id = new Uuid(this.model().tenant.id);
    const filter = this.model().filter;
    this.role_service.fetch_roles(tenant_id, filter).subscribe((roles) => {
      this.model.update((m) => ({
        ...m,
        roles: roles.map((r) => (new RoleItemRow(r, false))),
      }));
    });
  }

  on_clear(event: Event): void {
    event.preventDefault();
    this.model.update((m) => ({
      ...m,
      filter: '',
    }));
    this.fetch_roles();
  }

  on_refresh(event: Event): void {
    event.preventDefault();
    this.fetch_roles();
  }

  show_tenant_dialog(event: Event): void {
    console.log('show_tenant_dialog');
    event.preventDefault();

    let dr = this.md.open(
      TenantSelectionDialog,
      {
        position: {
          right: '10px'
        },
        data: {
          multiple: false
        }
      }
    );
    dr.afterClosed().subscribe((result: any) => {
      console.debug(result);
    });
  }

  on_tenants_selected(tenants: Array<TenantItem>): void {
    if (tenants && tenants.length > 0) {
      this.model.update((m) => {
        m.tenant = tenants[0];
        return m;
      });
    }
    this.fetch_roles();
  }

  on_select_all(event: Event): void {
    console.info('on_select_all');

    event.preventDefault();
  }

  on_set_active(event: Event, active: boolean): void {
    console.info('on_set_active');

    event.preventDefault();

    const selected_role_ids = this.model().roles.filter((r) => r.selected).map((r) => new Uuid(r.role.role_id));

    this.role_service.roles_set_active(
      selected_role_ids,
      active,
    ).subscribe({
      next: (r: ApiResponse) => {
        console.log(r);
      },
      error: (e: Error) => {
        console.debug(e);
        if (e instanceof HttpErrorResponse) {
          if (e.status === HTTP_STATUS.FORBIDDEN) {
            const errors = this.component.errors().concat('You do not have permission to access this resource.');
            this.component.errors.set(errors);
          }
        } else {
          console.error(e);
        }
      }
    });
  }

  on_edit_role(event: Event, i: number): void {
    console.info('on_edit_role', i);

    const role = this.model().roles[i];
    console.debug(role);

    event.preventDefault();
    let dr = this.md.open(RoleDialog, {
      position: {
        right: '10px'
      },
      data: {
        tenant_id: this.model().tenant.id,
        role_id: role.role.role_id
      }
    })
    dr.afterClosed().subscribe((result: any) => {
      console.debug(result);
    });
  }

  on_assign_permissions(event: Event): void {
    console.info('on_assign_permissions');

    event.preventDefault();

    const selected_role_ids = this.model().roles.filter((r) => r.selected).map((r) => new Uuid(r.role.role_id));

    let dr = this.md.open(PermissionSelectionDialog, {
      position: {
        right: '10px'
      },
      data: {
        tenant_id: this.model().tenant.id,
        role_ids: selected_role_ids,
        multiple: true
      }
    })
    dr.afterClosed().subscribe((result: {
      permission_ids: Array<number>,
      role_ids: Array<Uuid>,
    }) => {
      console.debug(result);

      const { permission_ids, role_ids } = result;
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
    });
  }

  on_revoke_permissions(event: Event): void {
    console.info('on_revoke_permissions');

    event.preventDefault();

    const selected_role_ids = this.model().roles.filter((r) => r.selected).map((r) => new Uuid(r.role.role_id));

    let dr = this.md.open(PermissionSelectionDialog, {
      position: {
        right: '10px'
      },
      data: {
        tenant_id: this.model().tenant.id,
        role_ids: selected_role_ids,
        multiple: true
      }
    })
    dr.afterClosed().subscribe((result: {
      permission_ids: Array<number>,
      role_ids: Array<Uuid>,
    }) => {
      console.debug(result);

      const { permission_ids, role_ids } = result;
      this.role_service.revoke_permissions(
        role_ids,
        permission_ids,
      ).subscribe({
        next: () => {
          this.notification_service.info('Permissions revoked successfully');
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.notification_service.error(err.message);
        },
      });
    });
  }

}
