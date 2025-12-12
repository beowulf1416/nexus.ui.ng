import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsSelector } from './locations-selector';

describe('LocationsSelector', () => {
  let component: LocationsSelector;
  let fixture: ComponentFixture<LocationsSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationsSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationsSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
