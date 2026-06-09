import { Component } from '@angular/core';
import { Header, ApiResponse } from 'core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';

import { TenantDialog } from '../../dialogs/tenant-dialog/tenant-dialog';

@Component({
  selector: 'lib-tenants',
  imports: [
    Header,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
  ],
  templateUrl: './tenants.html',
  styleUrl: './tenants.css',
})
export class Tenants {


  constructor(
    private md: MatDialog) {

  }

  show_tenant_dialog(event: Event) {
    let dr = this.md.open(TenantDialog, {
      position: {
        right: '10px'
      }
    })
    dr.afterClosed().subscribe((result: any) => {
      console.debug(result);
    })
  }
}
