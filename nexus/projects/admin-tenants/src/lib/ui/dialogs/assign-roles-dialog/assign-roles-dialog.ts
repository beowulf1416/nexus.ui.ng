import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';



class RoleItemRole {
  constructor(
    readonly role: Role,
    readonly selected: boolean = false) {}
}

@Component({
  selector: 'lib-assign-roles-dialog',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatDialogModule,
  ],
  templateUrl: './assign-roles-dialog.html',
  styleUrl: './assign-roles-dialog.css',
})
export class AssignRolesDialog {

  model = signal({
    filter: '',
    selected: new Array<RoleItemRole>(),
    matches: new Array<RoleItemRole>()
  });

  component = {
    errors: signal(new Array<String>()),
    form: form(this.model, (f) => {
      required(f.filter, { message: 'Filter is required' })
    })
  };


  constructor() {}
}
