import { TestBed } from '@angular/core/testing';

import { PartiturasService } from './partituras.service';

describe('PartiturasService', () => {
  let service: PartiturasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartiturasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
