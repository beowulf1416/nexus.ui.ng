import { Component, ViewChild } from '@angular/core';
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
    error: '',
    signUpForm: new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ])
    })
  };

  @ViewChild('div.errors') error!: HTMLElement;

  constructor(
    private user_registration: UserRegistration,
    private notification_service: NotificationService
  ) {}

  sign_up() {
    console.info('//todo sign_up');

    const id = uuidv4();
    const email = this.component.signUpForm.get('email')?.value || '';


    if (email != '') {
      this.component.signUpForm.disable({
        onlySelf: false
      });
      this.user_registration.sign_up(
        id,
        email
      ).subscribe({
        next: (v) => {
          console.debug('//todo', v)
        },
        error: (e) => {
          console.error(e);
          this.component.signUpForm.disable({
            onlySelf: false
          });
        },
        complete: () => {
          this.component.signUpForm.disable({
            onlySelf: false
          });
        }
      });
    } else {
      console.debug('//todo: form invalid');
    }
  }
}
