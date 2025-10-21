import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Authentication } from '../../services/authentication';
import { ApiResponse } from '../../../../classes/api-response';

@Component({
  selector: 'app-sign-in',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css'
})
export class SignIn {

  component = {
    signInForm: new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      pw: new FormControl('', [
        Validators.required
      ])
    })
  };

  constructor(
    private authentication: Authentication
  ) {

  }

  sign_in() {
    console.info('//todo sign_in');


    if (this.component.signInForm.valid) {
      this.component.signInForm.disable({
        onlySelf: false
      });

      const email = this.component.signInForm.get('email')?.value || '';
      const pw = this.component.signInForm.get('pw')?.value || '';

      if (email != '' && pw != '') {
        this.authentication.sign_in(email, pw).subscribe({
          next: (v) => {
            console.debug('next', v);
          },
          error: (e) => {
            console.error('error', e);
            this.component.signInForm.enable({
              onlySelf: false
            });
          },
          complete: () => {
            console.info('complete');
            this.component.signInForm.enable({
              onlySelf: false
            });
          }
        });
      } else {
        console.debug('form invalid');
      }
    }
  }
}
