import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'lib-role-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './role-dialog.html',
  styleUrl: './role-dialog.css',
})
export class RoleDialog {

  constructor(private dr: MatDialogRef<RoleDialog>) {}

  on_cancel(event: Event): void {
    console.log('on_cancel');

    event.preventDefault();
    this.dr.close();
  }

  on_submit(event: Event): void {
    console.log('on_submit');

    event.preventDefault();
    this.dr.close();
  }
}
