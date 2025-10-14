import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, input } from '@angular/core';

import {MatSidenavModule} from '@angular/material/sidenav';


@Component({
  selector: 'app-main',
  imports: [
    CommonModule,
    MatSidenavModule
  ],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {

  show_left_sidenav = input(false, { transform: booleanAttribute});
  show_right_sidenav = input(false, { transform: booleanAttribute});
}
