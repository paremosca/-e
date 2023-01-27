import { TestBed } from '@angular/core/testing';

import { SvcPartituresService } from './svc-partitures.service';

describe('SvcPartituresService', () => {
  let service: SvcPartituresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvcPartituresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
