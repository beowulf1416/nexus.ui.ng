import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

  @ViewChild('nav_tenant_admin') nav_tenant_admin!: MatSidenav

  toggle_nav_tenant_admin(): void {
    this.nav_tenant_admin.toggle();
  }
}
