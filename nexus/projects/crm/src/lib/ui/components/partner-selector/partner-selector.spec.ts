import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerSelector } from './partner-selector';

describe('PartnerSelector', () => {
  let component: PartnerSelector;
  let fixture: ComponentFixture<PartnerSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(PartnerSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
