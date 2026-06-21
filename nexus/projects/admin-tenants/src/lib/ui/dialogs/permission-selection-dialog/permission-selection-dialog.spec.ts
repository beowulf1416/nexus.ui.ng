import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionSelectionDialog } from './permission-selection-dialog';

describe('PermissionSelectionDialog', () => {
  let component: PermissionSelectionDialog;
  let fixture: ComponentFixture<PermissionSelectionDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionSelectionDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionSelectionDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
