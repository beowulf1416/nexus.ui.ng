import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerDialog } from './partner-dialog';

describe('PartnerDialog', () => {
  let component: PartnerDialog;
  let fixture: ComponentFixture<PartnerDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(PartnerDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
