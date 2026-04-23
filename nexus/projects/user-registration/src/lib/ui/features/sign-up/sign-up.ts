import { Component, OnInit, signal } from '@angular/core';
import { Header } from '../../components/header/header';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { email, form, FormField, required } from '@angular/forms/signals';
import { Registration } from '../../../services/registration';
import { Uuid } from 'common';

@Component({
  selector: 'lib-sign-up',
  imports: [
    Header,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormField,
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp implements OnInit {
  model = signal({
    register_id: '',
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

  ngOnInit(): void {
    console.info('ngOnInit');

    const register_id = new Uuid();
  }

  on_submit(event: Event): void {
    console.info('on_submit');

    const model = this.model();

    event.preventDefault();
  }
}
