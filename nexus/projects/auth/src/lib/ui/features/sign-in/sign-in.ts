import { Component, signal } from '@angular/core';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { ApiResponse } from 'common';
// import { Auth } from '../../../services/auth';
import { UserService } from '../../../services/user-service';

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

  constructor(
    // private auth: Auth,
    private userService: UserService,
    private router: Router,
  ) {}

  on_submit(event: Event): void {
    console.debug('on_submit');

    event.preventDefault();
    submit(this.component.form, async () => {
      console.debug("submit");

      const model = this.model();
      const email = model.email;
      const pw = model.pw;

      this.userService.sign_in(email, pw).subscribe({
        next: (response: ApiResponse) => {
          if (response.success){
            this.router.navigate(['dashboard']);
          } else {
            let errors = this.component.errors();
            errors.push(response.message);
            this.component.errors.set([...errors]);
          }
        },
        error: (error) => {
          let errors = this.component.errors();
          errors.push(error);
          this.component.errors.set([...errors]);
        },
      });
    });
  }
}
