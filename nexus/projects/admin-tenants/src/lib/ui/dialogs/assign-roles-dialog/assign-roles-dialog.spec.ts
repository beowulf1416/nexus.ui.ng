import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRolesDialog } from './assign-roles-dialog';

describe('AssignRolesDialog', () => {
  let component: AssignRolesDialog;
  let fixture: ComponentFixture<AssignRolesDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignRolesDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignRolesDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
