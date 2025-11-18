import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
// import { TenantSelectorModule } from '../../../../../tenant-selector/tenant-selector-module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TenantSelector } from '../../../../../tenant-selector/components/tenant-selector/tenant-selector';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TenantUserSelector } from '../../../../../tenant-user-selector/components/tenant-user-selector/tenant-user-selector';

@Component({
  selector: 'app-roles',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    TenantSelector,
    TenantUserSelector
  ],
  templateUrl: './roles.html',
  styleUrl: './roles.css',
})
export class Roles {

  component = {
    error: '',
    formRoles: new FormGroup({
      filters: new FormGroup({
        filter: new FormControl('', [])
      }),
      tenant_id: new FormControl('', []),
      roles: new FormArray([])
    })
  };


  set_active(): void {
    console.info('set_active');
  }

  set_inactive(): void {
    console.info('set_inactive');
  }
}
