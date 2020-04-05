import { TestBed } from '@angular/core/testing';

import { UsuarioAssociacaoService } from './usuario-associacao.service';

describe('UsuarioAssociacaoService', () => {
  let service: UsuarioAssociacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioAssociacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
