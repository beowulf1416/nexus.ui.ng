import { Component } from '@angular/core';
import { CommonHeader } from 'common';

@Component({
  selector: 'admin-users-dashboard',
  imports: [
    CommonHeader,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
