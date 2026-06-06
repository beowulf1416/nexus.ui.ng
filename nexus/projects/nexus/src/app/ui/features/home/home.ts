import { Component } from '@angular/core';

import { CommonHeader } from 'common';
import { SidebarLeft } from '../../components/sidebar-left/sidebar-left';

@Component({
  selector: 'app-home',
  imports: [
    CommonHeader,
    SidebarLeft,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
