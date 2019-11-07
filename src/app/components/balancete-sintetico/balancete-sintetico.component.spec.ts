import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceteSinteticoComponent } from './balancete-sintetico.component';

describe('BalanceteSinteticoComponent', () => {
  let component: BalanceteSinteticoComponent;
  let fixture: ComponentFixture<BalanceteSinteticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceteSinteticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceteSinteticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
