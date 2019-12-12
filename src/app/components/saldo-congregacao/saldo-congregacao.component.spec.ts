import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldoCongregacaoComponent } from './saldo-congregacao.component';

describe('SaldoCongregacaoComponent', () => {
  let component: SaldoCongregacaoComponent;
  let fixture: ComponentFixture<SaldoCongregacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaldoCongregacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldoCongregacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
