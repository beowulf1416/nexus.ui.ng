import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ActivatedRoute, RouterLink } from '@angular/router';
import { NotificationService } from '../../../../services/notification-service';
import { UserRegistration } from '../../services/user-registration';
import { ApiResponse } from '../../../../classes/api-response';

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

  private route = inject(ActivatedRoute);

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
      ]),
      register_id: new FormControl('', []),
      token: new FormControl('', [])
    })
  };


  constructor(
    private notification_service: NotificationService,
    private user_registration: UserRegistration
  ) {
    const token = this.route.snapshot.paramMap.get('token') || '';

    this.user_registration.get_registration_details(token).subscribe((r: ApiResponse) => {
      console.debug(r);
    });

    this.component.signUpForm.get('token')?.setValue(token);
  }

  sign_up_verified() {
    console.info('//todo sign_up_verified');

    if (this.component.signUpForm.valid) {
      const token = this.component.signUpForm.get('token')?.value || '';
      const pw = this.component.signUpForm.get('pw1')?.value || '';

      this.component.signUpForm.disable({
        onlySelf: false
      });

      this.user_registration.sign_up_verified(
        token,
        pw
      ).subscribe({
        next: (v) => {
          console.debug('//todo v');
        },
        error: (e) => {
          console.error(e);
          this.component.signUpForm.enable({
            onlySelf: false
          });
        },
        complete: () => {
          this.component.signUpForm.enable({
            onlySelf: false
          });
        }
      });
    }
  }
}
