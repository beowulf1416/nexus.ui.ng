import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'lib-apps-dialog',
  imports: [
    RouterLink,
    MatCardModule
  ],
  templateUrl: './apps-dialog.html',
  styleUrl: './apps-dialog.css',
})
export class AppsDialog {}
