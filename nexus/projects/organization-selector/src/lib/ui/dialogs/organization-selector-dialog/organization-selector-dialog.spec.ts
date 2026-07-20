import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationSelectorDialog } from './organization-selector-dialog';

describe('OrganizationSelectorDialog', () => {
  let component: OrganizationSelectorDialog;
  let fixture: ComponentFixture<OrganizationSelectorDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationSelectorDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizationSelectorDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
