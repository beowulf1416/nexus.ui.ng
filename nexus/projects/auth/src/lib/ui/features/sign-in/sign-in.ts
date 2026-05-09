import { Component, signal } from '@angular/core';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'lib-sign-in',
  imports: [
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormField,
  ],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  model = signal({
    email: '',
    pw: '',
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {
      required(f.email, { message: 'Email is required' });
      required(f.pw, { message: 'Password is required' });

      email(f.email, { message: 'Email is invalid' });
    }),
  };

  constructor(private auth: Auth) {}

  on_submit(event: Event): void {
    console.debug('on_sign_in');

    event.preventDefault();
    submit(this.component.form, async () => {
      const model = this.model();
      const email = model.email;
      const pw = model.pw;
    });
  }
}
