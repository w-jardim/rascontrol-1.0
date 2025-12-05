import { TestBed } from '@angular/core/testing';

import { AgenteData } from './agente-data';

describe('AgenteData', () => {
  let service: AgenteData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgenteData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
