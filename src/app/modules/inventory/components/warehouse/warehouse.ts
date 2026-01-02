import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-warehouse',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule
  ],
  templateUrl: './warehouse.html',
  styleUrl: './warehouse.css',
})
export class Warehouse {

  component = {
    error: '',
    countries: [],
    form_warehouse: new FormGroup({
      name: new FormControl('', []),
      description: new FormControl('', []),
      address: new FormGroup({
        street: new FormControl('', []),
        city: new FormControl('', []),
        state: new FormControl('', []),
        zip: new FormControl('', []),
        country_id: new FormControl('', [])
      })
    })
  };
}
