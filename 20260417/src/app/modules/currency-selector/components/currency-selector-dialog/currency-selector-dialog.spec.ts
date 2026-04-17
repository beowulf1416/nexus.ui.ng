import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencySelectorDialog } from './currency-selector-dialog';

describe('CurrencySelectorDialog', () => {
  let component: CurrencySelectorDialog;
  let fixture: ComponentFixture<CurrencySelectorDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencySelectorDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencySelectorDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
