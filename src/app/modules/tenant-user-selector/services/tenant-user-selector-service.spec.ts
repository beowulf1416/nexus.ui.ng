import { TestBed } from '@angular/core/testing';

import { TenantUserSelectorService } from './tenant-user-selector-service';

describe('TenantUserSelectorService', () => {
  let service: TenantUserSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenantUserSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
