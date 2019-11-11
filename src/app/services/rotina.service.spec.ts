import { TestBed } from '@angular/core/testing';

import { RotinaService } from './rotina.service';

describe('RotinaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RotinaService = TestBed.get(RotinaService);
    expect(service).toBeTruthy();
  });
});
