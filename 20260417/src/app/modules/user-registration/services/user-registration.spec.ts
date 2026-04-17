import { TestBed } from '@angular/core/testing';

import { UserRegistration } from './user-registration';

describe('UserRegistration', () => {
  let service: UserRegistration;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegistration);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
