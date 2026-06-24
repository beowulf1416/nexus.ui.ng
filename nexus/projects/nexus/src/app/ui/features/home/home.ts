import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppHeader } from 'core';
import { SidebarLeft } from '../../components/sidebar-left/sidebar-left';

@Component({
  selector: 'app-home',
  imports: [
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    AppHeader,
    SidebarLeft,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
