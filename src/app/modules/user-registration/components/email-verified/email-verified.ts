import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-email-verified',
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
  templateUrl: './email-verified.html',
  styleUrl: './email-verified.css'
})
export class EmailVerified {

  component = {
    signUpForm: new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      pw1: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      pw2: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    })
  };

  constructor() {}

  sign_up_verified() {
    console.info('//todo sign_up_verified');
  }
}
