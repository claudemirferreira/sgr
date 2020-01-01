import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRotinaPerfilComponent } from './lista-rotina-perfil.component';

describe('ListaRotinaPerfilComponent', () => {
  let component: ListaRotinaPerfilComponent;
  let fixture: ComponentFixture<ListaRotinaPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaRotinaPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRotinaPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
