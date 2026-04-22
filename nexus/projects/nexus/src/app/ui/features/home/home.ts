import { Component } from '@angular/core';

import { Header } from '../../components/header/header';
import { SidebarLeft } from '../../components/sidebar-left/sidebar-left';

@Component({
  selector: 'app-home',
  imports: [Header, SidebarLeft],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
