import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'lib-assign-permissions-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatToolbarModule,
  ],
  templateUrl: './assign-permissions-dialog.html',
  styleUrl: './assign-permissions-dialog.css',
})
export class AssignPermissionsDialog {

  model = signal({
    filter: '',
    selected: [],
    matches: [],
  });
}
