import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociacaoUsuarioComponent } from './associacao-usuario.component';

describe('AssociacaoUsuarioComponent', () => {
  let component: AssociacaoUsuarioComponent;
  let fixture: ComponentFixture<AssociacaoUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociacaoUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociacaoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
