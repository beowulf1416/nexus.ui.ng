import { Component, input, inject, output, computed, signal, model, effect } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// import { Partner } from '../../../models/partner';
import { MatDialog } from '@angular/material/dialog';
import { PartnerData } from '../../../models/partner-data';
import { PartnerSelectorDialog } from '../../dialogs/partner-selector-dialog/partner-selector-dialog';
import { NotificationService, Uuid } from 'core';
import { PartnerService } from '../../../services/partner-service';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'partner-selector',
  imports: [
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './partner-selector.html',
  styleUrl: './partner-selector.css',
})
export class PartnerSelector implements FormValueControl<string> {
  value = model<string>('');

  model = signal({
    partner_id: '',
    name: ''
  });

  multiple = input<boolean>(false);
  // partners_selected = output<PartnerData>()


  title = computed(() => {
    return this.model().name == '' ? 'Select Partner' : this.model().name;
  });

  private md = inject(MatDialog);
  private notification_service = inject(NotificationService);
  private partner_service = inject(PartnerService);

  constructor() {
    effect(() => {
      const value = this.value();

      if (value) {
        this.partner_service.fetch_partner(new Uuid(value)).subscribe({
          next: (r: PartnerData | null) => {
            if (r) {
              this.model.set({
                partner_id: r.partner_id,
                name: r.business_name == '' ? `${r.first_name} ${r.last_name}` : r.business_name
              })
            }
          },
          error: (e: HttpErrorResponse) => {
            console.error(e.message);
          }
        })
      }
    });
  }



  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    this.value.set(input.value);
  }

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
          this.value.set(a.partner_id);
          this.model.set(a);
          // this.partners_selected.emit(data);
        }
      },
      error: (e: any) => {
        console.error(e);
        this.notification_service.error(e);
      }
    })
  }
}
