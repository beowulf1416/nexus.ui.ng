import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { TenantSelectorModule } from '../../../../../tenant-selector/tenant-selector-module';
import { TenantSelector } from '../../../../../tenant-selector/components/tenant-selector/tenant-selector';


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
    TenantSelectorModule,
    TenantSelector
  ],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {

  @ViewChild('nav_tenant_selector') nav_tenant_selector!: MatSidenav

  constructor() {}

  refresh(): void {
    console.info('refresh');
  }

  search(): void {
    console.info('search');
  }

  assign(): void {
    console.info('assign');
    this.nav_tenant_selector?.close();
  }

  assign_to_tenant(): void {
    console.info('assign_to_tenant');
    this.nav_tenant_selector?.open();
  }
}
