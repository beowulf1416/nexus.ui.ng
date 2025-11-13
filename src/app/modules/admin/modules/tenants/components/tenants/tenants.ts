import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, signal } from '@angular/core';
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
      tenants: new FormArray([]),
      test: new FormControl(false, [])
    }),
    tenants: signal(new Array<Tenant>())
  };

  constructor(
    private ts: TenantsService,
    private cd: ChangeDetectorRef
  ) {}

  get tenants() {
    return this.component.formTenants.get('tenants') as FormArray;
  }

  refresh(): void {
    console.info('refresh');
    this.search();
  }

  search(): void {
    console.info('search');
    // if (this.component.formSearch.valid) {
      let filter = this.component.formTenants.get("filters.filter")?.value || '';

      this.ts.tenants_search(filter).subscribe({
        next: (r: ApiResponse) => {
          if (r.success) {
            // console.debug(r.data);
            let ts = (r.data as {
              tenants: Array<Tenant>
            }).tenants;

            let tfa = this.component.formTenants.get('tenants') as FormArray;
            tfa.clear();
            ts.forEach((t: Tenant, i: number) => {
              tfa.push(new FormGroup({
                selected: new FormControl(false, []),
                id: new FormControl(t.id, []),
                active: new FormControl(t.active, []),
                name: new FormControl(t.name, []),
                description: new FormControl(t.description, [])
              }));
            });
            this.cd.detectChanges();

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

    let selected_ids = (this.component.formTenants.get('tenants') as FormArray)?.controls
      .filter(c => (c as FormGroup).get('selected')?.value === true)
      .map(c => c.value)
      .map(c => c.id)
    ;
    this.ts.tenant_set_active(selected_ids, true).subscribe({
      next: (r: ApiResponse) => {
        if (r.success) {
          console.debug('//todo', r);
        } else {
          console.error('//todo', r);
        }
      },
      error: (e) => {
        console.error('//todo', e);
      },
      complete: () => {
        console.info('//todo: complete')
      }
    });
  }


  set_inactive(): void {
    console.info('set_inactive');

    let selected_ids = (this.component.formTenants.get('tenants') as FormArray)?.controls
      .filter(c => (c as FormGroup).get('selected')?.value === true)
      .map(c => c.value)
      .map(c => c.id)
    ;
    this.ts.tenant_set_active(selected_ids, false).subscribe({
      next: (r: ApiResponse) => {
        if (r.success) {
          console.debug('//todo', r);
        } else {
          console.error('//todo', r);
        }
      },
      error: (e) => {
        console.error('//todo', e);
      },
      complete: () => {
        console.info('//todo: complete')
      }
    });
  }
}
