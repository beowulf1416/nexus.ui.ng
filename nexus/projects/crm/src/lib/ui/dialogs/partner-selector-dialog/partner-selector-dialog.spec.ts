import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerSelectorDialog } from './partner-selector-dialog';

describe('PartnerSelectorDialog', () => {
  let component: PartnerSelectorDialog;
  let fixture: ComponentFixture<PartnerSelectorDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerSelectorDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(PartnerSelectorDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
