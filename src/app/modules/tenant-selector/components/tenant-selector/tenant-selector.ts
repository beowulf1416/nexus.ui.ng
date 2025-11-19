import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectorRef, Component, input, Input, output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Tenant } from '../../classes/tenant';
import { TeantSelectorService } from '../../services/teant-selector-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ApiResponse } from '../../../../classes/api-response';

@Component({
  selector: 'app-tenant-selector',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './tenant-selector.html',
  styleUrl: './tenant-selector.css',
})
export class TenantSelector {

  // @Input({ required: false }) multiple!: boolean;
  multiple = input(false, { transform: booleanAttribute });

  tenants_selected = output<Array<Tenant>>();

  component = {
    error: '',
    formTenants: new FormGroup({
      filter: new FormControl('', []),
      matches: new FormArray([]),
      selected: new FormArray([])
    })
  };

  constructor(
    private tss: TeantSelectorService,
    private cd: ChangeDetectorRef
  ) {}

  get matches() {
    return this.component.formTenants.get('matches') as FormArray;
  }

  get selected() {
    return this.component.formTenants.get('selected') as FormArray;
  }

  search(): void {
    console.info('search');

    let filter = this.component.formTenants.get('filter')?.value || '';
    this.tss.search(filter).subscribe({
      next: (r: ApiResponse) => {
        if (r.success) {
          let tenants = (r.data as {
            tenants: Array<Tenant>
          }).tenants;

          let tfa = this.component.formTenants.get('matches') as FormArray;
          tfa.clear();
          tenants.forEach((t: Tenant) => {
            tfa.push(new FormGroup({
              selected: new FormControl(false, []),
              id: new FormControl(t.id, []),
              name: new FormControl(t.name, []),
              description: new FormControl(t.description, [])
            }));
          });
          this.cd.detectChanges();
        } else {
          console.error('//todo', r);
        }
      },
      error: (e) => {
        console.error('//todo', e);
      },
      complete: () => {
        console.info('//todo complete');
      }
    });
  }

  select_tenant(t: Tenant): void {
    console.info('select_tenant', t);

    let sfa = this.component.formTenants.get('selected') as FormArray;
    sfa.push(new FormGroup({
      id: new FormControl(t.id, []),
      name: new FormControl(t.name, []),
      description: new FormControl(t.description, [])
    }));
    this.cd.detectChanges();
  }

  deselect_tenant(t: Tenant, i: number): void {
    console.info('deselect_tenant', t);

    let sfa = this.component.formTenants.get('selected') as FormArray;
    sfa.removeAt(i);
  }

  select(): void {
    console.info('select');

    let tfa = this.component.formTenants.get('selected') as FormArray;
    let tenants = tfa?.controls
      // .filter(c => (c as FormGroup).get('selected')?.value === true )
      .map(c => c.value)
      .map(c => new Tenant(c.id, c.name, c.description))
    ;
    // console.debug(tenant_ids);
    this.tenants_selected.emit(tenants);
  }
}
