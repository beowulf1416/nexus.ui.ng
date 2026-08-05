import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'lib-transactions',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatMenuModule,
    RouterLink,
    FormField,
  ],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions {
  model = signal({
    filter: ''
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {

    })
  };

  constructor() { }

  on_search(event: Event): void {
    event.preventDefault();
  }

  on_clear(event: Event): void {
    event.preventDefault();
  }
}
