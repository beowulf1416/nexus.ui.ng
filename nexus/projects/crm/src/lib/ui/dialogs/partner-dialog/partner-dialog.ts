import { Component } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { ApiResponse, Uuid, NotificationService, Tenant } from 'core';
import { HTTP_STATUS } from 'core';

import { PartnerService } from '../../../services/partner-service';
import { Partner } from '../../../models/partner';


@Component({
  selector: 'lib-partner-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    FormField
  ],
  templateUrl: './partner-dialog.html',
  styleUrl: './partner-dialog.css',
})
export class PartnerDialog implements OnInit {

  model = signal({
    tenant_id: '',
    partner_id: '',
    business: {
      name: '',
      description: ''
    },
    names: {
      prefix: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      suffix: ''
    }
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {})
  };

  title = computed(() => {
    const model = this.model();
    const value = `${model.name.prefix} ${model.name.first_name} ${model.name.middle_name} ${model.name.last_name} ${model.name.suffix}`.trim();
    if (value == '') {
      return 'New Partner';
    }
    return value;
  });

  readonly data = inject<{
    tenant_id: string
    partner_id: string | null
  } | null>(MAT_DIALOG_DATA);

  dr = inject(MatDialogRef<PartnerDialog>);
  notification_service = inject(NotificationService);
  partner_service = inject(PartnerService);

  constructor() {

  }

  ngOnInit(): void {
    const tenant_id = this.data?.tenant_id || Tenant.default().id.to_string();
    const partner_id = this.data?.partner_id || new Uuid().to_string();

    this.model.update((m) => ({
      ...m,
      tenant_id: tenant_id,
      partner_id: partner_id
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

    const model = this.model();

    submit(this.component.form, async () => {
      const tenant_id = new Uuid(model.tenant_id);
      const partner_id = new Uuid(model.partner_id);;

      this.partner_service.partner_save(
        tenant_id,
        new Partner(
          partner_id,
          model.business_name,
          model.business.description,
          model.names.first_name,
          model.names.middle_name,
          model.names.last_name,
          model.names.prefix,
          model.names.suffix,
        )
      ).subscribe({
        next: (result: ApiResponse) => {
          this.notification_service.showSuccess(result.message);
          this.dr.close();
        },
        error: (error: HttpErrorResponse) => {
          this.notification_service.showError(error.error);
        }
      });
    });
  }
}
