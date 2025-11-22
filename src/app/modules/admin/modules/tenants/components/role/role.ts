import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { TenantsService } from '../../services/tenants-service';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { TenantSelector } from '../../../../../tenant-selector/components/tenant-selector/tenant-selector';
import { Tenant } from '../../../../../tenant-selector/classes/tenant';

import { v4 as uuidv4 } from 'uuid';
import { ApiResponse } from '../../../../../../classes/api-response';



@Component({
  selector: 'app-role',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    TenantSelector
  ],
  templateUrl: './role.html',
  styleUrl: './role.css',
})
export class Role {

  @ViewChild('nav_selectors') nav_selectors!: MatSidenav;

  component = {
    error: '',
    tenant_name: 'default',
    formRole: new FormGroup({
      tenant_id: new FormControl('', []),
      role_id: new FormControl('', []),
      name: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('', [])
    })
  };

  constructor(
    private ts: TenantsService,
    private router: Router
  ) {}

  save(): void {
    console.info('save');

    if (this.component.formRole.valid) {
      let tenant_id = this.component.formRole.get('tenant_id')?.value || Tenant.default().id;
      let role_id = this.component.formRole.get('role_id')?.value || '';
      if (role_id == '') {
        role_id = uuidv4();
        this.component.formRole.get('role_id')?.setValue(role_id);
      }
      let role_Name = this.component.formRole.get('name')?.value || '';
      let role_desc = this.component.formRole.get('description')?.value || '';

      this.ts.role_save(
        tenant_id,
        role_id,
        role_Name,
        role_desc
      ).subscribe({
        next: (r: ApiResponse) => {
          if(r.success) {
            console.debug('next', r);
          } else {
            console.error('next', r);
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
  }

  select_tenant(): void {
    console.info('select_tenant');

    this.nav_selectors.open();
  }

  on_tenant_selected(tenants: Array<Tenant>): void {
    console.debug('on_tenant_selected', tenants);

    let tenant = tenants.length > 0 ? tenants[0] : Tenant.default();
    this.component.formRole.get('tenant_id')?.setValue(tenant.id);
    this.component.tenant_name = tenant.name;

    this.nav_selectors.close();
  }
}
