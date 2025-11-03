import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
    RouterModule
  ],
  templateUrl: './tenants.html',
  styleUrl: './tenants.css',
})
export class Tenants {

  component = {
    error: '',
    formSearch: new FormGroup({
      filter: new FormControl('', Validators.required)
    }),
    tenants: new Array<Tenant>()
  };

  constructor(
    private ts: TenantsService
  ) {}

  refresh(): void {
    console.info('refresh');
    this.search();
  }

  search(): void {
    // if (this.component.formSearch.valid) {
      let filter = this.component.formSearch.get("filter")?.value || '';

      this.ts.tenants_search(filter).subscribe({
        next: (r: ApiResponse) => {
          if (r.success) {
            console.debug(r.data);
            let tenants = (r.data as {
              tenants: Array<Tenant>
            }).tenants;
            this.component.tenants = tenants;
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
  // }
}
