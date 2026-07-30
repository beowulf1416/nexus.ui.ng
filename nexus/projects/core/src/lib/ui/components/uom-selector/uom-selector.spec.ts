import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UomSelector } from './uom-selector';

describe('UomSelector', () => {
  let component: UomSelector;
  let fixture: ComponentFixture<UomSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UomSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(UomSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
