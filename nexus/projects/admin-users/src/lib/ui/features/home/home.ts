import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarLeft } from '../../components/sidebar-left/sidebar-left';
import { AppHeader } from 'core';

@Component({
  selector: 'lib-home',
  imports: [
    RouterOutlet,
    AppHeader,
    SidebarLeft,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
