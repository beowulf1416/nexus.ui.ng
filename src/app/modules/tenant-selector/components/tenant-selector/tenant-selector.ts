import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, input, Input, output } from '@angular/core';
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

  tenants_selected = output<Array<string>>();

  component = {
    error: '',
    formTenants: new FormGroup({
      filter: new FormControl('', []),
      matches: new FormArray([]),
      selected: new FormArray([])
    })
  };

  constructor(
    private tss: TeantSelectorService
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
        console.debug('//todo', r);
      },
      error: (e) => {
        console.error('//todo', e);
      },
      complete: () => {
        console.info('//todo complete');
      }
    });
  }

  select(): void {
    console.info('select');
    
    let tenant_ids = new Array<string>();
    tenant_ids.push('test');
    this.tenants_selected.emit(tenant_ids);
  }
}
