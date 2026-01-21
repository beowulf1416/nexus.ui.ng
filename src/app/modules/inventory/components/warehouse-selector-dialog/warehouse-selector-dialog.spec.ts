import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseSelectorDialog } from './warehouse-selector-dialog';

describe('WarehouseSelectorDialog', () => {
  let component: WarehouseSelectorDialog;
  let fixture: ComponentFixture<WarehouseSelectorDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseSelectorDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseSelectorDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
