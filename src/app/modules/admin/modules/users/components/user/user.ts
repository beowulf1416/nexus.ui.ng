import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

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
      email: new FormControl('', [
        Validators.required
      ]),
      pw: new FormControl('', [
        Validators.required
      ])
    })
  };


  constructor() {}


  ngOnInit(): void {
    console.info('//todo: ngOnInit');
  }

  toggle_show_pw(): void {
    console.info('//todo: toggle_show_pw()');
  }

  generate_pw(): void {
    console.info('//todo: generate_pw()');
  }

  save(): void {
    console.info('//todo: save');
  }
}
