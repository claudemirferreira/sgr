import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociarRotinaComponent } from './associar-rotina.component';

describe('AssociarRotinaComponent', () => {
  let component: AssociarRotinaComponent;
  let fixture: ComponentFixture<AssociarRotinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociarRotinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociarRotinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
