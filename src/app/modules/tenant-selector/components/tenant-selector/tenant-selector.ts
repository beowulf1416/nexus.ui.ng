import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

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

  @Input({ required: false }) multiple!: boolean;

  component = {
    error: '',
    formMatches: new FormGroup({}),
    formSelected: new FormGroup({})
  };

  constructor() {}
}
