import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  @ViewChild('nav_start_admin') nav_start!: MatSidenav;

  toggle_left_sidenav(): void {
    console.info('toggle_left_sidenav');
    this.nav_start?.toggle();
  }
}
