import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { form, FormField, required, submit, FieldTree } from '@angular/forms/signals';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { ApiResponse, Uuid, NotificationService, Tenant } from 'core';
import { HTTP_STATUS } from 'core';

import { PartnerService } from '../../../services/partner-service';
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
export class BusinessDialog implements OnInit {
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
      // required(f.address.country, { message: 'Country is required' });
      // required(f.address.street, { message: 'Street is required' });
      // required(f.address.city, { message: 'City is required' });
      // required(f.address.state, { message: 'State is required' });
    })
  };

  title = computed(() => {
    return this.model().name ? `${this.model().name}` : 'New Business';
  });


  readonly data = inject<{
    tenant_id: string
    business_id: string | null
  } | null>(MAT_DIALOG_DATA);

  dr = inject(MatDialogRef<BusinessDialog>);
  notification_service = inject(NotificationService);
  partner_service = inject(PartnerService);


  constructor() {}

  ngOnInit(): void {
    const tenant_id = this.data?.tenant_id || Tenant.default().id.to_string();
    const business_id = this.data?.business_id || new Uuid().to_string();

    this.model.update((m) => ({
      ...m,
      tenant_id: tenant_id,
      business_id: business_id
    }));
  }

  on_cancel(event: Event): void {
    console.info('on_cancel');
    event.preventDefault();

    this.dr.close();
  }

  on_submit(event: Event): void {
    console.info('on_submit');
    event.preventDefault();

    submit(this.component.form, async () => {
      const model = this.model();

      this.partner_service.business_save(
        new Uuid(model.tenant_id),
        new Business(
          new Uuid(model.business_id),
          model.name,
          model.description
        )
      ).subscribe({
        next: (r: ApiResponse) => {
          this.notification_service.info(r.message);
          this.dr.close();
        },
        error: (error) => {
          this.notification_service.error(error);
        }
      });
    });
  }


}
