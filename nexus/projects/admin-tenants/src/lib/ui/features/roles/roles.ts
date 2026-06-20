import { Component, signal, model, computed } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { form, required, FormField } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ApiResponse, Uuid, HTTP_STATUS } from 'core';
import { RoleService } from '../../../services/role-service';
import { RoleDialog } from '../../../ui/dialogs/role-dialog/role-dialog';
import { TenantSelectionDialog } from '../../../ui/dialogs/tenant-selection-dialog/tenant-selection-dialog';
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

  roles_selected = computed(() => {
    return this.model().roles.some((r) => r.selected);
  });

  constructor(
    private role_service: RoleService,
    private md: MatDialog
  ) {

  }

  show_role_dialog(event: Event): void {
    console.log('show_role_dialog');

    event.preventDefault();
    let dr = this.md.open(RoleDialog, {
      position: {
        right: '10px'
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

    const selected_role_ids = this.model().roles.filter((r) => r.selected).map((r) => new Uuid(r.role.id));

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
}
