import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'admin-tenants-sidebar-left',
  imports: [
    RouterLink,
  ],
  templateUrl: './sidebar-left.html',
  styleUrl: './sidebar-left.css',
})
export class SidebarLeft {}
