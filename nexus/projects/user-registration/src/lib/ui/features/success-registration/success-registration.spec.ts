import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessRegistration } from './success-registration';

describe('SuccessRegistration', () => {
  let component: SuccessRegistration;
  let fixture: ComponentFixture<SuccessRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessRegistration],
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessRegistration);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
