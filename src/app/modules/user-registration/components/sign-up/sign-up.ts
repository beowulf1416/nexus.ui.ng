import { Component, signal, ViewChild } from '@angular/core';
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
import { NotificationService } from '../../../../services/notification-service';

import { v4 as uuidv4 } from 'uuid';
import { email, Field, form, required } from '@angular/forms/signals';
import { Uuid } from '../../../../classes/uuid';


@Component({
  selector: 'app-sign-up',
  imports: [
    CommonModule,
    RouterLink,
    // ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    Field
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {

  model_signup = signal({
    email: ''
  });

  component = {
    error: '',
    // signUpForm: new FormGroup({
    //   email: new FormControl('', [
    //     Validators.required,
    //     Validators.email
    //   ])
    // }),
    form_signup: form(this.model_signup, (sp) => {
      required(sp.email, { message: 'Email is required'});
      email(sp.email, { message: 'Email is invalid' });
    })
  };

  @ViewChild('div.errors') error!: HTMLElement;

  constructor(
    private user_registration: UserRegistration,
    private notification_service: NotificationService
  ) {}

  sign_up(event: Event) {
    console.info('//todo sign_up');

    event.preventDefault();
    const signup = this.model_signup();
    const id = Uuid.generate();
    // const email = this.component.signUpForm.get('email')?.value || '';
    const email = signup.email;


    if (email != '') {
      // this.component.signUpForm.disable({
      //   onlySelf: false
      // });
      this.user_registration.sign_up(
        id,
        email
      ).subscribe({
        next: (v) => {
          console.debug('//todo', v)
        },
        error: (e) => {
          console.error(e);
          // this.component.signUpForm.disable({
          //   onlySelf: false
          // });
        },
        complete: () => {
          // this.component.signUpForm.disable({
          //   onlySelf: false
          // });
        }
      });
    } else {
      console.debug('//todo: form invalid');
    }
  }
}
