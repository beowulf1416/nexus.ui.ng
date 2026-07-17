import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNodeName } from './account-node-name';

describe('AccountNodeName', () => {
  let component: AccountNodeName;
  let fixture: ComponentFixture<AccountNodeName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountNodeName],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountNodeName);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
