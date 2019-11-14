import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotinaComponent } from './rotina.component';

describe('RotinaComponent', () => {
  let component: RotinaComponent;
  let fixture: ComponentFixture<RotinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
