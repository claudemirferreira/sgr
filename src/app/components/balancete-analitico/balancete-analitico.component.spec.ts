import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceteAnaliticoComponent } from './balancete-analitico.component';

describe('BalanceteAnaliticoComponent', () => {
  let component: BalanceteAnaliticoComponent;
  let fixture: ComponentFixture<BalanceteAnaliticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceteAnaliticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceteAnaliticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
