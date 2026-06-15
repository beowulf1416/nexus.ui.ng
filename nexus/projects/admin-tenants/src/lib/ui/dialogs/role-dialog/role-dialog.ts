import { Component, OnInit, signal, inject } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Uuid, ApiResponse } from 'core';
import { RoleService } from '../../../services/role-service';
import { RoleDialogData } from './role-dialog-data';


@Component({
  selector: 'lib-role-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    FormField
  ],
  templateUrl: './role-dialog.html',
  styleUrl: './role-dialog.css',
})
export class RoleDialog implements OnInit {

  model = signal({
    id: '',
    name: '',
    description: ''
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {
      required(f.name, { message: 'Name is required' })
    })
  };

  readonly data = inject<RoleDialogData | null>(MAT_DIALOG_DATA);

  constructor(
    private role_service: RoleService,
    private dr: MatDialogRef<RoleDialog>,
  ) {}

  ngOnInit(): void {
    if (this.data) {
      console.log(this.data);
    }
  }

  on_cancel(event: Event): void {
    console.log('on_cancel');

    event.preventDefault();
    this.dr.close();
  }

  on_submit(event: Event): void {
    console.log('on_submit');

    event.preventDefault();

    submit(this.component.form, async () => {
      const model = this.model();

      const role_id = new Uuid(model.id);

      this.role_service.save_role(
        role_id,
        model.name,
        model.description
      ).subscribe({
        next: (r: ApiResponse) => {
          console.log(r);
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
        }
      });
    });

    this.dr.close();
  }
}
