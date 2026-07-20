import { Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { OrganizationSelectorDialog } from '../../dialogs/organization-selector-dialog/organization-selector-dialog';


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

  private md = inject(MatDialog);

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
  }
}
