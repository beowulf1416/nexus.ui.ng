import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AppHeader } from 'core';
import { SidebarLeft } from '../../components/sidebar-left/sidebar-left';


@Component({
  selector: 'lib-home',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    RouterOutlet,
    AppHeader,
    SidebarLeft
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
