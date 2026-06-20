import { Component } from '@angular/core';

import { AppHeader } from 'core';


@Component({
  selector: 'admin-users-dashboard',
  imports: [
    AppHeader,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
