import { Component } from '@angular/core';
import { CommonHeader } from 'common';
import { SidebarLeft } from '../../components/sidebar-left/sidebar-left';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonHeader,
    SidebarLeft,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
