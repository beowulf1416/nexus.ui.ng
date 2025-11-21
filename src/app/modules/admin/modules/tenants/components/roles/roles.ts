import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, signal, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { TenantSelector } from '../../../../../tenant-selector/components/tenant-selector/tenant-selector';
// import { UserSelector } from '../../../../../user-selector/components/user-selector/user-selector';
import { TenantUserSelector } from '../../../../../tenant-user-selector/components/tenant-user-selector/tenant-user-selector';
import { SelectionModes } from '../../classes/selection-modes';

import { Tenant } from '../../../../../tenant-selector/classes/tenant';
import { TenantsService } from '../../services/tenants-service';
import { ApiResponse } from '../../../../../../classes/api-response';
import { Role } from '../../classes/role';
// import { Tenant } from '../tenant/tenant';




@Component({
  selector: 'app-roles',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    TenantSelector,
    // UserSelector,
    TenantUserSelector
  ],
  templateUrl: './roles.html',
  styleUrl: './roles.css',
})
export class Roles {

  @ViewChild('nav_selectors') nav_selectors!: MatSidenav;
  // @ViewChild('tenant_selector') tenant_selector!: ElementRef;
  // @ViewChild('user_selector') user_selector!: ElementRef;


  public SelectionModes = SelectionModes;
  selection_mode = signal(SelectionModes.tenants);

  component = {
    tenant_name: 'default',
    formRoles: new FormGroup({
      tenant_id: new FormControl('', []),
      filters: new FormGroup({
        filter: new FormControl('', [])
      }),
      roles: new FormArray([])
    })
  };


  constructor(
    private ts: TenantsService,
    private cd: ChangeDetectorRef
  ) {}

  get roles() {
    return this.component.formRoles.get('roles') as FormArray;
  }

  select_tenant(): void {
    this.selection_mode.set(SelectionModes.tenants);
    this.nav_selectors.toggle();
  }

  on_tenants_selected(tenants: Array<Tenant>): void {
    console.debug('//todo', tenants);
    let tenant = tenants.length > 0 ? tenants[0] : Tenant.default();
    this.component.formRoles.get('tenant_id')?.setValue(tenant.id);
    this.component.tenant_name = tenant.name;
    this.nav_selectors.toggle();
  }

  selected(tenant_ids: Array<string>): void {
    console.debug('//todo', tenant_ids);
    this.nav_selectors.toggle();
  }

  search_reset(): void {
    console.info('search_reset');
    this.component.formRoles.get('filters.filter')?.setValue('');
  }

  search_roles(): void {
    console.info('search_roles');

    let tenant_id = this.component.formRoles.get('tenant_id')?.value || '';
    let filter = this.component.formRoles.get('filters.filter')?.value || '';

    this.ts.roles_fetch(
      tenant_id,
      filter
    ).subscribe({
      next: (r: ApiResponse) => {
        if (r.success) {
          let roles = (r.data as {
            roles: Array<Role>
          }).roles;

          let rfa = this.component.formRoles.get('roles') as FormArray;
          rfa.clear();
          roles.forEach((r: Role) => {
            rfa.push(new FormGroup({
              id: new FormControl(r.id, []),
              name: new FormControl(r.name, []),
              description: new FormControl(r.description, [])
            }))
          });
          this.cd.detectChanges();
        } else {
          console.debug(r);
        }
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => {
        console.info('//todo complete');
      }
    });
  }

  on_role_assign(): void {
    console.info('on_role_assign()')
  }

  on_role_revoke(): void {
    console.info('on_role_revoke()');
  }
}
