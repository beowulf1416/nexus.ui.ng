import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpSuccess } from './sign-up-success';

describe('SignUpSuccess', () => {
  let component: SignUpSuccess;
  let fixture: ComponentFixture<SignUpSuccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpSuccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpSuccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
