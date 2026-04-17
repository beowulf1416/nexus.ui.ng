import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TenantsService } from '../../services/tenants-service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ApiResponse } from '../../../../../../classes/api-response';
import { ActivatedRoute } from '@angular/router';
import { Tenant as TenantClass } from '../../classes/tenant';

import { v4 as uuidv4 } from 'uuid';
import { CurrencySelector } from '../../../../../currency-selector/components/currency-selector/currency-selector';



@Component({
  selector: 'app-tenant',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    CurrencySelector
  ],
  templateUrl: './tenant.html',
  styleUrl: './tenant.css',
})
export class Tenant implements OnInit {

  component = {
    error: '',
    formTenant: new FormGroup({
      tenant_id: new FormControl('', []),
      currency_id: new FormControl('', []),
      name: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('', [])
    })
  };

  constructor(
    private ts: TenantsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const tenant_id = this.route.snapshot.paramMap.get('tenant_id') || '';

    if (tenant_id != ''){
      this.ts.tenant_fetch_by_id(tenant_id).subscribe({
        next: (r: ApiResponse) => {
          if (r.success) {
            let tenant = (r.data as {
              tenant: TenantClass
            }).tenant;
            this.component.formTenant.get('tenant_id')?.setValue(tenant_id);
            this.component.formTenant.get('name')?.setValue(tenant.name);
            this.component.formTenant.get('description')?.setValue(tenant.description);
          } else {
            console.error('//todo', r.message);
          }
        }
      });
    }
  }

  save(): void {
    console.info('save');

    if (this.component.formTenant.valid) {
      let tenant_id = this.component.formTenant.get('tenant_id')?.value || '';
      if (this.component.formTenant.get('tenant_id')?.value == '') {
        tenant_id = uuidv4();
        this.component.formTenant.get('tenant_id')?.setValue(tenant_id);
      }

      let name = this.component.formTenant.get('name')?.value || '';
      let description = this.component.formTenant.get('description')?.value || '';

      this.ts.tenant_save(
        tenant_id,
        name,
        description
      ).subscribe({
        next: (r:ApiResponse) => {
          console.debug(r);
        },
        error: (e) => console.error,
        complete: () => {
          console.info('complete');
        }
      });
    }
  }
}
