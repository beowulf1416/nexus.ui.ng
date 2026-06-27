import { Component, signal, computed, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { form, FormField, required, submit, FieldTree } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { ApiResponse, Uuid } from 'core';
import { HTTP_STATUS } from 'core';

import { Business } from '../../../models/business';


@Component({
  selector: 'lib-business-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    FormField
  ],
  templateUrl: './business-dialog.html',
  styleUrl: './business-dialog.css',
})
export class BusinessDialog {
  model = signal({
    tenant_id: '',
    business_id: '',

    name: '',
    description: '',
    address: {
      street: '',
      city: '',
      region: '',
      state: '',
      zip: '',
      country: ''
    }
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {
      required(f.name, { message: 'Name is required' });

      // address
      required(f.address.country, { message: 'Country is required' });
      required(f.address.street, { message: 'Street is required' });
      required(f.address.city, { message: 'City is required' });
      required(f.address.state, { message: 'State is required' });
    })
  };

  title = computed(() => {
    return this.model().name ? `${this.model().name}` : 'New Business';
  });


  readonly data = inject<{
    tenant_id: Uuid
    business_id: Uuid | null
  } | null>(MAT_DIALOG_DATA);

  dr = inject(MatDialogRef<BusinessDialog>);


  constructor() {}

  on_cancel(event: Event): void {
    console.info('on_cancel');
    event.preventDefault();

    this.dr.close();
  }

  on_submit(event: Event): void {
    console.info('on_submit');
    event.preventDefault();

    submit(this.component.form, async () => {

      this.dr.close();
    });
  }


}
