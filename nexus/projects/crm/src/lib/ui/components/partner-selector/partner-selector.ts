import { Component, input, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Partner } from '../../../models/partner';



@Component({
  selector: 'lib-partner-selector',
  imports: [
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './partner-selector.html',
  styleUrl: './partner-selector.css',
})
export class PartnerSelector {

  multiple = input<boolean>(false);
  partners_selected = output<Array<Partner>>()

  md = inject(MatDialog);

  constructor() {}

  on_select_partner(event: Event): void {
    console.info('on_select_partner');
  }
}
