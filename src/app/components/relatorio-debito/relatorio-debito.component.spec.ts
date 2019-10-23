import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioDebitoComponent } from './relatorio-debito.component';

describe('RelatorioDebitoComponent', () => {
  let component: RelatorioDebitoComponent;
  let fixture: ComponentFixture<RelatorioDebitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioDebitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioDebitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
