import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitoFinaceiroComponent } from './debito-finaceiro.component';

describe('DebitoFinaceiroComponent', () => {
  let component: DebitoFinaceiroComponent;
  let fixture: ComponentFixture<DebitoFinaceiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitoFinaceiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitoFinaceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
