import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppHeader } from 'core';
import { SidebarLeft } from '../../components/sidebar-left/sidebar-left';

@Component({
  selector: 'lib-home',
  imports: [
    RouterOutlet,
    AppHeader,
    SidebarLeft,
    MatSidenavModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
