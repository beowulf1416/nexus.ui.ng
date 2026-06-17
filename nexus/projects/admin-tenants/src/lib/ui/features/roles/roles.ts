import { Component, signal, model } from '@angular/core';
import { form, required, FormField } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';

import { RoleService } from '../../../services/role-service';
import { RoleDialog } from '../../../ui/dialogs/role-dialog/role-dialog';
import { TenantSelectionDialog } from '../../../ui/dialogs/tenant-selection-dialog/tenant-selection-dialog';
import { TenantItem } from '../../../models/tenant-item';
import { RoleItem } from '../../../models/role-item';


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
    FormField
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

    const filter = this.model().filter;
    this.role_service.fetch_roles(filter).subscribe((roles) => {
      console.log(roles);
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

        }
      }
    );
    dr.afterClosed().subscribe((result: any) => {
      console.debug(result);
    });

  }
}
