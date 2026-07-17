import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { form, FormField } from '@angular/forms/signals';


class CountryItem {
  constructor(readonly id: string, readonly name: string) { }
}


@Component({
  selector: 'lib-country-selector-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatToolbarModule,
    FormField,
  ],
  templateUrl: './country-selector-dialog.html',
  styleUrl: './country-selector-dialog.css',
})
export class CountrySelectorDialog {
  model = signal({
    filter: '',
    selected: new Array<CountryItem>(),
    matches: new Array<CountryItem>()
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {})
  };

  constructor() { }

  on_submit(event: Event): void {
    console.info('on_submit');
    event.preventDefault();
  }
}
