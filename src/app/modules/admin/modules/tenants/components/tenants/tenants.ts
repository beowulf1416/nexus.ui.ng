import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-tenants',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './tenants.html',
  styleUrl: './tenants.css',
})
export class Tenants {

  component = {
    error: '',
    formSearch: new FormGroup({
      filter: new FormControl('', Validators.required)
    })
  };

  constructor() {}


  search(): void {
    console.info('search');
  }
}
