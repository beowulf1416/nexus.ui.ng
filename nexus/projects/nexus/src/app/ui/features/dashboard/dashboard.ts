import { Component } from '@angular/core';
import { Header } from 'core';
import { SidebarLeft } from '../../components/sidebar-left/sidebar-left';

@Component({
  selector: 'app-dashboard',
  imports: [
    Header,
    SidebarLeft,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
