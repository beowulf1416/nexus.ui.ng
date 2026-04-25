import { Component, OnInit, signal } from '@angular/core';
import { Header } from '../../components/header/header';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { email, form, FormField, required } from '@angular/forms/signals';
import { Registration } from '../../../services/registration';
import { ApiResponse, Uuid } from 'common';
import { Router } from '@angular/router';

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
    errors: new Array<string>(),
    form: form(this.model, (f) => {
      required(f.email, { message: 'Email address is required' });

      email(f.email, { message: 'Email is invalid' });
    }),
  };

  constructor(
    private registration: Registration,
    private router: Router,
  ) {}

  ngOnInit(): void {
    console.info('ngOnInit');

    const register_id = new Uuid();
    this.component.form.register_id().value.set(register_id.to_string());
  }

  on_submit(event: Event): void {
    console.info('on_submit');

    event.preventDefault();
    const model = this.model();

    this.registration
      .register_email(
        this.component.form.register_id().value(),
        this.component.form.email().value(),
      )
      .subscribe((r: ApiResponse) => {
        console.debug(r);

        if (r.success) {
          // redirect to step 2
          this.router.navigate(['sign-up/2']);
        } else {
          this.component.errors.push(r.message);
        }
      });
  }
}
