import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatisticoComponent } from './estatistico.component';

describe('EstatisticoComponent', () => {
  let component: EstatisticoComponent;
  let fixture: ComponentFixture<EstatisticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstatisticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstatisticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
