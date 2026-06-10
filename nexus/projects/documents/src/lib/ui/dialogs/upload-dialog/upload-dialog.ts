import { Component, signal } from '@angular/core';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

import { UserService, ApiResponse } from 'core';
import { DocumentService } from '../../../services/document-service';



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

  fd = signal(new FormData());

  constructor(
    private dr: MatDialogRef<UploadDialog>,
    private doc_service: DocumentService,
    private user_service: UserService
  ) {}

  on_change(event: Event) {
    event.preventDefault();
    const file = event?.target?.files[0];
    if (file){
      let fd = this.fd();
      fd.append("file", file, file.name);
      this.fd.set(fd);
    }
  }

  on_upload(event: Event) {
    event.preventDefault();
    this.dr.close();
  }

  on_cancel(event: Event) {
    console.log("on_cancel");
    event.preventDefault();

    // get current selected tenant
    const tenant_id = this.user_service.current_user()?.tenant?.id;
    const file = this.fd().get('file');

    if (file) {
      this.doc_service.upload(
        tenant_id,
        file,
      ).subscribe({
        next: (r: ApiResponse) => {
          console.log(r);
        },
        error: (e: any) => {
          console.error(e);
        },
      });
    }

    this.dr.close();
  }
}
