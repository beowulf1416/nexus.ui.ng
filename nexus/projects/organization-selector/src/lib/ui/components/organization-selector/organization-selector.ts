import { Component, computed, inject, model, output, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { OrganizationSelectorDialog } from '../../dialogs/organization-selector-dialog/organization-selector-dialog';
import { NotificationService, Uuid } from 'core';
import { OrganizationData } from '../../../models/organization-data';
import { OrganizationsService } from '../../../services/organizations-service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'organization-selector',
  imports: [
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './organization-selector.html',
  styleUrl: './organization-selector.css',
})
export class OrganizationSelector implements FormValueControl<string> {
  value = model<string>('');

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
  private org_service = inject(OrganizationsService);

  constructor() { }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value) {
      this.org_service.fetch_organization(new Uuid(value)).subscribe({
        next: (r: OrganizationData | null) => {
          if (r) {
            this.model.set({
              org_id: r.org_id,
              name: r.name
            });
          }
        },
        error: (e: HttpErrorResponse) => {
          console.error(e);
          throw e;
        }
      })
    }
  }

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
          this.value.set(a.org_id);
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
