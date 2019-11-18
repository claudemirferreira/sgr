import { TestBed } from '@angular/core/testing';

import { MembroService } from './membro.service';

describe('MembroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MembroService = TestBed.get(MembroService);
    expect(service).toBeTruthy();
  });
});
