import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Uuid } from 'core';
import { Tenant } from 'core';



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


  constructor() {}

  ngOnInit(): void {
    console.info('ngOnInit');
    console.debug(this.data);

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
    submit(this.component.form, async () => {
      const model = this.model();

      console.debug(model);

      this.dr.close(model);
    });
  }
}
