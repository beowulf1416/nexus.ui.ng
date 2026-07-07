import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSelectorDialog } from './account-selector-dialog';

describe('AccountSelectorDialog', () => {
  let component: AccountSelectorDialog;
  let fixture: ComponentFixture<AccountSelectorDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountSelectorDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountSelectorDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
