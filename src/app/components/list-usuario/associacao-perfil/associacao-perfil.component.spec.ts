import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociacaoPerfilComponent } from './associacao-perfil.component';

describe('AssociacaoPerfilComponent', () => {
  let component: AssociacaoPerfilComponent;
  let fixture: ComponentFixture<AssociacaoPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociacaoPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociacaoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
