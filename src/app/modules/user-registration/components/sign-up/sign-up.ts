import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { RouterLink } from '@angular/router';
import { Authentication } from '../../../authentication/services/authentication';
import { UserRegistration } from '../../services/user-registration';
import { ApiResponse } from '../../../../classes/api-response';
import { CommonModule } from '@angular/common';

import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-sign-up',
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {

  component = {
    signUpForm: new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ])
    })
  };

  constructor(
    private user_registration: UserRegistration
  ) {}

  sign_up() {
    console.info('//todo sign_up');

    const id = uuidv4();
    const email = this.component.signUpForm.get('email')?.value || '';


    if (email != '') {
      this.user_registration.sign_up(
        id,
        email
      ).subscribe((r: ApiResponse) => {
        console.debug('sign_up', r);
      });
    } else {
      console.debug('//todo: form invalid');
    }
  }
}
