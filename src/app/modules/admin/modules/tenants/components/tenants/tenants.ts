import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TenantsService } from '../../services/tenants-service';
import { ApiResponse } from '../../../../../../classes/api-response';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { Tenant } from '../../classes/tenant';
import { MatDividerModule } from '@angular/material/divider';






@Component({
  selector: 'app-tenants',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatDividerModule,
    RouterModule
  ],
  templateUrl: './tenants.html',
  styleUrl: './tenants.css',
})
export class Tenants {

  component = {
    error: '',
    formTenants: new FormGroup({
      filters: new FormGroup({
        filter: new FormControl('', [])
      }),
      tenants: new FormArray([])
    }),
    tenants: signal(new Array<Tenant>())
  };

  constructor(
    private ts: TenantsService
  ) {}

  get tenants() {
    return this.component.formTenants.get('tenants') as FormArray;
  }

  refresh(): void {
    console.info('refresh');
    this.search();
  }

  search(): void {
    // if (this.component.formSearch.valid) {
      let filter = this.component.formTenants.get("filters.filter")?.value || '';

      this.ts.tenants_search(filter).subscribe({
        next: (r: ApiResponse) => {
          if (r.success) {
            console.debug(r.data);
            let tenants = (r.data as {
              tenants: Array<Tenant>
            }).tenants;
            // this.component.tenants.set(tenants);

            let tfa = this.component.formTenants.get('tenants') as FormArray;
            tenants.forEach((t: Tenant, i: number) => {
              tfa.push({
                active: new FormControl('', []),
                name: new FormControl(t.name, []),
                description: new FormControl(t.description, [])
              });
            });

          } else {
            this.component.error = r.message;
          }
        },
        error: (e) => {
          console.error(e);
        },
        complete: () => {
          console.info('complete');
        }
      });
  }


  set_active(): void {
    console.info('set_active');

    // get selected tenants
  }


  set_inactive(): void {
    console.info('set_inactive');


  }
}
