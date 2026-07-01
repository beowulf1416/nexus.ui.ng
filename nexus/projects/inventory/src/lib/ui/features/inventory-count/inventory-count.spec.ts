import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCount } from './inventory-count';

describe('InventoryCount', () => {
  let component: InventoryCount;
  let fixture: ComponentFixture<InventoryCount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryCount],
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryCount);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
