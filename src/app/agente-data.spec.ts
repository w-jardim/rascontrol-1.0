import { TestBed } from '@angular/core/testing';

import { AgenteDataService } from './agente-data';

describe('AgenteDataService', () => {
  let service: AgenteDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgenteDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
