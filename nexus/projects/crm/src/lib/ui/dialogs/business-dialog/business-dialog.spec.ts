import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDialog } from './business-dialog';

describe('BusinessDialog', () => {
  let component: BusinessDialog;
  let fixture: ComponentFixture<BusinessDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
