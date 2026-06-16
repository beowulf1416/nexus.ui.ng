import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantSelectionDialog } from './tenant-selection-dialog';

describe('TenantSelectionDialog', () => {
  let component: TenantSelectionDialog;
  let fixture: ComponentFixture<TenantSelectionDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantSelectionDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantSelectionDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
