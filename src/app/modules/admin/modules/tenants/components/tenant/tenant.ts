import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TenantsService } from '../../services/tenants-service';

@Component({
  selector: 'app-tenant',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './tenant.html',
  styleUrl: './tenant.css',
})
export class Tenant {

  component = {
    error: '',
    formTenant: new FormGroup({
      tenant_id: new FormControl('', []),
      name: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('', [])
    })
  };

  constructor(
    private ts: TenantsService
  ) {}

  save(): void {
    console.info('save');
  }
}
