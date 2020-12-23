import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarRotinaComponent } from './cadastrar-rotina.component';

describe('CadastrarRotinaComponent', () => {
  let component: CadastrarRotinaComponent;
  let fixture: ComponentFixture<CadastrarRotinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarRotinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarRotinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
