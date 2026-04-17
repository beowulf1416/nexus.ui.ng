import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
import { email, Field, form, required, submit } from '@angular/forms/signals';

@Component({
  selector: 'app-sign-in',
  imports: [
    RouterLink,
    // ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    Field
  ],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css'
})
export class SignIn implements OnInit {

  model_signin = signal({
    email: "",
    pw: ""
  });

  component = {
    error: '',
    form_signin: form(this.model_signin, (sp) => {
      required(sp.email, { message: 'Email is required' });
      email(sp.email, { message: 'Email is invalid' });

      required(sp.pw, { message: 'Password is required' });
    })
  };

  constructor(
    private authentication: Authentication,
    private ns: NotificationService,
    private us: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    
  }

  on_sign_in(event: Event): void {
    console.debug("on_sign_in");

    event.preventDefault();
    submit(this.component.form_signin, async() => {
      const model = this.model_signin();

      const email = model.email;
      const pw = model.pw

      this.authentication.sign_in(
        email, 
        pw
      ).subscribe({
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

          this.component.error = e.statusText;
          this.ns.error(e.statusText, this.component);
        },
        complete: () => {
          console.info('complete');

          this.cd.detectChanges();
        }
      });
    });
  }
}
