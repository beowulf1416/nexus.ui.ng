import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'lib-tenant-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  templateUrl: './tenant-dialog.html',
  styleUrl: './tenant-dialog.css',
})
export class TenantDialog {

  constructor(private dr: MatDialogRef<TenantDialog>) {}

  on_cancel(event: Event) {
    this.dr.close();
  }

  on_submit(event: Event) {
    this.dr.close();
  }
}
