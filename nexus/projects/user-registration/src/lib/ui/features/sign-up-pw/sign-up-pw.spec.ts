import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpPw } from './sign-up-pw';

describe('SignUpPw', () => {
  let component: SignUpPw;
  let fixture: ComponentFixture<SignUpPw>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpPw],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpPw);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
