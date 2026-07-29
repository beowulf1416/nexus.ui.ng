import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSelectorDialog } from './location-selector-dialog';

describe('LocationSelectorDialog', () => {
  let component: LocationSelectorDialog;
  let fixture: ComponentFixture<LocationSelectorDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationSelectorDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationSelectorDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
