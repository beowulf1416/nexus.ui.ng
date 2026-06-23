import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSelectionDialog } from './role-selection-dialog';

describe('RoleSelectionDialog', () => {
  let component: RoleSelectionDialog;
  let fixture: ComponentFixture<RoleSelectionDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleSelectionDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(RoleSelectionDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
