import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameItemDialog } from './rename-item-dialog';

describe('RenameItemDialog', () => {
  let component: RenameItemDialog;
  let fixture: ComponentFixture<RenameItemDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenameItemDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(RenameItemDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
