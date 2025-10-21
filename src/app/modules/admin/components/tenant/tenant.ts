import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-tenant',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './tenant.html',
  styleUrl: './tenant.css'
})
export class Tenant {

  component = {
    error: '',
    tenantForm: new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('', [])
    })
  };

  constructor() {}

  save() {
    console.info('//todo save');
  }
}
