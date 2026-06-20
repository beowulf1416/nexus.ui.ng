import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authorizedGuardGuard } from './authorized-guard';

describe('authorizedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authorizedGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
