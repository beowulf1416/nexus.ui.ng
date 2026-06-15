import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Payables } from './payables';

describe('Payables', () => {
  let component: Payables;
  let fixture: ComponentFixture<Payables>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Payables],
    }).compileComponents();

    fixture = TestBed.createComponent(Payables);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
