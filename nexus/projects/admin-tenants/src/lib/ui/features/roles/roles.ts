import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';

import { RoleDialog } from '../../../ui/dialogs/role-dialog/role-dialog';


@Component({
  selector: 'lib-roles',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
  ],
  templateUrl: './roles.html',
  styleUrl: './roles.css',
})
export class Roles {

  constructor(
    private md: MatDialog
  ) {

  }

  show_role_dialog(event: Event): void {
    console.log('show_role_dialog');

    event.preventDefault();
    let dr = this.md.open(RoleDialog, {
      position: {
        right: '10px'
      }
    })
    dr.afterClosed().subscribe((result: any) => {
      console.debug(result);
    });
  }
}
