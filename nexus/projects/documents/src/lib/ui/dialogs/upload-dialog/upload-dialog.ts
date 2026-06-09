import { Component } from '@angular/core';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'lib-upload-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    FormField,
  ],
  templateUrl: './upload-dialog.html',
  styleUrl: './upload-dialog.css',
})
export class UploadDialog {

  constructor(
    private dr: MatDialogRef<UploadDialog>
  ) {}

  on_upload(event: Event) {
    this.dr.close();
  }

  on_cancel(event: Event) {
    console.log("on_cancel");
    this.dr.close();
  }
}
