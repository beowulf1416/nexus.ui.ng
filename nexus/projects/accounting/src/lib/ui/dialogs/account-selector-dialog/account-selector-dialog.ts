import { Component, signal, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { form, FormField, required } from '@angular/forms/signals';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lib-account-selector-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatDialogModule,
    FormField
  ],
  templateUrl: './account-selector-dialog.html',
  styleUrl: './account-selector-dialog.css',
})
export class AccountSelectorDialog {
  model = signal({
    filter: ''
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {
      required(f.filter, { message: 'Filter is required' })
    })
  };


  private dr = inject(MatDialogRef<AccountSelectorDialog>);

  constructor() {

  }

  on_submit(event: Event): void {
    console.info('on_submit');
    event.preventDefault();

  }

  on_clear(event: Event): void {
    console.info('on_clear');
    event.preventDefault();

  }

  on_cancel(event: Event): void {
    console.info('on_cancel');
    event.preventDefault();
    this.dr.close();
  }
}
