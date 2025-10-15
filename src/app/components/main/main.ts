import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, input, ViewChild } from '@angular/core';

import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';

import { Notifications } from '../notifications/notifications';


@Component({
  selector: 'app-main',
  imports: [
    CommonModule,
    MatSidenavModule,
    Notifications
  ],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {

  show_left_sidenav = input(false, { transform: booleanAttribute});
  show_right_sidenav = input(false, { transform: booleanAttribute});

  // @ViewChild('nav_start') nav_start!: MatSidenav;
  // @ViewChild('nav_end') nav_end!: MatSidenav;

  constructor() {

  }
}
