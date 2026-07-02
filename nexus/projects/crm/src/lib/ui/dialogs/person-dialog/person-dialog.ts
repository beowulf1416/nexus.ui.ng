import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Uuid, ApiResponse, NotificationService, Tenant } from 'core';
import { PartnerService } from '../../../services/partner-service';
import { Person } from '../../../models/person';



@Component({
  selector: 'lib-person-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    FormField
  ],
  templateUrl: './person-dialog.html',
  styleUrl: './person-dialog.css',
})
export class PersonDialog implements OnInit {
  model = signal({
    tenant_id: '',
    person_id: '',

    first_name: '',
    middle_name: '',
    last_name: '',
    prefix: '',
    suffix: '',
    gender: ''
  });

  component = {
    errors: signal(Array<string>()),
    form: form(this.model, (f) => {})
  };

  title = computed(() => {
    const model = this.model();
    const value = `${model.prefix} ${model.first_name} ${model.middle_name} ${model.last_name} ${model.suffix}`.trim();
    if (value == '') {
      return 'New Person';
    }
    return value;
  });

  readonly data = inject<{
    tenant_id: string
    person_id: string | null
  } | null>(MAT_DIALOG_DATA);

  dr = inject(MatDialogRef<PersonDialog>);
  notification_service = inject(NotificationService);
  partner_service = inject(PartnerService);


  constructor() {}

  ngOnInit(): void {
    // console.info('ngOnInit');
    // console.debug(this.data);

    const tenant_id = this.data?.tenant_id || Tenant.default().id.to_string();
    const person_id = this.data?.person_id || new Uuid().to_string();

    this.model.update((m) => ({
      ...m,
      tenant_id: tenant_id,
      person_id: person_id
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
    // submit(this.component.form, async () => {
    //   const model = this.model();

    //   // console.debug(model);
    //   this.partner_service.person_save(
    //     new Uuid(model.tenant_id),
    //     new Person(
    //       new Uuid(model.person_id),
    //       model.first_name,
    //       model.middle_name,
    //       model.last_name,
    //       model.prefix,
    //       model.suffix,
    //       new Date(),
    //       true
    //     )
    //   ).subscribe({
    //     next: (r: ApiResponse) => {
    //       console.debug(r);

    //       if (r.success) {
    //         this.dr.close(model);
    //       } else {
    //         this.component.errors.update((m) => ({
    //           ...m,
    //           errors: this.component.errors().concat(r.message)
    //         }));
    //       }
    //     },
    //     error: (e: HttpErrorResponse) => {
    //       console.error(e);
    //       this.notification_service.error(e.message);
    //     },
    //   });
    // });
  }
}
