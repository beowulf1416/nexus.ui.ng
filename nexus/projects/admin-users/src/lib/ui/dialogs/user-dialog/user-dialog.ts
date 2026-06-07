import { Component, signal, inject, model } from '@angular/core';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { UserDialogData } from './user-dialog-data';
import { UsersService } from '../../../services/users-service';
import { ApiResponse } from 'core';


@Component({
  selector: 'lib-user-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    // MatDialogRef
    FormField,
  ],
  templateUrl: './user-dialog.html',
  styleUrl: './user-dialog.css',
})
export class UserDialog {

    model = signal({
      email: '',
      first_name: '',
      last_name: '',
      middle_name: '',
    });

    component = {
      errors: signal(new Array<string>()),
      form: form(this.model, (f) => {
        required(f.email, { message: 'Email is required' });
      })
    };

    readonly data = inject<UserDialogData>(MAT_DIALOG_DATA);

    constructor(
      private dr: MatDialogRef<UserDialog>,
      private users_service: UsersService
    ) {}

    on_cancel(event: Event): void {
      console.log('on_cancel');
      this.dr.close();
    }

    on_save(event: Event): void {
      console.log('on_save');

      let values = this.model();

      this.users_service.add_user(values).subscribe({
        next: (response: ApiResponse) => {
          console.log(response);
          this.dr.close(values);
        },
        error: (error: any) => {
          console.error(error);
        },
      });
    }
}
