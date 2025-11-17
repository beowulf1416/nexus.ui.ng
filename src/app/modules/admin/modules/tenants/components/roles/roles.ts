import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
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
import { UserSelector } from '../../../../../user-selector/components/user-selector/user-selector';

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
    UserSelector
  ],
  templateUrl: './roles.html',
  styleUrl: './roles.css',
})
export class Roles {

  @ViewChild('nav_selectors') nav_selectors!: MatSidenav;
  // @ViewChild('tenant_selector') tenant_selector!: ElementRef;
  // @ViewChild('user_selector') user_selector!: ElementRef;

  component = {
    formRoles: new FormGroup({
      filters: new FormGroup({
        filter: new FormControl('', [])
      }),
      roles: new FormArray([])
    })
  };

  select_tenant(): void {
    // this.tenant_selector.nativeElement
    // this.user_selector.nativeElement.hide();

    this.nav_selectors.toggle();
  }

  on_tenants_selected(tenant_ids: Array<string>): void {
    console.debug('//todo', tenant_ids);
    this.nav_selectors.toggle();
  }
}
