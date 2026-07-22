import { Component, signal, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';

import { OrganizationDialog } from '../../dialogs/organization-dialog/organization-dialog';
import { OrganizationsService } from '../../../services/organizations-service';
import { OrganizationNodeData } from '../../../models/organization-node-data';



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
    organizations: new Array<OrganizationNodeData>()
  });

  private md = inject(MatDialog);
  private org_service = inject(OrganizationsService);

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

    this.org_service.organizations_fetch_tree().subscribe({
      next: (r: OrganizationNodeData[]) => {
        this.model.update((m) => ({
          ...m,
          organizations: r
        }));
    }});
  }
}
