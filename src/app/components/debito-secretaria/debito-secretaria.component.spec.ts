import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitoSecretariaComponent } from './debito-secretaria.component';

describe('DebitoSecretariaComponent', () => {
  let component: DebitoSecretariaComponent;
  let fixture: ComponentFixture<DebitoSecretariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitoSecretariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitoSecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
