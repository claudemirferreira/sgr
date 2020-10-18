import { TestBed } from '@angular/core/testing';

import { RelatorioTemplateService } from './relatorio-template.service';

describe('RelatorioTemplateService', () => {
  let service: RelatorioTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatorioTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
