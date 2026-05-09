import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEmail } from './info-email';

describe('InfoEmail', () => {
  let component: InfoEmail;
  let fixture: ComponentFixture<InfoEmail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoEmail],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoEmail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
