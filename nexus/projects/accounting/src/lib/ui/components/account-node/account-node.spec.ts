import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNode } from './account-node';

describe('AccountNode', () => {
  let component: AccountNode;
  let fixture: ComponentFixture<AccountNode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountNode],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountNode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
