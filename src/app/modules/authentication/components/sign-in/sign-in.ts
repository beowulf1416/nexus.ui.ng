import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Authentication } from '../../services/authentication';
import { ApiResponse } from '../../../../classes/api-response';
import { NotificationService } from '../../../../services/notification-service';
import { UserService } from '../../../../services/user-service';
import { HttpErrorResponse } from '@angular/common/http';

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
export class SignIn implements OnInit {

  component = {
    signInForm: new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      pw: new FormControl('', [
        Validators.required
      ])
    }),
    error: ''
  };

  constructor(
    private authentication: Authentication,
    private ns: NotificationService,
    private us: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    
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
          next: (r: ApiResponse) => {
            console.debug('next', r);

            if (r.success) {
              this.ns.info(r.message, this.component);
              setTimeout(() => {
                this.router.navigate(['/dashboard']);
              }, 3000);
            } else {
              console.error(r);
              this.component.error = r.message;

              console.debug(this.component);

              this.ns.error(r.message, this.component);
            }
          },
          error: (e: HttpErrorResponse) => {
            console.error('error', e);
            this.component.signInForm.enable({
              onlySelf: false
            });

            this.component.error = e.statusText;
            this.ns.error(e.statusText, this.component);
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
