import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppHeader } from 'core';
import { SidebarLeft } from '../../components/sidebar-left/sidebar-left';


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
