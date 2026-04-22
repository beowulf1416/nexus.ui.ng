import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpStep2 } from './sign-up-step-2';

describe('SignUpStep2', () => {
  let component: SignUpStep2;
  let fixture: ComponentFixture<SignUpStep2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpStep2],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpStep2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
