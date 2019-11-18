import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitoFinanceiroComponent } from './debito-financeiro.component';

describe('DebitoFinanceiroComponent', () => {
  let component: DebitoFinanceiroComponent;
  let fixture: ComponentFixture<DebitoFinanceiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitoFinanceiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitoFinanceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
