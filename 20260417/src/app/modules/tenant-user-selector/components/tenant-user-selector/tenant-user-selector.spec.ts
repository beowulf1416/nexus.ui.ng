import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantUserSelector } from './tenant-user-selector';

describe('TenantUserSelector', () => {
  let component: TenantUserSelector;
  let fixture: ComponentFixture<TenantUserSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantUserSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantUserSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
