import { Component } from '@angular/core';
import { Header } from 'core';

@Component({
  selector: 'admin-users-dashboard',
  imports: [
    Header,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
