import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySelectorDialog } from './country-selector-dialog';

describe('CountrySelectorDialog', () => {
  let component: CountrySelectorDialog;
  let fixture: ComponentFixture<CountrySelectorDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountrySelectorDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountrySelectorDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
