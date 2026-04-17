import { TestBed } from '@angular/core/testing';

import { TeantSelectorService } from './teant-selector-service';

describe('TeantSelectorService', () => {
  let service: TeantSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeantSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
