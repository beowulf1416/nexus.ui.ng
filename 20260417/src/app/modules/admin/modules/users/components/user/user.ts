import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from '../../services/users-service';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { ApiResponse } from '../../../../../../classes/api-response';


@Component({
  selector: 'app-user',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User implements OnInit {

  component = {
    error: '',
    formUser: new FormGroup({
      user_id: new FormControl('', []),
      email: new FormControl('', [
        Validators.required
      ]),
      pw: new FormControl('', [
        Validators.required
      ])
    })
  };


  constructor(
    private us: UsersService,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    console.info('//todo: ngOnInit');

    const user_id = uuidv4();
    this.component.formUser.get('user_id')?.setValue(user_id);
  }

  toggle_show_pw(): void {
    console.info('//todo: toggle_show_pw()');
  }

  generate_pw(): void {
    console.info('//todo: generate_pw()');
  }

  save(): void {
    console.info('//todo: save');

    if (this.component.formUser.valid) {
      let user_id = this.component.formUser.get('user_id')?.value || '';
      let email = this.component.formUser.get('email')?.value || '';
      let pw = this.component.formUser.get('pw')?.value || '';

      this.us.user_save(
        user_id,
        email,
        pw
      ).subscribe({
        next: (r: ApiResponse) => {
          console.debug('//todo', r);
        },
        error: (e) => {
          console.error('//todo', e);
        },
        complete: () => {
          console.info('//todo complete');
        }
      });
    }
  }
}
