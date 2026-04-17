import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantSelect } from './tenant-select';

describe('TenantSelect', () => {
  let component: TenantSelect;
  let fixture: ComponentFixture<TenantSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
