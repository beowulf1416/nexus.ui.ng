import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
export class EmailVerified implements OnInit {

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
    private user_registration: UserRegistration,
    private router: Router
  ) {
    const token = this.route.snapshot.paramMap.get('token') || '';

    this.user_registration.get_registration_details(token).subscribe({
      next: (v: ApiResponse) => {
        if (v.success) {
          let d = (v?.data as {
            details: {
              register_id: string,
              email: string,
              token: string
            }
          }).details;

          this.component.signUpForm.get('register_id')?.setValue(d.register_id);
          this.component.signUpForm.get('email')?.setValue(d.email);
        } else {
          notification_service.error(v.message, null);
        }
      },
      error: (e) => {
        console.error(e);
        notification_service.error(e, null);
      },
      complete: () => {
        console.info('complete')
      }
    });

    this.component.signUpForm.get('token')?.setValue(token);
  }


  ngOnInit(): void {
    
  }

  sign_up_verified() {
    console.info('//todo sign_up_verified');

    if (this.component.signUpForm.valid) {

      const register_id = this.component.signUpForm.get('register_id')?.value || '';
      const token = this.component.signUpForm.get('token')?.value || '';
      const pw = this.component.signUpForm.get('pw1')?.value || '';

      this.component.signUpForm.disable({
        onlySelf: false
      });

      this.user_registration.sign_up_verified(
        register_id,
        token,
        pw
      ).subscribe({
        next: (v: ApiResponse) => {
          if (v.success) {
            // redirect to sign-in page
            setTimeout(() => {
              this.router.navigate(['/auth/sign-in']);
            }, 3000);
          } else {
            this.notification_service.error(v.message, null);
          }
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
