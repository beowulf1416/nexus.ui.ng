import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSelectorDialog } from './item-selector-dialog';

describe('ItemSelectorDialog', () => {
  let component: ItemSelectorDialog;
  let fixture: ComponentFixture<ItemSelectorDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemSelectorDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemSelectorDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
