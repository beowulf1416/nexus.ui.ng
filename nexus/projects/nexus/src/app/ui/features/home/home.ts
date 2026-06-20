import { Component } from '@angular/core';

import { AppHeader } from 'core';
import { SidebarLeft } from '../../components/sidebar-left/sidebar-left';

@Component({
  selector: 'app-home',
  imports: [
    AppHeader,
    SidebarLeft,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
