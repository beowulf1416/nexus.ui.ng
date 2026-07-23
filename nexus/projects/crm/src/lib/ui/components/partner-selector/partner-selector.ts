import { Component, input, inject, output, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Partner } from '../../../models/partner';
import { MatDialog } from '@angular/material/dialog';
import { PartnerData } from '../../../models/partner-data';
import { PartnerSelectorDialog } from '../../dialogs/partner-selector-dialog/partner-selector-dialog';
import { NotificationService } from 'core';



@Component({
  selector: 'partner-selector',
  imports: [
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './partner-selector.html',
  styleUrl: './partner-selector.css',
})
export class PartnerSelector {
  model = signal({
    partner_id: '',
    name: ''
  });

  multiple = input<boolean>(false);
  partners_selected = output<PartnerData>()


  title = computed(() => {
    return this.model().name == '' ? 'Select Partner' : this.model().name;
  });

  private md = inject(MatDialog);
  private notification_service = inject(NotificationService);

  constructor() {}

  on_select_partner(event: Event): void {
    event.preventDefault();
    let dr = this.md.open(PartnerSelectorDialog, {
      position: {
        top: '2em',
        right: '2em',
      },
      data: {  }
    });
    dr.afterClosed().subscribe({
      next: (result: PartnerData[]) => {
        if (result) {
          const data = result[0];
          const name = data.business_name == '' ? `${data.first_name} ${data.last_name}` : data.business_name;
          const a = {
            partner_id: data.partner_id,
            name: name
          };
          this.model.set(a);
          this.partners_selected.emit(data);
        }
      },
      error: (e: any) => {
        console.error(e);
        this.notification_service.error(e);
      }
    })
  }
}
