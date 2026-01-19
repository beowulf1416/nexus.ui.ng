import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseSelector } from './warehouse-selector';

describe('WarehouseSelector', () => {
  let component: WarehouseSelector;
  let fixture: ComponentFixture<WarehouseSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
