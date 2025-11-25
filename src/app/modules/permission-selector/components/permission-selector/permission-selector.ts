import { booleanAttribute, ChangeDetectorRef, Component, input, output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Permission } from '../../classes/permission';
import { PermissionService } from '../../services/permission-service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiResponse } from '../../../../classes/api-response';

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
  permissions_selected = output<Array<string>>();

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
    private ps: PermissionService,
    private cd: ChangeDetectorRef
  ) {}

  get matches() {
    return this.component.formPermissionSelector.get('matches') as FormArray;
  }

  get selected() {
    return this.component.formPermissionSelector.get('selected') as FormArray;
  }

  reset(): void {
    console.info('filter');

    this.component.formPermissionSelector.get('filters.filter')?.reset();
  }

  search(): void {
    console.info('search');

    let filter = this.component.formPermissionSelector.get('filters.filter')?.value || '%';

    this.ps.fetch(
      filter
    ).subscribe({
      next: (r: ApiResponse) => {
        if(r.success) {
          let permissions = (r.data as {
            permissions: Array<Permission>
          }).permissions;

          let pfa = this.component.formPermissionSelector.get('matches') as FormArray;
          pfa.clear();
          permissions.forEach((p: Permission) => {
            pfa.push(new FormGroup({
              id: new FormControl(p.id, []),
              name: new FormControl(p.name, []),
              description: new FormControl(p.description, [])
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
        console.info('//todo');
      }
    })
  }

  select(permission: Permission): void {
    console.info('//todo', permission);

    let sfa = this.component.formPermissionSelector.get('selected') as FormArray;
    sfa.push(new FormGroup({
      id: new FormControl(permission.id, []),
      name: new FormControl(permission.name, []),
      description: new FormControl(permission.description, [])
    }));
    this.cd.detectChanges();
  }

  deselect(permission: Permission, i: number): void {
    console.info('//todo', permission);

    let sfa = this.component.formPermissionSelector.get('selected') as FormArray;
    sfa.removeAt(i);
    this.cd.detectChanges();
  }

  permission_select(): void {
    console.info('permission_select');

    let sfa = this.component.formPermissionSelector.get('selected') as FormArray;
    let selected_permission_ids = sfa?.controls
      .map(c => c.value)
      .map(c => c.id)
    ;

    this.permissions_selected.emit(selected_permission_ids);
  }
}
