import { Component, signal, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';

import { Organization } from '../../../models/organization';
import { OrganizationDialog } from '../../dialogs/organization-dialog/organization-dialog';



@Component({
  selector: 'lib-organizations',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],
  templateUrl: './organizations.html',
  styleUrl: './organizations.css',
})
export class Organizations {
  model = signal({
    organizations: new Array<Organization>()
  });

  private md = inject(MatDialog);

  constructor() { }

  on_new_org(event: Event): void {
    event.preventDefault();

    const dr = this.md.open(OrganizationDialog, {
      position: {
        top: '2em',
        right: '1em',
      },
      data: {  }
    });
  }

  on_refresh(event: Event): void {
    event.preventDefault();

    this.refresh();
  }

  refresh(): void {
    console.info('//todo refresh');
  }
}
