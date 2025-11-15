import { booleanAttribute, ChangeDetectorRef, Component, input, output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users-service';

@Component({
  selector: 'app-user-selector',
  imports: [],
  templateUrl: './user-selector.html',
  styleUrl: './user-selector.css',
})
export class UserSelector {

  multiple = input(false, { transform: booleanAttribute });
  users_selected = output<Array<string>>();

  component = {
    error: '',
    formUsers: new FormGroup({
      filter: new FormControl('', []),
      matches: new FormArray([]),
      selected: new FormGroup([])
    })
  };

  constructor(
    private us: UsersService,
    private cd: ChangeDetectorRef
  ) {}

  get matches() {
    return this.component.formUsers.get('matches') as FormArray;
  }

  get selected() {
    return this.component.formUsers.get('selected') as FormArray;
  }

  search(): void {
    console.info('search');
  }
}
