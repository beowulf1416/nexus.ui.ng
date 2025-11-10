import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, input, Input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Tenant } from '../../classes/tenant';
import { TeantSelectorService } from '../../services/teant-selector-service';

@Component({
  selector: 'app-tenant-selector',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule
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
    formMatches: new FormGroup({}),
    formSelected: new FormGroup({})
  };

  constructor(
    private tss: TeantSelectorService
  ) {}
}
