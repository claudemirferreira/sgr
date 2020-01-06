import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembroDetalheComponent } from './membro-detalhe.component';

describe('MembroDetalheComponent', () => {
  let component: MembroDetalheComponent;
  let fixture: ComponentFixture<MembroDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembroDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembroDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
