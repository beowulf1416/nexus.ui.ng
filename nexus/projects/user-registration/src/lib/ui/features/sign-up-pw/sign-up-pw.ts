import { Component, signal } from '@angular/core';
import { Header } from '../../components/header/header';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { form, FormField, minLength, readonly, required, validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-sign-up-pw',
  imports: [
    RouterLink,
    Header,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormField
  ],
  templateUrl: './sign-up-pw.html',
  styleUrl: './sign-up-pw.css',
})
export class SignUpPw {
  model = signal({
    register_id: '',
    email: '',
    pw1: '',
    pw2: ''
  });

  component = {
    errors: signal(new Array<string>()),
    form: form(this.model, (f) => {
      readonly(f.email);
      required(f.pw1, { message: 'Password is required' });
      required(f.pw2, { message: 'Confirm password is required' });
      minLength(f.pw1, 8, { message: 'Passwords must be at least 8 characters long' });
      minLength(f.pw2, 8, { message: 'Passwords must be at least 8 characters long' });

      validate(f.pw2, ({ value, valueOf }) => {
        const pw1 = valueOf(f.pw1);
        const pw2 = value();
        if (pw1 !== pw2) {
          return {
            kind: 'passwordMismatch',
            message: 'Passwords do not match'
          }
        }

        return null;
      });
    })
  };
}
