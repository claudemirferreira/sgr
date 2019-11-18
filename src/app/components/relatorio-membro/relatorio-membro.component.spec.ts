import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioMembroComponent } from './relatorio-membro.component';

describe('RelatorioMembroComponent', () => {
  let component: RelatorioMembroComponent;
  let fixture: ComponentFixture<RelatorioMembroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioMembroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioMembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
