import { Component, computed, inject, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { OrganizationSelectorDialog } from '../../dialogs/organization-selector-dialog/organization-selector-dialog';
import { NotificationService } from 'core';
import { OrganizationData } from '../../../models/organization-data';


@Component({
  selector: 'organization-selector',
  imports: [
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './organization-selector.html',
  styleUrl: './organization-selector.css',
})
export class OrganizationSelector {
  model = signal({
    org_id: '',
    name: ''
  });

  title = computed(() => {
    return this.model().name == '' ? 'Select Organization' : this.model().name;
  });

  organization_selected = output<OrganizationData>();

  private md = inject(MatDialog);
  private notification_service = inject(NotificationService);

  constructor() { }

  on_select(event: Event): void {
    event.preventDefault();
    let dr = this.md.open(OrganizationSelectorDialog, {
      position: {
        top: '2em',
        right: '2em',
      },
      data: {  }
    });
    dr.afterClosed().subscribe({
      next: (result: OrganizationData[]) => {
        if (result) {
          const data = result[0];
          const a = {
            org_id: data.org_id,
            name: data.name
          };
          this.model.set(a);
          this.organization_selected.emit(data);
        }
      },
      error: (e: any) => {
        console.error(e);
        this.notification_service.error(e);
      }
    })
  }
}
