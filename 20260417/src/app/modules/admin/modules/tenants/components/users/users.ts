import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, computed, ViewChild } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { TenantsService } from '../../services/tenants-service';
import { Tenant } from '../../../../../tenant-selector/classes/tenant';
import { TenantSelector } from '../../../../../tenant-selector/components/tenant-selector/tenant-selector';
import { ApiResponse } from '../../../../../../classes/api-response';


class UserData {

  public constructor(
    public readonly user_id: string,
    public readonly email: string,
    public readonly first_name: string,
    public readonly middle_name: string,
    public readonly last_name: string,
    public readonly prefix: string,
    public readonly suffix: string,
    public readonly active: boolean,
    public readonly created: Date
  ) {}
}

@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatSidenavModule,
    RouterModule,
    TenantSelector
  ],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {

  @ViewChild('nav_tenant_selector') nav_tenant_selector!: MatSidenav;


  component = {
    error: '',
    tenant_name: 'default',
    formUsers: new FormGroup({
      filters: new FormGroup({
        filter: new FormControl('', [])
      }),
      tenant_id: new FormControl('', []),
      users: new FormArray([])
    })
  };


  constructor(
    private ts: TenantsService,
    private cd: ChangeDetectorRef
  ) {}

  get users() {
    return this.component.formUsers.get('users') as FormArray;
  }

  refresh(): void {
    console.info('refresh');
    this.search();
  }

  search(): void {
    console.info('search');

    let tenant_id = this.component.formUsers.get('tenant_id')?.value || '';
    let filter = this.component.formUsers.get('filters.filter')?.value || '';

    this.ts.tenant_users_fetch(
      tenant_id,
      filter
    ).subscribe({
      next: (r: ApiResponse) => {
        if (r.success) {
          console.debug(r.data);
          let users = (r.data as {
            users: Array<UserData>
          }).users;

          let ufa = this.component.formUsers.get('users') as FormArray;
          ufa.clear();
          users.forEach((u: UserData) => {
            let name = [u.prefix, u.first_name, u.middle_name, u.last_name, u.suffix].join(' ');
            ufa.push(new FormGroup({
              id: new FormControl(u.user_id, []),
              email: new FormControl(u.email, []),
              name: new FormControl(name, [])
            }))
          });
          this.cd.detectChanges();

        } else {
          console.error('//todo', r);
        }
      },
      error: (e) => {
        console.error('//todo', e);
      },
      complete: () => {
        console.info('//todo complete');
      }
    });


  }

  select_tenant(): void {
    console.info('select_tenant');

    this.nav_tenant_selector.open();
  }

  on_tenants_selected(tenants: Array<Tenant>): void {
    console.info('on_tenants_selected');

    let tenant = tenants.length > 0 ? tenants[0] : Tenant.default();
    this.component.formUsers.get('tenant_id')?.setValue(tenant.id);
    this.component.tenant_name = tenant.name;

    this.nav_tenant_selector.close();
  }

  assign_to_tenant(): void {
    console.info('assign_to_tenant');
    this.nav_tenant_selector.open();
  }

  assign(): void {
    this.nav_tenant_selector.close();
  }
}
