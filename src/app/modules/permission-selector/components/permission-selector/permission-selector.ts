import { booleanAttribute, Component, input, output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Permission } from '../../classes/permission';
import { PermissionService } from '../../services/permission-service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-permission-selector',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './permission-selector.html',
  styleUrl: './permission-selector.css',
})
export class PermissionSelector {

  multiple = input(true, { transform: booleanAttribute });
  permissions_selected = output<Array<Permission>>();

  component = {
    error: '',
    formPermissionSelector: new FormGroup({
      filters: new FormGroup({
        filter: new FormControl('', [])
      }),
      matches: new FormArray([]),
      selected: new FormArray([])
    })
  };

  constructor(
    private ps: PermissionService
  ) {}

  get matches() {
    return this.component.formPermissionSelector.get('matches') as FormArray;
  }

  get selected() {
    return this.component.formPermissionSelector.get('selected') as FormArray;
  }
}
