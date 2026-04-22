import { Component, signal } from '@angular/core';
import { Header } from '../../components/header/header';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { email, form, required } from '@angular/forms/signals';
import { Registration } from '../../../services/registration';

@Component({
  selector: 'lib-sign-up',
  imports: [
    Header,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  model = signal({
    email: '',
  });

  component = {
    errors: [],
    form: form(this.model, (f) => {
      required(f.email, { message: 'Email address is required' });

      email(f.email, { message: 'Email is invalid' });
    }),
  };

  constructor(private registration: Registration) {}

  on_btn_submit(event: Event): void {
    console.info('on_btn_submit');
  }
}
